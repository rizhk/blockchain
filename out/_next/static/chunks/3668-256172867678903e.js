(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3668],{78462:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var r=n(63366),o=n(87462),a=n(67294),s=n(86010),i=n(27192),c=n(11496),u=n(33616),l=n(59773),f=n(28979);function d(e){return(0,f.Z)("MuiList",e)}(0,n(76087).Z)("MuiList",["root","padding","dense","subheader"]);var p=n(85893);const v=["children","className","component","dense","disablePadding","subheader"],m=(0,c.ZP)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})((({ownerState:e})=>(0,o.Z)({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})));var g=a.forwardRef((function(e,t){const n=(0,u.Z)({props:e,name:"MuiList"}),{children:c,className:f,component:g="ul",dense:h=!1,disablePadding:b=!1,subheader:y}=n,Z=(0,r.Z)(n,v),I=a.useMemo((()=>({dense:h})),[h]),L=(0,o.Z)({},n,{component:g,dense:h,disablePadding:b}),x=(e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e,a={root:["root",!n&&"padding",r&&"dense",o&&"subheader"]};return(0,i.Z)(a,d,t)})(L);return(0,p.jsx)(l.Z.Provider,{value:I,children:(0,p.jsxs)(m,(0,o.Z)({as:g,className:(0,s.Z)(x.root,f),ref:t,ownerState:L},Z,{children:[y,c]}))})}))},59773:function(e,t,n){"use strict";const r=n(67294).createContext({});t.Z=r},48885:function(e,t,n){"use strict";var r=n(63366),o=n(87462),a=n(67294),s=n(86010),i=n(27192),c=n(11496),u=n(33616),l=n(84592),f=n(59773),d=n(85893);const p=["className"],v=(0,c.ZP)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,"flex-start"===n.alignItems&&t.alignItemsFlexStart]}})((({theme:e,ownerState:t})=>(0,o.Z)({minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},"flex-start"===t.alignItems&&{marginTop:8}))),m=a.forwardRef((function(e,t){const n=(0,u.Z)({props:e,name:"MuiListItemIcon"}),{className:c}=n,m=(0,r.Z)(n,p),g=a.useContext(f.Z),h=(0,o.Z)({},n,{alignItems:g.alignItems}),b=(e=>{const{alignItems:t,classes:n}=e,r={root:["root","flex-start"===t&&"alignItemsFlexStart"]};return(0,i.Z)(r,l.f,n)})(h);return(0,d.jsx)(v,(0,o.Z)({className:(0,s.Z)(b.root,c),ownerState:h,ref:t},m))}));t.Z=m},84592:function(e,t,n){"use strict";n.d(t,{f:function(){return o}});var r=n(28979);function o(e){return(0,r.Z)("MuiListItemIcon",e)}const a=(0,n(76087).Z)("MuiListItemIcon",["root","alignItemsFlexStart"]);t.Z=a},71579:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(67294);var o=function(e,t){return r.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},58974:function(e,t,n){"use strict";var r=n(16600);t.Z=r.Z},77913:function(e,t,n){"use strict";var r=n(85696);t.default=void 0;var o,a=(o=n(67294))&&o.__esModule?o:{default:o},s=n(12199),i=n(61587),c=n(27215);var u={};function l(e,t,n,r){if(e&&s.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(o?"%"+o:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,o=i.useRouter(),f=a.default.useMemo((function(){var t=s.resolveHref(o,e.href,!0),n=r(t,2),a=n[0],i=n[1];return{href:a,as:e.as?s.resolveHref(o,e.as):i||a}}),[o,e.href,e.as]),d=f.href,p=f.as,v=e.children,m=e.replace,g=e.shallow,h=e.scroll,b=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var y=(t=a.default.Children.only(v))&&"object"===typeof t&&t.ref,Z=c.useIntersection({rootMargin:"200px"}),I=r(Z,2),L=I[0],x=I[1],M=a.default.useCallback((function(e){L(e),y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[y,L]);a.default.useEffect((function(){var e=x&&n&&s.isLocalURL(d),t="undefined"!==typeof b?b:o&&o.locale,r=u[d+"%"+p+(t?"%"+t:"")];e&&!r&&l(o,d,p,{locale:t})}),[p,d,x,b,n,o]);var E={ref:M,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,i,c){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&s.isLocalURL(n))&&(e.preventDefault(),t[o?"replace":"push"](n,r,{shallow:a,locale:c,scroll:i}))}(e,o,d,p,m,g,h,b)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),s.isLocalURL(d)&&l(o,d,p,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var R="undefined"!==typeof b?b:o&&o.locale,w=o&&o.isLocaleDomain&&s.getDomainLocale(p,R,o&&o.locales,o&&o.domainLocales);E.href=w||s.addBasePath(s.addLocale(p,R,o&&o.defaultLocale))}return a.default.cloneElement(t,E)};t.default=f},27215:function(e,t,n){"use strict";var r=n(85696);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,u=e.disabled||!s,l=o.useRef(),f=o.useState(!1),d=r(f,2),p=d[0],v=d[1],m=o.useState(t?t.current:null),g=r(m,2),h=g[0],b=g[1],y=o.useCallback((function(e){l.current&&(l.current(),l.current=void 0),u||p||e&&e.tagName&&(l.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=c.find((function(e){return e.root===n.root&&e.margin===n.margin}));r?t=i.get(r):(t=i.get(n),c.push(n));if(t)return t;var o=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return i.set(n,t={id:n,observer:a,elements:o}),t}(n),o=r.id,a=r.observer,s=r.elements;return s.set(e,t),a.observe(e),function(){if(s.delete(e),a.unobserve(e),0===s.size){a.disconnect(),i.delete(o);var t=c.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&c.splice(t,1)}}}(e,(function(e){return e&&v(e)}),{root:h,rootMargin:n}))}),[u,h,n,p]);return o.useEffect((function(){if(!s&&!p){var e=a.requestIdleCallback((function(){return v(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[p]),o.useEffect((function(){t&&b(t.current)}),[t]),[y,p]};var o=n(67294),a=n(98065),s="undefined"!==typeof IntersectionObserver;var i=new Map,c=[]},41664:function(e,t,n){e.exports=n(77913)},92703:function(e,t,n){"use strict";var r=n(50414);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,s){if(s!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},45697:function(e,t,n){e.exports=n(92703)()},50414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);