(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{264:function(t,n,e){"use strict";e.d(n,"c",(function(){return s})),e.d(n,"d",(function(){return a})),e.d(n,"e",(function(){return u})),e.d(n,"a",(function(){return c})),e.d(n,"b",(function(){return d}));const i=/#.*$/,r=/\.(md|html)$/,l=/\/$/,o=/^(https?:|mailto:|tel:)/;function s(t){return o.test(t)}function a(t){return/^mailto:/.test(t)}function u(t){return/^tel:/.test(t)}function c(t){if(s(t))return t;const n=t.match(i),e=n?n[0]:"",o=function(t){return decodeURI(t).replace(i,"").replace(r,"")}(t);return l.test(o)?t:o+".html"+e}function d(t,n,e){if(!t)return e;let i,r=n;for(;(r=r.$parent)&&!i;)i=r.$refs[t];return i&&i.$el&&(i=i.$el),i||e}},289:function(t,n,e){},301:function(t,n,e){"use strict";e(289)},317:function(t,n,e){"use strict";e.r(n);var i=e(264),r={props:{link:{required:!0}},computed:{normalizedlink(){return Object(i.a)(this.link)},exact(){return this.$site.locales?Object.keys(this.$site.locales).some(t=>t===this.normalizedlink):"/"===this.normalizedlink}},methods:{isExternal:i.c,isMailto:i.d,isTel:i.e}},l=(e(301),e(4)),o=Object(l.a)(r,(function(){var t=this,n=t._self._c;return t.isExternal(t.normalizedlink)?n("a",{staticClass:"nav-link external",attrs:{href:t.normalizedlink,target:t.isMailto(t.normalizedlink)||t.isTel(t.normalizedlink)?null:"_blank",rel:t.isMailto(t.normalizedlink)||t.isTel(t.normalizedlink)?null:"noopener noreferrer"}},[t._t("default")],2):n("router-link",{staticClass:"nav-link",attrs:{to:t.normalizedlink,exact:t.exact}},[t._t("default")],2)}),[],!1,null,null,null);n.default=o.exports}}]);