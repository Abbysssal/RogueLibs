﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;
using HarmonyLib;

namespace RogueLibsCore
{
	/// <summary>
	///   <para>Represents a trait unlock.</para>
	/// </summary>
	public class TraitUnlock : DisplayedUnlock, IUnlockInCC
	{
		/// <summary>
		///   <para>Initializes a new instance of the <see cref="TraitUnlock"/> class without a name.</para>
		/// </summary>
		public TraitUnlock() : this(null, false) { }
		/// <summary>
		///   <para>Initializes a new instance of the <see cref="TraitUnlock"/> class without a name.</para>
		/// </summary>
		/// <param name="unlockedFromStart">Determines whether the unlock is unlocked by default.</param>
		public TraitUnlock(bool unlockedFromStart) : this(null, unlockedFromStart) { }
		/// <summary>
		///   <para>Initializes a new instance of the <see cref="TraitUnlock"/> class with the specified <paramref name="name"/>.</para>
		/// </summary>
		/// <param name="name">The unlock's and trait's name.</param>
		public TraitUnlock(string name) : this(name, false) { }
		/// <summary>
		///   <para>Initializes a new instance of the <see cref="TraitUnlock"/> class with the specified <paramref name="name"/>.</para>
		/// </summary>
		/// <param name="name">The unlock's and trait's name.</param>
		/// <param name="unlockedFromStart">Determines whether the unlock is unlocked by default.</param>
		public TraitUnlock(string name, bool unlockedFromStart) : base(name, "Trait", unlockedFromStart) => IsAvailableInCC = true;
		internal TraitUnlock(Unlock unlock) : base(unlock) { }

		/// <inheritdoc/>
		public override bool IsEnabled
		{
			get => !Unlock.notActive;
			set => Unlock.notActive = !value;
		}
		/// <inheritdoc/>
		public bool IsAddedToCC
		{
			get => ((CustomCharacterCreation)Menu).CC.traitsChosen.Contains(Unlock);
			set
			{
				List<Unlock> list = ((CustomCharacterCreation)Menu).CC.traitsChosen;
				bool cur = list.Contains(Unlock);
				if (cur && !value) list.Remove(Unlock);
				else if (!cur && value) list.Add(Unlock);
			}
		}

		/// <inheritdoc/>
		public override bool IsAvailable
		{
			get => !Unlock.unavailable;
			set
			{
				Unlock.unavailable = !value;
				bool? cur = gc?.sessionDataBig?.traitUnlocks?.Contains(Unlock);
				if (cur == true && !value) { gc.sessionDataBig.traitUnlocks.Remove(Unlock); Unlock.traitCount--; }
				else if (cur == false && value) { gc.sessionDataBig.traitUnlocks.Add(Unlock); Unlock.traitCount++; }
			}
		}
		/// <inheritdoc/>
		public bool IsAvailableInCC
		{
			get => Unlock.onlyInCharacterCreation;
			set
			{
				Unlock.onlyInCharacterCreation = value;
				bool? cur = gc?.sessionDataBig?.traitUnlocksCharacterCreation?.Contains(Unlock);
				if (cur == true && !value) { gc.sessionDataBig.traitUnlocksCharacterCreation.Remove(Unlock); Unlock.traitCountCharacterCreation--; }
				else if (cur == false && value) { gc.sessionDataBig.traitUnlocksCharacterCreation.Add(Unlock); Unlock.traitCountCharacterCreation++; }
			}
		}

		/// <summary>
		///   <para>Gets the trait's upgrade cost, in money.</para>
		/// </summary>
		/// <returns>The trait's upgrade cost, in money.</returns>
		public virtual int GetUpgradeCost() => Mathf.Abs((gc.unlocks.GetUnlock(Unlock.upgrade, "Trait")?.cost3 ?? CharacterCreationCost) * ((CustomScrollingMenu)Menu).Menu.upgradeTraitAdjust);
		/// <summary>
		///   <para>Gets the trait's removal cost, in money.</para>
		/// </summary>
		/// <returns>The trait's removal cost, in money.</returns>
		public virtual int GetRemovalCost() => Mathf.Abs(CharacterCreationCost * ((CustomScrollingMenu)Menu).Menu.removeTraitAdjust);
		/// <summary>
		///   <para>Gets the trait's swap cost, in money.</para>
		/// </summary>
		/// <returns>The trait's swap cost, in money.</returns>
		public virtual int GetSwapCost() => Mathf.Abs(CharacterCreationCost * (CharacterCreationCost < 0 ? ((CustomScrollingMenu)Menu).Menu.changeTraitRandomAdjustNegativeTrait : ((CustomScrollingMenu)Menu).Menu.changeTraitRandomAdjustPositiveTrait));

