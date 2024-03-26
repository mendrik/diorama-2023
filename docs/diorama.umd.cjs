(function(g,y){typeof exports=="object"&&typeof module<"u"?y(exports):typeof define=="function"&&define.amd?define(["exports"],y):(g=typeof globalThis<"u"?globalThis:g||self,y(g.Diorama={}))})(this,function(g){"use strict";var_documentCurrentScript=typeofdocument!=="undefined"?document.currentScript:null;/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: Apache-2.0
*/const y=Symbol("Comlink.proxy"),N=Symbol("Comlink.endpoint"),j=Symbol("Comlink.releaseProxy"),P=Symbol("Comlink.finalizer"),w=Symbol("Comlink.thrown"),x=e=>typeof e=="object"&&e!==null||typeof e=="function",I={canHandle:e=>x(e)&&e[y],serialize(e){const{port1:t,port2:n}=new MessageChannel;return C(e,t),[n,[n]]},deserialize(e){return e.start(),M(e)}},U={canHandle:e=>x(e)&&w in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},R=new Map([["proxy",I],["throw",U]]);function W(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function C(e,t=globalThis,n=["*"]){t.addEventListener("message",function u(r){if(!r||!r.data)return;if(!W(n,r.origin)){console.warn(`Invalid origin '${r.origin}' for comlink proxy`);return}const{id:d,type:s,path:i}=Object.assign({path:[]},r.data),l=(r.data.argumentList||[]).map(m);let o;try{const a=i.slice(0,-1).reduce((c,h)=>c[h],e),f=i.reduce((c,h)=>c[h],e);switch(s){case"GET":o=f;break;case"SET":a[i.slice(-1)[0]]=m(r.data.value),o=!0;break;case"APPLY":o=f.apply(a,l);break;case"CONSTRUCT":{const c=new f(...l);o=Y(c)}break;case"ENDPOINT":{const{port1:c,port2:h}=new MessageChannel;C(e,h),o=G(c,[c])}break;case"RELEASE":o=void 0;break;default:return}}catch(a){o={value:a,[w]:0}}Promise.resolve(o).catch(a=>({value:a,[w]:0})).then(a=>{const[f,c]=k(a);t.postMessage(Object.assign(Object.assign({},f),{id:d}),c),s==="RELEASE"&&(t.removeEventListener("message",u),L(t),P in e&&typeof e[P]=="function"&&e[P]())}).catch(a=>{const[f,c]=k({value:new TypeError("Unserializable return value"),[w]:0});t.postMessage(Object.assign(Object.assign({},f),{id:d}),c)})}),t.start&&t.start()}function H(e){return e.constructor.name==="MessagePort"}function L(e){H(e)&&e.close()}function M(e,t){return T(e,[],t)}function b(e){if(e)throw new Error("Proxy has been released and is not useable")}function O(e){return p(e,{type:"RELEASE"}).then(()=>{L(e)})}const E=new WeakMap,S="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(E.get(e)||0)-1;E.set(e,t),t===0&&O(e)});function F(e,t){const n=(E.get(t)||0)+1;E.set(t,n),S&&S.register(e,t,e)}function V(e){S&&S.unregister(e)}function T(e,t=[],n=function(){}){let u=!1;const r=new Proxy(n,{get(d,s){if(b(u),s===j)return()=>{V(r),O(e),u=!0};if(s==="then"){if(t.length===0)return{then:()=>r};const i=p(e,{type:"GET",path:t.map(l=>l.toString())}).then(m);return i.then.bind(i)}return T(e,[...t,s])},set(d,s,i){b(u);const[l,o]=k(i);return p(e,{type:"SET",path:[...t,s].map(a=>a.toString()),value:l},o).then(m)},apply(d,s,i){b(u);const l=t[t.length-1];if(l===N)return p(e,{type:"ENDPOINT"}).then(m);if(l==="bind")return T(e,t.slice(0,-1));const[o,a]=A(i);return p(e,{type:"APPLY",path:t.map(f=>f.toString()),argumentList:o},a).then(m)},construct(d,s){b(u);const[i,l]=A(s);return p(e,{type:"CONSTRUCT",path:t.map(o=>o.toString()),argumentList:i},l).then(m)}});return F(r,e),r}function D(e){return Array.prototype.concat.apply([],e)}function A(e){const t=e.map(k);return[t.map(n=>n[0]),D(t.map(n=>n[1]))]}const _=new WeakMap;function G(e,t){return _.set(e,t),e}function Y(e){return Object.assign(e,{[y]:!0})}function k(e){for(const[t,n]of R)if(n.canHandle(e)){const[u,r]=n.serialize(e);return[{type:"HANDLER",name:t,value:u},r]}return[{type:"RAW",value:e},_.get(e)||[]]}function m(e){switch(e.type){case"HANDLER":return R.get(e.name).deserialize(e.value);case"RAW":return e.value}}function p(e,t,n){return new Promise(u=>{const r=q();e.addEventListener("message",function d(s){!s.data||!s.data.id||s.data.id!==r||(e.removeEventListener("message",d),u(s.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:r},t),n)})}function q(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const z=M(new Worker(new URL("/diorama-2023/none/find-solution-CFSOlTLY.js",typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:_documentCurrentScript&&_documentCurrentScript.src||new URL("diorama.umd.cjs",document.baseURI).href))),X=(e,t,n)=>z.findSolution(e,t,n);g.runWorker=X,g.workerInstance=z,Object.defineProperty(g,Symbol.toStringTag,{value:"Module"})});
