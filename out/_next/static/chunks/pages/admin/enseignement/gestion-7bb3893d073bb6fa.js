(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[159],{4020:function(e){"use strict";var n="%[a-f0-9]{2}",t=new RegExp(n,"gi"),r=new RegExp("("+n+")+","gi");function o(e,n){try{return decodeURIComponent(e.join(""))}catch(s){}if(1===e.length)return e;n=n||1;var t=e.slice(0,n),r=e.slice(n);return Array.prototype.concat.call([],o(t),o(r))}function s(e){try{return decodeURIComponent(e)}catch(s){for(var n=e.match(t),r=1;r<n.length;r++)n=(e=o(n,r).join("")).match(t);return e}}e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(n){return function(e){for(var t={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},o=r.exec(e);o;){try{t[o[0]]=decodeURIComponent(o[0])}catch(n){var i=s(o[0]);i!==o[0]&&(t[o[0]]=i)}o=r.exec(e)}t["%C2"]="\ufffd";for(var a=Object.keys(t),c=0;c<a.length;c++){var u=a[c];e=e.replace(new RegExp(u,"g"),t[u])}return e}(e)}}},2806:function(e){"use strict";e.exports=function(e,n){for(var t={},r=Object.keys(e),o=Array.isArray(n),s=0;s<r.length;s++){var i=r[s],a=e[i];(o?-1!==n.indexOf(i):n(i,a,e))&&(t[i]=a)}return t}},4470:function(e,n,t){!function(e){"use strict";var n=/^(janvier|f\xe9vrier|mars|avril|mai|juin|juillet|ao\xfbt|septembre|octobre|novembre|d\xe9cembre)/i,t=/(janv\.?|f\xe9vr\.?|mars|avr\.?|mai|juin|juil\.?|ao\xfbt|sept\.?|oct\.?|nov\.?|d\xe9c\.?)/i,r=/(janv\.?|f\xe9vr\.?|mars|avr\.?|mai|juin|juil\.?|ao\xfbt|sept\.?|oct\.?|nov\.?|d\xe9c\.?|janvier|f\xe9vrier|mars|avril|mai|juin|juillet|ao\xfbt|septembre|octobre|novembre|d\xe9cembre)/i,o=[/^janv/i,/^f\xe9vr/i,/^mars/i,/^avr/i,/^mai/i,/^juin/i,/^juil/i,/^ao\xfbt/i,/^sept/i,/^oct/i,/^nov/i,/^d\xe9c/i];e.defineLocale("fr",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsRegex:r,monthsShortRegex:r,monthsStrictRegex:n,monthsShortStrictRegex:t,monthsParse:o,longMonthsParse:o,shortMonthsParse:o,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",ss:"%d secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",w:"une semaine",ww:"%d semaines",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|)/,ordinal:function(e,n){switch(n){case"D":return e+(1===e?"er":"");default:case"M":case"Q":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}},week:{dow:1,doy:4}})}(t(381))},8076:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/enseignement/gestion",function(){return t(9874)}])},2584:function(e,n,t){"use strict";t.d(n,{E9:function(){return u},W1:function(){return p},bd:function(){return m},jv:function(){return a},kE:function(){return d},mx:function(){return f},pb:function(){return l},qn:function(){return c}});var r=t(4301),o=t.n(r),s=t(3346),i=t(7563),a=function(e){return o()("".concat(s.bl,"/enseignement"),{method:"POST",headers:{Accept:"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},c=function(e,n){var t={limit:n,skip:e};return o()("".concat(s.bl,"/enseignements-categories"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},u=function(e){return o()("".concat(s.bl,"/enseignement/").concat(e),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},l=function(e){return o()("".concat(s.bl,"/enseignements"),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},d=function(e){return o()("".concat(s.bl,"/enseignement/").concat(e),{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},m=function(e,n){return o()("".concat(s.bl,"/enseignement/").concat(n),{method:"PUT",headers:{Accept:"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},f=function(e){console.log("search params",e);var n=i.stringify(e);return console.log("query params",n),o()("".concat(s.bl,"/enseignements/recherche?").concat(n),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},p=function(e){return o()("".concat(s.bl,"/enseignements/related"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},9951:function(e,n,t){"use strict";var r=t(5893),o=(t(7294),t(2103));n.Z=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{}),(0,r.jsx)("div",{className:"p-5 text-center bg-image bg_image_other_header",style:{height:"600px"},children:(0,r.jsx)("div",{className:"mask",style:{backgroundColor:"#00000078"},children:(0,r.jsx)("div",{className:"d-flex justify-content-center align-items-center h-100",children:(0,r.jsxs)("div",{className:"text-white",children:[(0,r.jsx)("h1",{children:"Base Biblique"}),(0,r.jsx)("p",{children:"Retour aux fondements bibliques"})]})})})})]})}},9874:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(7294),s=t(9008),i=t(723),a=t(1163),c=(t(2854),t(9951)),u=t(1664),l=t.n(u),d=t(2584),m=t(381),f=t.n(m),p=(t(4470),t(3799));n.default=function(){var e=(0,o.useState)([]),n=e[0],t=e[1],u=(0,o.useState)(""),m=u[0],h=u[1],g=(0,a.useRouter)(),j=(0,o.useContext)(p._),y=j.state,b=(j.dispatch,y.user);(0,o.useEffect)((function(){(null===b||b.role.includes("Utilisateur"))&&g.push("/")}),[]),(0,o.useEffect)((function(){v()}),[]);var v=function(){(0,d.pb)().then((function(e){e.error?console.log(e.error):t(e)}))},x=function(e){window.confirm("Confirmez-vous cette suppression ?")&&function(e){(0,d.kE)(e).then((function(e){e.error?console.log(e.erro):(h(e.message),v())}))}(e)},_=function(e){return(0,r.jsx)(l(),{href:"/admin/enseignement/".concat(e.slug),children:(0,r.jsx)("a",{className:"btn m-1 btn-sm btn-dark",children:"Modifier"})})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.default,{children:(0,r.jsx)("title",{children:"Basebiblique | Gestion des enseignements"})}),(0,r.jsx)(c.Z,{}),(0,r.jsx)("div",{className:"all_pages",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("h1",{className:"h1",children:"Gestion des enseignements"}),m&&(0,r.jsx)("div",{className:"alert alert-warning",children:m}),n.map((function(e,n){return(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("h3",{children:e.title}),(0,r.jsxs)("p",{className:"lead pt-1 pb-1 mark ml-1 p-1 fs-6",children:["Post\xe9 ",f()(e.updatedAt).fromNow()]}),(0,r.jsx)("button",{className:"btn m-1 btn-sm btn-danger",onClick:function(){return x(e.slug)},children:"supprimer"}),_(e)]},n)}))]})}),(0,r.jsx)("div",{className:"container",children:(0,r.jsx)("hr",{className:"my-5"})}),(0,r.jsx)(i.Z,{})]})}},7563:function(e,n,t){"use strict";const r=t(8218),o=t(4020),s=t(500),i=t(2806),a=Symbol("encodeFragmentIdentifier");function c(e){if("string"!==typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function u(e,n){return n.encode?n.strict?r(e):encodeURIComponent(e):e}function l(e,n){return n.decode?o(e):e}function d(e){return Array.isArray(e)?e.sort():"object"===typeof e?d(Object.keys(e)).sort(((e,n)=>Number(e)-Number(n))).map((n=>e[n])):e}function m(e){const n=e.indexOf("#");return-1!==n&&(e=e.slice(0,n)),e}function f(e){const n=(e=m(e)).indexOf("?");return-1===n?"":e.slice(n+1)}function p(e,n){return n.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!n.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function h(e,n){c((n=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},n)).arrayFormatSeparator);const t=function(e){let n;switch(e.arrayFormat){case"index":return(e,t,r)=>{n=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),n?(void 0===r[e]&&(r[e]={}),r[e][n[1]]=t):r[e]=t};case"bracket":return(e,t,r)=>{n=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),n?void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=[t]:r[e]=t};case"colon-list-separator":return(e,t,r)=>{n=/(:list)$/.exec(e),e=e.replace(/:list$/,""),n?void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=[t]:r[e]=t};case"comma":case"separator":return(n,t,r)=>{const o="string"===typeof t&&t.includes(e.arrayFormatSeparator),s="string"===typeof t&&!o&&l(t,e).includes(e.arrayFormatSeparator);t=s?l(t,e):t;const i=o||s?t.split(e.arrayFormatSeparator).map((n=>l(n,e))):null===t?t:l(t,e);r[n]=i};case"bracket-separator":return(n,t,r)=>{const o=/(\[\])$/.test(n);if(n=n.replace(/\[\]$/,""),!o)return void(r[n]=t?l(t,e):t);const s=null===t?[]:t.split(e.arrayFormatSeparator).map((n=>l(n,e)));void 0!==r[n]?r[n]=[].concat(r[n],s):r[n]=s};default:return(e,n,t)=>{void 0!==t[e]?t[e]=[].concat(t[e],n):t[e]=n}}}(n),r=Object.create(null);if("string"!==typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const o of e.split("&")){if(""===o)continue;let[e,i]=s(n.decode?o.replace(/\+/g," "):o,"=");i=void 0===i?null:["comma","separator","bracket-separator"].includes(n.arrayFormat)?i:l(i,n),t(l(e,n),i,r)}for(const o of Object.keys(r)){const e=r[o];if("object"===typeof e&&null!==e)for(const t of Object.keys(e))e[t]=p(e[t],n);else r[o]=p(e,n)}return!1===n.sort?r:(!0===n.sort?Object.keys(r).sort():Object.keys(r).sort(n.sort)).reduce(((e,n)=>{const t=r[n];return Boolean(t)&&"object"===typeof t&&!Array.isArray(t)?e[n]=d(t):e[n]=t,e}),Object.create(null))}n.extract=f,n.parse=h,n.stringify=(e,n)=>{if(!e)return"";c((n=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},n)).arrayFormatSeparator);const t=t=>{return n.skipNull&&(null===(r=e[t])||void 0===r)||n.skipEmptyString&&""===e[t];var r},r=function(e){switch(e.arrayFormat){case"index":return n=>(t,r)=>{const o=t.length;return void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?t:null===r?[...t,[u(n,e),"[",o,"]"].join("")]:[...t,[u(n,e),"[",u(o,e),"]=",u(r,e)].join("")]};case"bracket":return n=>(t,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?t:null===r?[...t,[u(n,e),"[]"].join("")]:[...t,[u(n,e),"[]=",u(r,e)].join("")];case"colon-list-separator":return n=>(t,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?t:null===r?[...t,[u(n,e),":list="].join("")]:[...t,[u(n,e),":list=",u(r,e)].join("")];case"comma":case"separator":case"bracket-separator":{const n="bracket-separator"===e.arrayFormat?"[]=":"=";return t=>(r,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?r:(o=null===o?"":o,0===r.length?[[u(t,e),n,u(o,e)].join("")]:[[r,u(o,e)].join(e.arrayFormatSeparator)])}default:return n=>(t,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?t:null===r?[...t,u(n,e)]:[...t,[u(n,e),"=",u(r,e)].join("")]}}(n),o={};for(const i of Object.keys(e))t(i)||(o[i]=e[i]);const s=Object.keys(o);return!1!==n.sort&&s.sort(n.sort),s.map((t=>{const o=e[t];return void 0===o?"":null===o?u(t,n):Array.isArray(o)?0===o.length&&"bracket-separator"===n.arrayFormat?u(t,n)+"[]":o.reduce(r(t),[]).join("&"):u(t,n)+"="+u(o,n)})).filter((e=>e.length>0)).join("&")},n.parseUrl=(e,n)=>{n=Object.assign({decode:!0},n);const[t,r]=s(e,"#");return Object.assign({url:t.split("?")[0]||"",query:h(f(e),n)},n&&n.parseFragmentIdentifier&&r?{fragmentIdentifier:l(r,n)}:{})},n.stringifyUrl=(e,t)=>{t=Object.assign({encode:!0,strict:!0,[a]:!0},t);const r=m(e.url).split("?")[0]||"",o=n.extract(e.url),s=n.parse(o,{sort:!1}),i=Object.assign(s,e.query);let c=n.stringify(i,t);c&&(c=`?${c}`);let l=function(e){let n="";const t=e.indexOf("#");return-1!==t&&(n=e.slice(t)),n}(e.url);return e.fragmentIdentifier&&(l=`#${t[a]?u(e.fragmentIdentifier,t):e.fragmentIdentifier}`),`${r}${c}${l}`},n.pick=(e,t,r)=>{r=Object.assign({parseFragmentIdentifier:!0,[a]:!1},r);const{url:o,query:s,fragmentIdentifier:c}=n.parseUrl(e,r);return n.stringifyUrl({url:o,query:i(s,t),fragmentIdentifier:c},r)},n.exclude=(e,t,r)=>{const o=Array.isArray(t)?e=>!t.includes(e):(e,n)=>!t(e,n);return n.pick(e,o,r)}},500:function(e){"use strict";e.exports=(e,n)=>{if("string"!==typeof e||"string"!==typeof n)throw new TypeError("Expected the arguments to be of type `string`");if(""===n)return[e];const t=e.indexOf(n);return-1===t?[e]:[e.slice(0,t),e.slice(t+n.length)]}},8218:function(e){"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))}},function(e){e.O(0,[885,82,103,774,888,179],(function(){return n=8076,e(e.s=n);var n}));var n=e.O();_N_E=n}]);