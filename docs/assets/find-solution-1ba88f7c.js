var pr=Object.defineProperty;var yr=(m,y,w)=>y in m?pr(m,y,{enumerable:!0,configurable:!0,writable:!0,value:w}):m[y]=w;var rt=(m,y,w)=>(yr(m,typeof y!="symbol"?y+"":y,w),w);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const m=Symbol("Comlink.proxy"),y=Symbol("Comlink.endpoint"),w=Symbol("Comlink.releaseProxy"),P=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),j=t=>typeof t=="object"&&t!==null||typeof t=="function",et={canHandle:t=>j(t)&&t[m],serialize(t){const{port1:r,port2:e}=new MessageChannel;return x(t,r),[e,[e]]},deserialize(t){return t.start(),it(t)}},nt={canHandle:t=>j(t)&&S in t,serialize({value:t}){let r;return t instanceof Error?r={isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:r={isError:!1,value:t},[r,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}},N=new Map([["proxy",et],["throw",nt]]);function at(t,r){for(const e of t)if(r===e||e==="*"||e instanceof RegExp&&e.test(r))return!0;return!1}function x(t,r=globalThis,e=["*"]){r.addEventListener("message",function n(a){if(!a||!a.data)return;if(!at(e,a.origin)){console.warn(`Invalid origin '${a.origin}' for comlink proxy`);return}const{id:o,type:i,path:s}=Object.assign({path:[]},a.data),f=(a.data.argumentList||[]).map(v);let c;try{const l=s.slice(0,-1).reduce((g,b)=>g[b],t),p=s.reduce((g,b)=>g[b],t);switch(i){case"GET":c=p;break;case"SET":l[s.slice(-1)[0]]=v(a.data.value),c=!0;break;case"APPLY":c=p.apply(l,f);break;case"CONSTRUCT":{const g=new p(...f);c=ft(g)}break;case"ENDPOINT":{const{port1:g,port2:b}=new MessageChannel;x(t,b),c=lt(g,[g])}break;case"RELEASE":c=void 0;break;default:return}}catch(l){c={value:l,[S]:0}}Promise.resolve(c).catch(l=>({value:l,[S]:0})).then(l=>{const[p,g]=T(l);r.postMessage(Object.assign(Object.assign({},p),{id:o}),g),i==="RELEASE"&&(r.removeEventListener("message",n),$(r),P in t&&typeof t[P]=="function"&&t[P]())}).catch(l=>{const[p,g]=T({value:new TypeError("Unserializable return value"),[S]:0});r.postMessage(Object.assign(Object.assign({},p),{id:o}),g)})}),r.start&&r.start()}function ot(t){return t.constructor.name==="MessagePort"}function $(t){ot(t)&&t.close()}function it(t,r){return I(t,[],r)}function A(t){if(t)throw new Error("Proxy has been released and is not useable")}function D(t){return E(t,{type:"RELEASE"}).then(()=>{$(t)})}const k=new WeakMap,R="FinalizationRegistry"in globalThis&&new FinalizationRegistry(t=>{const r=(k.get(t)||0)-1;k.set(t,r),r===0&&D(t)});function ut(t,r){const e=(k.get(r)||0)+1;k.set(r,e),R&&R.register(t,r,t)}function st(t){R&&R.unregister(t)}function I(t,r=[],e=function(){}){let n=!1;const a=new Proxy(e,{get(o,i){if(A(n),i===w)return()=>{st(a),D(t),n=!0};if(i==="then"){if(r.length===0)return{then:()=>a};const s=E(t,{type:"GET",path:r.map(f=>f.toString())}).then(v);return s.then.bind(s)}return I(t,[...r,i])},set(o,i,s){A(n);const[f,c]=T(s);return E(t,{type:"SET",path:[...r,i].map(l=>l.toString()),value:f},c).then(v)},apply(o,i,s){A(n);const f=r[r.length-1];if(f===y)return E(t,{type:"ENDPOINT"}).then(v);if(f==="bind")return I(t,r.slice(0,-1));const[c,l]=H(s);return E(t,{type:"APPLY",path:r.map(p=>p.toString()),argumentList:c},l).then(v)},construct(o,i){A(n);const[s,f]=H(i);return E(t,{type:"CONSTRUCT",path:r.map(c=>c.toString()),argumentList:s},f).then(v)}});return ut(a,t),a}function ct(t){return Array.prototype.concat.apply([],t)}function H(t){const r=t.map(T);return[r.map(e=>e[0]),ct(r.map(e=>e[1]))]}const W=new WeakMap;function lt(t,r){return W.set(t,r),t}function ft(t){return Object.assign(t,{[m]:!0})}function T(t){for(const[r,e]of N)if(e.canHandle(t)){const[n,a]=e.serialize(t);return[{type:"HANDLER",name:r,value:n},a]}return[{type:"RAW",value:t},W.get(t)||[]]}function v(t){switch(t.type){case"HANDLER":return N.get(t.name).deserialize(t.value);case"RAW":return t.value}}function E(t,r,e){return new Promise(n=>{const a=ht();t.addEventListener("message",function o(i){!i.data||!i.data.id||i.data.id!==a||(t.removeEventListener("message",o),n(i.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:a},r),e)})}function ht(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function u(t){return t!=null&&typeof t=="object"&&t["@@functional/placeholder"]===!0}function d(t){return function r(e){return arguments.length===0||u(e)?r:t.apply(this,arguments)}}function h(t){return function r(e,n){switch(arguments.length){case 0:return r;case 1:return u(e)?r:d(function(a){return t(e,a)});default:return u(e)&&u(n)?r:u(e)?d(function(a){return t(a,n)}):u(n)?d(function(a){return t(e,a)}):t(e,n)}}}function V(t,r){switch(t){case 0:return function(){return r.apply(this,arguments)};case 1:return function(e){return r.apply(this,arguments)};case 2:return function(e,n){return r.apply(this,arguments)};case 3:return function(e,n,a){return r.apply(this,arguments)};case 4:return function(e,n,a,o){return r.apply(this,arguments)};case 5:return function(e,n,a,o,i){return r.apply(this,arguments)};case 6:return function(e,n,a,o,i,s){return r.apply(this,arguments)};case 7:return function(e,n,a,o,i,s,f){return r.apply(this,arguments)};case 8:return function(e,n,a,o,i,s,f,c){return r.apply(this,arguments)};case 9:return function(e,n,a,o,i,s,f,c,l){return r.apply(this,arguments)};case 10:return function(e,n,a,o,i,s,f,c,l,p){return r.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function F(t){return function r(e,n,a){switch(arguments.length){case 0:return r;case 1:return u(e)?r:h(function(o,i){return t(e,o,i)});case 2:return u(e)&&u(n)?r:u(e)?h(function(o,i){return t(o,n,i)}):u(n)?h(function(o,i){return t(e,o,i)}):d(function(o){return t(e,n,o)});default:return u(e)&&u(n)&&u(a)?r:u(e)&&u(n)?h(function(o,i){return t(o,i,a)}):u(e)&&u(a)?h(function(o,i){return t(o,n,i)}):u(n)&&u(a)?h(function(o,i){return t(e,o,i)}):u(e)?d(function(o){return t(o,n,a)}):u(n)?d(function(o){return t(e,o,a)}):u(a)?d(function(o){return t(e,n,o)}):t(e,n,a)}}}var O=Array.isArray||function(r){return r!=null&&r.length>=0&&Object.prototype.toString.call(r)==="[object Array]"};function gt(t){return t!=null&&typeof t["@@transducer/step"]=="function"}function pt(t,r,e){return function(){if(arguments.length===0)return e();var n=arguments[arguments.length-1];if(!O(n)){for(var a=0;a<t.length;){if(typeof n[t[a]]=="function")return n[t[a]].apply(n,Array.prototype.slice.call(arguments,0,-1));a+=1}if(gt(n)){var o=r.apply(null,Array.prototype.slice.call(arguments,0,-1));return o(n)}}return e.apply(this,arguments)}}var B={init:function(){return this.xf["@@transducer/init"]()},result:function(t){return this.xf["@@transducer/result"](t)}};function yt(t,r){return Object.prototype.hasOwnProperty.call(r,t)}function dt(t){return Object.prototype.toString.call(t)==="[object Object]"}var mt=Number.isInteger||function(r){return r<<0===r};function X(t){return Object.prototype.toString.call(t)==="[object String]"}var wt=h(function(r,e){var n=r<0?e.length+r:r;return X(e)?e.charAt(n):e[n]}),U=wt,vt=h(function(r,e){if(e!=null)return mt(r)?U(r,e):e[r]}),G=vt,bt=d(function(r){return O(r)?!0:!r||typeof r!="object"||X(r)?!1:r.length===0?!0:r.length>0?r.hasOwnProperty(0)&&r.hasOwnProperty(r.length-1):!1}),Et=bt,Y=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function _t(t,r,e){return function(a,o,i){if(Et(i))return t(a,o,i);if(i==null)return o;if(typeof i["fantasy-land/reduce"]=="function")return r(a,o,i,"fantasy-land/reduce");if(i[Y]!=null)return e(a,o,i[Y]());if(typeof i.next=="function")return e(a,o,i);if(typeof i.reduce=="function")return r(a,o,i,"reduce");throw new TypeError("reduce: list must be array or iterable")}}function St(t,r,e){for(var n=0,a=e.length;n<a;){if(r=t["@@transducer/step"](r,e[n]),r&&r["@@transducer/reduced"]){r=r["@@transducer/value"];break}n+=1}return t["@@transducer/result"](r)}var At=h(function(r,e){return V(r.length,function(){return r.apply(e,arguments)})}),kt=At;function Rt(t,r,e){for(var n=e.next();!n.done;){if(r=t["@@transducer/step"](r,n.value),r&&r["@@transducer/reduced"]){r=r["@@transducer/value"];break}n=e.next()}return t["@@transducer/result"](r)}function Tt(t,r,e,n){return t["@@transducer/result"](e[n](kt(t["@@transducer/step"],t),r))}var Ot=_t(St,Tt,Rt),Pt=Ot,xt=function(){function t(r){this.f=r}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(r){return r},t.prototype["@@transducer/step"]=function(r,e){return this.f(r,e)},t}();function It(t){return new xt(t)}var Lt=F(function(t,r,e){return Pt(typeof t=="function"?It(t):t,r,e)}),Ct=Lt;function Mt(t,r){return function(){return r.call(this,t.apply(this,arguments))}}function q(t,r){return function(){var e=arguments.length;if(e===0)return r();var n=arguments[e-1];return O(n)||typeof n[t]!="function"?r.apply(this,arguments):n[t].apply(n,Array.prototype.slice.call(arguments,0,e-1))}}var zt=F(q("slice",function(r,e,n){return Array.prototype.slice.call(n,r,e)})),J=zt,jt=d(q("tail",J(1,1/0))),Nt=jt;function $t(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return V(arguments[0].length,Ct(Mt,arguments[0],Nt(arguments)))}var Dt=function(){function t(r,e){this.xf=e,this.n=r}return t.prototype["@@transducer/init"]=B.init,t.prototype["@@transducer/result"]=B.result,t.prototype["@@transducer/step"]=function(r,e){return this.n>0?(this.n-=1,r):this.xf["@@transducer/step"](r,e)},t}();function Ht(t){return function(r){return new Dt(t,r)}}var Wt=h(pt(["drop"],Ht,function(r,e){return J(Math.max(0,r),1/0,e)})),Vt=Wt,Ft=U(-1),Bt=Ft,Xt=h(function(r,e){return Vt(r>=0?e.length-r:0,e)}),Ut=Xt,Gt=h(function t(r,e){if(!dt(e)&&!O(e))return e;var n=e instanceof Array?[]:{},a,o,i;for(o in e)a=r[o],i=typeof a,n[o]=i==="function"?a(e[o]):a&&i==="object"?t(a,e[o]):e[o];return n}),Yt=Gt;function qt(t){if(t==null)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(t),e=1,n=arguments.length;e<n;){var a=arguments[e];if(a!=null)for(var o in a)yt(o,a)&&(r[o]=a[o]);e+=1}return r}var Jt=typeof Object.assign=="function"?Object.assign:qt;function Q(t){return Object.prototype.toString.call(t)==="[object Number]"}var Qt=h(function(r,e){return Jt({},e,r)}),Zt=Qt,Kt=h(function(r,e){if(!(Q(r)&&Q(e)))throw new TypeError("Both arguments to range must be numbers");for(var n=[],a=r;a<e;)n.push(a),a+=1;return n}),tr=Kt,rr=h(function(r,e){return Array.prototype.slice.call(e,0).sort(function(n,a){var o=r(n),i=r(a);return o<i?-1:o>i?1:0})}),L=rr;const Z=18;tr(1,Z).map(t=>`./images/${t}.jpg`);const er=400,nr=11,ar=({pictures:t,sizeHomogeneity:r,score:e})=>t.length<=4?e:e*r,or=t=>t.length>0,ir=t=>{const r=$t(L(ar),Ut((Z-t[0].pictures.length)*5),L(G("score")))(t);return Yt({pictures:L(G("url"))},Bt(r))},ur=t=>"url"in t,_=(t,r,e)=>{if(ur(e))return[{position:t,dimension:r,url:e.url}];if(e.horizontal){const n=r.height*e.first.aspectRatio,a={x:t.x+n,y:t.y},o={width:n,height:r.height},i={width:r.width-n,height:r.height};return _(t,o,e.first).concat(_(a,i,e.second))}else{const n=r.width/e.first.aspectRatio,a={x:t.x,y:t.y+n},o={width:r.width,height:n},i={width:r.width,height:r.height-n};return _(t,o,e.first).concat(_(a,i,e.second))}},sr=t=>{let r=0,e=0,n=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY;return t.forEach(o=>{o.width>r&&(r=o.width),o.height>e&&(e=o.height),o.width<n&&(n=o.width),o.height<a&&(a=o.height)}),r===0||e===0?0:(n/r+a/e)/2},cr=(t,r,e)=>{const n=_({x:0,y:0},t,e),a=sr(n.map(o=>o.dimension));return{dimension:t,score:r,sizeHomogeneity:a,pictures:n}};class C{constructor(r,e,n){rt(this,"aspectRatio",0);this.horizontal=r,this.first=e,this.second=n;const a=e.aspectRatio+n.aspectRatio;this.aspectRatio=r?a:e.aspectRatio*n.aspectRatio/a}}const M=(t,r)=>t+Math.random()*(r-t+1)|0;function*z(t){if(t.length===1)yield t[0];else for(let r=1;r<t.length;r++){const e=z(t.slice(0,r)),n=z(t.slice(r));for(const a of e)for(const o of n)yield new C(!0,a,o),yield new C(!1,a,o)}}const K=(t,r)=>new C(!!M(0,1),t,r),tt=t=>{const r=t.length-1;if(r===0)return t[0];if(r===1)return K(t[0],t[1]);const e=M(0,r);let n;do n=M(0,r);while(e===n);const a=K(t[e],t[n]);return tt(t.with(e,a).toSpliced(n,1))};function*lr(t){for(;;)yield tt(t)}const fr=(t,r)=>{const e=t.height*r;if(e<=t.width)return{width:e,height:t.height};{const n=t.width/r;return{width:t.width,height:n}}},hr={maxComputationTime:er,randomizeThreshold:nr};var gr=Object.freeze({__proto__:null,findSolution:(t,r,e)=>{const n=Zt(e??{},hr),a=Date.now(),o=r.width/r.height,i=[],s=t.length<n.randomizeThreshold,f=s?z(t):lr(t);let c=0;for(const l of f){const g=1/(1+Math.abs(l.aspectRatio-o));if(c++,!s&&g<.9)continue;const b=fr(r,l.aspectRatio);if(i.push(cr(b,g,l)),Date.now()-a>n.maxComputationTime){console.debug("computation took too long, aborting");break}}if(console.debug("solution checked: ",c),console.debug("solutions found: ",i.length),!or(i))throw new Error("No solution");return ir(i)}});x(gr)})();
