(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[373],{4470:function(e,n,t){!function(e){"use strict";var n=/^(janvier|f\xe9vrier|mars|avril|mai|juin|juillet|ao\xfbt|septembre|octobre|novembre|d\xe9cembre)/i,t=/(janv\.?|f\xe9vr\.?|mars|avr\.?|mai|juin|juil\.?|ao\xfbt|sept\.?|oct\.?|nov\.?|d\xe9c\.?)/i,r=/(janv\.?|f\xe9vr\.?|mars|avr\.?|mai|juin|juil\.?|ao\xfbt|sept\.?|oct\.?|nov\.?|d\xe9c\.?|janvier|f\xe9vrier|mars|avril|mai|juin|juillet|ao\xfbt|septembre|octobre|novembre|d\xe9cembre)/i,s=[/^janv/i,/^f\xe9vr/i,/^mars/i,/^avr/i,/^mai/i,/^juin/i,/^juil/i,/^ao\xfbt/i,/^sept/i,/^oct/i,/^nov/i,/^d\xe9c/i];e.defineLocale("fr",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsRegex:r,monthsShortRegex:r,monthsStrictRegex:n,monthsShortStrictRegex:t,monthsParse:s,longMonthsParse:s,shortMonthsParse:s,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",ss:"%d secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",w:"une semaine",ww:"%d semaines",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|)/,ordinal:function(e,n){switch(n){case"D":return e+(1===e?"er":"");default:case"M":case"Q":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}},week:{dow:1,doy:4}})}(t(381))},8612:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/theologie/gestion",function(){return t(3332)}])},4592:function(e,n,t){"use strict";t.d(n,{F1:function(){return o},V1:function(){return a},gR:function(){return l},pb:function(){return c},pp:function(){return u}});var r=t(4301),s=t.n(r),i=t(3346),o=function(e){return s()("".concat(i.bl,"/theologie"),{method:"POST",headers:{Accept:"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},a=function(e){return s()("".concat(i.bl,"/theologie/").concat(e),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},c=function(){return s()("".concat(i.bl,"/theologies"),{method:"GET"}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},u=function(e){return s()("".concat(i.bl,"/theologie/").concat(e),{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))},l=function(e,n){return s()("".concat(i.bl,"/theologie/").concat(n),{method:"PUT",headers:{Accept:"application/json"},body:e}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},9951:function(e,n,t){"use strict";var r=t(5893),s=(t(7294),t(2103));n.Z=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{}),(0,r.jsx)("div",{className:"p-5 text-center bg-image bg_image_other_header",style:{height:"600px"},children:(0,r.jsx)("div",{className:"mask",style:{backgroundColor:"#00000078"},children:(0,r.jsx)("div",{className:"d-flex justify-content-center align-items-center h-100",children:(0,r.jsxs)("div",{className:"text-white",children:[(0,r.jsx)("h1",{children:"Base Biblique"}),(0,r.jsx)("p",{children:"Retour aux fondements bibliques"})]})})})})]})}},3332:function(e,n,t){"use strict";t.r(n);var r=t(5893),s=t(7294),i=t(9008),o=t(723),a=(t(2854),t(9951)),c=t(1664),u=t.n(c),l=t(1163),d=t(4592),m=t(381),h=t.n(m),f=(t(4470),t(3799));n.default=function(){var e=(0,s.useState)([]),n=e[0],t=e[1],c=(0,s.useState)(""),m=c[0],j=c[1],_=(0,l.useRouter)(),p=(0,s.useContext)(f._),v=p.state,b=(p.dispatch,v.user);(0,s.useEffect)((function(){(null===b||b.role.includes("Utilisateur"))&&_.push("/")}),[]),(0,s.useEffect)((function(){x()}),[]);var x=function(){(0,d.pb)().then((function(e){e.error?console.log(e.error):t(e)}))},g=function(e){window.confirm("Confirmez-vous cette suppression ?")&&function(e){(0,d.pp)(e).then((function(e){e.error?console.log(e.erro):(j(e.message),x())}))}(e)},M=function(e){return(0,r.jsx)(u(),{href:"/admin/theologie/".concat(e.slug),children:(0,r.jsx)("a",{className:"btn m-1 btn-sm btn-dark",children:"Modifier"})})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.default,{children:(0,r.jsx)("title",{children:"Basebiblique | Gestion des enseignements"})}),(0,r.jsx)(a.Z,{}),(0,r.jsx)("div",{className:"all_pages",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)(u(),{href:"/admin",children:(0,r.jsx)("a",{className:"btn m-2 btn-dark",children:"Retour"})}),(0,r.jsx)("h1",{className:"h1",children:"Gestion des enseignements"}),m&&(0,r.jsx)("div",{className:"alert alert-warning",children:m}),n.map((function(e,n){return(0,r.jsxs)("div",{className:"mt-2",children:[(0,r.jsx)("h3",{children:e.title}),(0,r.jsxs)("p",{className:"lead pt-1 pb-1 mark ml-1 p-1 fs-6",children:["Post\xe9 ",h()(e.updatedAt).fromNow()]}),(0,r.jsx)("button",{className:"btn m-1 btn-sm btn-danger",onClick:function(){return g(e.slug)},children:"supprimer"}),M(e)]},n)}))]})}),(0,r.jsx)("div",{className:"container",children:(0,r.jsx)("hr",{className:"my-5"})}),(0,r.jsx)(o.Z,{})]})}}},function(e){e.O(0,[885,82,103,774,888,179],(function(){return n=8612,e(e.s=n);var n}));var n=e.O();_N_E=n}]);