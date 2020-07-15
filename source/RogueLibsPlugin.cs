﻿using BepInEx;
using BepInEx.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UI;

namespace RogueLibsCore
{
#pragma warning disable CS1591
	[BepInPlugin(RogueLibs.pluginGuid, RogueLibs.pluginName, RogueLibs.pluginVersion)]
	public class RogueLibsPlugin : BaseUnityPlugin
	{
		protected static ManualLogSource MyLogger;

		protected void Awake()
		{
			Logger.LogInfo("RogueLibs starting...");
			RogueLibs.PluginInstance = this;
			RogueLibs.Instance = new RogueLibs
			{
				Logger = Logger
			};
			MyLogger = Logger;
			string dataPath = Path.Combine(Paths.ConfigPath, "RogueLibs2.xml");
			RogueLibs.Instance.Start(dataPath);

			if (File.Exists(Path.Combine(Paths.ConfigPath, "RogueLibs.xml")))
				File.Delete(Path.Combine(Paths.ConfigPath, "RogueLibs.xml"));

			MakePatches();
			Logger.LogInfo("RogueLibs loaded.");
		}
		protected void MakePatches()
		{
			RoguePatcher patcher = new RoguePatcher(this, GetType());

			patcher.Postfix(typeof(ScrollingMenu), "MakeButtonsVisible");

			patcher.Postfix(typeof(NameDB), "GetName");
			patcher.Postfix(typeof(ScrollingMenu), "SortUnlocks");
			patcher.Postfix(typeof(ScrollingMenu), "PushedButton");

			patcher.Prefix(typeof(ObjectMult), "ShowChatCommand");

			patcher.Postfix(typeof(InvItem), "SetupDetails");
			patcher.Postfix(typeof(InvItem), "LoadItemSprite");
			patcher.Postfix(typeof(ItemFunctions), "UseItem");
			patcher.Postfix(typeof(ItemFunctions), "TargetObject");
			patcher.Postfix(typeof(ItemFunctions), "CombineItems");

			patcher.Postfix(typeof(GameResources), "SetupDics");
			patcher.Postfix(typeof(RandomSelection), "LoadRandomness");

			patcher.Postfix(typeof(InvSlot), "SetColor");
		}

		protected static IEnumerator ScrollingMenu_MakeButtonsVisible(IEnumerator __result, ScrollingMenu __instance)
		{
			float initValue = __instance.scrollBar.value;
			if (initValue == 0)
				initValue = 1f;
			while (__result.MoveNext())
			{
				__instance.scrollBar.value = initValue;
				object cur = __result.Current;
				__instance.scrollBar.value = initValue;
				yield return cur;
				__instance.scrollBar.value = initValue;
			}
			__instance.scrollBar.value = initValue;
		}
		protected static void NameDB_GetName(NameDB __instance, string myName, string type, ref string __result)
		{
			foreach (CustomName name in RogueLibs.Instance.Names)
				if (name.Id == myName && (name.Type == null || type == null || name.Type == type))
				{
					int index = Array.IndexOf(RogueLibs.languages, __instance.language);
					if (index == -1) index++;
					__result = name.Translations[index] ?? name.Translations[0];
					return;
				}
		}
		protected static void ScrollingMenu_SortUnlocks(ScrollingMenu __instance, string unlockType, List<Unlock> ___listUnlocks)
		{
			if (unlockType != "Challenge") return;
			List<Unlock> customMutators = new List<Unlock>();

			foreach (CustomMutator mutator in RogueLibs.Instance.Mutators)
			{
				if (!mutator.ShowInMenu) continue;
				Unlock unlock = new Unlock(mutator.Id, "Challenge", mutator.Unlocked)
				{
					cancellations = new List<string>(mutator.Conflicting)
				};
				customMutators.Add(unlock);

			}
			//customMutators.Sort();
			___listUnlocks.InsertRange(1, customMutators);
			__instance.numButtons += customMutators.Count;
		}
		protected static void ScrollingMenu_PushedButton(ScrollingMenu __instance, ButtonHelper myButton)
		{
			if (__instance.menuType != "Challenges") return;
			if (!myButton.scrollingButtonUnlock.unlocked || !__instance.gc.serverPlayer) return;
			if (myButton.scrollingButtonType == "ClearAll" || myButton.scrollingButtonType == "CreateAMutator") return;

			if (myButton.scrollingHighlighted)
			{
				foreach (CustomMutator mutator in RogueLibs.Instance.Mutators)
				{
					if (Array.IndexOf(mutator.Conflicting, myButton.scrollingButtonType) != -1)
					{
						foreach (ButtonData buttonData in __instance.buttonsData)
						{
							if (buttonData.scrollingButtonType == mutator.Id)
							{
								if (buttonData.scrollingHighlighted)
									mutator.TriggerStateChange(false);

								buttonData.scrollingHighlighted = false;
								buttonData.highlightedSprite = __instance.solidObjectButton;
								__instance.gc.challenges.Remove(buttonData.scrollingButtonType);
								__instance.gc.originalChallenges.Remove(buttonData.scrollingButtonType);
							}
						}
					}
				}
				int index = RogueLibs.Instance.Mutators.FindIndex(m => m.Id == myButton.scrollingButtonType);
				if (index != -1)
					RogueLibs.Instance.Mutators[index].TriggerStateChange(true);

				__instance.gc.SetDailyRunText();
				__instance.UpdateOtherVisibleMenus(__instance.menuType);
			}
			else
			{
				int index = RogueLibs.Instance.Mutators.FindIndex(m => m.Id == myButton.scrollingButtonType);
				if (index != -1)
					RogueLibs.Instance.Mutators[index].TriggerStateChange(false);

				__instance.gc.SetDailyRunText();
				__instance.UpdateOtherVisibleMenus(__instance.menuType);
			}

		}

