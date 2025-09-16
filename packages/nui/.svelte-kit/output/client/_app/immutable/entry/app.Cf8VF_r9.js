var H = (t) => {
  throw TypeError(t);
};
var K = (t, e, a) => e.has(t) || H("Cannot " + a);
var m = (t, e, a) => (K(t, e, "read from private field"), a ? a.call(t) : e.get(t)), w = (t, e, a) => e.has(t) ? H("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), C = (t, e, a, f) => (K(t, e, "write to private field"), f ? f.call(t, a) : e.set(t, a), a);
import { h as A, t as X, b as J, E as Q, Y as ue, Z as le, _ as de, r as oe, q as V, A as p, a as Z, $ as z, a0 as _e, a1 as $, a2 as ve, a3 as ee, c as te, a4 as he, a5 as me, a6 as ge, N as ae, a7 as re, a8 as be, a9 as ye, aa as Se, O as y, R as Pe, ab as Re, ac as Ee, ad as T, ae as Ie, k as Oe, af as xe, ag as Ae, ah as Te, ai as ke, aj as De, ak as Le, al as se, am as Ne, e as we, an as Ce, B as Ye, K as je, L as Be, ao as Y, f as D, X as Fe, F as Me, V as Ue, W as qe, ap as j, U as Ze } from "../chunks/B7HyO7zA.js";
import { h as ze, m as Ge, u as He, s as Ke } from "../chunks/Bq6EJNkR.js";
import { f as ne, a as x, c as B, t as Ve } from "../chunks/BBxvU1hr.js";
import { onMount as We, tick as Xe } from "svelte";
function F(t, e, a = !1) {
  A && X();
  var f = t, s = null, n = null, r = _e, i = a ? Q : 0, u = !1;
  const R = (S, d = !0) => {
    u = !0, E(d, S);
  };
  var l = null;
  function O() {
    l !== null && (l.lastChild.remove(), f.before(l), l = null);
    var S = r ? s : n, d = r ? n : s;
    S && ve(S), d && ee(d, () => {
      r ? n = null : s = null;
    });
  }
  const E = (S, d) => {
    if (r === (r = S)) return;
    let _ = !1;
    if (A) {
      const o = ue(f) === le;
      !!r === o && (f = de(), oe(f), V(!1), _ = !0);
    }
    var h = $(), v = f;
    if (h && (l = document.createDocumentFragment(), l.append(v = p())), r ? s ?? (s = d && Z(() => d(v))) : n ?? (n = d && Z(() => d(v))), h) {
      var P = (
        /** @type {Batch} */
        z
      ), g = r ? s : n, c = r ? n : s;
      g && P.skipped_effects.delete(g), c && P.skipped_effects.add(c), P.add_callback(O);
    } else
      O();
    _ && V(!0);
  };
  J(() => {
    u = !1, e(R), u || E(null, null);
  }, i), A && (f = te);
}
function M(t, e, a) {
  A && X();
  var f = t, s, n, r = null, i = null;
  function u() {
    n && (ee(n), n = null), r && (r.lastChild.remove(), f.before(r), r = null), n = i, i = null;
  }
  J(() => {
    if (s !== (s = e())) {
      var R = $();
      if (s) {
        var l = f;
        R && (r = document.createDocumentFragment(), r.append(l = p()), n && z.skipped_effects.add(n)), i = Z(() => a(l, s));
      }
      R ? z.add_callback(u) : u();
    }
  }, Q), A && (f = te);
}
function W(t, e) {
  return t === e || (t == null ? void 0 : t[re]) === e;
}
function U(t = {}, e, a, f) {
  return he(() => {
    var s, n;
    return me(() => {
      s = n, n = [], ae(() => {
        t !== a(...n) && (e(t, ...n), s && W(a(...s), t) && e(null, ...s));
      });
    }), () => {
      ge(() => {
        n && W(a(...n), t) && e(null, ...n);
      });
    };
  }), t;
}
let L = !1;
function Je(t) {
  var e = L;
  try {
    return L = !1, [t(), L];
  } finally {
    L = e;
  }
}
function q(t, e, a, f) {
  var g;
  var s = !Te || (a & ke) !== 0, n = (a & Ae) !== 0, r = (a & Le) !== 0, i = (
    /** @type {V} */
    f
  ), u = !0, R = () => (u && (u = !1, i = r ? ae(
    /** @type {() => V} */
    f
  ) : (
    /** @type {V} */
    f
  )), i), l;
  if (n) {
    var O = re in t || se in t;
    l = ((g = be(t, e)) == null ? void 0 : g.set) ?? (O && e in t ? (c) => t[e] = c : void 0);
  }
  var E, S = !1;
  n ? [E, S] = Je(() => (
    /** @type {V} */
    t[e]
  )) : E = /** @type {V} */
  t[e], E === void 0 && f !== void 0 && (E = R(), l && (s && ye(), l(E)));
  var d;
  if (s ? d = () => {
    var c = (
      /** @type {V} */
      t[e]
    );
    return c === void 0 ? R() : (u = !0, c);
  } : d = () => {
    var c = (
      /** @type {V} */
      t[e]
    );
    return c !== void 0 && (i = /** @type {V} */
    void 0), c === void 0 ? i : c;
  }, s && (a & Se) === 0)
    return d;
  if (l) {
    var _ = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(c, o) {
        return arguments.length > 0 ? ((!s || !o || _ || S) && l(o ? d() : c), c) : d();
      })
    );
  }
  var h = !1, v = ((a & De) !== 0 ? Pe : Re)(() => (h = !1, d()));
  n && y(v);
  var P = (
    /** @type {Effect} */
    Oe
  );
  return (
    /** @type {() => V} */
    (function(c, o) {
      if (arguments.length > 0) {
        const N = o ? y(v) : s && n ? Ee(c) : c;
        return T(v, N), h = !0, i !== void 0 && (i = N), c;
      }
      return Ie && h || (P.f & xe) !== 0 ? v.v : y(v);
    })
  );
}
function Qe(t) {
  return class extends pe {
    /** @param {any} options */
    constructor(e) {
      super({
        component: t,
        ...e
      });
    }
  };
}
var I, b;
class pe {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    w(this, I);
    /** @type {Record<string, any>} */
    w(this, b);
    var n;
    var a = /* @__PURE__ */ new Map(), f = (r, i) => {
      var u = Ce(i, !1, !1);
      return a.set(r, u), u;
    };
    const s = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(r, i) {
          return y(a.get(i) ?? f(i, Reflect.get(r, i)));
        },
        has(r, i) {
          return i === se ? !0 : (y(a.get(i) ?? f(i, Reflect.get(r, i))), Reflect.has(r, i));
        },
        set(r, i, u) {
          return T(a.get(i) ?? f(i, u), u), Reflect.set(r, i, u);
        }
      }
    );
    C(this, b, (e.hydrate ? ze : Ge)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: s,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    })), (!((n = e == null ? void 0 : e.props) != null && n.$$host) || e.sync === !1) && Ne(), C(this, I, s.$$events);
    for (const r of Object.keys(m(this, b)))
      r === "$set" || r === "$destroy" || r === "$on" || we(this, r, {
        get() {
          return m(this, b)[r];
        },
        /** @param {any} value */
        set(i) {
          m(this, b)[r] = i;
        },
        enumerable: !0
      });
    m(this, b).$set = /** @param {Record<string, any>} next */
    (r) => {
      Object.assign(s, r);
    }, m(this, b).$destroy = () => {
      He(m(this, b));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    m(this, b).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, a) {
    m(this, I)[e] = m(this, I)[e] || [];
    const f = (...s) => a.call(this, ...s);
    return m(this, I)[e].push(f), () => {
      m(this, I)[e] = m(this, I)[e].filter(
        /** @param {any} fn */
        (s) => s !== f
      );
    };
  }
  $destroy() {
    m(this, b).$destroy();
  }
}
I = new WeakMap(), b = new WeakMap();
const ut = {};
var $e = ne('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'), et = ne("<!> <!>", 1);
function tt(t, e) {
  Ye(e, !0);
  let a = q(e, "components", 23, () => []), f = q(e, "data_0", 3, null), s = q(e, "data_1", 3, null);
  je(() => e.stores.page.set(e.page)), Be(() => {
    e.stores, e.page, e.constructors, a(), e.form, f(), s(), e.stores.page.notify();
  });
  let n = Y(!1), r = Y(!1), i = Y(null);
  We(() => {
    const _ = e.stores.page.subscribe(() => {
      y(n) && (T(r, !0), Xe().then(() => {
        T(i, document.title || "untitled page", !0);
      }));
    });
    return T(n, !0), _;
  });
  const u = j(() => e.constructors[1]);
  var R = et(), l = D(R);
  {
    var O = (_) => {
      const h = j(() => e.constructors[0]);
      var v = B(), P = D(v);
      M(P, () => y(h), (g, c) => {
        U(
          c(g, {
            get data() {
              return f();
            },
            get form() {
              return e.form;
            },
            get params() {
              return e.page.params;
            },
            children: (o, N) => {
              var G = B(), ie = D(G);
              M(ie, () => y(u), (fe, ce) => {
                U(
                  ce(fe, {
                    get data() {
                      return s();
                    },
                    get form() {
                      return e.form;
                    },
                    get params() {
                      return e.page.params;
                    }
                  }),
                  (k) => a()[1] = k,
                  () => {
                    var k;
                    return (k = a()) == null ? void 0 : k[1];
                  }
                );
              }), x(o, G);
            },
            $$slots: { default: !0 }
          }),
          (o) => a()[0] = o,
          () => {
            var o;
            return (o = a()) == null ? void 0 : o[0];
          }
        );
      }), x(_, v);
    }, E = (_) => {
      const h = j(() => e.constructors[0]);
      var v = B(), P = D(v);
      M(P, () => y(h), (g, c) => {
        U(
          c(g, {
            get data() {
              return f();
            },
            get form() {
              return e.form;
            },
            get params() {
              return e.page.params;
            }
          }),
          (o) => a()[0] = o,
          () => {
            var o;
            return (o = a()) == null ? void 0 : o[0];
          }
        );
      }), x(_, v);
    };
    F(l, (_) => {
      e.constructors[1] ? _(O) : _(E, !1);
    });
  }
  var S = Fe(l, 2);
  {
    var d = (_) => {
      var h = $e(), v = Ue(h);
      {
        var P = (g) => {
          var c = Ve();
          Ze(() => Ke(c, y(i))), x(g, c);
        };
        F(v, (g) => {
          y(r) && g(P);
        });
      }
      qe(h), x(_, h);
    };
    F(S, (_) => {
      y(n) && _(d);
    });
  }
  x(t, R), Me();
}
const lt = Qe(tt), dt = [
  () => import("../nodes/0.CeLohxpI.js"),
  () => import("../nodes/1.BTc4tzGl.js")
], ot = [], _t = {}, at = {
  handleError: (({ error: t }) => {
    console.error(t);
  }),
  reroute: (() => {
  }),
  transport: {}
}, rt = Object.fromEntries(Object.entries(at.transport).map(([t, e]) => [t, e.decode])), vt = !1, ht = (t, e) => rt[t](e);
export {
  ht as decode,
  rt as decoders,
  _t as dictionary,
  vt as hash,
  at as hooks,
  ut as matchers,
  dt as nodes,
  lt as root,
  ot as server_loads
};
