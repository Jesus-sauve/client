(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[53],{1563:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/enseignements/[slug]",function(){return t(3056)}])},2584:function(e,n,t){"use strict";t.d(n,{E9:function(){return l},W1:function(){return f},bd:function(){return m},jv:function(){return i},kE:function(){return d},mx:function(){return h},pb:function(){return u},qn:function(){return a}});var r=t(4301),s=t.n(r),c=t(3346),o=t(7563),i=function(e){return s()("".concat(c.bl,"/enseignement"),{method:"POST",headers:{Accept:"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},a=function(e,n){var t={limit:n,skip:e};return s()("".concat(c.bl,"/enseignements-categories"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},l=function(e){return s()("".concat(c.bl,"/enseignement/").concat(e),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},u=function(e){return s()("".concat(c.bl,"/enseignements"),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},d=function(e){return s()("".concat(c.bl,"/enseignement/").concat(e),{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},m=function(e,n){return s()("".concat(c.bl,"/enseignement/").concat(n),{method:"PUT",headers:{Accept:"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},h=function(e){console.log("search params",e);var n=o.stringify(e);return console.log("query params",n),s()("".concat(c.bl,"/enseignements/recherche?").concat(n),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},f=function(e){return s()("".concat(c.bl,"/enseignements/related"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},9951:function(e,n,t){"use strict";var r=t(5893),s=(t(7294),t(2103));n.Z=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{}),(0,r.jsx)("div",{className:"p-5 text-center bg-image bg_image_other_header",style:{height:"600px"},children:(0,r.jsx)("div",{className:"mask",style:{backgroundColor:"#00000078"},children:(0,r.jsx)("div",{className:"d-flex justify-content-center align-items-center h-100",children:(0,r.jsxs)("div",{className:"text-white",children:[(0,r.jsx)("h1",{children:"Base Biblique"}),(0,r.jsx)("p",{children:"Retour aux fondements bibliques"})]})})})})]})}},3056:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return B}});var r=t(4051),s=t.n(r),c=t(5893),o=t(7294),i=t(9008),a=t(723),l=t(9951),u=t(1664),d=t.n(u),m=t(3346),h=t(381),f=t.n(h),p=(t(4470),t(2584)),g=t(5697),j=t.n(g),y=t(3454);function x(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function b(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},N(e)}function w(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}function _(e,n){return!n||"object"!==k(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function O(e,n){return O=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},O(e,n)}var k=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function E(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=N(e);if(n){var s=N(this).constructor;t=Reflect.construct(r,arguments,s)}else t=r.apply(this,arguments);return _(this,t)}}var P=m.CT,S=m.yK;function T(){if(void 0===window.DISQUS){var e=document.createElement("script");e.async=!0,e.src="https://"+P+".disqus.com/embed.js",document.getElementsByTagName("head")[0].appendChild(e)}else window.DISQUS.reset({reload:!0})}var q=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&O(e,n)}(o,e);var n,t,r,s=E(o);function o(){return x(this,o),s.apply(this,arguments)}return n=o,t=[{key:"shouldComponentUpdate",value:function(e){return this.props.id!==e.id||this.props.title!==e.title||this.props.path!==e.path}},{key:"componentDidMount",value:function(){T()}},{key:"componentDidUpdate",value:function(){T()}},{key:"render",value:function(){var e=this.props,n=e.id,t=e.title,r=e.path,s=w(e,["id","title","path"]);return y.env.BROWSER&&(window.disqus_shortname=P,window.disqus_identifier=n,window.disqus_title=t,window.disqus_url=S+r),(0,c.jsx)("div",function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){v(e,n,t[n])}))}return e}({},s,{id:"disqus_thread"}))}}],t&&b(n.prototype,t),r&&b(n,r),o}(o.Component);v(q,"propTypes",{id:j().string.isRequired,title:j().string.isRequired,path:j().string.isRequired});var C=q;function R(e,n,t,r,s,c,o){try{var i=e[c](o),a=i.value}catch(l){return void t(l)}i.done?n(a):Promise.resolve(a).then(r,s)}var A=function(e){var n=e.enseignement,t=e.query,r=(0,o.useState)([]),u=r[0],h=r[1],g=(0,o.useState)([]),j=g[0],y=g[1],x=function(){var e,n=(e=s().mark((function e(){var n,t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(m.bl,"/categories"));case 3:return n=e.sent,e.next=6,n.json();case 6:t=e.sent,h(t),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})),function(){var n=this,t=arguments;return new Promise((function(r,s){var c=e.apply(n,t);function o(e){R(c,r,s,o,i,"next",e)}function i(e){R(c,r,s,o,i,"throw",e)}o(void 0)}))});return function(){return n.apply(this,arguments)}}();(0,o.useEffect)((function(){x(),(0,p.W1)({enseignement:n}).then((function(e){e.error?console.log(e.error):y(e)}))}),[]);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(i.default,{children:[(0,c.jsxs)("title",{children:[n.title," | ",m.iC]}),(0,c.jsx)("meta",{name:"description",content:n.mdesc}),(0,c.jsx)("link",{rel:"canonical",href:"".concat(m.yK,"/enseignements/").concat(t.slug)}),(0,c.jsx)("meta",{property:"og:title",content:"".concat(n.title," | ").concat(m.iC)}),(0,c.jsx)("meta",{property:"og:description",content:n.mdesc}),(0,c.jsx)("meta",{property:"og:type",content:"webiste"}),(0,c.jsx)("meta",{property:"og:url",content:"".concat(m.yK,"/enseignements/").concat(t.slug)}),(0,c.jsx)("meta",{property:"og:site_name",content:"".concat(m.iC)}),(0,c.jsx)("meta",{property:"og:image",content:"".concat(m.yK,"/static/images/bible.jpg")}),(0,c.jsx)("meta",{property:"og:image:secure_url",content:"".concat(m.yK,"/static/images/bible.jpg")}),(0,c.jsx)("meta",{property:"og:image:type",content:"image/jpg"})]}),(0,c.jsx)(l.Z,{}),(0,c.jsx)("div",{className:"all_pages page_enseignement_seul",children:(0,c.jsxs)("div",{className:"container",children:[(0,c.jsx)(d(),{href:"/enseignements",children:(0,c.jsx)("a",{className:"btn btn-dark my-5",children:"Retour"})}),(0,c.jsxs)("div",{className:"row",children:[(0,c.jsxs)("div",{className:"col-md-9",children:[(0,c.jsx)("h1",{className:"h1",children:n.title}),(0,c.jsxs)("p",{className:"lead pt-1 pb-1 mark ml-1 p-1 fs-6",children:["Post\xe9 ",f()(n.updatedAt).fromNow()]}),(0,c.jsx)("section",{children:(0,c.jsx)("div",{className:"pb-3 mt-4",dangerouslySetInnerHTML:{__html:n.body}})})]}),(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)("section",{children:(0,c.jsx)("div",{className:"pb-3",children:function(e){return e.categories.map((function(e,n){return(0,c.jsx)(d(),{href:"/category/".concat(e.slug),children:(0,c.jsx)("a",{className:"btn btn-sm btn-dark m-1 ",children:e.name})},n)}))}(n)})}),(0,c.jsx)("hr",{className:"my-5"}),(0,c.jsx)("section",{children:(0,c.jsxs)("div",{className:"bg-image hover-overlay ripple shadow-2-strong rounded-5","data-mdb-ripple-color":"light",children:[(0,c.jsx)("img",{src:"".concat(m.bl,"/enseignement/photo/").concat(n.slug),alt:n.title,className:"img img-fluid",style:{maxHeight:"auto",width:"100%",minHeight:"auto"}}),(0,c.jsx)("a",{href:"#!",children:(0,c.jsx)("div",{className:"mask",style:{backgroundColor:"#00000078"}})})]})}),(0,c.jsx)("hr",{className:"my-5"}),(0,c.jsx)("h4",{className:"mb-5 titres_bas_presentation",children:(0,c.jsx)("strong",{children:"Nos diff\xe9rentes cat\xe9gories"})}),(0,c.jsx)("section",{children:u.map((function(e){return(0,c.jsx)(d(),{href:"/category/".concat(e.slug),children:(0,c.jsx)("a",{className:"btn btn-sm btn-dark m-1 ",children:e.name})},e._id)}))})]})]}),(0,c.jsx)("hr",{className:"my-5"}),(0,c.jsxs)("div",{children:[(0,c.jsx)("h4",{className:"mb-5 titres_bas_presentation text-center",children:(0,c.jsx)("strong",{children:"Enseignements similaires"})}),(0,c.jsx)("div",{className:"row",children:j.map((function(e){return(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("div",{className:"card",style:{width:"350px"},children:[(0,c.jsx)("section",{children:(0,c.jsx)(d(),{href:"/enseignements/".concat(e.slug),children:(0,c.jsx)("a",{children:(0,c.jsxs)("div",{className:"bg-image hover-overlay ripple","data-mdb-ripple-color":"light",children:[(0,c.jsx)("img",{className:"img img-fluid",src:"".concat(m.bl,"/enseignement/photo/").concat(e.slug),alt:e.title,style:{height:"15rem"}}),(0,c.jsx)("div",{className:"mask",style:{backgroundColor:"#00000078"}})]})})})}),(0,c.jsx)("div",{className:"card-body",style:{height:"13rem"},children:(0,c.jsxs)("section",{children:[(0,c.jsx)(d(),{href:"/enseignements/".concat(e.slug),children:(0,c.jsx)("h5",{className:"card-title text-danger",children:e.title})}),(0,c.jsx)("div",{className:"pb-3 mt-4 text-center",dangerouslySetInnerHTML:{__html:e.excerpt}})]})}),(0,c.jsxs)("div",{className:"card-body text-center",children:[(0,c.jsx)(d(),{href:"/enseignements/".concat(e.slug),children:(0,c.jsx)("a",{className:"btn myBtn text-white",children:"Lire plus"})}),(0,c.jsxs)("p",{className:"mark ml-1 p-1 fs-6",children:["Post\xe9 ",f()(e.updatedAt).fromNow()]})]})]})},e._id)}))})]})]})}),(0,c.jsxs)("div",{className:"container",children:[(0,c.jsx)("hr",{className:"my-5"}),(0,c.jsx)("div",{children:(0,c.jsx)(C,{id:n._id,title:n.title,path:"/enseignement/".concat(n.slug)})}),(0,c.jsx)("hr",{className:"my-5"})]}),(0,c.jsx)(a.Z,{})]})};A.getInitialProps=function(e){var n=e.query;return(0,p.E9)(n.slug).then((function(e){if(!e.error)return{enseignement:e,query:n};console.log(e.error)}))};var B=A}},function(e){e.O(0,[885,82,431,103,774,888,179],(function(){return n=1563,e(e.s=n);var n}));var n=e.O();_N_E=n}]);