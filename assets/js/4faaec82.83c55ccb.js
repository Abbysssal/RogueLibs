(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[238],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return k}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),m=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=m(e.components);return a.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=m(n),k=r,h=c["".concat(d,".").concat(k)]||c[k]||s[k]||i;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var m=2;m<i;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},7013:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return m},toc:function(){return p},default:function(){return c}});var a=n(2122),r=n(9756),i=(n(7294),n(3905)),l=["components"],o={},d="Inventory Events and Checks",m={unversionedId:"dev-items/inventory-events",id:"dev-items/inventory-events",isDocsHomePage:!1,title:"Inventory Events and Checks",description:"Inventory Events",source:"@site/docs/dev-items/inventory-events.mdx",sourceDirName:"dev-items",slug:"/dev-items/inventory-events",permalink:"/RogueLibs/docs/dev-items/inventory-events",editUrl:"https://github.com/Abbysssal/RogueLibs/edit/master/docs/docs/dev-items/inventory-events.mdx",version:"current",frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Combinable Items",permalink:"/RogueLibs/docs/dev-items/combinable-items"},next:{title:"Other Useful Stuff",permalink:"/RogueLibs/docs/dev-extra/other"}},p=[{value:"Inventory Events",id:"inventory-events",children:[]},{value:"Inventory Checks",id:"inventory-checks",children:[{value:"Adding your inventory checks",id:"adding-checks",children:[]},{value:"Default Inventory Checks",id:"default-checks",children:[]}]}],s={toc:p};function c(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"inventory-events-and-checks"},"Inventory Events and Checks"),(0,i.kt)("h2",{id:"inventory-events"},"Inventory Events"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"InventoryEvents")," class is used to raise and subscribe to inventory events, such as using an item, combining items, targeting an item and etc. You can get the ",(0,i.kt)("inlineCode",{parentName:"p"},"InventoryEvents")," instance associated with an inventory with ",(0,i.kt)("inlineCode",{parentName:"p"},"GetEvents()")," extension method:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"InventoryEvents events = Inventory.GetEvents();\n")),(0,i.kt)("p",null,"You can subscribe to these events:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"events.OnItemUsed += Events_OnItemUsed;\n...\npublic void Events_OnItemUsed(OnItemUsedArgs e)\n{\n    ...\n}\n")),(0,i.kt)("p",null,"There's also a global instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"InventoryEvents")," that handles ",(0,i.kt)("strong",{parentName:"p"},"all")," events:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"InventoryEvents.Global.OnItemsCombined += Global_OnItemsCombined;\n...\npublic void Global_OnItemsCombined(OnItemsCombinedArgs e)\n{\n    ...\n}\n")),(0,i.kt)("h2",{id:"inventory-checks"},"Inventory Checks"),(0,i.kt)("p",null,"So, instead of adding your own checks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'if (Owner.statusEffects.hasTrait("BloodRestoresHealth"))\n{\n    Owner.SayDialogue("WontEatThis");\n    return;\n}\nif (Owner.statusEffects.hasTrait("OilRestoresHealth"))\n{\n    Owner.SayDialogue("WontEatThat");\n    return;\n}\nif (Owner.health == Owner.maxHealth)\n{\n    Owner.SayDialogue("NoImFull");\n    return;\n}\n...\n')),(0,i.kt)("p",null,"RogueLibs allows you to make universal checks, called ",(0,i.kt)("strong",{parentName:"p"},"inventory checks"),', that will work on all items in the game that meet a certain criteria (for example, have "Food" type and an "Alcohol" category). These inventory checks also implement some usual stuff, that modders sometimes forget to implement. For example, removing an item from the inventory or stopping the interaction, when the item\'s count reaches 0.'),(0,i.kt)("h3",{id:"adding-checks"},"Adding your inventory checks"),(0,i.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("span",{style:{filter:"invert(100%)"}},(0,i.kt)("b",null,"The Inventory Checks' public API is subject to change.")))),(0,i.kt)("p",null,"For example, there's a trait called ",(0,i.kt)("inlineCode",{parentName:"p"},'"Vegetarian"')," that should prohibit the player from consuming food with ",(0,i.kt)("inlineCode",{parentName:"p"},'"Meat"')," category:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'InventoryEvents.OnItemUseCheck += e =>\n{\n    if (!e.Item.IgnoresUseItemCheck("Vegetarian") && e.User.HasTrait("Vegetarian")\n        && e.Item.itemType == ItemTypes.Food && e.Item.Categories.Contains("Meat"))\n    {\n        // do something to indicate why the item cannot be used\n        e.User.gc.audioHandler.Play(e.User, "CantDo");\n        // set Cancel and Handled to true\n        e.Cancel = e.Handled = true;\n    }\n};\n')),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"RogueEventArgs")," class has two properties: ",(0,i.kt)("inlineCode",{parentName:"p"},"Cancel")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Handled"),". If you set ",(0,i.kt)("inlineCode",{parentName:"p"},"Handled")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", then all other checks will be skipped. If you set ",(0,i.kt)("inlineCode",{parentName:"p"},"Cancel")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", then the action that was going to happen will not happen. Usually, they are set to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," at the same time."),(0,i.kt)("p",null,"The inventory checks can be ignored with an ",(0,i.kt)("inlineCode",{parentName:"p"},"IgnoreChecks")," attribute:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'[ItemCategories(RogueCategories.Food, RogueCategories.Weird, "Meat")]\npublic class MysteryFood : CustomItem, IItemUsable\n{\n    // highlight-next-line\n    [IgnoreChecks("Vegetarian")]\n    public void UseItem()\n    {\n        e.User.ChangeHealth(Item.healthChange);\n        Count--;\n        e.User.SayDialogue("Huh, tasty. I wonder what that was...");\n        UseItemAnim();\n    }\n}\n')),(0,i.kt)("h3",{id:"default-checks"},"Default Inventory Checks"),(0,i.kt)("h4",{id:"useitem-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"UseItem")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Criteria"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Dialogue"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Ghost")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Player is a ghost."),(0,i.kt)("td",{parentName:"tr",align:"left"},"-")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"CantInteract")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Pea-Brained" trait, ',(0,i.kt)("strong",{parentName:"td"},"NOT")," Food type."),(0,i.kt)("td",{parentName:"tr",align:"left"},'"???" or "GRRRRRRRR!!!!!"')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"OnlyOil")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Oil Reliant" trait, Food type and (Food or Alcohol category).'),(0,i.kt)("td",{parentName:"tr",align:"left"},'"I\'m gonna need some oil..."')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"OnlyOilMedicine")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Oil Reliant" trait, Consumable type and Health category.'),(0,i.kt)("td",{parentName:"tr",align:"left"},'"I\'m gonna need some oil..."')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"OnlyBlood")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Jugularious" trait, Food type and (Food or Alcohol category).'),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Ew gross, I\'m not putting that in my mouth!"')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"OnlyBloodMedicine")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Jugularious" trait, Consumable type and Health category.'),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Modern medicine is for humans, I want BLOOD!"')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"OnlyCharge")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Electronic" trait, Food type and Food category.'),(0,i.kt)("td",{parentName:"tr",align:"left"},'"I don\'t exactly have a stomach."')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"OnlyHumanFlesh")),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Strict Cannibal" trait, Food type and Food category.'),(0,i.kt)("td",{parentName:"tr",align:"left"},'"Ew gross, I\'m not putting that in my mouth!"')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"HealthFull")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Player's health is at full and the item's ",(0,i.kt)("inlineCode",{parentName:"td"},"healthChange")," is greater than 0."),(0,i.kt)("td",{parentName:"tr",align:"left"},"\"No need, I'm feelin' good!\"")))),(0,i.kt)("h4",{id:"combinefilter-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"CombineFilter")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Criteria"),(0,i.kt)("th",{parentName:"tr",align:"left"},"What will happen"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"StackItems")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Items have the same name"),(0,i.kt)("td",{parentName:"tr",align:"left"},"They will be stacked together")))),(0,i.kt)("h4",{id:"combineitems-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"CombineItems")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Criteria"),(0,i.kt)("th",{parentName:"tr",align:"left"},"What will happen"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"StopOnZero")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The current item's count is 0, or is no longer in the inventory"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Interaction/combining will be stopped")))),(0,i.kt)("h4",{id:"combinetooltip-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"CombineTooltip")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Criteria"),(0,i.kt)("th",{parentName:"tr",align:"left"},"What will happen"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"CombineFilter")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"CombineFilter")," method returned ",(0,i.kt)("inlineCode",{parentName:"td"},"false")," for the item"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The tooltip will be empty")))),(0,i.kt)("h4",{id:"targetfilter-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"TargetFilter")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Criteria"),(0,i.kt)("th",{parentName:"tr",align:"left"},"What will happen"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Distance")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The target object is over 15 units away"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ButlerBot")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The target is a Butler Bot"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"EmptyMech")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The target is an Empty Mech"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false"))))),(0,i.kt)("h4",{id:"targetobject-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"TargetObject")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Criteria"),(0,i.kt)("th",{parentName:"tr",align:"left"},"What will happen"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"StopOnZero")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The current item's count is 0, or is no longer in the inventory"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Interaction/targeting will be stopped")))),(0,i.kt)("h4",{id:"targettooltip-checks"},(0,i.kt)("inlineCode",{parentName:"h4"},"TargetTooltip")),(0,i.kt)("p",null,"None."))}c.isMDXComponent=!0}}]);