		protected static void ObjectMult_ShowChatCommand(string myMessage)
		{
			RogueChat.InvokeCommand(myMessage);
			MyLogger.LogInfo("Chat: " + myMessage);
		}

		protected static void InvItem_SetupDetails(InvItem __instance)
		{
			CustomItem item = RogueLibs.Instance.Items.Find(i => i.Id == __instance.invItemName);
			if (item == null) return;
			item.SetupDetails?.Invoke(__instance);
			__instance.LoadItemSprite(item.Id);
		}
		protected static void InvItem_LoadItemSprite(InvItem __instance)
		{
			CustomItem item = RogueLibs.Instance.Items.Find(i => i.Id == __instance.invItemName);
			if (item == null) return;
			if (__instance.itemIcon == null)
				__instance.itemIcon = item.Sprite;
		}
		protected static void ItemFunctions_UseItem(InvItem item, Agent agent)
		{
			CustomItem citem = RogueLibs.Instance.Items.Find(i => i.Id == item.invItemName);
			if (citem == null) return;
			if (citem.TargetFilter != null || citem.TargetObject != null)
				item.invInterface.ShowOrHideTarget(item);
			else
				citem.UseItem?.Invoke(item, agent);
		}
		protected static void ItemFunctions_TargetObject(InvItem item, Agent agent, PlayfieldObject otherObject, string combineType, ref bool __result)
		{
			CustomItem citem = RogueLibs.Instance.Items.Find(i => i.Id == item.invItemName);
			if (citem?.TargetObject == null) return;

			if (citem.TargetFilter == null || citem.TargetFilter(item, agent, otherObject))
			{
				if (combineType == "Combine")
					citem.TargetObject(item, agent, otherObject);
				__result = true;
			}
		}
		protected static void ItemFunctions_CombineItems(InvItem item, Agent agent, InvItem otherItem, int slotNum, string combineType, ref bool __result)
		{
			CustomItem citem = RogueLibs.Instance.Items.Find(i => i.Id == item.invItemName);
			if (citem?.CombineItem == null) return;

			if (citem.CombineFilter == null || citem.CombineFilter(item, agent, otherItem))
			{
				if (combineType == "Combine")
					citem.CombineItem(item, agent, otherItem, slotNum);
				__result = true;
			}
		}

		protected static void GameResources_SetupDics(GameResources __instance)
		{
			foreach (CustomItem item in RogueLibs.Instance.Items)
			{
				__instance.itemDic.Add(item.Id, item.Sprite);
				__instance.itemList.Add(item.Sprite);
			}
		}
		protected static void RandomSelection_LoadRandomness(RandomSelection __instance)
		{
			foreach (RandomListInfo info in RogueLibs.Instance.RandomLists)
				__instance.CreateRandomList(info.name, info.category, info.objectType);
			foreach (CustomItem item in RogueLibs.Instance.Items)
				foreach (KeyValuePair<string, int> pair in item.SpawnDictionary)
				{
					RandomList list = null;
					foreach (RandomList l in __instance.randomListTable.Values)
						if (l.rName == pair.Key)
						{
							list = l;
							break;
						}
					if (list != null) __instance.CreateRandomElement(list, item.Id, pair.Value);
				}
		}