		/// <inheritdoc/>
		public override void UpdateButton()
		{
			if (Menu.Type == UnlocksMenuType.TraitsMenu)
				UpdateButton(IsEnabled, UnlockButtonState.Normal, UnlockButtonState.Disabled);
			else if (Menu.Type == UnlocksMenuType.CharacterCreation)
				UpdateButton(IsAddedToCC);
			else if (Menu.Type == UnlocksMenuType.NewLevelTraits)
				UpdateButton(false);
			else if (Menu.Type == UnlocksMenuType.AB_UpgradeTrait)
				Text = $"{GetName()} | ${GetUpgradeCost()}";
			else if (Menu.Type == UnlocksMenuType.AB_RemoveTrait)
				Text = $"{GetName()} | ${GetRemovalCost()}";
			else if (Menu.Type == UnlocksMenuType.AB_SwapTrait)
				Text = $"{GetName()} | ${GetSwapCost()}";
		}
		/// <inheritdoc/>
		public override void OnPushedButton()
		{
			if (IsUnlocked)
			{
				if (Menu.Type == UnlocksMenuType.TraitsMenu)
				{
					ScrollingMenu menu = ((CustomScrollingMenu)Menu).Menu;
					if (IsEnabled && menu.activeTraitCount <= menu.minTraits)
					{
						PlaySound("CantDo");
						menu.ActiveCountFlash();
					}
					else
					{
						PlaySound("ClickButton");
						IsEnabled = !IsEnabled;
						gc.unlocks.SaveUnlockData(true);
						UpdateButton();
						UpdateMenu();
					}
				}
				else if (Menu.Type == UnlocksMenuType.CharacterCreation)
				{
					PlaySound("ClickButton");
					if (IsAddedToCC = !IsAddedToCC)
						foreach (DisplayedUnlock du in EnumerateCancellations())
							((IUnlockInCC)du).IsAddedToCC = false;
					UpdateButton();
					UpdateMenu();
				}
				else if (Menu.Type == UnlocksMenuType.NewLevelTraits)
				{
					ScrollingMenu menu = ((CustomScrollingMenu)Menu).Menu;
					if (menu.twitchCountdownOn) return;
					State = UnlockButtonState.Selected;
					UpdateMenu();
					if (gc.twitchMode || gc.sessionDataBig.twitchOn && gc.sessionDataBig.twitchTraits)
						gc.twitchFunctions.ShowWinner(Name, "StatusEffect", Menu.Agent.isPlayer);
					if (Name == "EnduranceTrait")
					{
						Menu.Agent.SetEndurance(Menu.Agent.enduranceStatMod + 1, true);
						if (!Menu.Agent.finishedLevel)
							gc.spawnerMain.SpawnStatusText(Menu.Agent, "BuffSpecial", "Endurance", "BuffSpecial", "");
					}
					else if (Name == "SpeedTrait")
					{
						Menu.Agent.SetSpeed(Menu.Agent.speedStatMod + 1, true);
						if (!Menu.Agent.finishedLevel)
							gc.spawnerMain.SpawnStatusText(Menu.Agent, "BuffSpecial", "Speed", "BuffSpecial", "");
					}
					else if (Name == "StrengthTrait")
					{
						Menu.Agent.SetStrength(Menu.Agent.strengthStatMod + 1, true);
						if (!Menu.Agent.finishedLevel)
							gc.spawnerMain.SpawnStatusText(Menu.Agent, "BuffSpecial", "Strength", "BuffSpecial", "");
					}
					else if (Name == "AccuracyTrait")
					{
						Menu.Agent.SetAccuracy(Menu.Agent.accuracyStatMod + 1, true);
						if (!Menu.Agent.finishedLevel)
							gc.spawnerMain.SpawnStatusText(Menu.Agent, "BuffSpecial", "Accuracy", "BuffSpecial", "");
					}
					else
					{
						Menu.Agent.statusEffects.AddTrait(Name);
					}
					Menu.Agent.addedEndLevelTrait = true;
					Menu.Agent.skillPoints.levelsGained--;
					gc.sessionData.levelsGained[Menu.Agent.isPlayer]--;
					PlaySound("AddTrait");
					Menu.Agent.objectMult.SendChatAnnouncement("ChoseTrait", Name, "");
					menu.canPressButtons = false;
					if (Menu.Agent.skillPoints.levelsGained is 0)
					{
						if (gc.fourPlayerMode || gc.coopMode)
						{
							menu.StartCoroutine((IEnumerator)typeof(ScrollingMenu).GetMethod("PersonalMenuDelay").Invoke(menu, new object[0]));
						}
						else if (gc.levelFeelingsScript.DoesNextLevelHaveFeeling(false) && (gc.sessionDataBig.twitchOn || gc.twitchMode) && (gc.sessionDataBig.twitchLevelFeelings || gc.twitchMode) && (gc.sessionData.nextLevelFeeling?.Length is 0 || gc.sessionData.nextLevelFeeling is null) && !gc.challenges.Contains("NoLevelFeelings") && !gc.levelFeelingsScript.CanceledAllLevelFeelings() && gc.serverPlayer && gc.levelFeelingsScript.GetLevelFeeling() != "")
						{
							menu.StartCoroutine((IEnumerator)typeof(ScrollingMenu).GetMethod("ShowMenuDelay").Invoke(menu, new object[2] { "LevelFeelings", Menu.Agent }));
						}
						else
						{
							menu.StartCoroutine(menu.NextLevelDelay());
						}
					}
					else
					{
						foreach (ButtonData buttonData4 in menu.buttonsData)
							buttonData4.isActive = false;
						menu.Invoke("OpenScrollingMenu", 0.1f);
					}
				}
				else if (Menu.Type == UnlocksMenuType.AB_UpgradeTrait)
				{
					if (Menu.Agent.interactionHelper.interactionObjectReal.moneySuccess(GetUpgradeCost()))
					{
						Menu.Agent.usingAugmentationBooth = true;
						Menu.Agent.statusEffects.AddTrait(Unlock.upgrade);
						PlaySound("AddTrait");
						Menu.Agent.mainGUI.HideScrollingMenuPersonal();
						Menu.Agent.usingAugmentationBooth = false;
					}
					else PlaySound("CantDo");
				}
				else if (Menu.Type == UnlocksMenuType.AB_RemoveTrait)
				{
					if (Menu.Agent.interactionHelper.interactionObjectReal.moneySuccess(GetRemovalCost()))
					{
						Menu.Agent.usingAugmentationBooth = true;
						Menu.Agent.statusEffects.RemoveTrait(Name);
						Menu.Agent.mainGUI.HideScrollingMenuPersonal();
						Menu.Agent.usingAugmentationBooth = false;
					}
					else PlaySound("CantDo");
				}
				else if (Menu.Type == UnlocksMenuType.AB_SwapTrait)
				{
					ScrollingMenu menu = ((CustomScrollingMenu)Menu).Menu;
					List<Unlock> list = Unlock.isUpgrade
						? gc.sessionDataBig.unlocks.FindAll(u => u.isUpgrade && Unlock.isUpgrade && !Menu.Agent.statusEffects.hasTrait(u.unlockName) && !u.cantSwap && !u.removal && u.specialAbilities.All(ab => Menu.Agent.statusEffects.hasSpecialAbility(ab)))
						: CharacterCreationCost < 0
                            ? gc.sessionDataBig.traitUnlocksCharacterCreation.FindAll(u => u.cost3 == CharacterCreationCost && menu.TraitOK(u) && menu.HasNoCancellations(u) && !u.cantSwap && !u.removal && u.specialAbilities.All(ab => Menu.Agent.statusEffects.hasSpecialAbility(ab)) && u.recommendations.Count is 0)
                            : gc.sessionDataBig.traitUnlocks.FindAll(u => u.cost3 == CharacterCreationCost && menu.TraitOK(u) && menu.HasNoCancellations(u) && !u.cantSwap && !u.removal && u.specialAbilities.All(ab => Menu.Agent.statusEffects.hasSpecialAbility(ab)));
					if (list.Count is 0)
					{
						Menu.Agent.SayDialogue("CantChangeTraitRandomEquivalent");
						PlaySound("CantDo");
					}
					else if (Menu.Agent.interactionHelper.interactionObjectReal.moneySuccess(GetSwapCost()))
					{
						Menu.Agent.usingAugmentationBooth = true;
						Unlock unlock6 = list[UnityEngine.Random.Range(0, list.Count)];
						Menu.Agent.statusEffects.RemoveTrait(Name);
						Menu.Agent.statusEffects.AddTrait(unlock6.unlockName);
						PlaySound("AddTrait");
						Menu.Agent.mainGUI.HideScrollingMenuPersonal();
						Menu.Agent.usingAugmentationBooth = false;
					}
					else PlaySound("CantDo");
				}
			}
			else if (Unlock.nowAvailable && UnlockCost <= gc.sessionDataBig.nuggets)
			{
				PlaySound("BuyUnlock");
				gc.unlocks.SubtractNuggets(UnlockCost);
				gc.unlocks.DoUnlockForced(Name, Type);
				UpdateAllUnlocks();
				UpdateMenu();
			}
			else PlaySound("CantDo");
		}
	}
}
