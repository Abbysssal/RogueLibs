﻿using System;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using BepInEx;
using HarmonyLib;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace RogueLibsCore
{
	internal sealed partial class RogueLibsPlugin
	{
		public void PatchUnlocks()
		{
			// synchronize some fields
			Patcher.Postfix(typeof(Unlocks), nameof(Unlocks.AddUnlock),
				new Type[] { typeof(string), typeof(string), typeof(bool), typeof(int), typeof(int), typeof(int), typeof(Unlock) });

			// pseudo-prefix + replace the entire foreach loop in the end
			Patcher.Transpiler(typeof(Unlocks), nameof(Unlocks.LoadInitialUnlocks));

			Patcher.Prefix(typeof(Unlocks), nameof(Unlocks.CanDoUnlocks));

			Patcher.Prefix(typeof(Unlocks), nameof(Unlocks.SaveUnlockData2));
			Patcher.Prefix(typeof(Unlocks), nameof(Unlocks.LoadUnlockData2));

			if (Patcher.AnyErrors())
			{
				Logger.LogError("One of the unlock patches failed!");
				Logger.LogError("Terminating the process to keep the save file safe.");
				Environment.Exit(1);
				return;
			}

			RogueLibs.CreateCustomName("UnlockFor", "Unlock", new CustomNameInfo
			{
				English = "Unlock for",
				Russian = "Разблокировать за",
			});
		}

		public static void Unlocks_AddUnlock(Unlock createdUnlock, Unlock __result)
		{
			if (createdUnlock != null)
			{
				__result.unavailable = createdUnlock.unavailable;
				__result.onlyInCharacterCreation = createdUnlock.onlyInCharacterCreation;
				__result.freeItem = createdUnlock.freeItem;
			}
		}

		public static void Unlocks_LoadInitialUnlocks_Helper(bool dontClear)
		{
			if (dontClear) return;
			if (RogueFramework.IsDebugEnabled(DebugFlags.Unlocks))
				RogueFramework.LogDebug("Reloading unlocks.");
			RogueFramework.Unlocks.Clear();
		}
		public static IEnumerable<CodeInstruction> Unlocks_LoadInitialUnlocks(IEnumerable<CodeInstruction> codeEnumerable)
			=> new CodeInstruction[]
			{
				new CodeInstruction(OpCodes.Ldarg_0),
				new CodeInstruction(OpCodes.Ldfld, AccessTools.Field(typeof(Unlocks), "loadedInitialUnlocks")),
				new CodeInstruction(OpCodes.Call, AccessTools.Method(typeof(RogueLibsPlugin), nameof(Unlocks_LoadInitialUnlocks_Helper))),
			}
			.Concat(codeEnumerable.ReplaceRegion(
				new Func<CodeInstruction, bool>[]
				{
					i => i.opcode == OpCodes.Callvirt && i.Calls(List_Unlock_GetEnumerator)
				},
				new Func<CodeInstruction, bool>[]
				{
					i => i.opcode == OpCodes.Endfinally
				},
				new CodeInstruction[]
				{
					new CodeInstruction(OpCodes.Pop),
					new CodeInstruction(OpCodes.Call, typeof(RogueLibsPlugin).GetMethod(nameof(InitializeUnlockWrappers)))
				}));
		private static readonly MethodInfo List_Unlock_GetEnumerator = typeof(List<Unlock>).GetMethod("GetEnumerator");
#pragma warning disable CS0618 // Type or member is obsolete
		public static void InitializeUnlockWrappers()
		{
			GameController gc = GameController.gameController;
			SessionDataBig sdb = gc.sessionDataBig;

			foreach (Unlock unlock in sdb.unlocks.ToList())
			{
				// wrapping original unlocks
				if (gc.unlocks.GetSpecialUnlockInfo(unlock.unlockName, unlock) != "")
				{
					unlock.cost = -2;
					if (RogueFramework.IsDebugEnabled(DebugFlags.Unlocks))
						RogueFramework.LogDebug($"\"{unlock.unlockName}\" ({unlock.unlockType}) has special unlock conditions.");
				}

				UnlockWrapper wrapper;
				if (unlock.unlockType == "Challenge")
				{
					unlock.unavailable = false;
					wrapper = new MutatorUnlock(unlock);
				}
				else if (unlock.unlockType == "Item")
				{
					if (!unlock.unavailable && !unlock.onlyInCharacterCreation && !unlock.freeItem)
						unlock.onlyInCharacterCreation = unlock.freeItem = true;
					wrapper = new ItemUnlock(unlock);
				}
				else if (unlock.unlockType == "Trait")
				{
					unlock.onlyInCharacterCreation = !unlock.unavailable;
					wrapper = new TraitUnlock(unlock);
				}
				else if (unlock.unlockType == "Ability")
				{
					unlock.onlyInCharacterCreation = !unlock.unavailable;
					wrapper = new AbilityUnlock(unlock);
				}
				else if (unlock.unlockType == "Achievement") wrapper = new AchievementUnlock(unlock);
				else if (unlock.unlockType == "Floor") wrapper = new FloorUnlock(unlock);
				else if (unlock.unlockType == "BigQuest") wrapper = new BigQuestUnlock(unlock);
				else if (unlock.unlockType == "HomeBase") wrapper = new HomeBaseUnlock(unlock);
				else if (unlock.unlockType == "Extra") wrapper = new ExtraUnlock(unlock);
				else if (unlock.unlockType == "Agent")
				{
					wrapper = new AgentUnlock(unlock)
					{
						IsSSA = unlock.unlockName == "Cop2" || unlock.unlockName == "UpperCruster" || unlock.unlockName == "Guard2"
					};
				}
				else if (unlock.unlockType == "Loadout") wrapper = new LoadoutUnlock(unlock);
				else
				{
					RogueFramework.LogError($"Unknown unlock type \"{unlock.unlockName}\" ({unlock.unlockType})");
					sdb.unlocks.Remove(unlock);
					continue;
				}
				if (wrapper is IUnlockInCC inCC && !inCC.IsAvailableInCC) inCC.IsAvailableInCC = wrapper.IsAvailable;
				RogueFramework.Unlocks.Add(wrapper);
				AddUnlockFull(wrapper, true);
			}
			foreach (UnlockWrapper wrapper in RogueFramework.CustomUnlocks)
			{
				if (RogueFramework.IsDebugEnabled(DebugFlags.Unlocks))
					RogueFramework.LogDebug($"Initializing custom unlock \"{wrapper.Name}\" ({wrapper.Type}).");
				RogueFramework.Unlocks.Add(wrapper);
				AddUnlockFull(wrapper);
			}
		}
#pragma warning restore CS0618 // Type or member is obsolete
		public static void AddUnlockFull(UnlockWrapper wrapper, bool alreadyLoaded = false)
		{
			try
			{
				// integrating custom unlocks
				Unlock result = alreadyLoaded ? wrapper.Unlock : GameController.gameController.unlocks.AddUnlock(wrapper.Unlock);
				if (wrapper.Unlock != result)
				{
					if (RogueFramework.IsDebugEnabled(DebugFlags.Unlocks))
						RogueFramework.LogDebug($"Loaded state for \"{wrapper.Name}\" ({wrapper.Type}): unlocked - {result.unlocked}, enabled - {!result.notActive}");

					List<Unlock> list = GameController.gameController.sessionDataBig.unlocks;
					list.Remove(result);
					list.Add(wrapper.Unlock);

					wrapper.IsUnlocked = result.unlocked;
					if (!(wrapper is MutatorUnlock))
						wrapper.IsEnabled = !result.notActive;
				}
				wrapper.IsAvailable = wrapper.IsAvailable;
				if (wrapper is IUnlockInCC inCC) inCC.IsAvailableInCC = inCC.IsAvailableInCC;
				if (wrapper is ItemUnlock item) item.IsAvailableInItemTeleporter = item.IsAvailableInItemTeleporter;
				// make sure that the Unlocks are in their appropriate lists
				wrapper.SetupUnlock();
			}
			catch (Exception e)
			{
				RogueFramework.Logger.LogError($"Error setting up {wrapper.Unlock?.unlockName} ({wrapper.Unlock?.unlockType}) unlock.");
				RogueFramework.Logger.LogError(e);
			}
		}

		public static bool Unlocks_CanDoUnlocks(ref bool __result)
		{
			if (UnlocksExtensions.AllowUnlocksAnyway)
			{
				__result = true;
				return false;
			}
			return true;
		}

		private static bool curSaving;
		private static bool saveOnNext;
		public static bool Unlocks_SaveUnlockData2(Unlocks __instance, ref IEnumerator __result)
		{
			__result = SaveEnumerator(__instance);
			return false;
		}
		public static IEnumerator SaveEnumerator(Unlocks __instance)
		{
			yield return null;
			__instance.savingUnlockData = false;
			if (curSaving)
			{
				saveOnNext = true;
				yield break;
			}
			curSaving = true;
			try
			{
				string text = Application.persistentDataPath;
				if (!GameController.gameController.consoleVersion || GameController.gameController.fakeConsole)
				{
					if (GameController.gameController.usingMyDocuments && !GameController.gameController.macVersion && !GameController.gameController.linuxVersion && !GameController.gameController.usingUWP && !GameController.gameController.usingUWP)
					{
						text = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "/" + GameController.gameController.dataFolder;
					}
					Directory.CreateDirectory(text + "/CloudData/");
				}
				SessionDataBig sdb = GameController.gameController.sessionDataBig;
				UnlockSaveData unlockSaveData = new UnlockSaveData
				{
					unlocks = sdb.unlocks,
					highScores = sdb.highScores,
					customCharacterSlots = sdb.customCharacterSlots,
					storedItem = sdb.storedItem,
					storedItem2 = sdb.storedItem2,
					storedItem3 = sdb.storedItem3,
					storedItem4 = sdb.storedItem4,
					storedItem5 = sdb.storedItem5,
					totalDeaths = sdb.totalDeaths,
					totalWins = sdb.totalWins,
					totalGamesPlayed = sdb.totalGamesPlayed,
					nuggets = sdb.nuggets + sdb.loadoutNuggetsSpent,
					lastDailyRun = sdb.lastDailyRun,
					finishedTutorial = sdb.finishedTutorial,
					viewedReadThis = sdb.viewedReadThis,
					currentVersion = GameController.gameController.version,
				};
				try
				{
					unlockSaveData.loadoutList = new List<Unlock>[30];
					for (int i = 0; i < sdb.loadoutList.Length; i++)
					{
						unlockSaveData.loadoutList[i] = new List<Unlock>();
						if (sdb.loadoutList[i] != null)
						{
							for (int j = 0; j < sdb.loadoutList[i].Count; j++)
							{
								Unlock item = sdb.loadoutList[i][j];
								unlockSaveData.loadoutList[i].Add(item);
							}
						}
					}
				}
				catch (Exception e)
				{
					Debug.LogError("LoadoutList Save Error");
					Debug.LogError(e);
				}
				if (GameController.gameController.consoleVersion)
				{
					try
					{
						unlockSaveData.rewardConfigConsoleList = new List<string>[10];
						unlockSaveData.traitConfigConsoleList = new List<string>[10];
						unlockSaveData.mutatorConfigConsoleList = new List<string>[10];
						for (int k = 0; k < sdb.rewardConfigConsoleList.Length; k++)
						{
							unlockSaveData.rewardConfigConsoleList[k] = new List<string>();
							if (sdb.rewardConfigConsoleList[k] != null)
							{
								for (int l = 0; l < sdb.rewardConfigConsoleList[k].Count; l++)
								{
									string item2 = sdb.rewardConfigConsoleList[k][l];
									unlockSaveData.rewardConfigConsoleList[k].Add(item2);
								}
							}
						}
						for (int m = 0; m < sdb.traitConfigConsoleList.Length; m++)
						{
							unlockSaveData.traitConfigConsoleList[m] = new List<string>();
							if (sdb.traitConfigConsoleList[m] != null)
							{
								for (int n = 0; n < sdb.traitConfigConsoleList[m].Count; n++)
								{
									string item3 = sdb.traitConfigConsoleList[m][n];
									unlockSaveData.traitConfigConsoleList[m].Add(item3);
								}
							}
						}
						for (int num = 0; num < sdb.mutatorConfigConsoleList.Length; num++)
						{
							unlockSaveData.mutatorConfigConsoleList[num] = new List<string>();
							if (sdb.mutatorConfigConsoleList[num] != null)
							{
								for (int num2 = 0; num2 < sdb.mutatorConfigConsoleList[num].Count; num2++)
								{
									string item4 = sdb.mutatorConfigConsoleList[num][num2];
									unlockSaveData.mutatorConfigConsoleList[num].Add(item4);
								}
							}
						}
					}
					catch
					{
						Debug.LogError("ConfigList Save Error");
					}
				}
				Debug.Log("SAVE UNLOCK DATA");
				string saveSlotText = sdb.GetSaveSlotText();
				if (GameController.gameController.consoleVersion && !GameController.gameController.fakeConsole)
					GameController.gameController.consoleFunctions.SaveData(unlockSaveData, saveSlotText + "GameUnlocks");
				else if (GameController.gameController.usingUWP)
					GameController.gameController.uwpFunctions.SaveData(unlockSaveData, saveSlotText + "GameUnlocks");
				else
				{
					if (GameController.gameController.usingUWP)
					{
						BinaryFormatter binaryFormatter = new BinaryFormatter();
						FileStream fileStream = File.Create(text + "/CloudData/" + saveSlotText + "GameUnlocks.dat");
						binaryFormatter.Serialize(fileStream, unlockSaveData);
						fileStream.Close();
					}
					else
					{
						BinaryFormatter binaryFormatter2 = new BinaryFormatter();
						FileStream fileStream2 = File.Create(text + "/CloudData/Temp.dat");
						if (!File.Exists(text + "/CloudData/" + saveSlotText + "GameUnlocks.dat"))
						{
							File.Create(text + "/CloudData/" + saveSlotText + "GameUnlocks.dat").Close();
						}
						binaryFormatter2.Serialize(fileStream2, unlockSaveData);
						fileStream2.Close();
						File.Replace(text + "/CloudData/Temp.dat", text + "/CloudData/" + saveSlotText + "GameUnlocks.dat", text + "/BackupData/" + saveSlotText + "BackupGameUnlocks.dat");
						if (GameController.gameController.usingGDK)
							GameController.gameController.gdkFunctions.SaveData(unlockSaveData, saveSlotText + "GameUnlocks", binaryFormatter2);
					}
					__instance.StartCoroutine((IEnumerator)unlocksBackupMethod.Invoke(__instance, new object[] { text, saveSlotText, unlockSaveData }));
					GameController.gameController.steamGog.CloudSave(text + "/CloudData/" + saveSlotText + "GameUnlocks.dat");
				}
			}
			catch (Exception e)
			{
				Debug.LogError("Couldn't save unlock data!");
				Debug.LogError(e);
			}
			if (saveOnNext)
			{
				saveOnNext = false;
				__instance.StartCoroutine(__instance.SaveUnlockData2());
			}
			curSaving = false;
		}
		private static readonly MethodInfo unlocksBackupMethod = AccessTools.Method(typeof(Unlocks), "BackupGameUnlocks");

		public static bool Unlocks_LoadUnlockData2(Unlocks __instance, bool secondTry, bool foundFile, object mySaveObject)
		{
			string saveSlotText = GameController.gameController.sessionDataBig.GetSaveSlotText();
			string text = "/CloudData/" + saveSlotText + "GameUnlocks.dat";
			if (secondTry)
			{
				text = "/BackupData/" + saveSlotText + "BackupGameUnlocks2.dat";
			}
			GameController.gameController.sessionDataBig.loadedUnlockData = true;
			if (foundFile)
			{
				try
				{
					UnlockSaveData unlockSaveData = null;
					if ((GameController.gameController.consoleVersion || GameController.gameController.usingUWP || mySaveObject != null) && !GameController.gameController.fakeConsole)
					{
						unlockSaveData = (UnlockSaveData)mySaveObject;
					}
					else
					{
						string str = Application.persistentDataPath;
						if (GameController.gameController.usingMyDocuments && !GameController.gameController.macVersion && !GameController.gameController.linuxVersion && !GameController.gameController.usingUWP)
						{
							str = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "/" + GameController.gameController.dataFolder;
						}
						BinaryFormatter binaryFormatter = new BinaryFormatter();
						using (FileStream fileStream = File.Open(str + text, FileMode.Open))
							unlockSaveData = (UnlockSaveData)binaryFormatter.Deserialize(fileStream);
					}
					__instance.tempUnlocks = unlockSaveData.unlocks;
					string currentVersion = unlockSaveData.currentVersion;
					if (currentVersion != GameController.gameController.version && (__instance.buildsToBeCleared.Contains(currentVersion) || currentVersion == null))
					{
						__instance.tempUnlocks.Clear();
					}
					if (currentVersion != null)
					{
						GameController.gameController.sessionDataBig.highScores = unlockSaveData.highScores;
						GameController.gameController.sessionDataBig.customCharacterSlots = unlockSaveData.customCharacterSlots;
						if (GameController.gameController.sessionDataBig.customCharacterSlots == null)
						{
							GameController.gameController.sessionDataBig.customCharacterSlots = new List<string>();
							GameController.gameController.sessionDataBig.customCharacterSlotsDetails = new List<SaveCharacterData>();
							for (int i = 0; i < 16; i++)
							{
								GameController.gameController.sessionDataBig.customCharacterSlots.Add("");
								GameController.gameController.sessionDataBig.customCharacterSlotsDetails.Add(new SaveCharacterData());
							}
						}
						else if (GameController.gameController.sessionDataBig.customCharacterSlots.Count == 8)
						{
							for (int j = 0; j < 8; j++)
							{
								GameController.gameController.sessionDataBig.customCharacterSlots.Add("");
								GameController.gameController.sessionDataBig.customCharacterSlotsDetails.Add(new SaveCharacterData());
							}
						}
						GameController.gameController.sessionDataBig.storedItem = unlockSaveData.storedItem;
						GameController.gameController.sessionDataBig.storedItem2 = unlockSaveData.storedItem2;
						GameController.gameController.sessionDataBig.storedItem3 = unlockSaveData.storedItem3;
						GameController.gameController.sessionDataBig.storedItem4 = unlockSaveData.storedItem4;
						GameController.gameController.sessionDataBig.storedItem5 = unlockSaveData.storedItem5;
						GameController.gameController.sessionDataBig.totalDeaths = unlockSaveData.totalDeaths;
						GameController.gameController.sessionDataBig.totalWins = unlockSaveData.totalWins;
						GameController.gameController.sessionDataBig.totalGamesPlayed = unlockSaveData.totalGamesPlayed;
						GameController.gameController.sessionDataBig.nuggets = unlockSaveData.nuggets;
						GameController.gameController.sessionDataBig.lastDailyRun = unlockSaveData.lastDailyRun;
						GameController.gameController.sessionDataBig.finishedTutorial = GameController.gameController.specialShowVersion || unlockSaveData.finishedTutorial;
						GameController.gameController.sessionDataBig.viewedReadThis = unlockSaveData.viewedReadThis;
						try
						{
							for (int k = 0; k < unlockSaveData.loadoutList.Length; k++)
							{
								GameController.gameController.sessionDataBig.loadoutList[k] = new List<Unlock>();
								if (unlockSaveData.loadoutList[k] != null)
								{
									for (int l = 0; l < unlockSaveData.loadoutList[k].Count; l++)
									{
										Unlock item = unlockSaveData.loadoutList[k][l];
										GameController.gameController.sessionDataBig.loadoutList[k].Add(item);
									}
								}
							}
						}
						catch (Exception e)
						{
							Debug.LogError("LoadoutList Load Error");
							Debug.LogError(e);
						}
						if (GameController.gameController.consoleVersion)
						{
							try
							{
								for (int m = 0; m < unlockSaveData.rewardConfigConsoleList.Length; m++)
								{
									GameController.gameController.sessionDataBig.rewardConfigConsoleList[m] = new List<string>();
									if (unlockSaveData.rewardConfigConsoleList[m] != null)
										for (int n = 0; n < unlockSaveData.rewardConfigConsoleList[m].Count; n++)
										{
											string item2 = unlockSaveData.rewardConfigConsoleList[m][n];
											GameController.gameController.sessionDataBig.rewardConfigConsoleList[m].Add(item2);
										}
								}
								for (int num = 0; num < unlockSaveData.traitConfigConsoleList.Length; num++)
								{
									GameController.gameController.sessionDataBig.traitConfigConsoleList[num] = new List<string>();
									if (unlockSaveData.traitConfigConsoleList[num] != null)
										for (int num2 = 0; num2 < unlockSaveData.traitConfigConsoleList[num].Count; num2++)
										{
											string item3 = unlockSaveData.traitConfigConsoleList[num][num2];
											GameController.gameController.sessionDataBig.traitConfigConsoleList[num].Add(item3);
										}
								}
								for (int num3 = 0; num3 < unlockSaveData.mutatorConfigConsoleList.Length; num3++)
								{
									GameController.gameController.sessionDataBig.mutatorConfigConsoleList[num3] = new List<string>();
									if (unlockSaveData.mutatorConfigConsoleList[num3] != null)
										for (int num4 = 0; num4 < unlockSaveData.mutatorConfigConsoleList[num3].Count; num4++)
										{
											string item4 = unlockSaveData.mutatorConfigConsoleList[num3][num4];
											GameController.gameController.sessionDataBig.mutatorConfigConsoleList[num3].Add(item4);
										}
								}
							}
							catch (Exception e)
							{
								Debug.LogError("ConfigList Load Error");
								Debug.LogError(e);
							}
						}
					}
					__instance.LoadInitialUnlocks();
					if (currentVersion != GameController.gameController.version)
						__instance.SaveUnlockData();
					return false;
				}
				catch (Exception e)
				{
					if (!secondTry && !GameController.gameController.usingUWP && (!GameController.gameController.consoleVersion || GameController.gameController.fakeConsole))
					{
						Debug.LogError("Failed to Load GameUnlocks, Trying Backup");
						Debug.LogError(e);
						__instance.CopyToCorrupted(text, "GameUnlocks.dat", saveSlotText);
						__instance.LoadUnlockData(true);
					}
					else
					{
						Debug.LogError("Couldn't load unlock data!");
						Debug.LogError(e);
						__instance.CopyToCorrupted(text, "BackupGameUnlocks2.dat", saveSlotText);
						__instance.LoadInitialUnlocks();
					}
					return false;
				}
			}
			if (!secondTry && !GameController.gameController.usingUWP && (!GameController.gameController.consoleVersion || GameController.gameController.fakeConsole))
			{
				Debug.Log("Failed to Load GameUnlocks (File Not Found), Trying Backup");
				__instance.LoadUnlockData(true);
				return false;
			}
			try
			{
				UnlockSaveData unlockSaveData2 = new UnlockSaveData();
				__instance.LoadInitialUnlocks();
				unlockSaveData2.unlocks = GameController.gameController.sessionDataBig.unlocks;
				unlockSaveData2.highScores = GameController.gameController.sessionDataBig.highScores;
				unlockSaveData2.customCharacterSlots = GameController.gameController.sessionDataBig.customCharacterSlots;
				unlockSaveData2.storedItem = GameController.gameController.sessionDataBig.storedItem;
				unlockSaveData2.storedItem2 = GameController.gameController.sessionDataBig.storedItem2;
				unlockSaveData2.storedItem3 = GameController.gameController.sessionDataBig.storedItem3;
				unlockSaveData2.storedItem4 = GameController.gameController.sessionDataBig.storedItem4;
				unlockSaveData2.storedItem5 = GameController.gameController.sessionDataBig.storedItem5;
				unlockSaveData2.totalDeaths = GameController.gameController.sessionDataBig.totalDeaths;
				unlockSaveData2.totalWins = GameController.gameController.sessionDataBig.totalWins;
				unlockSaveData2.totalGamesPlayed = GameController.gameController.sessionDataBig.totalGamesPlayed;
				unlockSaveData2.nuggets = GameController.gameController.sessionDataBig.nuggets;
				unlockSaveData2.lastDailyRun = GameController.gameController.sessionDataBig.lastDailyRun;
				unlockSaveData2.finishedTutorial = GameController.gameController.sessionDataBig.finishedTutorial;
				unlockSaveData2.viewedReadThis = GameController.gameController.sessionDataBig.viewedReadThis;
				unlockSaveData2.currentVersion = GameController.gameController.version;
				try
				{
					unlockSaveData2.loadoutList = new List<Unlock>[30];
					for (int num5 = 0; num5 < GameController.gameController.sessionDataBig.loadoutList.Length; num5++)
					{
						unlockSaveData2.loadoutList[num5] = new List<Unlock>();
						if (GameController.gameController.sessionDataBig.loadoutList[num5] != null)
							for (int num6 = 0; num6 < GameController.gameController.sessionDataBig.loadoutList[num5].Count; num6++)
							{
								Unlock item5 = GameController.gameController.sessionDataBig.loadoutList[num5][num6];
								unlockSaveData2.loadoutList[num5].Add(item5);
							}
					}
				}
				catch (Exception e)
				{
					Debug.LogError("LoadoutList Save Error 2");
					Debug.LogError(e);
				}
				if (GameController.gameController.consoleVersion)
				{
					try
					{
						unlockSaveData2.rewardConfigConsoleList = new List<string>[10];
						for (int num7 = 0; num7 < GameController.gameController.sessionDataBig.rewardConfigConsoleList.Length; num7++)
						{
							unlockSaveData2.rewardConfigConsoleList[num7] = new List<string>();
							if (GameController.gameController.sessionDataBig.rewardConfigConsoleList[num7] != null)
								for (int num8 = 0; num8 < GameController.gameController.sessionDataBig.rewardConfigConsoleList[num7].Count; num8++)
								{
									string item6 = GameController.gameController.sessionDataBig.rewardConfigConsoleList[num7][num8];
									unlockSaveData2.rewardConfigConsoleList[num7].Add(item6);
								}
						}
						unlockSaveData2.traitConfigConsoleList = new List<string>[10];
						for (int num9 = 0; num9 < GameController.gameController.sessionDataBig.traitConfigConsoleList.Length; num9++)
						{
							unlockSaveData2.traitConfigConsoleList[num9] = new List<string>();
							if (GameController.gameController.sessionDataBig.traitConfigConsoleList[num9] != null)
								for (int num10 = 0; num10 < GameController.gameController.sessionDataBig.traitConfigConsoleList[num9].Count; num10++)
								{
									string item7 = GameController.gameController.sessionDataBig.traitConfigConsoleList[num9][num10];
									unlockSaveData2.traitConfigConsoleList[num9].Add(item7);
								}
						}
						unlockSaveData2.mutatorConfigConsoleList = new List<string>[10];
						for (int num11 = 0; num11 < GameController.gameController.sessionDataBig.mutatorConfigConsoleList.Length; num11++)
						{
							unlockSaveData2.mutatorConfigConsoleList[num11] = new List<string>();
							if (GameController.gameController.sessionDataBig.mutatorConfigConsoleList[num11] != null)
								for (int num12 = 0; num12 < GameController.gameController.sessionDataBig.mutatorConfigConsoleList[num11].Count; num12++)
								{
									string item8 = GameController.gameController.sessionDataBig.mutatorConfigConsoleList[num11][num12];
									unlockSaveData2.mutatorConfigConsoleList[num11].Add(item8);
								}
						}
					}
					catch (Exception e)
					{
						Debug.LogError("ConfigList Save Error 2");
						Debug.LogError(e);
					}
				}
				if (GameController.gameController.consoleVersion && !GameController.gameController.fakeConsole)
					GameController.gameController.consoleFunctions.SaveData(unlockSaveData2, saveSlotText + "GameUnlocks");
				else if (GameController.gameController.usingUWP)
					GameController.gameController.uwpFunctions.SaveData(unlockSaveData2, saveSlotText + "GameUnlocks");
				else
				{
					string str2 = Application.persistentDataPath;
					if (GameController.gameController.usingMyDocuments && !GameController.gameController.macVersion && !GameController.gameController.linuxVersion && !GameController.gameController.usingUWP)
						str2 = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "/" + GameController.gameController.dataFolder;
					BinaryFormatter binaryFormatter2 = new BinaryFormatter();

					using (FileStream fileStream2 = File.Create(str2 + "/CloudData/" + saveSlotText + "GameUnlocks.dat"))
						binaryFormatter2.Serialize(fileStream2, unlockSaveData2);

					if (GameController.gameController.usingGDK)
						GameController.gameController.gdkFunctions.SaveData(unlockSaveData2, saveSlotText + "GameUnlocks", binaryFormatter2);
				}
				__instance.LoadUnlockData(false);
			}
			catch (Exception e)
			{
				Debug.LogError("Couldn't load unlock data!");
				Debug.LogError(e);
				__instance.LoadInitialUnlocks();
			}
			return false;
		}
	}
	/// <summary>
	///   <para>Provides extension methods for the <see cref="Unlocks"/> class.</para>
	/// </summary>
	public static class UnlocksExtensions
	{
		/// <summary>
		///   <para>Determines whether the unlocks should be unlockable anyway.</para>
		/// </summary>
		public static bool AllowUnlocksAnyway { get; set; }
		/// <summary>
		///   <para>Forcefully unlocks an unlock with the specified <paramref name="unlockName"/> and <paramref name="unlockType"/>.</para>
		/// </summary>
		/// <param name="unlocks">The current unlocks.</param>
		/// <param name="unlockName">The name of the unlock to unlock.</param>
		/// <param name="unlockType">The type of the unlock to unlock.</param>
		/// <exception cref="ArgumentNullException"><paramref name="unlocks"/> is <see langword="null"/>.</exception>
		public static void DoUnlockForced(this Unlocks unlocks, string unlockName, string unlockType)
		{
			if (unlocks is null) throw new ArgumentNullException(nameof(unlocks));
			if (RogueFramework.IsDebugEnabled(DebugFlags.Unlocks))
				RogueFramework.LogDebug($"Force-unlocking \"{unlockName}\" ({unlockType})");

			bool prev = AllowUnlocksAnyway;
			AllowUnlocksAnyway = true;
			unlocks.DoUnlock(unlockName, unlockType);
			AllowUnlocksAnyway = prev;
		}
	}
}
