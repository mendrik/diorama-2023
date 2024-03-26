/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const S = Symbol("Comlink.proxy"), z = Symbol("Comlink.endpoint"), N = Symbol("Comlink.releaseProxy"), k = Symbol("Comlink.finalizer"), E = Symbol("Comlink.thrown"), L = (e) => typeof e == "object" && e !== null || typeof e == "function", H = {
  canHandle: (e) => L(e) && e[S],
  serialize(e) {
    const { port1: t, port2: n } = new MessageChannel();
    return T(e, t), [n, [n]];
  },
  deserialize(e) {
    return e.start(), C(e);
  }
}, W = {
  canHandle: (e) => L(e) && E in e,
  serialize({ value: e }) {
    let t;
    return e instanceof Error ? t = {
      isError: !0,
      value: {
        message: e.message,
        name: e.name,
        stack: e.stack
      }
    } : t = { isError: !1, value: e }, [t, []];
  },
  deserialize(e) {
    throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
  }
}, R = /* @__PURE__ */ new Map([
  ["proxy", H],
  ["throw", W]
]);
function I(e, t) {
  for (const n of e)
    if (t === n || n === "*" || n instanceof RegExp && n.test(t))
      return !0;
  return !1;
}
function T(e, t = globalThis, n = ["*"]) {
  t.addEventListener("message", function u(r) {
    if (!r || !r.data)
      return;
    if (!I(n, r.origin)) {
      console.warn(`Invalid origin '${r.origin}' for comlink proxy`);
      return;
    }
    const { id: g, type: s, path: i } = Object.assign({ path: [] }, r.data), l = (r.data.argumentList || []).map(m);
    let a;
    try {
      const o = i.slice(0, -1).reduce((c, y) => c[y], e), f = i.reduce((c, y) => c[y], e);
      switch (s) {
        case "GET":
          a = f;
          break;
        case "SET":
          o[i.slice(-1)[0]] = m(r.data.value), a = !0;
          break;
        case "APPLY":
          a = f.apply(o, l);
          break;
        case "CONSTRUCT":
          {
            const c = new f(...l);
            a = D(c);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: c, port2: y } = new MessageChannel();
            T(e, y), a = U(c, [c]);
          }
          break;
        case "RELEASE":
          a = void 0;
          break;
        default:
          return;
      }
    } catch (o) {
      a = { value: o, [E]: 0 };
    }
    Promise.resolve(a).catch((o) => ({ value: o, [E]: 0 })).then((o) => {
      const [f, c] = p(o);
      t.postMessage(Object.assign(Object.assign({}, f), { id: g }), c), s === "RELEASE" && (t.removeEventListener("message", u), A(t), k in e && typeof e[k] == "function" && e[k]());
    }).catch((o) => {
      const [f, c] = p({
        value: new TypeError("Unserializable return value"),
        [E]: 0
      });
      t.postMessage(Object.assign(Object.assign({}, f), { id: g }), c);
    });
  }), t.start && t.start();
}
function V(e) {
  return e.constructor.name === "MessagePort";
}
function A(e) {
  V(e) && e.close();
}
function C(e, t) {
  return x(e, [], t);
}
function w(e) {
  if (e)
    throw new Error("Proxy has been released and is not useable");
}
function M(e) {
  return d(e, {
    type: "RELEASE"
  }).then(() => {
    A(e);
  });
}
const h = /* @__PURE__ */ new WeakMap(), b = "FinalizationRegistry" in globalThis && new FinalizationRegistry((e) => {
  const t = (h.get(e) || 0) - 1;
  h.set(e, t), t === 0 && M(e);
});
function _(e, t) {
  const n = (h.get(t) || 0) + 1;
  h.set(t, n), b && b.register(e, t, e);
}
function j(e) {
  b && b.unregister(e);
}
function x(e, t = [], n = function() {
}) {
  let u = !1;
  const r = new Proxy(n, {
    get(g, s) {
      if (w(u), s === N)
        return () => {
          j(r), M(e), u = !0;
        };
      if (s === "then") {
        if (t.length === 0)
          return { then: () => r };
        const i = d(e, {
          type: "GET",
          path: t.map((l) => l.toString())
        }).then(m);
        return i.then.bind(i);
      }
      return x(e, [...t, s]);
    },
    set(g, s, i) {
      w(u);
      const [l, a] = p(i);
      return d(e, {
        type: "SET",
        path: [...t, s].map((o) => o.toString()),
        value: l
      }, a).then(m);
    },
    apply(g, s, i) {
      w(u);
      const l = t[t.length - 1];
      if (l === z)
        return d(e, {
          type: "ENDPOINT"
        }).then(m);
      if (l === "bind")
        return x(e, t.slice(0, -1));
      const [a, o] = P(i);
      return d(e, {
        type: "APPLY",
        path: t.map((f) => f.toString()),
        argumentList: a
      }, o).then(m);
    },
    construct(g, s) {
      w(u);
      const [i, l] = P(s);
      return d(e, {
        type: "CONSTRUCT",
        path: t.map((a) => a.toString()),
        argumentList: i
      }, l).then(m);
    }
  });
  return _(r, e), r;
}
function F(e) {
  return Array.prototype.concat.apply([], e);
}
function P(e) {
  const t = e.map(p);
  return [t.map((n) => n[0]), F(t.map((n) => n[1]))];
}
const O = /* @__PURE__ */ new WeakMap();
function U(e, t) {
  return O.set(e, t), e;
}
function D(e) {
  return Object.assign(e, { [S]: !0 });
}
function p(e) {
  for (const [t, n] of R)
    if (n.canHandle(e)) {
      const [u, r] = n.serialize(e);
      return [
        {
          type: "HANDLER",
          name: t,
          value: u
        },
        r
      ];
    }
  return [
    {
      type: "RAW",
      value: e
    },
    O.get(e) || []
  ];
}
function m(e) {
  switch (e.type) {
    case "HANDLER":
      return R.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function d(e, t, n) {
  return new Promise((u) => {
    const r = G();
    e.addEventListener("message", function g(s) {
      !s.data || !s.data.id || s.data.id !== r || (e.removeEventListener("message", g), u(s.data));
    }), e.start && e.start(), e.postMessage(Object.assign({ id: r }, t), n);
  });
}
function G() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const Y = C(
  new Worker(
    new URL("/diorama-2023/none/find-solution-CFSOlTLY.js", import.meta.url)
  )
), q = (e, t, n) => Y.findSolution(e, t, n);
export {
  q as runWorker,
  Y as workerInstance
};