		protected static void InvSlot_SetColor(InvSlot __instance, Text ___itemText)
		{
			/*
			__instance.toolbarNumTextGo.SetActive(false);
			__instance.toolbarNumText.text = "";

			InvItem item = __instance.database.invInterface.draggedInvItem ?? __instance.database.invInterface.mainGUI.targetItem;
			if (item == null) return;
			CustomItem cItem = RogueLibs.Instance.Items.Find(i => i.Id == item.invItemName);
			if (cItem == null) return;
			if (cItem.CombineFilter == null || cItem.Highlighter == null) return;

			InvItem otherItem = __instance.item;
			if (otherItem.invItemName == null) return;
			if (!cItem.CombineFilter(item, item.agent, otherItem)) return;

			string result = cItem.Highlighter(item, item.agent, otherItem);
			if (result == string.Empty) result = string.Empty;

			__instance.toolbarNumTextGo.SetActive(true);
			__instance.toolbarNumText.text = result;
			*/
			__instance.toolbarNumTextGo.SetActive(false);
			InvItem targetItem = __instance.mainGUI.targetItem ?? __instance.database.invInterface.draggedInvItem;
			if (targetItem == null) return;
			InvItem thisItem = __instance.curItemList[__instance.slotNumber];

			CustomItem cItem = RogueLibs.Instance.Items.Find(i => i.Id == targetItem.invItemName);
			if (cItem == null || cItem.CombineFilter == null || cItem.CombineItem == null || cItem.CombineTooltip == null) return;

			if (targetItem != null && (__instance.slotType == "Player" || __instance.slotType == "Toolbar" || __instance.slotType == "Chest" || __instance.slotType == "NPCChest"))
			{
				if (thisItem.invItemName != null && targetItem.itemType == "Combine")
				{
					if (targetItem.CombineItems(thisItem, __instance.slotNumber, string.Empty, __instance.agent) && __instance.slotType != "NPCChest")
					{
						__instance.myImage.color = new Color32(0, __instance.br, __instance.br, __instance.standardAlpha);
						__instance.itemImage.color = new Color32(byte.MaxValue, byte.MaxValue, byte.MaxValue, byte.MaxValue);
						__instance.myImage.sprite = __instance.invBoxCanUse;

						if (__instance.slotType != "NPCChest" && __instance.slotType != "Chest")
						{
							string result = cItem.CombineTooltip(targetItem, targetItem.agent, thisItem) ?? string.Empty;
							__instance.toolbarNumTextGo.SetActive(result != string.Empty);
							__instance.toolbarNumText.text = result;
						}
					}
					else if ((!(__instance.slotType == "Toolbar") || __instance.mainGUI.openedInventory) && __instance.slotType != "NPCChest")
					{
						__instance.myImage.color = new Color32(__instance.br, 0, __instance.br, __instance.standardAlpha);
						__instance.itemImage.color = new Color32(byte.MaxValue, byte.MaxValue, byte.MaxValue, __instance.fadedItemAlpha);
						__instance.myImage.sprite = __instance.invBoxNormal;
						___itemText.color = __instance.whiteTransparent;
						__instance.toolbarNumTextGo.SetActive(false);
					}
				}
				else if (__instance.slotType != "NPCChest" && (thisItem.invItemName != null || targetItem.itemType != "Combine"))
				{
					__instance.myImage.color = __instance.overSlot
						? (Color)new Color32(0, __instance.br, __instance.br, __instance.standardAlpha)
						: (Color)new Color32(__instance.br, __instance.br, __instance.br, __instance.standardAlpha);

					__instance.itemImage.color = new Color32(byte.MaxValue, byte.MaxValue, byte.MaxValue, byte.MaxValue);
					__instance.myImage.sprite = __instance.invBoxNormal;
					if (__instance.slotType == "Toolbar")
						__instance.toolbarNumTextGo.SetActive(false);
				}
				if (__instance.mainGUI.curSelected == __instance.mySelectable && __instance.agent.controllerType != "Keyboard")
					__instance.invInterface.OnSelectionBox(__instance.slotType, __instance.tr.position);
			}
		}



	}
#pragma warning restore CS1591
}