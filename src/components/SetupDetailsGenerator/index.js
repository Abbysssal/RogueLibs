import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import styles from './index.module.css';

import SettingButton from './SettingButton';
import InventorySlot from './InventorySlot';
import Toolbar from './Toolbar';
import Dropdown from '../Dropdown';
import DropdownHeader from '../DropdownHeader';
import DropdownOption from '../DropdownOption';

export default function ({...props}) {
  const [itemSprite, setItemSprite] = useState(useBaseUrl(`/img/SetupDetailsGenerator/TestItem.png`));
  const [itemSpriteFileName, setItemSpriteFileName] = useState("TestItem.png");
  const spriteHandler = e => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setItemSprite(reader.result);
        setItemSpriteFileName(e.target.files[0].name);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [itemType, setItemType] = useState("Food");
  const [displayItemType, setDisplayItemType] = useState("Food");

  const [initCount, setInitCount] = useState(1);
  const [rewardCount, setRewardCount] = useState(null);
  const initCountHandler = e => {
    if (e.target.valueAsNumber > 99999) e.target.valueAsNumber = 99999;
    if (isNaN(e.target.valueAsNumber)) setInitCount(1);
    else setInitCount(e.target.valueAsNumber);
  };
  const rewardCountHandler = e => {
    if (e.target.valueAsNumber > 99999) e.target.valueAsNumber = 99999;
    if (isNaN(e.target.valueAsNumber)) setRewardCount(null);
    else setRewardCount(e.target.valueAsNumber);
  }

  const codeGen = () => {
    let ops = [];
    ops.push(`itemType = ItemTypes.${itemType};`);
    if (initCount != 1) ops.push(`initCount = ${initCount};`);
    if (rewardCount !== null && rewardCount != initCount)
      ops.push(`rewardCount = ${rewardCount};`);
    return ops.map(line => `    Item.${line}\n`).join('');
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.general}>
          <Dropdown onChange={(t, l) => { setItemType(t); setDisplayItemType(l); }}>
            <DropdownHeader>
              {"Item type: " + displayItemType}
            </DropdownHeader>
            <DropdownOption value="Food"/>
            <DropdownOption value="Combine" label="Combinable"/>
            <DropdownOption value="Tool"/>
            <DropdownOption value="WeaponMelee" label="Melee Weapon"/>
            <DropdownOption value="Consumable"/>
            <DropdownOption value="WeaponThrown" label="Thrown Weapon"/>
            <DropdownOption value="Wearable"/>
            <DropdownOption value="WeaponProjectile" label="Projectile Weapon"/>
          </Dropdown>
        </div>
        <div className={styles.uploadSprite}>
          <input type="file" accept="image/*"
            onChange={spriteHandler}/>
        </div>
        <div className={styles.downloadSprite}>
          <a href={itemSprite} download={itemSpriteFileName}>Download current image</a>
        </div>
        <div className={styles.inventoryPreview}>
          <div className={styles['inventoryPreview-zoom']}>
            <InventorySlot sprite={itemSprite} tooltip="1" count={initCount}/>
          </div>
          <div className={styles['inventoryPreview-view']}>
            <InventorySlot sprite={itemSprite} tooltip="1" count={initCount}/>
          </div>
          <div className={styles['inventoryPreview-settings']}>
            <input type="button" value="cfg"/>
            <input type="button" value="cfg"/>
            <input type="button" value="cfg"/>
            <input type="button" value="cfg"/>
          </div>
        </div>
        <div className={styles.counts}>
          <span>Initial count: </span>
          <input className={styles.numInput} type="number" min='0' max='99999' placeholder={initCount} onChange={initCountHandler}/>
          <span>Reward count: </span>
          <input className={styles.numInput} type="number" min='0' max='99999' placeholder={initCount} onChange={rewardCountHandler}/>
        </div>
      </div>
      <div>
        <Toolbar items={[
          {sprite: itemSprite, tooltip: '1', count: initCount},
          {sprite: itemSprite, tooltip: '2', count: rewardCount !== null ? rewardCount : initCount},
          {sprite: itemSprite, tooltip: '3'},
          {sprite: itemSprite, tooltip: '4'},
          {sprite: itemSprite, tooltip: '5'},
        ]}/>
      </div>
      <br/>
      <CodeBlock className="csharp">
        {"pubic override void SetupDetails()\n"}
        {"{\n"}
        {codeGen()}
        {"}"}
      </CodeBlock>
    </div>
  );
}