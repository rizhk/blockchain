(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7667],{54213:function(e,r,t){"use strict";t.d(r,{A:function(){return l}});var n=t(67294),s=t(11163),o=t(45697),a=t.n(o),i=t(14069),c=t(85893),l=function(e){var r=e.children,t=(0,i.a)(),o=(0,s.useRouter)(),a=(0,n.useState)(!1),l=a[0],u=a[1],d=o.query.disableGuard;return(0,n.useEffect)((function(){o.isReady&&(t.isAuthenticated&&"true"!==d?o.push("/dashboard").catch(console.error):u(!0))}),[o.isReady]),l?(0,c.jsx)(c.Fragment,{children:r}):null};l.propTypes={children:a().node}},14069:function(e,r,t){"use strict";t.d(r,{a:function(){return o}});var n=t(67294),s=t(97981),o=function(){return(0,n.useContext)(s.Vo)}},54722:function(e,r,t){"use strict";t.d(r,{s:function(){return s}});var n=t(67294),s=function(){var e=(0,n.useRef)(!1);return(0,n.useEffect)((function(){return e.current=!0,function(){e.current=!1}}),[]),(0,n.useCallback)((function(){return e.current}),[])}},10190:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return V}});var n=t(67294),s=t(9008),o=t(41664),a=t(11163),i=t(87357),c=t(27948),l=t(66242),u=t(15861),d=t(67720),h=t(50122),p=t(54213),m=t(59499),f=t(50029),x=t(87794),b=t.n(x),j=t(74231),v=t(82580),y=t(50135),g=t(56815),w=t(11057),O=t(46901),Z=t(14069),P=t(54722),S=t(85893);function k(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function E(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?k(Object(t),!0).forEach((function(r){(0,m.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):k(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var C=function(e){var r=(0,P.s)(),t=(0,a.useRouter)(),n=(0,Z.a)().login,s=(0,v.TA)({initialValues:{email:"demo@devias.io",password:"Password123!",submit:null},validationSchema:j.Ry({email:j.Z_().email("Must be a valid email").max(255).required("Email is required")}),onSubmit:function(){var e=(0,f.Z)(b().mark((function e(s,o){var a;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n(s.email,s.password);case 3:r()&&(a=t.query.returnUrl||"/dashboard",t.push(a).catch(console.error)),e.next=17;break;case 6:if(e.prev=6,e.t0=e.catch(0),console.error(e.t0),!r()){e.next=17;break}if("UserNotConfirmedException"!==e.t0.code){e.next=14;break}return sessionStorage.setItem("username",s.email),t.push("/authentication/verify-code").catch(console.error),e.abrupt("return");case 14:o.setStatus({success:!1}),o.setErrors({submit:e.t0.message}),o.setSubmitting(!1);case 17:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(r,t){return e.apply(this,arguments)}}()});return(0,S.jsxs)("form",E(E({noValidate:!0,onSubmit:s.handleSubmit},e),{},{children:[(0,S.jsx)(y.Z,{autoFocus:!0,error:Boolean(s.touched.email&&s.errors.email),fullWidth:!0,helperText:s.touched.email&&s.errors.email,label:"Email Address",margin:"normal",name:"email",onBlur:s.handleBlur,onChange:s.handleChange,type:"email",value:s.values.email}),(0,S.jsx)(y.Z,{error:Boolean(s.touched.password&&s.errors.password),fullWidth:!0,helperText:s.touched.password&&s.errors.password,label:"Password",margin:"normal",name:"password",onBlur:s.handleBlur,onChange:s.handleChange,type:"password",value:s.values.password}),s.errors.submit&&(0,S.jsx)(i.Z,{sx:{mt:3},children:(0,S.jsx)(g.Z,{error:!0,children:s.errors.submit})}),(0,S.jsx)(i.Z,{sx:{mt:2},children:(0,S.jsx)(w.Z,{disabled:s.isSubmitting,fullWidth:!0,size:"large",type:"submit",variant:"contained",children:"Log In"})}),(0,S.jsx)(i.Z,{sx:{mt:3},children:(0,S.jsx)(O.Z,{severity:"info",children:(0,S.jsxs)("div",{children:["You can use"," ",(0,S.jsx)("b",{children:"demo@devias.io"})," ","and password"," ",(0,S.jsx)("b",{children:"Password123!"})]})})})]}))};function B(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function D(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?B(Object(t),!0).forEach((function(r){(0,m.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):B(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var _=function(e){var r=(0,P.s)(),t=(0,a.useRouter)(),s=(0,Z.a)().loginWithRedirect,o=(0,n.useState)(null),c=o[0],l=o[1],u=function(){var e=(0,f.Z)(b().mark((function e(){return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s({returnUrl:t.query.returnUrl||"/dashboard"});case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),console.error(e.t0),r()&&l(e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();return(0,S.jsxs)("div",D(D({},e),{},{children:[c&&(0,S.jsx)(i.Z,{sx:{my:3},children:(0,S.jsx)(g.Z,{error:!0,children:c})}),(0,S.jsx)(i.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,S.jsx)(w.Z,{onClick:u,variant:"contained",children:"Log In"})})]}))};function q(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function W(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?q(Object(t),!0).forEach((function(r){(0,m.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):q(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var R=function(e){var r=(0,P.s)(),t=(0,a.useRouter)(),n=(0,Z.a)(),s=n.signInWithEmailAndPassword,o=n.signInWithGoogle,c=(0,v.TA)({initialValues:{email:"demo@devias.io",password:"Password123!",submit:null},validationSchema:j.Ry({email:j.Z_().email("Must be a valid email").max(255).required("Email is required"),password:j.Z_().max(255).required("Password is required")}),onSubmit:function(){var e=(0,f.Z)(b().mark((function e(n,o){var a;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s(n.email,n.password);case 3:r()&&(a=t.query.returnUrl||"/dashboard",t.push(a).catch(console.error)),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0),r()&&(o.setStatus({success:!1}),o.setErrors({submit:e.t0.message}),o.setSubmitting(!1));case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(r,t){return e.apply(this,arguments)}}()}),l=function(){var e=(0,f.Z)(b().mark((function e(){var n;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o();case 3:r()&&(n=t.query.returnUrl||"/dashboard",t.push(n).catch(console.error)),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return(0,S.jsxs)("div",W(W({},e),{},{children:[(0,S.jsxs)(w.Z,{fullWidth:!0,onClick:l,size:"large",sx:{backgroundColor:"common.white",color:"common.black","&:hover":{backgroundColor:"common.white",color:"common.black"}},variant:"contained",children:[(0,S.jsx)(i.Z,{alt:"Google",component:"img",src:"/static/icons/google.svg",sx:{mr:1}}),"Google"]}),(0,S.jsxs)(i.Z,{sx:{alignItems:"center",display:"flex",mt:2},children:[(0,S.jsx)(i.Z,{sx:{flexGrow:1},children:(0,S.jsx)(d.Z,{orientation:"horizontal"})}),(0,S.jsx)(u.Z,{color:"textSecondary",sx:{m:2},variant:"body1",children:"OR"}),(0,S.jsx)(i.Z,{sx:{flexGrow:1},children:(0,S.jsx)(d.Z,{orientation:"horizontal"})})]}),(0,S.jsxs)("form",{noValidate:!0,onSubmit:c.handleSubmit,children:[(0,S.jsx)(y.Z,{error:Boolean(c.touched.email&&c.errors.email),fullWidth:!0,helperText:c.touched.email&&c.errors.email,label:"Email Address",margin:"normal",name:"email",onBlur:c.handleBlur,onChange:c.handleChange,type:"email",value:c.values.email}),(0,S.jsx)(y.Z,{error:Boolean(c.touched.password&&c.errors.password),fullWidth:!0,helperText:c.touched.password&&c.errors.password,label:"Password",margin:"normal",name:"password",onBlur:c.handleBlur,onChange:c.handleChange,type:"password",value:c.values.password}),c.errors.submit&&(0,S.jsx)(i.Z,{sx:{mt:3},children:(0,S.jsx)(g.Z,{error:!0,children:c.errors.submit})}),(0,S.jsx)(i.Z,{sx:{mt:2},children:(0,S.jsx)(w.Z,{disabled:c.isSubmitting,fullWidth:!0,size:"large",type:"submit",variant:"contained",children:"Log In"})}),(0,S.jsx)(i.Z,{sx:{mt:2},children:(0,S.jsx)(O.Z,{severity:"info",children:(0,S.jsxs)("div",{children:["You can use"," ",(0,S.jsx)("b",{children:"demo@devias.io"})," ","and password"," ",(0,S.jsx)("b",{children:"Password123!"})]})})})]})]}))};function T(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function A(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?T(Object(t),!0).forEach((function(r){(0,m.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):T(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var G=function(e){var r=(0,P.s)(),t=(0,a.useRouter)(),n=(0,Z.a)().login,s=(0,v.TA)({initialValues:{email:"demo@picante.io",password:"Password123!",submit:null},validationSchema:j.Ry({email:j.Z_().email("Must be a valid email").max(255).required("Email is required"),password:j.Z_().max(255).required("Password is required")}),onSubmit:function(){var e=(0,f.Z)(b().mark((function e(s,o){var a;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n(s.email,s.password);case 3:r()&&(a=t.query.returnUrl||"/dashboard",t.push(a).catch(console.error)),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0),r()&&(o.setStatus({success:!1}),o.setErrors({submit:e.t0.message}),o.setSubmitting(!1));case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(r,t){return e.apply(this,arguments)}}()});return(0,S.jsxs)("form",A(A({noValidate:!0,onSubmit:s.handleSubmit},e),{},{children:[(0,S.jsx)(y.Z,{autoFocus:!0,error:Boolean(s.touched.email&&s.errors.email),fullWidth:!0,helperText:s.touched.email&&s.errors.email,label:"Email Address",margin:"normal",name:"email",onBlur:s.handleBlur,onChange:s.handleChange,type:"email",value:s.values.email}),(0,S.jsx)(y.Z,{error:Boolean(s.touched.password&&s.errors.password),fullWidth:!0,helperText:s.touched.password&&s.errors.password,label:"Password",margin:"normal",name:"password",onBlur:s.handleBlur,onChange:s.handleChange,type:"password",value:s.values.password}),s.errors.submit&&(0,S.jsx)(i.Z,{sx:{mt:3},children:(0,S.jsx)(g.Z,{error:!0,children:s.errors.submit})}),(0,S.jsx)(i.Z,{sx:{mt:2},children:(0,S.jsx)(w.Z,{disabled:s.isSubmitting,fullWidth:!0,size:"large",type:"submit",variant:"contained",children:"Log In"})}),(0,S.jsx)(i.Z,{sx:{mt:2},children:(0,S.jsx)(O.Z,{severity:"info",children:(0,S.jsxs)("div",{children:["Use"," ",(0,S.jsx)("b",{children:"demo@picante.io"})," ","and password"," ",(0,S.jsx)("b",{children:"Password123!"})]})})})]}))},I=t(22249),U=t(55714),L=function(){var e=(0,a.useRouter)(),r=(0,Z.a)().platform,t=e.query.disableGuard;return(0,n.useEffect)((function(){U.w.push({event:"page_view"})}),[]),(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s.default,{children:(0,S.jsxs)("title",{children:["Login | ","Picante"]})}),(0,S.jsx)(i.Z,{component:"main",sx:{backgroundColor:"background.default",display:"flex",flexDirection:"column",minHeight:"100vh"},children:(0,S.jsx)(c.Z,{maxWidth:"sm",sx:{py:{xs:"60px",md:"120px"}},children:(0,S.jsxs)(l.Z,{elevation:16,sx:{p:4},children:[(0,S.jsxs)(i.Z,{sx:{alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"},children:[(0,S.jsx)(o.default,{href:"/",passHref:!0,children:(0,S.jsx)("a",{children:(0,S.jsx)(I.T,{sx:{height:40,width:40}})})}),(0,S.jsx)(u.Z,{variant:"h4",children:"Log in"}),(0,S.jsx)(u.Z,{color:"textSecondary",sx:{mt:2},variant:"body2",children:"Sign in on the internal platform"})]}),(0,S.jsxs)(i.Z,{sx:{flexGrow:1,mt:3},children:["Amplify"===r&&(0,S.jsx)(C,{}),"Auth0"===r&&(0,S.jsx)(_,{}),"Firebase"===r&&(0,S.jsx)(R,{}),"JWT"===r&&(0,S.jsx)(G,{})]}),(0,S.jsx)(d.Z,{sx:{my:3}}),(0,S.jsx)("div",{children:(0,S.jsx)(o.default,{href:t?"/authentication/register?disableGuard=".concat(t):"/authentication/register",passHref:!0,children:(0,S.jsx)(h.Z,{color:"textSecondary",variant:"body2",children:"Create new account"})})}),"Amplify"===r&&(0,S.jsx)(i.Z,{sx:{mt:1},children:(0,S.jsx)(o.default,{href:t?"/authentication/password-recovery?disableGuard=".concat(t):"/authentication/password-recovery",passHref:!0,children:(0,S.jsx)(h.Z,{color:"textSecondary",variant:"body2",children:"Forgot password"})})})]})})})]})};L.getLayout=function(e){return(0,S.jsx)(p.A,{children:e})};var V=L},89355:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/authentication/login",function(){return t(10190)}])}},function(e){e.O(0,[6313,5464,9332,135,939,551,2321,9774,2888,179],(function(){return r=89355,e(e.s=r);var r}));var r=e.O();_N_E=r}]);