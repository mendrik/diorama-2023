var Jr=Object.defineProperty;var Kr=(m,d,v)=>d in m?Jr(m,d,{enumerable:!0,configurable:!0,writable:!0,value:v}):m[d]=v;var wt=(m,d,v)=>(Kr(m,typeof d!="symbol"?d+"":d,v),v);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const m=Symbol("Comlink.proxy"),d=Symbol("Comlink.endpoint"),v=Symbol("Comlink.releaseProxy"),P=Symbol("Comlink.finalizer"),j=Symbol("Comlink.thrown"),V=r=>typeof r=="object"&&r!==null||typeof r=="function",St={canHandle:r=>V(r)&&r[m],serialize(r){const{port1:t,port2:e}=new MessageChannel;return C(r,t),[e,[e]]},deserialize(r){return r.start(),Et(r)}},_t={canHandle:r=>V(r)&&j in r,serialize({value:r}){let t;return r instanceof Error?t={isError:!0,value:{message:r.message,name:r.name,stack:r.stack}}:t={isError:!1,value:r},[t,[]]},deserialize(r){throw r.isError?Object.assign(new Error(r.value.message),r.value):r.value}},X=new Map([["proxy",St],["throw",_t]]);function Ot(r,t){for(const e of r)if(t===e||e==="*"||e instanceof RegExp&&e.test(t))return!0;return!1}function C(r,t=globalThis,e=["*"]){t.addEventListener("message",function n(a){if(!a||!a.data)return;if(!Ot(e,a.origin)){console.warn(`Invalid origin '${a.origin}' for comlink proxy`);return}const{id:u,type:o,path:i}=Object.assign({path:[]},a.data),l=(a.data.argumentList||[]).map(w);let f;try{const g=i.slice(0,-1).reduce((h,b)=>h[b],r),y=i.reduce((h,b)=>h[b],r);switch(o){case"GET":f=y;break;case"SET":g[i.slice(-1)[0]]=w(a.data.value),f=!0;break;case"APPLY":f=y.apply(g,l);break;case"CONSTRUCT":{const h=new y(...l);f=Tt(h)}break;case"ENDPOINT":{const{port1:h,port2:b}=new MessageChannel;C(r,b),f=kt(h,[h])}break;case"RELEASE":f=void 0;break;default:return}}catch(g){f={value:g,[j]:0}}Promise.resolve(f).catch(g=>({value:g,[j]:0})).then(g=>{const[y,h]=N(g);t.postMessage(Object.assign(Object.assign({},y),{id:u}),h),o==="RELEASE"&&(t.removeEventListener("message",n),G(t),P in r&&typeof r[P]=="function"&&r[P]())}).catch(g=>{const[y,h]=N({value:new TypeError("Unserializable return value"),[j]:0});t.postMessage(Object.assign(Object.assign({},y),{id:u}),h)})}),t.start&&t.start()}function At(r){return r.constructor.name==="MessagePort"}function G(r){At(r)&&r.close()}function Et(r,t){return z(r,[],t)}function R(r){if(r)throw new Error("Proxy has been released and is not useable")}function Y(r){return S(r,{type:"RELEASE"}).then(()=>{G(r)})}const k=new WeakMap,T="FinalizationRegistry"in globalThis&&new FinalizationRegistry(r=>{const t=(k.get(r)||0)-1;k.set(r,t),t===0&&Y(r)});function bt(r,t){const e=(k.get(t)||0)+1;k.set(t,e),T&&T.register(r,t,r)}function jt(r){T&&T.unregister(r)}function z(r,t=[],e=function(){}){let n=!1;const a=new Proxy(e,{get(u,o){if(R(n),o===v)return()=>{jt(a),Y(r),n=!0};if(o==="then"){if(t.length===0)return{then:()=>a};const i=S(r,{type:"GET",path:t.map(l=>l.toString())}).then(w);return i.then.bind(i)}return z(r,[...t,o])},set(u,o,i){R(n);const[l,f]=N(i);return S(r,{type:"SET",path:[...t,o].map(g=>g.toString()),value:l},f).then(w)},apply(u,o,i){R(n);const l=t[t.length-1];if(l===d)return S(r,{type:"ENDPOINT"}).then(w);if(l==="bind")return z(r,t.slice(0,-1));const[f,g]=Z(i);return S(r,{type:"APPLY",path:t.map(y=>y.toString()),argumentList:f},g).then(w)},construct(u,o){R(n);const[i,l]=Z(o);return S(r,{type:"CONSTRUCT",path:t.map(f=>f.toString()),argumentList:i},l).then(w)}});return bt(a,r),a}function Rt(r){return Array.prototype.concat.apply([],r)}function Z(r){const t=r.map(N);return[t.map(e=>e[0]),Rt(t.map(e=>e[1]))]}const J=new WeakMap;function kt(r,t){return J.set(r,t),r}function Tt(r){return Object.assign(r,{[m]:!0})}function N(r){for(const[t,e]of X)if(e.canHandle(r)){const[n,a]=e.serialize(r);return[{type:"HANDLER",name:t,value:n},a]}return[{type:"RAW",value:r},J.get(r)||[]]}function w(r){switch(r.type){case"HANDLER":return X.get(r.name).deserialize(r.value);case"RAW":return r.value}}function S(r,t,e){return new Promise(n=>{const a=Nt();r.addEventListener("message",function u(o){!o.data||!o.data.id||o.data.id!==a||(r.removeEventListener("message",u),n(o.data))}),r.start&&r.start(),r.postMessage(Object.assign({id:a},t),e)})}function Nt(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const $t=r=>r.length>0,It=(r,t)=>{const e=r.height*t;if(e<=r.width)return{width:e,height:r.height};{const n=r.width/t;return{width:r.width,height:n}}};function s(r){return r!=null&&typeof r=="object"&&r["@@functional/placeholder"]===!0}function p(r){return function t(e){return arguments.length===0||s(e)?t:r.apply(this,arguments)}}function c(r){return function t(e,n){switch(arguments.length){case 0:return t;case 1:return s(e)?t:p(function(a){return r(e,a)});default:return s(e)&&s(n)?t:s(e)?p(function(a){return r(a,n)}):s(n)?p(function(a){return r(e,a)}):r(e,n)}}}var Mt=c(function(t,e){return Number(t)+Number(e)}),Pt=Mt;function x(r,t){switch(r){case 0:return function(){return t.apply(this,arguments)};case 1:return function(e){return t.apply(this,arguments)};case 2:return function(e,n){return t.apply(this,arguments)};case 3:return function(e,n,a){return t.apply(this,arguments)};case 4:return function(e,n,a,u){return t.apply(this,arguments)};case 5:return function(e,n,a,u,o){return t.apply(this,arguments)};case 6:return function(e,n,a,u,o,i){return t.apply(this,arguments)};case 7:return function(e,n,a,u,o,i,l){return t.apply(this,arguments)};case 8:return function(e,n,a,u,o,i,l,f){return t.apply(this,arguments)};case 9:return function(e,n,a,u,o,i,l,f,g){return t.apply(this,arguments)};case 10:return function(e,n,a,u,o,i,l,f,g,y){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function K(r,t,e){return function(){for(var n=[],a=0,u=r,o=0;o<t.length||a<arguments.length;){var i;o<t.length&&(!s(t[o])||a>=arguments.length)?i=t[o]:(i=arguments[a],a+=1),n[o]=i,s(i)||(u-=1),o+=1}return u<=0?e.apply(this,n):x(u,K(r,n,e))}}var Ct=c(function(t,e){return t===1?p(e):x(t,K(t,[],e))}),Q=Ct;function zt(r){return function t(e,n,a){switch(arguments.length){case 0:return t;case 1:return s(e)?t:c(function(u,o){return r(e,u,o)});case 2:return s(e)&&s(n)?t:s(e)?c(function(u,o){return r(u,n,o)}):s(n)?c(function(u,o){return r(e,u,o)}):p(function(u){return r(e,n,u)});default:return s(e)&&s(n)&&s(a)?t:s(e)&&s(n)?c(function(u,o){return r(u,o,a)}):s(e)&&s(a)?c(function(u,o){return r(u,n,o)}):s(n)&&s(a)?c(function(u,o){return r(e,u,o)}):s(e)?p(function(u){return r(u,n,a)}):s(n)?p(function(u){return r(e,u,a)}):s(a)?p(function(u){return r(e,n,u)}):r(e,n,a)}}}var O=Array.isArray||function(t){return t!=null&&t.length>=0&&Object.prototype.toString.call(t)==="[object Array]"};function xt(r){return r!=null&&typeof r["@@transducer/step"]=="function"}function tt(r,t,e){return function(){if(arguments.length===0)return e();var n=arguments[arguments.length-1];if(!O(n)){for(var a=0;a<r.length;){if(typeof n[r[a]]=="function")return n[r[a]].apply(n,Array.prototype.slice.call(arguments,0,-1));a+=1}if(xt(n)){var u=t.apply(null,Array.prototype.slice.call(arguments,0,-1));return u(n)}}return e.apply(this,arguments)}}var $={init:function(){return this.xf["@@transducer/init"]()},result:function(r){return this.xf["@@transducer/result"](r)}},qt=c(function(t,e){return e>t?e:t}),Lt=qt;function A(r,t){for(var e=0,n=t.length,a=Array(n);e<n;)a[e]=r(t[e]),e+=1;return a}function I(r){return Object.prototype.toString.call(r)==="[object String]"}var Ft=p(function(t){return O(t)?!0:!t||typeof t!="object"||I(t)?!1:t.length===0?!0:t.length>0?t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1):!1}),Ut=Ft,Ht=function(){function r(t){this.f=t}return r.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},r.prototype["@@transducer/result"]=function(t){return t},r.prototype["@@transducer/step"]=function(t,e){return this.f(t,e)},r}();function Dt(r){return new Ht(r)}var Wt=c(function(t,e){return x(t.length,function(){return t.apply(e,arguments)})}),Bt=Wt;function Vt(r,t,e){for(var n=0,a=e.length;n<a;){if(t=r["@@transducer/step"](t,e[n]),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}n+=1}return r["@@transducer/result"](t)}function rt(r,t,e){for(var n=e.next();!n.done;){if(t=r["@@transducer/step"](t,n.value),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}n=e.next()}return r["@@transducer/result"](t)}function et(r,t,e,n){return r["@@transducer/result"](e[n](Bt(r["@@transducer/step"],r),t))}var nt=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function q(r,t,e){if(typeof r=="function"&&(r=Dt(r)),Ut(e))return Vt(r,t,e);if(typeof e["fantasy-land/reduce"]=="function")return et(r,t,e,"fantasy-land/reduce");if(e[nt]!=null)return rt(r,t,e[nt]());if(typeof e.next=="function")return rt(r,t,e);if(typeof e.reduce=="function")return et(r,t,e,"reduce");throw new TypeError("reduce: list must be array or iterable")}var Xt=function(){function r(t,e){this.xf=e,this.f=t}return r.prototype["@@transducer/init"]=$.init,r.prototype["@@transducer/result"]=$.result,r.prototype["@@transducer/step"]=function(t,e){return this.xf["@@transducer/step"](t,this.f(e))},r}(),Gt=c(function(t,e){return new Xt(t,e)}),Yt=Gt;function M(r,t){return Object.prototype.hasOwnProperty.call(t,r)}var at=Object.prototype.toString,Zt=function(){return at.call(arguments)==="[object Arguments]"?function(t){return at.call(t)==="[object Arguments]"}:function(t){return M("callee",t)}}(),Jt=Zt,Kt=!{toString:null}.propertyIsEnumerable("toString"),ut=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],ot=function(){return arguments.propertyIsEnumerable("length")}(),Qt=function(t,e){for(var n=0;n<t.length;){if(t[n]===e)return!0;n+=1}return!1},tr=p(typeof Object.keys=="function"&&!ot?function(t){return Object(t)!==t?[]:Object.keys(t)}:function(t){if(Object(t)!==t)return[];var e,n,a=[],u=ot&&Jt(t);for(e in t)M(e,t)&&(!u||e!=="length")&&(a[a.length]=e);if(Kt)for(n=ut.length-1;n>=0;)e=ut[n],M(e,t)&&!Qt(a,e)&&(a[a.length]=e),n-=1;return a}),_=tr,rr=c(tt(["fantasy-land/map","map"],Yt,function(t,e){switch(Object.prototype.toString.call(e)){case"[object Function]":return Q(e.length,function(){return t.call(this,e.apply(this,arguments))});case"[object Object]":return q(function(n,a){return n[a]=t(e[a]),n},{},_(e));default:return A(t,e)}})),er=rr,nr=Number.isInteger||function(t){return t<<0===t},ar=c(function(t,e){var n=t<0?e.length+t:t;return I(e)?e.charAt(n):e[n]}),it=ar,ur=c(function(t,e){if(e!=null)return nr(t)?it(t,e):e[t]}),st=ur,or=c(function(t,e){return er(st(t),e)}),ir=or,sr=zt(q),ct=sr;function lt(r){var t=Object.prototype.toString.call(r);return t==="[object Function]"||t==="[object AsyncFunction]"||t==="[object GeneratorFunction]"||t==="[object AsyncGeneratorFunction]"}var cr=p(function(t){return t===null?"Null":t===void 0?"Undefined":Object.prototype.toString.call(t).slice(8,-1)}),ft=cr;function gt(r){for(var t=[],e;!(e=r.next()).done;)t.push(e.value);return t}function pt(r,t,e){for(var n=0,a=e.length;n<a;){if(r(t,e[n]))return!0;n+=1}return!1}function lr(r){var t=String(r).match(/^function (\w*)/);return t==null?"":t[1]}function fr(r,t){return r===t?r!==0||1/r===1/t:r!==r&&t!==t}var L=typeof Object.is=="function"?Object.is:fr;function ht(r,t,e,n){var a=gt(r),u=gt(t);function o(i,l){return F(i,l,e.slice(),n.slice())}return!pt(function(i,l){return!pt(o,l,i)},u,a)}function F(r,t,e,n){if(L(r,t))return!0;var a=ft(r);if(a!==ft(t))return!1;if(typeof r["fantasy-land/equals"]=="function"||typeof t["fantasy-land/equals"]=="function")return typeof r["fantasy-land/equals"]=="function"&&r["fantasy-land/equals"](t)&&typeof t["fantasy-land/equals"]=="function"&&t["fantasy-land/equals"](r);if(typeof r.equals=="function"||typeof t.equals=="function")return typeof r.equals=="function"&&r.equals(t)&&typeof t.equals=="function"&&t.equals(r);switch(a){case"Arguments":case"Array":case"Object":if(typeof r.constructor=="function"&&lr(r.constructor)==="Promise")return r===t;break;case"Boolean":case"Number":case"String":if(!(typeof r==typeof t&&L(r.valueOf(),t.valueOf())))return!1;break;case"Date":if(!L(r.valueOf(),t.valueOf()))return!1;break;case"Error":return r.name===t.name&&r.message===t.message;case"RegExp":if(!(r.source===t.source&&r.global===t.global&&r.ignoreCase===t.ignoreCase&&r.multiline===t.multiline&&r.sticky===t.sticky&&r.unicode===t.unicode))return!1;break}for(var u=e.length-1;u>=0;){if(e[u]===r)return n[u]===t;u-=1}switch(a){case"Map":return r.size!==t.size?!1:ht(r.entries(),t.entries(),e.concat([r]),n.concat([t]));case"Set":return r.size!==t.size?!1:ht(r.values(),t.values(),e.concat([r]),n.concat([t]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var o=_(r);if(o.length!==_(t).length)return!1;var i=e.concat([r]),l=n.concat([t]);for(u=o.length-1;u>=0;){var f=o[u];if(!(M(f,t)&&F(t[f],r[f],i,l)))return!1;u-=1}return!0}var gr=c(function(t,e){return F(t,e,[],[])}),pr=gr;function hr(r,t,e){var n,a;if(typeof r.indexOf=="function")switch(typeof t){case"number":if(t===0){for(n=1/t;e<r.length;){if(a=r[e],a===0&&1/a===n)return e;e+=1}return-1}else if(t!==t){for(;e<r.length;){if(a=r[e],typeof a=="number"&&a!==a)return e;e+=1}return-1}return r.indexOf(t,e);case"string":case"boolean":case"function":case"undefined":return r.indexOf(t,e);case"object":if(t===null)return r.indexOf(t,e)}for(;e<r.length;){if(pr(r[e],t))return e;e+=1}return-1}function yr(r,t){return hr(t,r,0)>=0}function U(r){var t=r.replace(/\\/g,"\\\\").replace(/[\b]/g,"\\b").replace(/\f/g,"\\f").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\v/g,"\\v").replace(/\0/g,"\\0");return'"'+t.replace(/"/g,'\\"')+'"'}var E=function(t){return(t<10?"0":"")+t},dr=typeof Date.prototype.toISOString=="function"?function(t){return t.toISOString()}:function(t){return t.getUTCFullYear()+"-"+E(t.getUTCMonth()+1)+"-"+E(t.getUTCDate())+"T"+E(t.getUTCHours())+":"+E(t.getUTCMinutes())+":"+E(t.getUTCSeconds())+"."+(t.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"},mr=dr;function vr(r){return function(){return!r.apply(this,arguments)}}function wr(r,t){for(var e=0,n=t.length,a=[];e<n;)r(t[e])&&(a[a.length]=t[e]),e+=1;return a}function yt(r){return Object.prototype.toString.call(r)==="[object Object]"}var Sr=function(){function r(t,e){this.xf=e,this.f=t}return r.prototype["@@transducer/init"]=$.init,r.prototype["@@transducer/result"]=$.result,r.prototype["@@transducer/step"]=function(t,e){return this.f(e)?this.xf["@@transducer/step"](t,e):t},r}(),_r=c(function(t,e){return new Sr(t,e)}),Or=_r,Ar=c(tt(["fantasy-land/filter","filter"],Or,function(r,t){return yt(t)?q(function(e,n){return r(t[n])&&(e[n]=t[n]),e},{},_(t)):wr(r,t)})),Er=Ar,br=c(function(t,e){return Er(vr(t),e)}),jr=br;function dt(r,t){var e=function(o){var i=t.concat([r]);return yr(o,i)?"<Circular>":dt(o,i)},n=function(u,o){return A(function(i){return U(i)+": "+e(u[i])},o.slice().sort())};switch(Object.prototype.toString.call(r)){case"[object Arguments]":return"(function() { return arguments; }("+A(e,r).join(", ")+"))";case"[object Array]":return"["+A(e,r).concat(n(r,jr(function(u){return/^\d+$/.test(u)},_(r)))).join(", ")+"]";case"[object Boolean]":return typeof r=="object"?"new Boolean("+e(r.valueOf())+")":r.toString();case"[object Date]":return"new Date("+(isNaN(r.valueOf())?e(NaN):U(mr(r)))+")";case"[object Null]":return"null";case"[object Number]":return typeof r=="object"?"new Number("+e(r.valueOf())+")":1/r===-1/0?"-0":r.toString(10);case"[object String]":return typeof r=="object"?"new String("+e(r.valueOf())+")":U(r);case"[object Undefined]":return"undefined";default:if(typeof r.toString=="function"){var a=r.toString();if(a!=="[object Object]")return a}return"{"+n(r,_(r)).join(", ")+"}"}}var Rr=p(function(t){return dt(t,[])}),H=Rr,kr=c(function(t,e){if(O(t)){if(O(e))return t.concat(e);throw new TypeError(H(e)+" is not an array")}if(I(t)){if(I(e))return t+e;throw new TypeError(H(e)+" is not a string")}if(t!=null&&lt(t["fantasy-land/concat"]))return t["fantasy-land/concat"](e);if(t!=null&&lt(t.concat))return t.concat(e);throw new TypeError(H(t)+' does not have a method named "concat" or "fantasy-land/concat"')}),Tr=kr,Nr=c(function(t,e){return Q(ct(Lt,0,ir("length",e)),function(){var n=arguments,a=this;return t.apply(a,A(function(u){return u.apply(a,n)},e))})}),$r=Nr,Ir=c(function(t,e){return t/e}),Mr=Ir,Pr=it(-1),Cr=Pr,zr=c(function r(t,e){if(!yt(e)&&!O(e))return e;var n=e instanceof Array?[]:{},a,u,o;for(u in e)a=t[u],o=typeof a,n[u]=o==="function"?a(e[u]):a&&o==="object"?r(a,e[u]):e[u];return n}),xr=zr;function qr(r){return Object.prototype.toString.call(r)==="[object Number]"}var Lr=p(function(t){return t!=null&&qr(t.length)?t.length:NaN}),Fr=Lr,Ur=ct(Pt,0),Hr=Ur,Dr=c(function(t,e){return Array.prototype.slice.call(e,0).sort(function(n,a){var u=t(n),o=t(a);return u<o?-1:u>o?1:0})}),mt=Dr;const Wr=(r,t)=>{const n=mt(u=>(u.aspectRatioDelta+u.sizeHomogeneity*t.sizeHomogeneity)/(t.sizeHomogeneity+1),r),a=Cr(n);return xr({pictures:mt(st("url"))},a)},Br=r=>"url"in r,D=(r,t,e)=>{if(Br(e))return[{position:r,dimension:t,url:e.url}];const n=e.horizontal?t.height*e.first.aspectRatio:t.width/e.first.aspectRatio,a=e.horizontal?{x:r.x+n,y:r.y}:{x:r.x,y:r.y+n},u=e.horizontal?{width:n,height:t.height}:{width:t.width,height:n},o=e.horizontal?{width:Math.abs(t.width-n),height:t.height}:{width:t.width,height:Math.abs(t.height-n)};return Tr(D(r,u,e.first),D(a,o,e.second))},Vr=$r(Mr,[Hr,Fr]),Xr=r=>{const t=Math.max(...r.map(u=>u.width)),e=Math.max(...r.map(u=>u.height)),n=Math.min(...r.map(u=>u.width)),a=Math.min(...r.map(u=>u.height));return Vr([n/t,a/e])},Gr=(r,t,e)=>{const n=D({x:0,y:0},r,e),a=Xr(n.map(u=>u.dimension));return{dimension:r,aspectRatioDelta:t,sizeHomogeneity:a,pictures:n}},W=(r,t)=>r+Math.random()*(t-r+1)|0;class Yr{constructor(t,e,n){wt(this,"aspectRatio",0);this.horizontal=t,this.first=e,this.second=n;const a=e.aspectRatio+n.aspectRatio;this.aspectRatio=t?a:e.aspectRatio*n.aspectRatio/a}}const vt=(r,t)=>new Yr(!!W(0,1),r,t),B=r=>{const t=r.length;if(t===1)return r[0];if(t===2)return vt(r[0],r[1]);const e=W(0,t-1),n=W(0,t-1);if(e===n)return B(r);const a=vt(r[e],r[n]),u=[...r];return u[e]=a,u.splice(n,1),B(u)};var Zr=Object.freeze({__proto__:null,findSolution:(r,t,e)=>{const n=Date.now(),a=t.width/t.height,u=[];for(;Date.now()-n<e.maxComputationTime;){const o=B(r),i=Math.abs(o.aspectRatio-a),l=Math.max(0,1-i/a);if(r.length<=e.minImages||l>e.aspectRatioThreshold){const f=It(t,o.aspectRatio),g=Gr(f,l,o);u.unshift(g)}}if(!$t(u))throw new Error("No solution");return Wr(u,e)}});C(Zr)})();
