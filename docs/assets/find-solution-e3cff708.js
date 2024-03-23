var er=Object.defineProperty;var rr=(m,d,v)=>d in m?er(m,d,{enumerable:!0,configurable:!0,writable:!0,value:v}):m[d]=v;var St=(m,d,v)=>(rr(m,typeof d!="symbol"?d+"":d,v),v);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const m=Symbol("Comlink.proxy"),d=Symbol("Comlink.endpoint"),v=Symbol("Comlink.releaseProxy"),$=Symbol("Comlink.finalizer"),T=Symbol("Comlink.thrown"),B=t=>typeof t=="object"&&t!==null||typeof t=="function",_t={canHandle:t=>B(t)&&t[m],serialize(t){const{port1:e,port2:r}=new MessageChannel;return z(t,e),[r,[r]]},deserialize(t){return t.start(),Et(t)}},Ot={canHandle:t=>B(t)&&T in t,serialize({value:t}){let e;return t instanceof Error?e={isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:e={isError:!1,value:t},[e,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}},X=new Map([["proxy",_t],["throw",Ot]]);function At(t,e){for(const r of t)if(e===r||r==="*"||r instanceof RegExp&&r.test(e))return!0;return!1}function z(t,e=globalThis,r=["*"]){e.addEventListener("message",function n(a){if(!a||!a.data)return;if(!At(r,a.origin)){console.warn(`Invalid origin '${a.origin}' for comlink proxy`);return}const{id:o,type:u,path:i}=Object.assign({path:[]},a.data),s=(a.data.argumentList||[]).map(w);let l;try{const g=i.slice(0,-1).reduce((y,j)=>y[j],t),p=i.reduce((y,j)=>y[j],t);switch(u){case"GET":l=p;break;case"SET":g[i.slice(-1)[0]]=w(a.data.value),l=!0;break;case"APPLY":l=p.apply(g,s);break;case"CONSTRUCT":{const y=new p(...s);l=Ct(y)}break;case"ENDPOINT":{const{port1:y,port2:j}=new MessageChannel;z(t,j),l=Rt(y,[y])}break;case"RELEASE":l=void 0;break;default:return}}catch(g){l={value:g,[T]:0}}Promise.resolve(l).catch(g=>({value:g,[T]:0})).then(g=>{const[p,y]=I(g);e.postMessage(Object.assign(Object.assign({},p),{id:o}),y),u==="RELEASE"&&(e.removeEventListener("message",n),G(e),$ in t&&typeof t[$]=="function"&&t[$]())}).catch(g=>{const[p,y]=I({value:new TypeError("Unserializable return value"),[T]:0});e.postMessage(Object.assign(Object.assign({},p),{id:o}),y)})}),e.start&&e.start()}function bt(t){return t.constructor.name==="MessagePort"}function G(t){bt(t)&&t.close()}function Et(t,e){return L(t,[],e)}function k(t){if(t)throw new Error("Proxy has been released and is not useable")}function Y(t){return S(t,{type:"RELEASE"}).then(()=>{G(t)})}const R=new WeakMap,C="FinalizationRegistry"in globalThis&&new FinalizationRegistry(t=>{const e=(R.get(t)||0)-1;R.set(t,e),e===0&&Y(t)});function jt(t,e){const r=(R.get(e)||0)+1;R.set(e,r),C&&C.register(t,e,t)}function Tt(t){C&&C.unregister(t)}function L(t,e=[],r=function(){}){let n=!1;const a=new Proxy(r,{get(o,u){if(k(n),u===v)return()=>{Tt(a),Y(t),n=!0};if(u==="then"){if(e.length===0)return{then:()=>a};const i=S(t,{type:"GET",path:e.map(s=>s.toString())}).then(w);return i.then.bind(i)}return L(t,[...e,u])},set(o,u,i){k(n);const[s,l]=I(i);return S(t,{type:"SET",path:[...e,u].map(g=>g.toString()),value:s},l).then(w)},apply(o,u,i){k(n);const s=e[e.length-1];if(s===d)return S(t,{type:"ENDPOINT"}).then(w);if(s==="bind")return L(t,e.slice(0,-1));const[l,g]=Z(i);return S(t,{type:"APPLY",path:e.map(p=>p.toString()),argumentList:l},g).then(w)},construct(o,u){k(n);const[i,s]=Z(u);return S(t,{type:"CONSTRUCT",path:e.map(l=>l.toString()),argumentList:i},s).then(w)}});return jt(a,t),a}function kt(t){return Array.prototype.concat.apply([],t)}function Z(t){const e=t.map(I);return[e.map(r=>r[0]),kt(e.map(r=>r[1]))]}const J=new WeakMap;function Rt(t,e){return J.set(t,e),t}function Ct(t){return Object.assign(t,{[m]:!0})}function I(t){for(const[e,r]of X)if(r.canHandle(t)){const[n,a]=r.serialize(t);return[{type:"HANDLER",name:e,value:n},a]}return[{type:"RAW",value:t},J.get(t)||[]]}function w(t){switch(t.type){case"HANDLER":return X.get(t.name).deserialize(t.value);case"RAW":return t.value}}function S(t,e,r){return new Promise(n=>{const a=It();t.addEventListener("message",function o(u){!u.data||!u.data.id||u.data.id!==a||(t.removeEventListener("message",o),n(u.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:a},e),r)})}function It(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function c(t){return t!=null&&typeof t=="object"&&t["@@functional/placeholder"]===!0}function h(t){return function e(r){return arguments.length===0||c(r)?e:t.apply(this,arguments)}}function f(t){return function e(r,n){switch(arguments.length){case 0:return e;case 1:return c(r)?e:h(function(a){return t(r,a)});default:return c(r)&&c(n)?e:c(r)?h(function(a){return t(a,n)}):c(n)?h(function(a){return t(r,a)}):t(r,n)}}}function Q(t,e){switch(t){case 0:return function(){return e.apply(this,arguments)};case 1:return function(r){return e.apply(this,arguments)};case 2:return function(r,n){return e.apply(this,arguments)};case 3:return function(r,n,a){return e.apply(this,arguments)};case 4:return function(r,n,a,o){return e.apply(this,arguments)};case 5:return function(r,n,a,o,u){return e.apply(this,arguments)};case 6:return function(r,n,a,o,u,i){return e.apply(this,arguments)};case 7:return function(r,n,a,o,u,i,s){return e.apply(this,arguments)};case 8:return function(r,n,a,o,u,i,s,l){return e.apply(this,arguments)};case 9:return function(r,n,a,o,u,i,s,l,g){return e.apply(this,arguments)};case 10:return function(r,n,a,o,u,i,s,l,g,p){return e.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function K(t){return function e(r,n,a){switch(arguments.length){case 0:return e;case 1:return c(r)?e:f(function(o,u){return t(r,o,u)});case 2:return c(r)&&c(n)?e:c(r)?f(function(o,u){return t(o,n,u)}):c(n)?f(function(o,u){return t(r,o,u)}):h(function(o){return t(r,n,o)});default:return c(r)&&c(n)&&c(a)?e:c(r)&&c(n)?f(function(o,u){return t(o,u,a)}):c(r)&&c(a)?f(function(o,u){return t(o,n,u)}):c(n)&&c(a)?f(function(o,u){return t(r,o,u)}):c(r)?h(function(o){return t(o,n,a)}):c(n)?h(function(o){return t(r,o,a)}):c(a)?h(function(o){return t(r,n,o)}):t(r,n,a)}}}var _=Array.isArray||function(e){return e!=null&&e.length>=0&&Object.prototype.toString.call(e)==="[object Array]"};function Mt(t){return t!=null&&typeof t["@@transducer/step"]=="function"}function tt(t,e,r){return function(){if(arguments.length===0)return r();var n=arguments[arguments.length-1];if(!_(n)){for(var a=0;a<t.length;){if(typeof n[t[a]]=="function")return n[t[a]].apply(n,Array.prototype.slice.call(arguments,0,-1));a+=1}if(Mt(n)){var o=e.apply(null,Array.prototype.slice.call(arguments,0,-1));return o(n)}}return r.apply(this,arguments)}}var M={init:function(){return this.xf["@@transducer/init"]()},result:function(t){return this.xf["@@transducer/result"](t)}};function et(t){for(var e=[],r;!(r=t.next()).done;)e.push(r.value);return e}function rt(t,e,r){for(var n=0,a=r.length;n<a;){if(t(e,r[n]))return!0;n+=1}return!1}function Pt(t){var e=String(t).match(/^function (\w*)/);return e==null?"":e[1]}function O(t,e){return Object.prototype.hasOwnProperty.call(e,t)}function $t(t,e){return t===e?t!==0||1/t===1/e:t!==t&&e!==e}var N=typeof Object.is=="function"?Object.is:$t,nt=Object.prototype.toString,zt=function(){return nt.call(arguments)==="[object Arguments]"?function(e){return nt.call(e)==="[object Arguments]"}:function(e){return O("callee",e)}}(),Lt=zt,Nt=!{toString:null}.propertyIsEnumerable("toString"),at=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],ot=function(){return arguments.propertyIsEnumerable("length")}(),qt=function(e,r){for(var n=0;n<e.length;){if(e[n]===r)return!0;n+=1}return!1},Ft=h(typeof Object.keys=="function"&&!ot?function(e){return Object(e)!==e?[]:Object.keys(e)}:function(e){if(Object(e)!==e)return[];var r,n,a=[],o=ot&&Lt(e);for(r in e)O(r,e)&&(!o||r!=="length")&&(a[a.length]=r);if(Nt)for(n=at.length-1;n>=0;)r=at[n],O(r,e)&&!qt(a,r)&&(a[a.length]=r),n-=1;return a}),A=Ft,Ht=h(function(e){return e===null?"Null":e===void 0?"Undefined":Object.prototype.toString.call(e).slice(8,-1)}),ut=Ht;function it(t,e,r,n){var a=et(t),o=et(e);function u(i,s){return q(i,s,r.slice(),n.slice())}return!rt(function(i,s){return!rt(u,s,i)},o,a)}function q(t,e,r,n){if(N(t,e))return!0;var a=ut(t);if(a!==ut(e))return!1;if(typeof t["fantasy-land/equals"]=="function"||typeof e["fantasy-land/equals"]=="function")return typeof t["fantasy-land/equals"]=="function"&&t["fantasy-land/equals"](e)&&typeof e["fantasy-land/equals"]=="function"&&e["fantasy-land/equals"](t);if(typeof t.equals=="function"||typeof e.equals=="function")return typeof t.equals=="function"&&t.equals(e)&&typeof e.equals=="function"&&e.equals(t);switch(a){case"Arguments":case"Array":case"Object":if(typeof t.constructor=="function"&&Pt(t.constructor)==="Promise")return t===e;break;case"Boolean":case"Number":case"String":if(!(typeof t==typeof e&&N(t.valueOf(),e.valueOf())))return!1;break;case"Date":if(!N(t.valueOf(),e.valueOf()))return!1;break;case"Error":return t.name===e.name&&t.message===e.message;case"RegExp":if(!(t.source===e.source&&t.global===e.global&&t.ignoreCase===e.ignoreCase&&t.multiline===e.multiline&&t.sticky===e.sticky&&t.unicode===e.unicode))return!1;break}for(var o=r.length-1;o>=0;){if(r[o]===t)return n[o]===e;o-=1}switch(a){case"Map":return t.size!==e.size?!1:it(t.entries(),e.entries(),r.concat([t]),n.concat([e]));case"Set":return t.size!==e.size?!1:it(t.values(),e.values(),r.concat([t]),n.concat([e]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var u=A(t);if(u.length!==A(e).length)return!1;var i=r.concat([t]),s=n.concat([e]);for(o=u.length-1;o>=0;){var l=u[o];if(!(O(l,e)&&q(e[l],t[l],i,s)))return!1;o-=1}return!0}var Ut=f(function(e,r){return q(e,r,[],[])}),xt=Ut;function Dt(t,e,r){var n,a;if(typeof t.indexOf=="function")switch(typeof e){case"number":if(e===0){for(n=1/e;r<t.length;){if(a=t[r],a===0&&1/a===n)return r;r+=1}return-1}else if(e!==e){for(;r<t.length;){if(a=t[r],typeof a=="number"&&a!==a)return r;r+=1}return-1}return t.indexOf(e,r);case"string":case"boolean":case"function":case"undefined":return t.indexOf(e,r);case"object":if(e===null)return t.indexOf(e,r)}for(;r<t.length;){if(xt(t[r],e))return r;r+=1}return-1}function Wt(t,e){return Dt(e,t,0)>=0}function F(t,e){for(var r=0,n=e.length,a=Array(n);r<n;)a[r]=t(e[r]),r+=1;return a}function H(t){var e=t.replace(/\\/g,"\\\\").replace(/[\b]/g,"\\b").replace(/\f/g,"\\f").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\v/g,"\\v").replace(/\0/g,"\\0");return'"'+e.replace(/"/g,'\\"')+'"'}var b=function(e){return(e<10?"0":"")+e},Vt=typeof Date.prototype.toISOString=="function"?function(e){return e.toISOString()}:function(e){return e.getUTCFullYear()+"-"+b(e.getUTCMonth()+1)+"-"+b(e.getUTCDate())+"T"+b(e.getUTCHours())+":"+b(e.getUTCMinutes())+":"+b(e.getUTCSeconds())+"."+(e.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"},Bt=Vt;function Xt(t){return function(){return!t.apply(this,arguments)}}function Gt(t,e,r){for(var n=0,a=r.length;n<a;)e=t(e,r[n]),n+=1;return e}function Yt(t,e){for(var r=0,n=e.length,a=[];r<n;)t(e[r])&&(a[a.length]=e[r]),r+=1;return a}function st(t){return Object.prototype.toString.call(t)==="[object Object]"}var Zt=function(){function t(e,r){this.xf=r,this.f=e}return t.prototype["@@transducer/init"]=M.init,t.prototype["@@transducer/result"]=M.result,t.prototype["@@transducer/step"]=function(e,r){return this.f(r)?this.xf["@@transducer/step"](e,r):e},t}();function Jt(t){return function(e){return new Zt(t,e)}}var Qt=f(tt(["fantasy-land/filter","filter"],Jt,function(t,e){return st(e)?Gt(function(r,n){return t(e[n])&&(r[n]=e[n]),r},{},A(e)):Yt(t,e)})),Kt=Qt,te=f(function(e,r){return Kt(Xt(e),r)}),ee=te;function ct(t,e){var r=function(u){var i=e.concat([t]);return Wt(u,i)?"<Circular>":ct(u,i)},n=function(o,u){return F(function(i){return H(i)+": "+r(o[i])},u.slice().sort())};switch(Object.prototype.toString.call(t)){case"[object Arguments]":return"(function() { return arguments; }("+F(r,t).join(", ")+"))";case"[object Array]":return"["+F(r,t).concat(n(t,ee(function(o){return/^\d+$/.test(o)},A(t)))).join(", ")+"]";case"[object Boolean]":return typeof t=="object"?"new Boolean("+r(t.valueOf())+")":t.toString();case"[object Date]":return"new Date("+(isNaN(t.valueOf())?r(NaN):H(Bt(t)))+")";case"[object Map]":return"new Map("+r(Array.from(t))+")";case"[object Null]":return"null";case"[object Number]":return typeof t=="object"?"new Number("+r(t.valueOf())+")":1/t===-1/0?"-0":t.toString(10);case"[object Set]":return"new Set("+r(Array.from(t).sort())+")";case"[object String]":return typeof t=="object"?"new String("+r(t.valueOf())+")":H(t);case"[object Undefined]":return"undefined";default:if(typeof t.toString=="function"){var a=t.toString();if(a!=="[object Object]")return a}return"{"+n(t,A(t)).join(", ")+"}"}}var re=h(function(e){return ct(e,[])}),U=re,ne=Number.isInteger||function(e){return e<<0===e};function P(t){return Object.prototype.toString.call(t)==="[object String]"}var ae=f(function(e,r){var n=e<0?r.length+e:e;return P(r)?r.charAt(n):r[n]}),lt=ae,oe=f(function(e,r){if(r!=null)return ne(e)?lt(e,r):r[e]}),ft=oe,ue=h(function(e){return _(e)?!0:!e||typeof e!="object"||P(e)?!1:e.length===0?!0:e.length>0?e.hasOwnProperty(0)&&e.hasOwnProperty(e.length-1):!1}),ie=ue,gt=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function se(t,e,r){return function(a,o,u){if(ie(u))return t(a,o,u);if(u==null)return o;if(typeof u["fantasy-land/reduce"]=="function")return e(a,o,u,"fantasy-land/reduce");if(u[gt]!=null)return r(a,o,u[gt]());if(typeof u.next=="function")return r(a,o,u);if(typeof u.reduce=="function")return e(a,o,u,"reduce");throw new TypeError("reduce: list must be array or iterable")}}function ce(t,e,r){for(var n=0,a=r.length;n<a;){if(e=t["@@transducer/step"](e,r[n]),e&&e["@@transducer/reduced"]){e=e["@@transducer/value"];break}n+=1}return t["@@transducer/result"](e)}var le=f(function(e,r){return Q(e.length,function(){return e.apply(r,arguments)})}),fe=le;function ge(t,e,r){for(var n=r.next();!n.done;){if(e=t["@@transducer/step"](e,n.value),e&&e["@@transducer/reduced"]){e=e["@@transducer/value"];break}n=r.next()}return t["@@transducer/result"](e)}function he(t,e,r,n){return t["@@transducer/result"](r[n](fe(t["@@transducer/step"],t),e))}var pe=se(ce,he,ge),ye=pe,de=function(){function t(e){this.f=e}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(e){return e},t.prototype["@@transducer/step"]=function(e,r){return this.f(e,r)},t}();function me(t){return new de(t)}var ve=K(function(t,e,r){return ye(typeof t=="function"?me(t):t,e,r)}),we=ve;function ht(t){var e=Object.prototype.toString.call(t);return e==="[object Function]"||e==="[object AsyncFunction]"||e==="[object GeneratorFunction]"||e==="[object AsyncGeneratorFunction]"}function Se(t,e){return function(){return e.call(this,t.apply(this,arguments))}}function pt(t,e){return function(){var r=arguments.length;if(r===0)return e();var n=arguments[r-1];return _(n)||typeof n[t]!="function"?e.apply(this,arguments):n[t].apply(n,Array.prototype.slice.call(arguments,0,r-1))}}var _e=K(pt("slice",function(e,r,n){return Array.prototype.slice.call(n,e,r)})),yt=_e,Oe=h(pt("tail",yt(1,1/0))),Ae=Oe;function be(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return Q(arguments[0].length,we(Se,arguments[0],Ae(arguments)))}var Ee=f(function(e,r){if(_(e)){if(_(r))return e.concat(r);throw new TypeError(U(r)+" is not an array")}if(P(e)){if(P(r))return e+r;throw new TypeError(U(r)+" is not a string")}if(e!=null&&ht(e["fantasy-land/concat"]))return e["fantasy-land/concat"](r);if(e!=null&&ht(e.concat))return e.concat(r);throw new TypeError(U(e)+' does not have a method named "concat" or "fantasy-land/concat"')}),dt=Ee,je=function(){function t(e,r){this.xf=r,this.n=e}return t.prototype["@@transducer/init"]=M.init,t.prototype["@@transducer/result"]=M.result,t.prototype["@@transducer/step"]=function(e,r){return this.n>0?(this.n-=1,e):this.xf["@@transducer/step"](e,r)},t}();function Te(t){return function(e){return new je(t,e)}}var ke=f(tt(["drop"],Te,function(e,r){return yt(Math.max(0,e),1/0,r)})),Re=ke,Ce=lt(-1),Ie=Ce,Me=f(function(e,r){return Re(e>=0?r.length-e:0,r)}),Pe=Me,$e=f(function t(e,r){if(!st(r)&&!_(r))return r;var n=r instanceof Array?[]:{},a,o,u;for(o in r)a=e[o],u=typeof a,n[o]=u==="function"?a(r[o]):a&&u==="object"?t(a,r[o]):r[o];return n}),ze=$e;function Le(t){if(t==null)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),r=1,n=arguments.length;r<n;){var a=arguments[r];if(a!=null)for(var o in a)O(o,a)&&(e[o]=a[o]);r+=1}return e}var Ne=typeof Object.assign=="function"?Object.assign:Le;function mt(t){return Object.prototype.toString.call(t)==="[object Number]"}var qe=f(function(e,r){return Ne({},r,e)}),Fe=qe,He=f(function(e,r){if(!(mt(e)&&mt(r)))throw new TypeError("Both arguments to range must be numbers");for(var n=[],a=e;a<r;)n.push(a),a+=1;return n}),Ue=He,xe=f(function(e,r){return Array.prototype.slice.call(r,0).sort(function(n,a){var o=e(n),u=e(a);return o<u?-1:o>u?1:0})}),x=xe;Ue(1,18).map(t=>`./images/${t}.jpg`);const De=500,We=11,Ve=({pictures:t,sizeHomogeneity:e,score:r})=>t.length<=4?r:r*e,Be=t=>t.length>0,Xe=t=>{const e=be(x(Ve),Pe(10),x(ft("score")))(t);return ze({pictures:x(ft("url"))},Ie(e))},Ge=t=>"url"in t,E=(t,e,r)=>{if(Ge(r))return[{position:t,dimension:e,url:r.url}];if(r.horizontal){const n=e.height*r.first.aspectRatio,a={x:t.x+n,y:t.y},o={width:n,height:e.height},i={width:e.width-n,height:e.height};return dt(E(t,o,r.first),E(a,i,r.second))}else{const n=e.width/r.first.aspectRatio,a={x:t.x,y:t.y+n},o={width:e.width,height:n},u=e.height-n,i={width:e.width,height:u};return dt(E(t,o,r.first),E(a,i,r.second))}},Ye=t=>{const e=Math.max(...t.map(o=>o.width)),r=Math.max(...t.map(o=>o.height)),n=Math.min(...t.map(o=>o.width)),a=Math.min(...t.map(o=>o.height));return(n/e+a/r)/2},Ze=(t,e,r)=>{const n=E({x:0,y:0},t,r),a=Ye(n.map(o=>o.dimension));return{dimension:t,score:e,sizeHomogeneity:a,pictures:n}};class D{constructor(e,r,n){St(this,"aspectRatio",0);this.horizontal=e,this.first=r,this.second=n;const a=r.aspectRatio+n.aspectRatio;this.aspectRatio=e?a:r.aspectRatio*n.aspectRatio/a}}const W=(t,e)=>t+Math.random()*(e-t+1)|0;function*V(t){if(t.length===1)yield t[0];else for(let e=1;e<t.length;e++){const r=V(t.slice(0,e)),n=V(t.slice(e));for(const a of r)for(const o of n)yield new D(!0,a,o),yield new D(!1,a,o)}}const vt=(t,e)=>new D(!!W(0,1),t,e),wt=t=>{const e=t.length-1;if(e===0)return t[0];if(e===1)return vt(t[0],t[1]);const r=W(0,e);let n;do n=W(0,e);while(r===n);const a=vt(t[r],t[n]);return wt(t.with(r,a).toSpliced(n,1))};function*Je(t){for(;;)yield wt(t)}const Qe=(t,e)=>{const r=t.height*e;if(r<=t.width)return{width:r,height:t.height};{const n=t.width/e;return{width:t.width,height:n}}},Ke={maxComputationTime:De,randomizeThreshold:We};var tr=Object.freeze({__proto__:null,findSolution:(t,e,r)=>{const n=Fe(r??{},Ke),a=Date.now(),o=e.width/e.height,u=[];console.log(t.length<n.randomizeThreshold?"all":"random");const i=t.length<n.randomizeThreshold?V(t):Je(t);for(const s of i){const g=1/(1+Math.abs(s.aspectRatio-o)),p=Qe(e,s.aspectRatio);if(u.push(Ze(p,g,s)),Date.now()-a>n.maxComputationTime){console.log("computation took too long, aborting");break}}if(!Be(u))throw new Error("No solution");return Xe(u)}});z(tr)})();
