(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[338],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),f=o,p=d["".concat(u,".").concat(f)]||d[f]||m[f]||a;return n?r.createElement(p,i(i({ref:t},c),{},{components:n})):r.createElement(p,i({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3919:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,{b:function(){return r},Z:function(){return o}})},4996:function(e,t,n){"use strict";n.d(t,{C:function(){return a},Z:function(){return i}});var r=n(2263),o=n(3919);function a(){var e=(0,r.Z)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,a=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var a=void 0===r?{}:r,i=a.forcePrependBaseUrl,l=void 0!==i&&i,u=a.absolute,s=void 0!==u&&u;if(!n)return n;if(n.startsWith("#"))return n;if((0,o.b)(n))return n;if(l)return t+n;var c=n.startsWith(t)?n:t+n.replace(/^\//,"");return s?e+c:c}(a,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,a().withBaseUrl)(e,t)}},9443:function(e,t,n){"use strict";var r=(0,n(7294).createContext)(void 0);t.Z=r},9309:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(2122),o=n(9756),a=n(7294),i=["children"];function l(e){var t=e.children,n=(0,o.Z)(e,i);return a.createElement("div",(0,r.Z)({role:"tabpanel"},n),t)}},8952:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(7294),o=n(9443);var a=function(){var e=(0,r.useContext)(o.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},i=n(6010),l="tabItem_2O3c",u="tabItemActive_Fpbe",s="tab_1pgU";var c=37,m=39;var d=function(e){var t=e.lazy,n=e.block,o=e.defaultValue,d=e.values,f=e.groupId,p=e.className,g=a(),h=g.tabGroupChoices,v=g.setTabGroupChoices,b=(0,r.useState)(o),y=b[0],w=b[1],I=r.Children.toArray(e.children),C=[];if(null!=f){var k=h[f];null!=k&&k!==y&&d.some((function(e){return e.value===k}))&&w(k)}var O=function(e){var t=e.currentTarget,n=C.indexOf(t),r=d[n].value;w(r),null!=f&&(v(f,r),setTimeout((function(){var e,n,r,o,a,i,l,s;(e=t.getBoundingClientRect(),n=e.top,r=e.left,o=e.bottom,a=e.right,i=window,l=i.innerHeight,s=i.innerWidth,n>=0&&a<=s&&o<=l&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(u),setTimeout((function(){return t.classList.remove(u)}),2e3))}),150))},T=function(e){var t,n;switch(e.keyCode){case m:var r=C.indexOf(e.target)+1;n=C[r]||C[0];break;case c:var o=C.indexOf(e.target)-1;n=C[o]||C[C.length-1]}null==(t=n)||t.focus()},N=function(e,t){return t.value===e||t.values&&-1!=t.values.indexOf(e)};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},p)},d.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:y===t?0:-1,"aria-selected":y===t,className:(0,i.Z)("tabs__item",l,{"tabs__item--active":y===t}),key:t,ref:function(e){return C.push(e)},onKeyDown:T,onFocus:O,onClick:O},n)}))),t?(0,r.cloneElement)(I.filter((function(e){return N(y,e.props)}))[0],{curSelected:y,className:s}):r.createElement("div",null,I.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:!N(y,e.props),selectedValue:y,className:s})}))),r.createElement("br",null))}},1157:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return m},toc:function(){return d},default:function(){return p}});var r=n(2122),o=n(9756),a=(n(7294),n(3905)),i=n(8952),l=n(9309),u=(n(4996),["components"]),s={},c="Recharging Items",m={unversionedId:"items/recharging-items",id:"items/recharging-items",isDocsHomePage:!1,title:"Recharging Items",description:"Making items rechargeable",source:"@site/docs/items/recharging-items.mdx",sourceDirName:"items",slug:"/items/recharging-items",permalink:"/RogueLibs/ru/docs/items/recharging-items",editUrl:"https://github.com/Abbysssal/RogueLibs/edit/master/docs/docs/items/recharging-items.mdx",version:"current",frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Targetable Items +*",permalink:"/RogueLibs/ru/docs/items/targetable-items-plus"},next:{title:"Melee Weapons*",permalink:"/RogueLibs/ru/docs/items/melee-weapons"}},d=[{value:"Making items rechargeable",id:"making-rechargeable",children:[]},{value:"Vanilla recharging",id:"vanilla-recharging",children:[]},{value:"Examples",id:"examples",children:[]}],f={toc:d};function p(e){var t=e.components,n=(0,o.Z)(e,u);return(0,a.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"recharging-items"},"Recharging Items"),(0,a.kt)("h2",{id:"making-rechargeable"},"Making items rechargeable"),(0,a.kt)("p",null,"If you want to make a rechargeable item, you'll have to make use of the ",(0,a.kt)("a",{parentName:"p",href:"../extra#update-interfaces"},(0,a.kt)("inlineCode",{parentName:"a"},"IDoUpdate")," interface"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"// highlight-next-line\npublic class MyCustomItem : CustomItem, IItemUsable, IDoUpdate\n{\n    // highlight-start\n    public float Cooldown { get; private set; }\n    public void Update() => Cooldown = Mathf.Max(Cooldown - Time.deltaTime, 0f);\n    // highlight-end\n\n    public bool UseItem()\n    {\n        // highlight-next-line\n        if (Cooldown != 0f) return false;\n\n        // do something\n        // highlight-next-line\n        Cooldown = 1f;\n        return true;\n    }\n}\n")),(0,a.kt)("p",null,"And that's it. If you want to display a different item's count, without actually changing it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'    // highlight-start\n    public override string GetCountString()\n    {\n        string count = Count.ToString();\n        if (Cooldown != 0f) count += $" ({(int)Mathf.Ceil(Cooldown * 10)})";\n        return count;\n    }\n    // highlight-end\n')),(0,a.kt)("h2",{id:"vanilla-recharging"},"Vanilla recharging"),(0,a.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Not recommended")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"I'm not even sure if that's really how it works. Plus, you can't really use ",(0,a.kt)("inlineCode",{parentName:"p"},"rechargeAmountInverse")," in here, because the game can only have one inverse-recharging coroutine (and that could be Laser Gun's). Just use the ",(0,a.kt)("inlineCode",{parentName:"p"},"IDoUpdate")," method above."))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"public class MyCustomItem : CustomItem, IItemUsable\n{\n    public override void SetupDetails()\n    {\n        // ...\n        // highlight-next-line\n        Item.rechargeAmount = 10;\n    }\n    public bool UseItem()\n    {\n        // highlight-next-line\n        if (Item.rechargingItem) return false;\n\n        // do something\n        // highlight-next-line\n        Inventory.RechargeItem(Item, true);\n        return true;\n    }\n}\n")),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)(i.Z,{defaultValue:"voodoodoll",values:[{label:"Voodoo Doll",value:"voodoodoll"}],mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"voodoodoll",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="VoodooDoll.cs"',title:'"VoodooDoll.cs"'},'[ItemName("VoodooDoll2")] // conflicts with the original item id\n[ItemCategories(RogueCategories.Social, RogueCategories.Stealth, RogueCategories.Weird)]\npublic class VoodooDoll : CustomItem, IItemCombinable, IDoUpdate\n{\n    public override void SetupDetails()\n    {\n        Item.itemType = ItemTypes.Combine;\n        Item.itemValue = 200;\n        Item.initCount = 1;\n        Item.rewardCount = 1;\n        Item.stackable = true;\n        Item.hasCharges = true;\n    }\n\n    public Agent Victim { get; set; }\n    public float Cooldown { get; set; }\n    public void Update()\n    {\n        if (Victim.dead || !Victim.isActiveAndEnabled) CombineItems(Item);\n        if (Cooldown > 0f) Cooldown = Math.Max(Cooldown - Time.deltaTime, 0f);\n    }\n\n    [IgnoreChecks("AutoStacking")] // handle combining the doll with itself\n    public bool CombineFilter(InvItem other)\n    {\n        if (Item == other) return true;\n        if (other.itemType == ItemTypes.WeaponMelee) return true;\n        if (other.itemType == ItemTypes.WeaponProjectile && other.invItemCount > 0) return true;\n        if (other.itemType == ItemTypes.Consumable) return true;\n        return false;\n    }\n    public bool CombineItems(InvItem other)\n    {\n        if (Cooldown != 0f) return false;\n\n        if (Item == other)\n        {\n            Inventory.DestroyItem(Item);\n            if (--Count > 0) Inventory.AddItem<BlankVoodooDoll>(Count);\n            return true;\n        }\n        else if (other.itemType == ItemTypes.Consumable)\n        {\n            new ItemFunctions().UseItem(other, Victim);\n            Cooldown = Mathf.Clamp(other.itemValue / 50f, 0.5f, 1.5f);\n        }\n        else if (other.itemType == ItemTypes.WeaponMelee)\n        {\n            float damage = other.meleeDamage / 2f;\n            damage *= 1f + Owner.strengthStatMod / 3f;\n            damage *= Owner.agentSpriteTransform.localScale.x;\n\n            if (Owner.HasTrait("Strength")) damage *= 1.5f;\n            if (Owner.HasTrait("StrengthSmall")) damage *= 1.25f;\n            if (Owner.HasTrait("Weak")) damage *= 0.5f;\n            if (Owner.HasTrait("Withdrawal")) damage *= 0.75f;\n\n            Inventory.DepleteMelee(Mathf.Clamp((int)(damage / Owner.agentSpriteTransform.localScale.x), 0, 15), other);\n\n            Quaternion rn = UnityEngine.Random.rotation;\n            Victim.statusEffects.ChangeHealth(-(int)damage, Owner);\n            Victim.movement.KnockBackBullet(rn, 80f, true, Owner);\n            Victim.relationships.SetRel(Owner, "Hateful");\n            Victim.relationships.AddRelHate(Owner, 5);\n\n            gc.audioHandler.Play(Victim, other.hitSoundType == "Cut"\n              ? damage < 12f ? "MeleeHitAgentCutSmall" : "MeleeHitAgentCutLarge"\n              : damage < 10f ? "MeleeHitAgentSmall" : "MeleeHitAgentLarge");\n\n            string effect = "BloodHit";\n            if (Victim.inhuman) effect += "Yellow";\n            if (damage >= 10f) effect += damage < 15f ? "Med" : "Large";\n            gc.spawnerMain.SpawnParticleEffect(effect, Victim.tr.position, rn.eulerAngles.z);\n\n            Cooldown = Mathf.Clamp(damage / 15, 0.5f, 1f);\n        }\n        else if (other.itemType == ItemTypes.WeaponProjectile && other.invItemCount > 0)\n        {\n            InvItem prev = Inventory.equippedWeapon;\n            Inventory.equippedWeapon = other;\n            Owner.gun.Shoot(false, false, false);\n            Inventory.equippedWeapon = prev;\n\n            Bullet bullet = Owner.GetLastFiredBullet();\n            Cooldown = Owner.weaponCooldown;\n\n            bullet.curPosition = bullet.transform.position = Victim.curPosition;\n            bullet.rb.velocity = Victim.rb.velocity;\n        }\n        else return false;\n\n        return true;\n    }\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'RogueLibs.CreateCustomItem<VoodooDoll>()\n    .WithName(new CustomNameInfo("Voodoo Doll"))\n    .WithDescription(new CustomNameInfo("Combine things with the doll to inflict damage or effects onto the victim."))\n    .WithSprite(Properties.Resources.VoodooDoll);\n    // without an ItemUnlock, because this item cannot spawn under normal circumstances\n')))))}p.isMDXComponent=!0},6010:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function o(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}n.d(t,{Z:function(){return o}})}}]);