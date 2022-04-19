(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5110],{66242:function(e,r,n){"use strict";n.d(r,{Z:function(){return h}});var t=n(87462),o=n(63366),a=n(67294),i=n(86010),s=n(27192),l=n(11496),c=n(33616),u=n(55113),d=n(28979);function f(e){return(0,d.Z)("MuiCard",e)}(0,n(76087).Z)("MuiCard",["root"]);var p=n(85893);const x=["className","raised"],m=(0,l.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,r)=>r.root})((()=>({overflow:"hidden"})));var h=a.forwardRef((function(e,r){const n=(0,c.Z)({props:e,name:"MuiCard"}),{className:a,raised:l=!1}=n,u=(0,o.Z)(n,x),d=(0,t.Z)({},n,{raised:l}),h=(e=>{const{classes:r}=e;return(0,s.Z)({root:["root"]},f,r)})(d);return(0,p.jsx)(m,(0,t.Z)({className:(0,i.Z)(h.root,a),elevation:l?8:void 0,ref:r,ownerState:d},u))}))},27948:function(e,r,n){"use strict";n.d(r,{Z:function(){return h}});var t=n(63366),o=n(87462),a=n(67294),i=n(86010),s=n(27192),l=n(33616),c=n(11496),u=n(28979);function d(e){return(0,u.Z)("MuiContainer",e)}(0,n(76087).Z)("MuiContainer",["root","disableGutters","fixed","maxWidthXs","maxWidthSm","maxWidthMd","maxWidthLg","maxWidthXl"]);var f=n(98216),p=n(85893);const x=["className","component","disableGutters","fixed","maxWidth"],m=(0,c.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,r[`maxWidth${(0,f.Z)(String(n.maxWidth))}`],n.fixed&&r.fixed,n.disableGutters&&r.disableGutters]}})((({theme:e,ownerState:r})=>(0,o.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!r.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:r})=>r.fixed&&Object.keys(e.breakpoints.values).reduce(((r,n)=>{const t=e.breakpoints.values[n];return 0!==t&&(r[e.breakpoints.up(n)]={maxWidth:`${t}${e.breakpoints.unit}`}),r}),{})),(({theme:e,ownerState:r})=>(0,o.Z)({},"xs"===r.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},r.maxWidth&&"xs"!==r.maxWidth&&{[e.breakpoints.up(r.maxWidth)]:{maxWidth:`${e.breakpoints.values[r.maxWidth]}${e.breakpoints.unit}`}})));var h=a.forwardRef((function(e,r){const n=(0,l.Z)({props:e,name:"MuiContainer"}),{className:a,component:c="div",disableGutters:u=!1,fixed:h=!1,maxWidth:v="lg"}=n,b=(0,t.Z)(n,x),j=(0,o.Z)({},n,{component:c,disableGutters:u,fixed:h,maxWidth:v}),Z=(e=>{const{classes:r,fixed:n,disableGutters:t,maxWidth:o}=e,a={root:["root",o&&`maxWidth${(0,f.Z)(String(o))}`,n&&"fixed",t&&"disableGutters"]};return(0,s.Z)(a,d,r)})(j);return(0,p.jsx)(m,(0,o.Z)({as:c,ownerState:j,className:(0,i.Z)(Z.root,a),ref:r},b))}))},50122:function(e,r,n){"use strict";n.d(r,{Z:function(){return w}});var t=n(63366),o=n(87462),a=n(67294),i=n(86010),s=n(27192),l=n(54844),c=n(41796),u=n(98216),d=n(11496),f=n(33616),p=n(18791),x=n(51705),m=n(15861),h=n(28979);function v(e){return(0,h.Z)("MuiLink",e)}var b=(0,n(76087).Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),j=n(85893);const Z=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"],g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},y=(0,d.ZP)(m.Z,{name:"MuiLink",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,r[`underline${(0,u.Z)(n.underline)}`],"button"===n.component&&r.button]}})((({theme:e,ownerState:r})=>{const n=(0,l.D)(e,`palette.${(e=>g[e]||e)(r.color)}`)||r.color;return(0,o.Z)({},"none"===r.underline&&{textDecoration:"none"},"hover"===r.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===r.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==n?(0,c.Fq)(n,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===r.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${b.focusVisible}`]:{outline:"auto"}})}));var w=a.forwardRef((function(e,r){const n=(0,f.Z)({props:e,name:"MuiLink"}),{className:l,color:c="primary",component:d="a",onBlur:m,onFocus:h,TypographyClasses:b,underline:g="always",variant:w="inherit"}=n,k=(0,t.Z)(n,Z),{isFocusVisibleRef:O,onBlur:S,onFocus:D,ref:W}=(0,p.Z)(),[P,M]=a.useState(!1),C=(0,x.Z)(r,W),R=(0,o.Z)({},n,{color:c,component:d,focusVisible:P,underline:g,variant:w}),N=(e=>{const{classes:r,component:n,focusVisible:t,underline:o}=e,a={root:["root",`underline${(0,u.Z)(o)}`,"button"===n&&"button",t&&"focusVisible"]};return(0,s.Z)(a,v,r)})(R);return(0,j.jsx)(y,(0,o.Z)({className:(0,i.Z)(N.root,l),classes:b,color:c,component:d,onBlur:e=>{S(e),!1===O.current&&M(!1),m&&m(e)},onFocus:e=>{D(e),!0===O.current&&M(!0),h&&h(e)},ref:C,ownerState:R,variant:w},k))}))},82268:function(e,r,n){"use strict";n.d(r,{Z:function(){return o}});var t=n(52149);function o(e){return(0,t.Z)({},e)}},12195:function(e,r,n){"use strict";n.d(r,{Z:function(){return p}});var t=n(24262),o=n(49474),a=n(19013),i=n(82268),s=n(35077),l=n(13882),c=6e4,u=1440,d=43200,f=525600;function p(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};(0,l.Z)(2,arguments);var p=n.locale||s.Z;if(!p.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var x=(0,o.Z)(e,r);if(isNaN(x))throw new RangeError("Invalid time value");var m,h,v=(0,i.Z)(n);v.addSuffix=Boolean(n.addSuffix),v.comparison=x,x>0?(m=(0,a.Z)(r),h=(0,a.Z)(e)):(m=(0,a.Z)(e),h=(0,a.Z)(r));var b,j=null==n.roundingMethod?"round":String(n.roundingMethod);if("floor"===j)b=Math.floor;else if("ceil"===j)b=Math.ceil;else{if("round"!==j)throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");b=Math.round}var Z,g=h.getTime()-m.getTime(),y=g/c,w=(0,t.Z)(h)-(0,t.Z)(m),k=(g-w)/c;if("second"===(Z=null==n.unit?y<1?"second":y<60?"minute":y<u?"hour":k<d?"day":k<f?"month":"year":String(n.unit))){var O=b(g/1e3);return p.formatDistance("xSeconds",O,v)}if("minute"===Z){var S=b(y);return p.formatDistance("xMinutes",S,v)}if("hour"===Z){var D=b(y/60);return p.formatDistance("xHours",D,v)}if("day"===Z){var W=b(k/u);return p.formatDistance("xDays",W,v)}if("month"===Z){var P=b(k/d);return 12===P&&"month"!==n.unit?p.formatDistance("xYears",1,v):p.formatDistance("xMonths",P,v)}if("year"===Z){var M=b(k/f);return p.formatDistance("xYears",M,v)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}},29833:function(e,r,n){"use strict";n.d(r,{N:function(){return v}});var t=n(59499),o=n(27812),a=n(4730),i=n(67294),s=n(11057),l=n(25464),c=n(18972),u=n(50480),d=n(69368),f=n(93196),p=n(85893),x=["label","onChange","options","value"];function m(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function h(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?m(Object(n),!0).forEach((function(r){(0,t.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var v=function(e){var r=e.label,n=e.onChange,t=e.options,m=e.value,v=void 0===m?[]:m,b=(0,a.Z)(e,x),j=(0,i.useRef)(null),Z=(0,i.useState)(!1),g=Z[0],y=Z[1],w=function(e){var r=(0,o.Z)(v);e.target.checked?r.push(e.target.value):r=r.filter((function(r){return r!==e.target.value})),null===n||void 0===n||n(r)};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.Z,h(h({color:"inherit",endIcon:(0,p.jsx)(f._,{fontSize:"small"}),onClick:function(){y(!0)},ref:j},b),{},{children:r})),(0,p.jsx)(l.Z,{anchorEl:j.current,onClose:function(){y(!1)},open:g,PaperProps:{style:{width:250}},children:t.map((function(e){return(0,p.jsx)(c.Z,{children:(0,p.jsx)(u.Z,{control:(0,p.jsx)(d.Z,{checked:v.includes(e.value),onChange:w,value:e.value}),label:e.label,sx:{flexGrow:1,mr:0}})},e.label)}))})]})}},85750:function(e,r,n){"use strict";n.d(r,{s:function(){return a}});var t=n(82066),o=n(85893),a=(0,t.Z)((0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"ChevronLeft")},42489:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return Q}});var t=n(50029),o=n(87794),a=n.n(o),i=n(67294),s=n(9008),l=n(41664),c=n(87357),u=n(27948),d=n(86886),f=n(15861),p=n(11057),x=n(66242),m=n(44267),h=n(87952),v=n(50122),b=n(93946),j=n(66112),Z=n(84717),g=n(44265),y=n(59499),w=n(79332),k=n(67720),O=n(87918),S=n(50480),D=n(69368),W=n(38290),P=n(29833),M=n(85893);function C(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function R(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?C(Object(n),!0).forEach((function(r){(0,y.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var N=[{label:"Freelance",value:"freelance"},{label:"Full Time",value:"fullTime"},{label:"Part Time",value:"partTime"},{label:"Internship",value:"internship"}],E=[{label:"Novice",value:"novice"},{label:"Expert",value:"expert"}],F=[{label:"Africa",value:"africa"},{label:"Asia",value:"asia"},{label:"Europe",value:"europe"},{label:"North America",value:"northAmerica"},{label:"South America",value:"southAmerica"}],L=[{label:"Web Developer",value:"webDeveloper"},{label:"Android Developer",value:"androidDeveloper"},{label:"iOS Developer",value:"iosDeveloper"}],_=function(e){var r=(0,i.useMemo)((function(){return[{label:"Type",field:"type",value:"freelance",displayValue:"Freelance"},{label:"Type",field:"type",value:"internship",displayValue:"Internship"},{label:"Level",field:"level",value:"novice",displayValue:"Novice"},{label:"Location",field:"location",value:"asia",displayValue:"Asia"},{label:"Role",field:"role",value:"webDeveloper",displayValue:"Web Developer"}]}),[]),n=(0,i.useMemo)((function(){return r.filter((function(e){return"type"===e.field})).map((function(e){return e.value}))}),[r]),t=(0,i.useMemo)((function(){return r.filter((function(e){return"level"===e.field})).map((function(e){return e.value}))}),[r]),o=(0,i.useMemo)((function(){return r.filter((function(e){return"location"===e.field})).map((function(e){return e.value}))}),[r]),a=(0,i.useMemo)((function(){return r.filter((function(e){return"role"===e.field})).map((function(e){return e.value}))}),[r]);return(0,M.jsxs)(x.Z,R(R({},e),{},{children:[(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex",p:2},children:[(0,M.jsx)(W.o,{fontSize:"small"}),(0,M.jsx)(c.Z,{sx:{flexGrow:1,ml:3},children:(0,M.jsx)(w.Z,{disableUnderline:!0,fullWidth:!0,placeholder:"Enter a keyword"})})]}),(0,M.jsx)(k.Z,{}),(0,M.jsx)(c.Z,{sx:{alignItems:"center",display:"flex",flexWrap:"wrap",p:2},children:r.map((function(e,r){return(0,M.jsx)(O.Z,{label:(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex","& span":{fontWeight:600}},children:[(0,M.jsx)("span",{children:e.label}),":"," ",e.displayValue||e.value]}),onDelete:function(){},sx:{m:1},variant:"outlined"},r)}))}),(0,M.jsx)(k.Z,{}),(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex",flexWrap:"wrap",p:1},children:[(0,M.jsx)(P.N,{label:"Type",options:N,value:n}),(0,M.jsx)(P.N,{label:"Level",options:E,value:t}),(0,M.jsx)(P.N,{label:"Location",options:F,value:o}),(0,M.jsx)(P.N,{label:"Role",options:L,value:a}),(0,M.jsx)(c.Z,{sx:{flexGrow:1}}),(0,M.jsx)(S.Z,{control:(0,M.jsx)(D.Z,{defaultChecked:!0}),label:"In network"})]})]}))},z=n(29475),I=n(54722),T=(0,n(82066).Z)((0,M.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,M.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"})}),"BadgeCheckOutlined"),V=n(85750),G=n(38732),A=n(89177),$=n(61131),B=n(55714),H=n(99233),X=function(){var e=(0,I.s)(),r=(0,i.useState)([]),n=r[0],o=r[1];(0,i.useEffect)((function(){B.w.push({event:"page_view"})}),[]);var Z=(0,i.useCallback)((0,t.Z)(a().mark((function r(){var n;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,j.i.getCompanies();case 3:n=r.sent,e()&&o(n),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),console.error(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])}))),[e]);return(0,i.useEffect)((function(){Z()}),[]),(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(s.default,{children:(0,M.jsxs)("title",{children:["Dashboard: Job Browse | ","Picante"]})}),(0,M.jsx)(c.Z,{component:"main",sx:{flexGrow:1,py:8},children:(0,M.jsxs)(u.Z,{maxWidth:"md",children:[(0,M.jsxs)(d.ZP,{alignItems:"center",container:!0,sx:{backgroundColor:"neutral.900",borderRadius:1,color:"#FFFFFF",px:4,py:8},children:[(0,M.jsxs)(d.ZP,{item:!0,xs:12,sm:7,children:[(0,M.jsx)(f.Z,{color:"inherit",variant:"h3",children:"Reach 50K+ potential candidates."}),(0,M.jsx)(f.Z,{color:"neutral.500",sx:{mt:2},variant:"body1",children:"Post your job today for free. Promotions start at $99."}),(0,M.jsx)(p.Z,{color:"secondary",size:"large",sx:{mt:3},variant:"contained",children:"Post a job"})]}),(0,M.jsx)(d.ZP,{item:!0,sm:5,sx:{display:{xs:"none",sm:"block"}},children:(0,M.jsx)("img",{alt:"",src:"/static/mock-images/jobs/job_browse_header.svg"})})]}),(0,M.jsx)(c.Z,{sx:{mt:4},children:(0,M.jsx)(_,{})}),(0,M.jsx)("div",{children:n.map((function(e){return(0,M.jsx)(x.Z,{sx:{mt:4},children:(0,M.jsxs)(m.Z,{children:[(0,M.jsxs)(c.Z,{sx:{display:"flex",flexDirection:{xs:"column",sm:"row"}},children:[(0,M.jsx)(l.default,{href:"/dashboard/jobs/companies/1",passHref:!0,children:(0,M.jsx)(h.Z,{component:"a",src:e.logo,sx:{background:"transparent",mr:2,mb:{xs:2,md:0}},variant:"rounded",children:(0,H.Q)(e.name)})}),(0,M.jsxs)("div",{children:[(0,M.jsx)(l.default,{href:"/dashboard/jobs/companies/1",passHref:!0,children:(0,M.jsx)(v.Z,{color:"textPrimary",variant:"h6",children:e.name})}),(0,M.jsx)(f.Z,{variant:"body2",children:e.shortDescription}),(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex",flexWrap:"wrap",ml:-3,"& > *":{ml:3,mt:1}},children:[(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex"},children:[(0,M.jsx)($.Q,{color:"action",fontSize:"small",sx:{mr:1}}),(0,M.jsx)(f.Z,{color:"textSecondary",noWrap:!0,variant:"overline",children:e.employees})]}),(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex"},children:[(0,M.jsx)(A.U,{color:"action",fontSize:"small",sx:{mr:1}}),(0,M.jsxs)(f.Z,{color:"textSecondary",noWrap:!0,variant:"overline",children:[e.averageRating,"/5"]})]}),e.isVerified&&(0,M.jsxs)(c.Z,{sx:{alignItems:"center",display:"flex"},children:[(0,M.jsx)(T,{color:"success",fontSize:"small",sx:{mr:1}}),(0,M.jsx)(f.Z,{color:"success",noWrap:!0,variant:"overline",children:"Verified"})]})]})]})]}),(0,M.jsx)(c.Z,{sx:{mt:2},children:(0,M.jsx)(z.i,{jobs:e.jobs})})]})},e.id)}))}),(0,M.jsxs)(c.Z,{sx:{display:"flex",justifyContent:"flex-end",mt:4,px:3,py:2},children:[(0,M.jsx)(b.Z,{disabled:!0,children:(0,M.jsx)(V.s,{fontSize:"small"})}),(0,M.jsx)(b.Z,{children:(0,M.jsx)(G._,{fontSize:"small"})})]})]})})]})};X.getLayout=function(e){return(0,M.jsx)(Z.a,{children:(0,M.jsx)(g.c,{children:e})})};var Q=X},19138:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/jobs",function(){return n(42489)}])}},function(e){e.O(0,[6313,2169,5464,9332,1461,9034,619,9419,5263,6141,9774,2888,179],(function(){return r=19138,e(e.s=r);var r}));var r=e.O();_N_E=r}]);