(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[426],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return m},kt:function(){return d}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),p=u(t),d=r,g=p["".concat(s,".").concat(d)]||p[d]||c[d]||i;return t?a.createElement(g,o(o({ref:n},m),{},{components:t})):a.createElement(g,o({ref:n},m))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=p;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=t[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},9443:function(e,n,t){"use strict";var a=(0,t(7294).createContext)(void 0);n.Z=a},944:function(e,n,t){"use strict";var a=t(7294),r=t(9443);n.Z=function(){var e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e}},9309:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var a=t(2122),r=t(9756),i=t(7294),o=["children"];function l(e){var n=e.children,t=(0,r.Z)(e,o);return i.createElement("div",(0,a.Z)({role:"tabpanel"},t),n)}},9037:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var a=t(7294),r=t(944),i=t(6010),o="tabItem_2O3c",l="tabItemActive_Fpbe",s="tab_1pgU";var u=37,m=39;var c=function(e){var n=e.lazy,t=e.block,c=e.defaultValue,p=e.values,d=e.groupId,g=e.className,f=(0,r.Z)(),v=f.tabGroupChoices,N=f.setTabGroupChoices,k=(0,a.useState)(c),h=k[0],b=k[1],C=a.Children.toArray(e.children),y=[];if(null!=d){var w=v[d];null!=w&&w!==h&&p.some((function(e){return e.value===w}))&&b(w)}var x=function(e){var n=e.currentTarget,t=y.indexOf(n),a=p[t].value;b(a),null!=d&&(N(d,a),setTimeout((function(){var e,t,a,r,i,o,s,u;(e=n.getBoundingClientRect(),t=e.top,a=e.left,r=e.bottom,i=e.right,o=window,s=o.innerHeight,u=o.innerWidth,t>=0&&i<=u&&r<=s&&a>=0)||(n.scrollIntoView({block:"center",behavior:"smooth"}),n.classList.add(l),setTimeout((function(){return n.classList.remove(l)}),2e3))}),150))},I=function(e){var n,t;switch(e.keyCode){case m:var a=y.indexOf(e.target)+1;t=y[a]||y[0];break;case u:var r=y.indexOf(e.target)-1;t=y[r]||y[y.length-1]}null==(n=t)||n.focus()},L=function(e,n){return n.value===e||n.values&&-1!=n.values.indexOf(e)};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":t},g)},p.map((function(e){var n=e.value,t=e.label;return a.createElement("li",{role:"tab",tabIndex:h===n?0:-1,"aria-selected":h===n,className:(0,i.Z)("tabs__item",o,{"tabs__item--active":h===n}),key:n,ref:function(e){return y.push(e)},onKeyDown:I,onFocus:x,onClick:x},t)}))),n?(0,a.cloneElement)(C.filter((function(e){return L(h,e.props)}))[0],{curSelected:h,className:s}):a.createElement("div",null,C.map((function(e,n){return(0,a.cloneElement)(e,{key:n,hidden:!L(h,e.props),selectedValue:h,className:s})}))),a.createElement("br",null))}},2905:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return u},contentTitle:function(){return m},metadata:function(){return c},toc:function(){return p},default:function(){return g}});var a=t(2122),r=t(9756),i=(t(7294),t(3905)),o=t(9037),l=t(9309),s=["components"],u={},m="\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u0438\u043c\u0435\u043d\u0430",c={unversionedId:"dev-extra/names",id:"dev-extra/names",isDocsHomePage:!1,title:"\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u0438\u043c\u0435\u043d\u0430",description:"\u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b \u0438 \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/dev-extra/names.mdx",sourceDirName:"dev-extra",slug:"/dev-extra/names",permalink:"/RogueLibs/ru/docs/dev-extra/names",editUrl:"https://github.com/Abbysssal/RogueLibs/edit/master/docs/docs/dev-extra/names.mdx",version:"current",frontMatter:{},sidebar:"documentationSidebar",previous:{title:"\u041d\u0430\u0447\u0430\u043b\u043e \u0440\u0430\u0431\u043e\u0442\u044b",permalink:"/RogueLibs/ru/docs/setup"},next:{title:"\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u0441\u043f\u0440\u0430\u0439\u0442\u044b",permalink:"/RogueLibs/ru/docs/dev-extra/sprites"}},p=[{value:"\u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b \u0438 \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430",id:"ctors-and-props",children:[]},{value:"\u0418\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f",id:"initialization",children:[]},{value:"\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u044f\u0437\u044b\u043a\u0438",id:"custom-languages",children:[]},{value:"\u041f\u043e\u0441\u0442\u0430\u0432\u0449\u0438\u043a\u0438 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0445 \u0438\u043c\u0451\u043d",id:"name-providers",children:[]},{value:"\u041b\u043e\u043a\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438",id:"localizations",children:[]}],d={toc:p};function g(e){var n=e.components,t=(0,r.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435-\u0438\u043c\u0435\u043d\u0430"},"\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u0438\u043c\u0435\u043d\u0430"),(0,i.kt)("h2",{id:"ctors-and-props"},"\u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u044b \u0438 \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430"),(0,i.kt)("p",null,"\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomNameInfo")," \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0434\u043b\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0445 \u0438\u043c\u0451\u043d \u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u0434\u0430\u043d\u043d\u044b\u0445 \u043c\u0435\u0436\u0434\u0443 \u043e\u0431\u044a\u0435\u043a\u0442\u0430\u043c\u0438 ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomName"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'CustomNameInfo emptyInfo = new CustomNameInfo();\nCustomNameInfo nameInfo = new CustomNameInfo("english text");\nCustomNameInfo infoFromDict = new CustomNameInfo(\n    new Dictionary<LanguageCode, string>\n    {\n        [LanguageCode.English] = "english text",\n        [LanguageCode.Russian] = "\u0440\u0443\u0441\u0441\u043a\u0438\u0439 \u0442\u0435\u043a\u0441\u0442",\n    });\n')),(0,i.kt)("p",null,"\u041c\u043e\u0436\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u043e\u0432 \u0432 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u0438\u043c\u0435\u043d\u0430:"),(0,i.kt)(o.Z,{defaultValue:"indexer",values:[{label:"\u0421\u0432\u043e\u0439\u0441\u0442\u0432\u043e-\u0438\u043d\u0434\u0435\u043a\u0441\u0430\u0442\u043e\u0440",value:"indexer"},{label:"\u0418\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430",value:"named"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"indexer",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'nameInfo = new CustomNameInfo\n{\n    [LanguageCode.French] = "texte fran\xe7ais",\n    [LanguageCode.Spanish] = "texto en espa\xf1ol",\n}\n// \u0438\u043b\u0438\nnameInfo[LanguageCode.French] = "texte fran\xe7ais";\nnameInfo[LanguageCode.Spanish] = "texto en espa\xf1ol";\n')),(0,i.kt)("p",null,"\u0412\u044b \u0442\u0430\u043a\u0436\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0441\u0432\u043e\u0438 \u043a\u043e\u0434\u044b \u044f\u0437\u044b\u043a\u043e\u0432:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'nameInfo[(LanguageCode)123] = "\u65e5\u672c\u8a9e\u30c6\u30ad\u30b9\u30c8";\n')),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u0421\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 ",(0,i.kt)("a",{parentName:"p",href:"#custom-languages"},"\u0434\u0430\u043b\u0435\u0435 \u043d\u0430 \u044d\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435"),".")))),(0,i.kt)(l.Z,{value:"named",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'nameInfo = new CustomNameInfo\n{\n    French = "texte fran\xe7ais",\n    Spanish = "texto en espa\xf1ol",\n}\n// \u0438\u043b\u0438\nnameInfo.French = "texte fran\xe7ais";\nnameInfo.Spanish = "texto en espa\xf1ol";\n')))),(0,i.kt)("p",null,"\u0412 \u043e\u0442\u043b\u0438\u0447\u0438\u0435 \u043e\u0442 \u0441\u043b\u043e\u0432\u0430\u0440\u0435\u0439, \u0438 ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomName"),", \u0438 ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomNameInfo")," \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u044e\u0442 ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),", \u0435\u0441\u043b\u0438 \u0432 \u043d\u0438\u0445 \u043d\u0435\u0442 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0451\u043d\u043d\u043e\u0433\u043e ",(0,i.kt)("inlineCode",{parentName:"p"},"LanguageCode"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"string translation = nameInfo[(LanguageCode)123];\n// \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 null \u0435\u0441\u043b\u0438 \u044f\u0437\u044b\u043a \u043d\u0435 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0451\u043d\nstring display = translation ?? nameInfo.English;\n")),(0,i.kt)("h2",{id:"initialization"},"\u0418\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f"),(0,i.kt)("p",null,"\u041e\u0431\u044b\u0447\u043d\u043e, ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomName")," \u0441\u043e\u0437\u0434\u0430\u044e\u0442\u0441\u044f \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438, \u043a\u043e\u0433\u0434\u0430 \u0432\u044b \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u0438 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u0441\u0432\u043e\u0438\u043c \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u043c \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u0430\u043c:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'RogueLibs.CreateCustomItem<MyCustomItem>()\n    .WithName(new CustomNameInfo("English name")\n    {\n        Russian = "\u0420\u0443\u0441\u0441\u043a\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"\n    })\n    .WithDescription(new CustomNameInfo("English description")\n    {\n        Russian = "\u0420\u0443\u0441\u0441\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"\n    });\n')),(0,i.kt)("p",null,"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0438\u0445 \u0432\u0440\u0443\u0447\u043d\u0443\u044e \u0442\u043e\u0436\u0435, \u043d\u043e \u0432\u0430\u043c \u043f\u0440\u0438\u0434\u0451\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0438\u043c\u044f \u0438 \u0442\u0438\u043f ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomName")," \u0432\u0440\u0443\u0447\u043d\u0443\u044e:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'CustomName name = RogueLibs.CreateCustomName("Name", "Type", new CustomNameInfo("Info"));\n')),(0,i.kt)("p",null,"\u0415\u0441\u043b\u0438 \u0432\u044b \u0431\u0443\u0434\u0435\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0432\u0442\u043e\u0440\u043e\u0439 \u043c\u0435\u0442\u043e\u0434, \u0442\u043e \u0432\u043e\u0442 \u0441\u043f\u0438\u0441\u043e\u043a \u0442\u0438\u043f\u043e\u0432, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0445 \u0432 \u0438\u0433\u0440\u0435:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Item")," - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u043e\u0432 \u0438 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0445 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u0435\u0439;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Description")," - \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u043e\u0432, \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0445 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u0435\u0439, \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0441\u0442\u0435\u0439, \u0441\u0442\u0430\u0442\u0443\u0441\u043d\u044b\u0445 \u044d\u0444\u0444\u0435\u043a\u0442\u043e\u0432 \u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435\u0439;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"StatusEffect")," - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0441\u0442\u0435\u0439 \u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u043d\u044b\u0445 \u044d\u0444\u0444\u0435\u043a\u0442\u043e\u0432;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Interface")," - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043a\u043d\u043e\u043f\u043e\u043a \u0438 \u0442\u0435\u043a\u0441\u0442 \u0432 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0435;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Unlock")," - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u0438 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u043c\u0443\u0442\u0430\u0442\u043e\u0440\u043e\u0432 \u0438 \u0411\u043e\u043b\u044c\u0448\u0438\u0445 \u041a\u0432\u0435\u0441\u0442\u043e\u0432;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Object")," - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u0438 \u0442\u0438\u043f\u043e\u0432 \u0447\u0430\u043d\u043a\u043e\u0432;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Agent")," - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435\u0439;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Dialogue")," - \u0444\u0440\u0430\u0437\u044b \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435\u0439;")),(0,i.kt)("h2",{id:"custom-languages"},"\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u044f\u0437\u044b\u043a\u0438"),(0,i.kt)("p",null,"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0432\u043e\u0438 \u044f\u0437\u044b\u043a\u0438 \u0432 \u0438\u0433\u0440\u0443 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043c\u0435\u0442\u043e\u0434\u0430 ",(0,i.kt)("inlineCode",{parentName:"p"},"CustomName.RegisterLanguageCode"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'CustomName.RegisterLanguageCode("japanese", (LanguageCode)123);\n')),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Work-In-Progress")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u044f\u0437\u044b\u043a\u0438 \u0435\u0449\u0451 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u0432 \u043c\u0435\u043d\u044e \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a \u0438\u0433\u0440\u044b."))),(0,i.kt)("h2",{id:"name-providers"},"\u041f\u043e\u0441\u0442\u0430\u0432\u0449\u0438\u043a\u0438 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0445 \u0438\u043c\u0451\u043d"),(0,i.kt)("p",null,"\u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u043a\u0430\u043a\u0430\u044f-\u0442\u043e \u0441\u043b\u043e\u0436\u043d\u0430\u044f \u0441\u0445\u0435\u043c\u0430 \u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0439, \u0442\u043e \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c ",(0,i.kt)("inlineCode",{parentName:"p"},"INameProvider"),". \u0422\u0430\u043a\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u043a\u0438\u0435 \u0441\u0442\u0440\u043e\u043a\u0438 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u044e\u0442\u0441\u044f \u043c\u0435\u0442\u043e\u0434\u043e\u043c ",(0,i.kt)("inlineCode",{parentName:"p"},"NameDB.GetName"),". \u041f\u0440\u043e\u0441\u0442\u043e \u0441\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u043a\u043b\u0430\u0441\u0441 \u0440\u0435\u0430\u043b\u0438\u0437\u0443\u044e\u0449\u0438\u0439 ",(0,i.kt)("inlineCode",{parentName:"p"},"INameProvider")," \u0438 \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0435\u0433\u043e \u0432 ",(0,i.kt)("inlineCode",{parentName:"p"},"RogueLibsInternals"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp",metastring:'title="MyProvider.cs"',title:'"MyProvider.cs"'},'public class MyProvider : INameProvider\n{\n    public NameDB NameDB { get; set; }\n    public LanguageCode Language { get; set; }\n    public void GetName(string name, string type, ref string result)\n    {\n        if (name.StartsWith("fake_"))\n        {\n            string sub = name.Substring("fake_".Length);\n            result = NameDB.GetName(sub, type);\n        }\n    }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},"RogueLibsInternals.NameProviders.Add(new MyProvider());\n")),(0,i.kt)("h2",{id:"localizations"},"\u041b\u043e\u043a\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438"),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Work-In-Progress")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u042d\u0442\u043e\u0442 \u0440\u0430\u0437\u0434\u0435\u043b \u0432 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435 \u043d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u044f."))),(0,i.kt)("p",null,"\u0412\u043e\u0442 \u043a\u0430\u043a \u0432\u044b\u0433\u043b\u044f\u0434\u0438\u0442 \u043f\u043b\u0430\u0433\u0438\u043d \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u043e\u0439 \u043b\u043e\u043a\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'using BepInEx;\nusing RogueLibsCore;\n\nnamespace MyCoolMod\n{\n    [BepInPlugin(pluginGUID, pluginName, pluginVersion)]\n    [BepInDependency(MyCoolPlugin.pluginGUID)] // \u0432\u043e\u0442 \u0433\u0434\u0435 \u0442\u0435 \u043a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u044b \u043e\u043a\u0430\u0437\u044b\u0432\u0430\u044e\u0442\u0441\u044f \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u043c\u0438\n    public class RussianLocalization : BaseUnityPlugin\n    {\n        public const string pluginGUID = "myusername.streetsofrogue.mycoolmod.russian";\n        public const string pluginName = "My Cool Mod [RUS]";\n        public const string pluginVersion = "0.1.0";\n\n        public void Awake()\n        {\n            \n        }\n    }\n}\n')))}g.isMDXComponent=!0},6010:function(e,n,t){"use strict";function a(e){var n,t,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=a(e[n]))&&(r&&(r+=" "),r+=t);else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function r(){for(var e,n,t=0,r="";t<arguments.length;)(e=arguments[t++])&&(n=a(e))&&(r&&(r+=" "),r+=n);return r}t.d(n,{Z:function(){return r}})}}]);