var Zt=Object.defineProperty;var Kt=(m,d,v)=>d in m?Zt(m,d,{enumerable:!0,configurable:!0,writable:!0,value:v}):m[d]=v;var rt=(m,d,v)=>Kt(m,typeof d!="symbol"?d+"":d,v);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const m=Symbol("Comlink.proxy"),d=Symbol("Comlink.endpoint"),v=Symbol("Comlink.releaseProxy"),C=Symbol("Comlink.finalizer"),A=Symbol("Comlink.thrown"),j=t=>typeof t=="object"&&t!==null||typeof t=="function",et={canHandle:t=>j(t)&&t[m],serialize(t){const{port1:r,port2:e}=new MessageChannel;return I(t,r),[e,[e]]},deserialize(t){return t.start(),it(t)}},nt={canHandle:t=>j(t)&&A in t,serialize({value:t}){let r;return t instanceof Error?r={isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:r={isError:!1,value:t},[r,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}},H=new Map([["proxy",et],["throw",nt]]);function at(t,r){for(const e of t)if(r===e||e==="*"||e instanceof RegExp&&e.test(r))return!0;return!1}function I(t,r=globalThis,e=["*"]){r.addEventListener("message",function n(a){if(!a||!a.data)return;if(!at(e,a.origin)){console.warn(`Invalid origin '${a.origin}' for comlink proxy`);return}const{id:u,type:i,path:c}=Object.assign({path:[]},a.data),l=(a.data.argumentList||[]).map(w);let s;try{const f=c.slice(0,-1).reduce((h,b)=>h[b],t),p=c.reduce((h,b)=>h[b],t);switch(i){case"GET":s=p;break;case"SET":f[c.slice(-1)[0]]=w(a.data.value),s=!0;break;case"APPLY":s=p.apply(f,l);break;case"CONSTRUCT":{const h=new p(...l);s=ft(h)}break;case"ENDPOINT":{const{port1:h,port2:b}=new MessageChannel;I(t,b),s=lt(h,[h])}break;case"RELEASE":s=void 0;break;default:return}}catch(f){s={value:f,[A]:0}}Promise.resolve(s).catch(f=>({value:f,[A]:0})).then(f=>{const[p,h]=O(f);r.postMessage(Object.assign(Object.assign({},p),{id:u}),h),i==="RELEASE"&&(r.removeEventListener("message",n),V(r),C in t&&typeof t[C]=="function"&&t[C]())}).catch(f=>{const[p,h]=O({value:new TypeError("Unserializable return value"),[A]:0});r.postMessage(Object.assign(Object.assign({},p),{id:u}),h)})}),r.start&&r.start()}function ut(t){return t.constructor.name==="MessagePort"}function V(t){ut(t)&&t.close()}function it(t,r){return M(t,[],r)}function S(t){if(t)throw new Error("Proxy has been released and is not useable")}function F(t){return E(t,{type:"RELEASE"}).then(()=>{V(t)})}const R=new WeakMap,T="FinalizationRegistry"in globalThis&&new FinalizationRegistry(t=>{const r=(R.get(t)||0)-1;R.set(t,r),r===0&&F(t)});function ot(t,r){const e=(R.get(r)||0)+1;R.set(r,e),T&&T.register(t,r,t)}function st(t){T&&T.unregister(t)}function M(t,r=[],e=function(){}){let n=!1;const a=new Proxy(e,{get(u,i){if(S(n),i===v)return()=>{st(a),F(t),n=!0};if(i==="then"){if(r.length===0)return{then:()=>a};const c=E(t,{type:"GET",path:r.map(l=>l.toString())}).then(w);return c.then.bind(c)}return M(t,[...r,i])},set(u,i,c){S(n);const[l,s]=O(c);return E(t,{type:"SET",path:[...r,i].map(f=>f.toString()),value:l},s).then(w)},apply(u,i,c){S(n);const l=r[r.length-1];if(l===d)return E(t,{type:"ENDPOINT"}).then(w);if(l==="bind")return M(t,r.slice(0,-1));const[s,f]=W(c);return E(t,{type:"APPLY",path:r.map(p=>p.toString()),argumentList:s},f).then(w)},construct(u,i){S(n);const[c,l]=W(i);return E(t,{type:"CONSTRUCT",path:r.map(s=>s.toString()),argumentList:c},l).then(w)}});return ot(a,t),a}function ct(t){return Array.prototype.concat.apply([],t)}function W(t){const r=t.map(O);return[r.map(e=>e[0]),ct(r.map(e=>e[1]))]}const D=new WeakMap;function lt(t,r){return D.set(t,r),t}function ft(t){return Object.assign(t,{[m]:!0})}function O(t){for(const[r,e]of H)if(e.canHandle(t)){const[n,a]=e.serialize(t);return[{type:"HANDLER",name:r,value:n},a]}return[{type:"RAW",value:t},D.get(t)||[]]}function w(t){switch(t.type){case"HANDLER":return H.get(t.name).deserialize(t.value);case"RAW":return t.value}}function E(t,r,e){return new Promise(n=>{const a=ht();t.addEventListener("message",function u(i){!i.data||!i.data.id||i.data.id!==a||(t.removeEventListener("message",u),n(i.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:a},r),e)})}function ht(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const gt=400,pt=10,yt=.8,dt=t=>t.length>0;function o(t){return t!=null&&typeof t=="object"&&t["@@functional/placeholder"]===!0}function y(t){return function r(e){return arguments.length===0||o(e)?r:t.apply(this,arguments)}}function g(t){return function r(e,n){switch(arguments.length){case 0:return r;case 1:return o(e)?r:y(function(a){return t(e,a)});default:return o(e)&&o(n)?r:o(e)?y(function(a){return t(a,n)}):o(n)?y(function(a){return t(e,a)}):t(e,n)}}}function G(t,r){switch(t){case 0:return function(){return r.apply(this,arguments)};case 1:return function(e){return r.apply(this,arguments)};case 2:return function(e,n){return r.apply(this,arguments)};case 3:return function(e,n,a){return r.apply(this,arguments)};case 4:return function(e,n,a,u){return r.apply(this,arguments)};case 5:return function(e,n,a,u,i){return r.apply(this,arguments)};case 6:return function(e,n,a,u,i,c){return r.apply(this,arguments)};case 7:return function(e,n,a,u,i,c,l){return r.apply(this,arguments)};case 8:return function(e,n,a,u,i,c,l,s){return r.apply(this,arguments)};case 9:return function(e,n,a,u,i,c,l,s,f){return r.apply(this,arguments)};case 10:return function(e,n,a,u,i,c,l,s,f,p){return r.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function X(t){return function r(e,n,a){switch(arguments.length){case 0:return r;case 1:return o(e)?r:g(function(u,i){return t(e,u,i)});case 2:return o(e)&&o(n)?r:o(e)?g(function(u,i){return t(u,n,i)}):o(n)?g(function(u,i){return t(e,u,i)}):y(function(u){return t(e,n,u)});default:return o(e)&&o(n)&&o(a)?r:o(e)&&o(n)?g(function(u,i){return t(u,i,a)}):o(e)&&o(a)?g(function(u,i){return t(u,n,i)}):o(n)&&o(a)?g(function(u,i){return t(e,u,i)}):o(e)?y(function(u){return t(u,n,a)}):o(n)?y(function(u){return t(e,u,a)}):o(a)?y(function(u){return t(e,n,u)}):t(e,n,a)}}}var k=Array.isArray||function(r){return r!=null&&r.length>=0&&Object.prototype.toString.call(r)==="[object Array]"};function mt(t){return t!=null&&typeof t["@@transducer/step"]=="function"}function wt(t,r,e){return function(){if(arguments.length===0)return e();var n=arguments[arguments.length-1];if(!k(n)){for(var a=0;a<t.length;){if(typeof n[t[a]]=="function")return n[t[a]].apply(n,Array.prototype.slice.call(arguments,0,-1));a+=1}if(mt(n)){var u=r.apply(null,Array.prototype.slice.call(arguments,0,-1));return u(n)}}return e.apply(this,arguments)}}var U={init:function(){return this.xf["@@transducer/init"]()},result:function(t){return this.xf["@@transducer/result"](t)}};function bt(t,r){return Object.prototype.hasOwnProperty.call(r,t)}function vt(t){return Object.prototype.toString.call(t)==="[object Object]"}var Et=Number.isInteger||function(r){return r<<0===r};function B(t){return Object.prototype.toString.call(t)==="[object String]"}function Y(t,r){var e=t<0?r.length+t:t;return B(r)?r.charAt(e):r[e]}var q=g(function(r,e){if(e!=null)return Et(r)?Y(r,e):e[r]}),_t=y(function(r){return k(r)?!0:!r||typeof r!="object"||B(r)?!1:r.length===0?!0:r.length>0?r.hasOwnProperty(0)&&r.hasOwnProperty(r.length-1):!1}),$=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function At(t,r,e){return function(a,u,i){if(_t(i))return t(a,u,i);if(i==null)return u;if(typeof i["fantasy-land/reduce"]=="function")return r(a,u,i,"fantasy-land/reduce");if(i[$]!=null)return e(a,u,i[$]());if(typeof i.next=="function")return e(a,u,i);if(typeof i.reduce=="function")return r(a,u,i,"reduce");throw new TypeError("reduce: list must be array or iterable")}}function St(t,r,e){for(var n=0,a=e.length;n<a;){if(r=t["@@transducer/step"](r,e[n]),r&&r["@@transducer/reduced"]){r=r["@@transducer/value"];break}n+=1}return t["@@transducer/result"](r)}var Rt=g(function(r,e){return G(r.length,function(){return r.apply(e,arguments)})});function Tt(t,r,e){for(var n=e.next();!n.done;){if(r=t["@@transducer/step"](r,n.value),r&&r["@@transducer/reduced"]){r=r["@@transducer/value"];break}n=e.next()}return t["@@transducer/result"](r)}function Ot(t,r,e,n){return t["@@transducer/result"](e[n](Rt(t["@@transducer/step"],t),r))}var kt=At(St,Ot,Tt),Pt=function(){function t(r){this.f=r}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(r){return r},t.prototype["@@transducer/step"]=function(r,e){return this.f(r,e)},t}();function xt(t){return new Pt(t)}var J=X(function(t,r,e){return kt(typeof t=="function"?xt(t):t,r,e)});function Ct(t,r){return function(){return r.call(this,t.apply(this,arguments))}}function Q(t,r){return function(){var e=arguments.length;if(e===0)return r();var n=arguments[e-1];return k(n)||typeof n[t]!="function"?r.apply(this,arguments):n[t].apply(n,Array.prototype.slice.call(arguments,0,e-1))}}var Z=X(Q("slice",function(r,e,n){return Array.prototype.slice.call(n,r,e)})),It=y(Q("tail",Z(1,1/0)));function Mt(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return G(arguments[0].length,J(Ct,arguments[0],It(arguments)))}var zt=function(){function t(r,e){this.xf=e,this.n=r}return t.prototype["@@transducer/init"]=U.init,t.prototype["@@transducer/result"]=U.result,t.prototype["@@transducer/step"]=function(r,e){return this.n>0?(this.n-=1,r):this.xf["@@transducer/step"](r,e)},t}();function Lt(t){return function(r){return new zt(t,r)}}var Nt=g(wt(["drop"],Lt,function(r,e){return Z(Math.max(0,r),1/0,e)})),jt=y(function(t){return Y(-1,t)}),Ht=g(function(r,e){return Nt(r>=0?e.length-r:0,e)}),Vt=g(function t(r,e){if(!vt(e)&&!k(e))return e;var n=e instanceof Array?[]:{},a,u,i;for(u in e)a=r[u],i=typeof a,n[u]=i==="function"?a(e[u]):a&&i==="object"?t(a,e[u]):e[u];return n});function Ft(t){if(t==null)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(t),e=1,n=arguments.length;e<n;){var a=arguments[e];if(a!=null)for(var u in a)bt(u,a)&&(r[u]=a[u]);e+=1}return r}var Wt=typeof Object.assign=="function"?Object.assign:Ft,Dt=g(function(r,e){return Wt({},e,r)}),z=g(function(r,e){return Array.prototype.slice.call(e,0).sort(function(n,a){var u=r(n),i=r(a);return u<i?-1:u>i?1:0})});const Gt=({sizeHomogeneity:t,score:r})=>r*r*t,Xt=t=>{const r=Mt(z(Gt),Ht(30),z(q("score")))(t);return Vt({pictures:z(q("url"))},jt(r))},K=t=>"url"in t,_=(t,r,e)=>{if(K(e))return[{position:t,dimension:r,url:e.url}];if(e.horizontal){const n=r.height*e.first.aspectRatio;return[..._(t,{width:n,height:r.height},e.first),..._({x:t.x+n,y:t.y},{width:r.width-n,height:r.height},e.second)]}else{const n=r.width/e.first.aspectRatio;return[..._(t,{width:r.width,height:n},e.first),..._({x:t.x,y:t.y+n},{width:r.width,height:r.height-n},e.second)]}},Ut=t=>{let r=Number.POSITIVE_INFINITY,e=Number.NEGATIVE_INFINITY;for(let n=0;n<t.length;n++){const a=t[n],u=a.width*a.height;u<r&&(r=u),u>e&&(e=u)}return r/e},Bt=(t,r,e,n)=>{const a=_({x:0,y:0},t,n),u=Ut(a.map(i=>i.dimension));return{dimension:t,score:r,sizeHomogeneity:u,pictures:a,flipScore:e}};class P{constructor(r,e,n){rt(this,"aspectRatio",0);this.horizontal=r,this.first=e,this.second=n;const a=e.aspectRatio+n.aspectRatio;this.aspectRatio=r?a:e.aspectRatio*n.aspectRatio/a}}const x=(t,r)=>t+Math.random()*(r-t+1)|0;function*L(t){if(t.length===1)yield t[0];else for(let r=1;r<t.length;r++){const e=L(t.slice(0,r)),n=L(t.slice(r));for(const a of e)for(const u of n)yield new P(!0,a,u),yield new P(!1,a,u)}}const tt=t=>{const r=t.length-1;if(r===0)return t[0];if(r===1)return new P(x(0,1)===0,t[0],t[1]);const e=x(0,r);let n;do n=x(0,r);while(e===n);const a=new P(x(0,1)===0,t[e],t[n]);return tt(t.with(e,a).toSpliced(n,1))};function*Yt(t){for(;;)yield tt(t)}const qt=(t,r)=>{const e=t.height*r;if(e<=t.width)return{width:e,height:t.height};{const n=t.width/r;return{width:t.width,height:n}}};function*N(t){K(t)||(yield*N(t.first),yield t,yield*N(t.second))}const $t=(t,r)=>{const e=J((a,u)=>u.horizontal?a+1:a,0,[...N(t)]),n=(r-1)/2;return Math.max(1-Math.abs(n-e)/n,0)},Jt={maxComputationTime:gt,randomizeThreshold:pt};var Qt=Object.freeze({__proto__:null,findSolution:(t,r,e)=>{const n=Dt(e??{},Jt),a=Date.now(),u=r.width/r.height,i=[],c=t.length>=n.randomizeThreshold,l=c?Yt(t):L(t);for(const s of l){const p=1/(1+Math.abs(s.aspectRatio-u)),h=$t(s,t.length);if(c&&(h<=.5||p<yt))continue;const b=qt(r,s.aspectRatio);if(i.push(Bt(b,p,h,s)),c&&Date.now()-a>n.maxComputationTime)break}if(console.debug("solutions found: ",i.length),!dt(i))throw new Error("No solution");return Xt(i)}});I(Qt)})();
