(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2197],{27948:function(e,t,n){"use strict";n.d(t,{Z:function(){return v}});var r=n(63366),a=n(87462),o=n(67294),i=n(86010),s=n(27192),u=n(33616),c=n(11496),d=n(28979);function l(e){return(0,d.Z)("MuiContainer",e)}(0,n(76087).Z)("MuiContainer",["root","disableGutters","fixed","maxWidthXs","maxWidthSm","maxWidthMd","maxWidthLg","maxWidthXl"]);var f=n(98216),p=n(85893);const h=["className","component","disableGutters","fixed","maxWidth"],m=(0,c.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,f.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}})((({theme:e,ownerState:t})=>(0,a.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,n)=>{const r=e.breakpoints.values[n];return 0!==r&&(t[e.breakpoints.up(n)]={maxWidth:`${r}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,a.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}})));var v=o.forwardRef((function(e,t){const n=(0,u.Z)({props:e,name:"MuiContainer"}),{className:o,component:c="div",disableGutters:d=!1,fixed:v=!1,maxWidth:x="lg"}=n,g=(0,r.Z)(n,h),b=(0,a.Z)({},n,{component:c,disableGutters:d,fixed:v,maxWidth:x}),y=(e=>{const{classes:t,fixed:n,disableGutters:r,maxWidth:a}=e,o={root:["root",a&&`maxWidth${(0,f.Z)(String(a))}`,n&&"fixed",r&&"disableGutters"]};return(0,s.Z)(o,l,t)})(b);return(0,p.jsx)(m,(0,a.Z)({as:c,ownerState:b,className:(0,i.Z)(y.root,o),ref:t},g))}))},98396:function(e,t,n){"use strict";var r;n.d(t,{Z:function(){return l}});var a=n(67294),o=n(34168),i=n(20539),s=n(58974);function u(e,t,n,r,o){const i="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,[u,c]=a.useState((()=>o&&i?n(e).matches:r?r(e).matches:t));return(0,s.Z)((()=>{let t=!0;if(!i)return;const r=n(e),a=()=>{t&&c(r.matches)};return a(),r.addListener(a),()=>{t=!1,r.removeListener(a)}}),[e,n,i]),u}const c=(r||(r=n.t(a,2))).useSyncExternalStore;function d(e,t,n,r){const o=a.useCallback((()=>t),[t]),i=a.useMemo((()=>{if(null!==r){const{matches:t}=r(e);return()=>t}return o}),[o,e,r]),[s,u]=a.useMemo((()=>{if(null===n)return[o,()=>()=>{}];const t=n(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]}),[o,n,e]);return c(u,s,i)}function l(e,t={}){const n=(0,o.Z)(),r="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,{defaultMatches:a=!1,matchMedia:s=(r?window.matchMedia:null),ssrMatchMedia:l=null,noSsr:f}=(0,i.Z)({name:"MuiUseMediaQuery",props:t,theme:n});let p="function"===typeof e?e(n):e;p=p.replace(/^@media( ?)/m,"");return(void 0!==c?d:u)(p,a,s,l,f)}},58974:function(e,t,n){"use strict";var r=n(16600);t.Z=r.Z},77913:function(e,t,n){"use strict";var r=n(85696);t.default=void 0;var a,o=(a=n(67294))&&a.__esModule?a:{default:a},i=n(12199),s=n(61587),u=n(27215);var c={};function d(e,t,n,r){if(e&&i.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;c[t+"%"+n+(a?"%"+a:"")]=!0}}var l=function(e){var t,n=!1!==e.prefetch,a=s.useRouter(),l=o.default.useMemo((function(){var t=i.resolveHref(a,e.href,!0),n=r(t,2),o=n[0],s=n[1];return{href:o,as:e.as?i.resolveHref(a,e.as):s||o}}),[a,e.href,e.as]),f=l.href,p=l.as,h=e.children,m=e.replace,v=e.shallow,x=e.scroll,g=e.locale;"string"===typeof h&&(h=o.default.createElement("a",null,h));var b=(t=o.default.Children.only(h))&&"object"===typeof t&&t.ref,y=u.useIntersection({rootMargin:"200px"}),w=r(y,2),k=w[0],Z=w[1],M=o.default.useCallback((function(e){k(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,k]);o.default.useEffect((function(){var e=Z&&n&&i.isLocalURL(f),t="undefined"!==typeof g?g:a&&a.locale,r=c[f+"%"+p+(t?"%"+t:"")];e&&!r&&d(a,f,p,{locale:t})}),[p,f,Z,g,n,a]);var W={ref:M,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,s,u){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&i.isLocalURL(n))&&(e.preventDefault(),t[a?"replace":"push"](n,r,{shallow:o,locale:u,scroll:s}))}(e,a,f,p,m,v,x,g)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),i.isLocalURL(f)&&d(a,f,p,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var L="undefined"!==typeof g?g:a&&a.locale,j=a&&a.isLocaleDomain&&i.getDomainLocale(p,L,a&&a.locales,a&&a.domainLocales);W.href=j||i.addBasePath(i.addLocale(p,L,a&&a.defaultLocale))}return o.default.cloneElement(t,W)};t.default=l},27215:function(e,t,n){"use strict";var r=n(85696);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,c=e.disabled||!i,d=a.useRef(),l=a.useState(!1),f=r(l,2),p=f[0],h=f[1],m=a.useState(t?t.current:null),v=r(m,2),x=v[0],g=v[1],b=a.useCallback((function(e){d.current&&(d.current(),d.current=void 0),c||p||e&&e.tagName&&(d.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=u.find((function(e){return e.root===n.root&&e.margin===n.margin}));r?t=s.get(r):(t=s.get(n),u.push(n));if(t)return t;var a=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(n,t={id:n,observer:o,elements:a}),t}(n),a=r.id,o=r.observer,i=r.elements;return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),s.delete(a);var t=u.findIndex((function(e){return e.root===a.root&&e.margin===a.margin}));t>-1&&u.splice(t,1)}}}(e,(function(e){return e&&h(e)}),{root:x,rootMargin:n}))}),[c,x,n,p]);return a.useEffect((function(){if(!i&&!p){var e=o.requestIdleCallback((function(){return h(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[p]),a.useEffect((function(){t&&g(t.current)}),[t]),[b,p]};var a=n(67294),o=n(98065),i="undefined"!==typeof IntersectionObserver;var s=new Map,u=[]},35987:function(e,t,n){"use strict";n.r(t);var r=n(67294),a=n(41664),o=n(9008),i=n(98396),s=n(87357),u=n(27948),c=n(15861),d=n(11057),l=n(2734),f=n(55714),p=n(85893);t.default=function(){var e=(0,l.Z)(),t=(0,i.Z)(e.breakpoints.down("sm"));return(0,r.useEffect)((function(){f.w.push({event:"page_view"})}),[]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.default,{children:(0,p.jsxs)("title",{children:["Error: Not Found | ","Picante"]})}),(0,p.jsx)(s.Z,{component:"main",sx:{alignItems:"center",backgroundColor:"background.paper",display:"flex",flexGrow:1,py:"80px"},children:(0,p.jsxs)(u.Z,{maxWidth:"lg",children:[(0,p.jsx)(c.Z,{align:"center",variant:t?"h4":"h1",children:"404: The page you are looking for isn\u2019t here"}),(0,p.jsx)(c.Z,{align:"center",color:"textSecondary",sx:{mt:.5},variant:"subtitle2",children:"You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."}),(0,p.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center",mt:6},children:(0,p.jsx)(s.Z,{alt:"Under development",component:"img",src:"/static/error/error404_".concat(e.palette.mode,".svg"),sx:{height:"auto",maxWidth:"100%",width:400}})}),(0,p.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center",mt:6},children:(0,p.jsx)(a.default,{href:"/dashboard",passHref:!0,children:(0,p.jsx)(d.Z,{component:"a",variant:"outlined",children:"Back to Dashboard"})})})]})})]})}},9014:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(35987)}])},41664:function(e,t,n){e.exports=n(77913)}},function(e){e.O(0,[9774,2888,179],(function(){return t=9014,e(e.s=t);var t}));var t=e.O();_N_E=t}]);