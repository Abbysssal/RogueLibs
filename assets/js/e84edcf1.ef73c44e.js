(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[450],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=s(n),d=i,p=m["".concat(u,".").concat(d)]||m[d]||f[d]||o;return n?r.createElement(p,a(a({ref:t},l),{},{components:n})):r.createElement(p,a({ref:t},l))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3919:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function i(e){return void 0!==e&&!r(e)}n.d(t,{b:function(){return r},Z:function(){return i}})},4996:function(e,t,n){"use strict";n.d(t,{C:function(){return o},Z:function(){return a}});var r=n(2263),i=n(3919);function o(){var e=(0,r.Z)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,o=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var o=void 0===r?{}:r,a=o.forcePrependBaseUrl,c=void 0!==a&&a,u=o.absolute,s=void 0!==u&&u;if(!n)return n;if(n.startsWith("#"))return n;if((0,i.b)(n))return n;if(c)return t+n;var l=n.startsWith(t)?n:t+n.replace(/^\//,"");return s?e+l:l}(o,n,e,t)}}}function a(e,t){return void 0===t&&(t={}),(0,o().withBaseUrl)(e,t)}},9443:function(e,t,n){"use strict";var r=(0,n(7294).createContext)(void 0);t.Z=r},9309:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(2122),i=n(9756),o=n(7294),a=["children"];function c(e){var t=e.children,n=(0,i.Z)(e,a);return o.createElement("div",(0,r.Z)({role:"tabpanel"},n),t)}},8952:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var r=n(7294),i=n(9443);var o=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},a=n(6010),c="tabItem_2O3c",u="tabItemActive_Fpbe",s="tab_1pgU";var l=37,f=39;var m=function(e){var t=e.lazy,n=e.block,i=e.defaultValue,m=e.values,d=e.groupId,p=e.className,v=o(),b=v.tabGroupChoices,y=v.setTabGroupChoices,g=(0,r.useState)(i),h=g[0],w=g[1],O=r.Children.toArray(e.children),k=[];if(null!=d){var C=b[d];null!=C&&C!==h&&m.some((function(e){return e.value===C}))&&w(C)}var x=function(e){var t=e.currentTarget,n=k.indexOf(t),r=m[n].value;w(r),null!=d&&(y(d,r),setTimeout((function(){var e,n,r,i,o,a,c,s;(e=t.getBoundingClientRect(),n=e.top,r=e.left,i=e.bottom,o=e.right,a=window,c=a.innerHeight,s=a.innerWidth,n>=0&&o<=s&&i<=c&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(u),setTimeout((function(){return t.classList.remove(u)}),2e3))}),150))},N=function(e){var t,n;switch(e.keyCode){case f:var r=k.indexOf(e.target)+1;n=k[r]||k[0];break;case l:var i=k.indexOf(e.target)-1;n=k[i]||k[k.length-1]}null==(t=n)||t.focus()},E=function(e,t){return t.value===e||t.values&&-1!=t.values.indexOf(e)};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},p)},m.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:h===t?0:-1,"aria-selected":h===t,className:(0,a.Z)("tabs__item",c,{"tabs__item--active":h===t}),key:t,ref:function(e){return k.push(e)},onKeyDown:N,onFocus:x,onClick:x},n)}))),t?(0,r.cloneElement)(O.filter((function(e){return E(h,e.props)}))[0],{curSelected:h,className:s}):r.createElement("div",null,O.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:!E(h,e.props),selectedValue:h,className:s})}))),r.createElement("br",null))}},4243:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return s},toc:function(){return l},default:function(){return m}});var r=n(2122),i=n(9756),o=(n(7294),n(3905)),a=(n(8952),n(9309),n(4996),["components"]),c={},u="Creating a Custom Ability*",s={unversionedId:"items/create-ability",id:"items/create-ability",isDocsHomePage:!1,title:"Creating a Custom Ability*",description:"",source:"@site/docs/items/create-ability.mdx",sourceDirName:"items",slug:"/items/create-ability",permalink:"/RogueLibs/docs/items/create-ability",editUrl:"https://github.com/Abbysssal/RogueLibs/edit/master/docs/docs/items/create-ability.mdx",version:"current",frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Inventory Checks",permalink:"/RogueLibs/docs/items/inventory-checks"},next:{title:"Usable Abilities*",permalink:"/RogueLibs/docs/items/usable-abilities"}},l=[],f={toc:l};function m(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"creating-a-custom-ability"},"Creating a Custom Ability*"),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Work-In-Progress")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"})))}m.isMDXComponent=!0},6010:function(e,t,n){"use strict";function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})}}]);