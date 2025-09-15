var en = Object.defineProperty;
var ce = (t) => {
  throw TypeError(t);
};
var nn = (t, e, n) => e in t ? en(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var dt = (t, e, n) => nn(t, typeof e != "symbol" ? e + "" : e, n), Ht = (t, e, n) => e.has(t) || ce("Cannot " + n);
var v = (t, e, n) => (Ht(t, e, "read from private field"), n ? n.call(t) : e.get(t)), R = (t, e, n) => e.has(t) ? ce("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), O = (t, e, n, r) => (Ht(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), $ = (t, e, n) => (Ht(t, e, "access private method"), n);
const Gn = 1, $n = 2, Wn = 4, Zn = 8, Xn = 16, zn = 1, Jn = 2, Qn = "[", tr = "[!", er = "]", Jt = {}, E = Symbol(), me = !1;
var rn = Array.isArray, sn = Array.prototype.indexOf, nr = Array.from, _e = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, fn = Object.getOwnPropertyDescriptors, ln = Object.prototype, an = Array.prototype, Te = Object.getPrototypeOf, ve = Object.isExtensible;
const rr = () => {
};
function sr(t) {
  return t();
}
function be(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function un() {
  var t, e, n = new Promise((r, s) => {
    t = r, e = s;
  });
  return { promise: n, resolve: t, reject: e };
}
const x = 2, Qt = 4, te = 8, _t = 16, j = 32, et = 64, Re = 128, N = 256, It = 512, m = 1024, D = 2048, G = 4096, K = 8192, vt = 16384, ee = 32768, Ae = 65536, he = 1 << 17, on = 1 << 18, Nt = 1 << 19, Se = 1 << 20, Vt = 1 << 21, ne = 1 << 22, z = 1 << 23, gt = Symbol("$state"), ir = Symbol("legacy props"), re = new class extends Error {
  constructor() {
    super(...arguments);
    dt(this, "name", "StaleReactionError");
    dt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}(), xe = 3, Oe = 8;
function cn() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function _n() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function vn(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function hn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function pn(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function dn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function lr() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function ar(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function wn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function yn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function En() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function se(t) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
let ut = !1;
function ur(t) {
  ut = t;
}
let F;
function Tt(t) {
  if (t === null)
    throw se(), Jt;
  return F = t;
}
function or() {
  return Tt(
    /** @type {TemplateNode} */
    /* @__PURE__ */ ht(F)
  );
}
function cr(t) {
  if (ut) {
    if (/* @__PURE__ */ ht(F) !== null)
      throw se(), Jt;
    F = t;
  }
}
function _r() {
  for (var t = 0, e = F; ; ) {
    if (e.nodeType === Oe) {
      var n = (
        /** @type {Comment} */
        e.data
      );
      if (n === "]") {
        if (t === 0) return e;
        t -= 1;
      } else (n === "[" || n === "[!") && (t += 1);
    }
    var r = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ht(e)
    );
    e.remove(), e = r;
  }
}
function vr(t) {
  if (!t || t.nodeType !== Oe)
    throw se(), Jt;
  return (
    /** @type {Comment} */
    t.data
  );
}
function ke(t) {
  return t === this.v;
}
function gn(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Ne(t) {
  return !gn(t, this.v);
}
let Yt = !1, mn = !1;
function hr() {
  Yt = !0;
}
let T = null;
function Ct(t) {
  T = t;
}
function pr(t, e = !1, n) {
  T = {
    p: T,
    c: null,
    e: null,
    s: t,
    x: null,
    l: Yt && !e ? { s: null, u: null, $: [] } : null
  };
}
function dr(t) {
  var e = (
    /** @type {ComponentContext} */
    T
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      Be(r);
  }
  return T = e.p, /** @type {T} */
  {};
}
function Dt() {
  return !Yt || T !== null && T.l === null;
}
const Tn = /* @__PURE__ */ new WeakMap();
function bn(t) {
  var e = h;
  if (e === null)
    return _.f |= z, t;
  if ((e.f & ee) === 0) {
    if ((e.f & Re) === 0)
      throw !e.parent && t instanceof Error && De(t), t;
    e.b.error(t);
  } else
    ie(t, e);
}
function ie(t, e) {
  for (; e !== null; ) {
    if ((e.f & Re) !== 0)
      try {
        e.b.error(t);
        return;
      } catch (n) {
        t = n;
      }
    e = e.parent;
  }
  throw t instanceof Error && De(t), t;
}
function De(t) {
  const e = Tn.get(t);
  e && (_e(t, "message", {
    value: e.message
  }), _e(t, "stack", {
    value: e.stack
  }));
}
let U = [], Ft = [];
function Pe() {
  var t = U;
  U = [], be(t);
}
function Rn() {
  var t = Ft;
  Ft = [], be(t);
}
function An() {
  return U.length > 0 || Ft.length > 0;
}
function Sn(t) {
  if (U.length === 0 && !mt) {
    var e = U;
    queueMicrotask(() => {
      e === U && Pe();
    });
  }
  U.push(t);
}
function xn() {
  U.length > 0 && Pe(), Ft.length > 0 && Rn();
}
function On() {
  const t = (
    /** @type {Effect} */
    h.b
  );
  return t === null && cn(), t;
}
// @__NO_SIDE_EFFECTS__
function fe(t) {
  var e = x | D, n = _ !== null && (_.f & x) !== 0 ? (
    /** @type {Derived} */
    _
  ) : null;
  return h === null || n !== null && (n.f & N) !== 0 ? e |= N : h.f |= Nt, {
    ctx: T,
    deps: null,
    effects: null,
    equals: ke,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      E
    ),
    wv: 0,
    parent: n ?? h,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function kn(t, e) {
  let n = (
    /** @type {Effect | null} */
    h
  );
  n === null && _n();
  var r = (
    /** @type {Boundary} */
    n.b
  ), s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = ae(
    /** @type {V} */
    E
  ), l = null, u = !_;
  return Mn(() => {
    try {
      var f = t();
      l && Promise.resolve(f).catch(() => {
      });
    } catch (p) {
      f = Promise.reject(p);
    }
    var a = () => f;
    s = (l == null ? void 0 : l.then(a, a)) ?? Promise.resolve(f), l = s;
    var o = (
      /** @type {Batch} */
      y
    ), c = r.is_pending();
    u && (r.update_pending_count(1), c || o.increment());
    const w = (p, d = void 0) => {
      l = null, c || o.activate(), d ? d !== re && (i.f |= z, Wt(i, d)) : ((i.f & z) !== 0 && (i.f ^= z), Wt(i, p)), u && (r.update_pending_count(-1), c || o.decrement()), Fe();
    };
    if (s.then(w, (p) => w(null, p || "unknown")), o)
      return () => {
        queueMicrotask(() => o.neuter());
      };
  }), new Promise((f) => {
    function a(o) {
      function c() {
        o === s ? f(i) : a(s);
      }
      o.then(c, c);
    }
    a(s);
  });
}
// @__NO_SIDE_EFFECTS__
function wr(t) {
  const e = /* @__PURE__ */ fe(t);
  return Ze(e), e;
}
// @__NO_SIDE_EFFECTS__
function Nn(t) {
  const e = /* @__PURE__ */ fe(t);
  return e.equals = Ne, e;
}
function Ie(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      tt(
        /** @type {Effect} */
        e[n]
      );
  }
}
function Dn(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & x) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function le(t) {
  var e, n = h;
  ct(Dn(t));
  try {
    Ie(t), e = Qe(t);
  } finally {
    ct(n);
  }
  return e;
}
function Ce(t) {
  var e = le(t);
  if (t.equals(e) || (t.v = e, t.wv = ze()), !pt) {
    var n = (H || (t.f & N) !== 0) && t.deps !== null ? G : m;
    S(t, n);
  }
}
function Pn(t, e, n) {
  const r = Dt() ? fe : Nn;
  if (e.length === 0) {
    n(t.map(r));
    return;
  }
  var s = y, i = (
    /** @type {Effect} */
    h
  ), l = In(), u = On();
  Promise.all(e.map((f) => /* @__PURE__ */ kn(f))).then((f) => {
    s == null || s.activate(), l();
    try {
      n([...t.map(r), ...f]);
    } catch (a) {
      (i.f & vt) === 0 && ie(a, i);
    }
    s == null || s.deactivate(), Fe();
  }).catch((f) => {
    u.error(f);
  });
}
function In() {
  var t = h, e = _, n = T, r = y;
  return function() {
    ct(t), V(e), Ct(n), r == null || r.activate();
  };
}
function Fe() {
  ct(null), V(null), Ct(null);
}
const Bt = /* @__PURE__ */ new Set();
let y = null, pe = /* @__PURE__ */ new Set(), Q = [], qt = null, Gt = !1, mt = !1;
var At, ft, q, St, xt, Z, lt, X, L, at, Ot, kt, P, je, Pt, $t;
const Mt = class Mt {
  constructor() {
    R(this, P);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    dt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    R(this, At, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    R(this, ft, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    R(this, q, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    R(this, St, null);
    /**
     * True if an async effect inside this batch resolved and
     * its parent branch was already deleted
     */
    R(this, xt, !1);
    /**
     * Async effects (created inside `async_derived`) encountered during processing.
     * These run after the rest of the batch has updated, since they should
     * always have the latest values
     * @type {Effect[]}
     */
    R(this, Z, []);
    /**
     * The same as `#async_effects`, but for effects inside a newly-created
     * `<svelte:boundary>` — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    R(this, lt, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    R(this, X, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    R(this, L, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    R(this, at, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    R(this, Ot, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    R(this, kt, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    dt(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    var s;
    Q = [];
    for (const i of e)
      $(this, P, je).call(this, i);
    if (v(this, Z).length === 0 && v(this, q) === 0) {
      $(this, P, $t).call(this);
      var n = v(this, X), r = v(this, L);
      O(this, X, []), O(this, L, []), O(this, at, []), y = null, de(n), de(r), y === null ? y = this : Bt.delete(this), (s = v(this, St)) == null || s.resolve();
    } else
      $(this, P, Pt).call(this, v(this, X)), $(this, P, Pt).call(this, v(this, L)), $(this, P, Pt).call(this, v(this, at));
    for (const i of v(this, Z))
      it(i);
    for (const i of v(this, lt))
      it(i);
    O(this, Z, []), O(this, lt, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, n) {
    v(this, At).has(e) || v(this, At).set(e, n), this.current.set(e, e.v);
  }
  activate() {
    y = this;
  }
  deactivate() {
    y = null;
    for (const e of pe)
      if (pe.delete(e), e(), y !== null)
        break;
  }
  neuter() {
    O(this, xt, !0);
  }
  flush() {
    Q.length > 0 ? Me() : $(this, P, $t).call(this), y === this && (v(this, q) === 0 && Bt.delete(this), this.deactivate());
  }
  increment() {
    O(this, q, v(this, q) + 1);
  }
  decrement() {
    if (O(this, q, v(this, q) - 1), v(this, q) === 0) {
      for (const e of v(this, Ot))
        S(e, D), ot(e);
      for (const e of v(this, kt))
        S(e, G), ot(e);
      O(this, X, []), O(this, L, []), this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    v(this, ft).add(e);
  }
  settled() {
    return (v(this, St) ?? O(this, St, un())).promise;
  }
  static ensure() {
    if (y === null) {
      const e = y = new Mt();
      Bt.add(y), mt || Mt.enqueue(() => {
        y === e && e.flush();
      });
    }
    return y;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    Sn(e);
  }
};
At = new WeakMap(), ft = new WeakMap(), q = new WeakMap(), St = new WeakMap(), xt = new WeakMap(), Z = new WeakMap(), lt = new WeakMap(), X = new WeakMap(), L = new WeakMap(), at = new WeakMap(), Ot = new WeakMap(), kt = new WeakMap(), P = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
je = function(e) {
  var o;
  e.f ^= m;
  for (var n = e.first; n !== null; ) {
    var r = n.f, s = (r & (j | et)) !== 0, i = s && (r & m) !== 0, l = i || (r & K) !== 0 || this.skipped_effects.has(n);
    if (!l && n.fn !== null) {
      if (s)
        n.f ^= m;
      else if ((r & Qt) !== 0)
        v(this, L).push(n);
      else if ((r & m) === 0)
        if ((r & ne) !== 0) {
          var u = (o = n.b) != null && o.is_pending() ? v(this, lt) : v(this, Z);
          u.push(n);
        } else Lt(n) && ((n.f & _t) !== 0 && v(this, at).push(n), it(n));
      var f = n.first;
      if (f !== null) {
        n = f;
        continue;
      }
    }
    var a = n.parent;
    for (n = n.next; n === null && a !== null; )
      n = a.next, a = a.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Pt = function(e) {
  for (const n of e)
    ((n.f & D) !== 0 ? v(this, Ot) : v(this, kt)).push(n), S(n, m);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
$t = function() {
  if (!v(this, xt))
    for (const e of v(this, ft))
      e();
  v(this, ft).clear();
};
let bt = Mt;
function yr(t) {
  var e = mt;
  mt = !0;
  try {
    for (var n; ; ) {
      if (xn(), Q.length === 0 && !An() && (y == null || y.flush(), Q.length === 0))
        return qt = null, /** @type {T} */
        n;
      Me();
    }
  } finally {
    mt = e;
  }
}
function Me() {
  var t = st;
  Gt = !0;
  try {
    var e = 0;
    for (ye(!0); Q.length > 0; ) {
      var n = bt.ensure();
      if (e++ > 1e3) {
        var r, s;
        Cn();
      }
      n.process(Q), B.clear();
    }
  } finally {
    Gt = !1, ye(t), qt = null;
  }
}
function Cn() {
  try {
    dn();
  } catch (t) {
    ie(t, qt);
  }
}
let C = null;
function de(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (vt | K)) === 0 && Lt(r) && (C = [], it(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Ge(r) : r.fn = null), (C == null ? void 0 : C.length) > 0)) {
        B.clear();
        for (const s of C)
          it(s);
        C = [];
      }
    }
    C = null;
  }
}
function ot(t) {
  for (var e = qt = t; e.parent !== null; ) {
    e = e.parent;
    var n = e.f;
    if (Gt && e === h && (n & _t) !== 0)
      return;
    if ((n & (et | j)) !== 0) {
      if ((n & m) === 0) return;
      e.f ^= m;
    }
  }
  Q.push(e);
}
const B = /* @__PURE__ */ new Map();
function ae(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: ke,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function Y(t, e) {
  const n = ae(t);
  return Ze(n), n;
}
// @__NO_SIDE_EFFECTS__
function Er(t, e = !1, n = !0) {
  var s;
  const r = ae(t);
  return e || (r.equals = Ne), Yt && n && T !== null && T.l !== null && ((s = T.l).s ?? (s.s = [])).push(r), r;
}
function W(t, e, n = !1) {
  _ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!I || (_.f & he) !== 0) && Dt() && (_.f & (x | _t | ne | he)) !== 0 && !(b != null && b.includes(t)) && En();
  let r = n ? wt(e) : e;
  return Wt(t, r);
}
function Wt(t, e) {
  if (!t.equals(e)) {
    var n = t.v;
    pt ? B.set(t, e) : B.set(t, n), t.v = e;
    var r = bt.ensure();
    r.capture(t, n), (t.f & x) !== 0 && ((t.f & D) !== 0 && le(
      /** @type {Derived} */
      t
    ), S(t, (t.f & N) === 0 ? m : G)), t.wv = ze(), Ye(t, D), Dt() && h !== null && (h.f & m) !== 0 && (h.f & (j | et)) === 0 && (k === null ? Hn([t]) : k.push(t));
  }
  return e;
}
function Kt(t) {
  W(t, t.v + 1);
}
function Ye(t, e) {
  var n = t.reactions;
  if (n !== null)
    for (var r = Dt(), s = n.length, i = 0; i < s; i++) {
      var l = n[i], u = l.f;
      if (!(!r && l === h)) {
        var f = (u & D) === 0;
        f && S(l, e), (u & x) !== 0 ? Ye(
          /** @type {Derived} */
          l,
          G
        ) : f && ((u & _t) !== 0 && C !== null && C.push(
          /** @type {Effect} */
          l
        ), ot(
          /** @type {Effect} */
          l
        ));
      }
    }
}
function wt(t) {
  if (typeof t != "object" || t === null || gt in t)
    return t;
  const e = Te(t);
  if (e !== ln && e !== an)
    return t;
  var n = /* @__PURE__ */ new Map(), r = rn(t), s = /* @__PURE__ */ Y(0), i = J, l = (u) => {
    if (J === i)
      return u();
    var f = _, a = J;
    V(null), ge(i);
    var o = u();
    return V(f), ge(a), o;
  };
  return r && n.set("length", /* @__PURE__ */ Y(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(u, f, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && wn();
        var o = n.get(f);
        return o === void 0 ? o = l(() => {
          var c = /* @__PURE__ */ Y(a.value);
          return n.set(f, c), c;
        }) : W(o, a.value, !0), !0;
      },
      deleteProperty(u, f) {
        var a = n.get(f);
        if (a === void 0) {
          if (f in u) {
            const o = l(() => /* @__PURE__ */ Y(E));
            n.set(f, o), Kt(s);
          }
        } else
          W(a, E), Kt(s);
        return !0;
      },
      get(u, f, a) {
        var p;
        if (f === gt)
          return t;
        var o = n.get(f), c = f in u;
        if (o === void 0 && (!c || (p = Et(u, f)) != null && p.writable) && (o = l(() => {
          var d = wt(c ? u[f] : E), nt = /* @__PURE__ */ Y(d);
          return nt;
        }), n.set(f, o)), o !== void 0) {
          var w = yt(o);
          return w === E ? void 0 : w;
        }
        return Reflect.get(u, f, a);
      },
      getOwnPropertyDescriptor(u, f) {
        var a = Reflect.getOwnPropertyDescriptor(u, f);
        if (a && "value" in a) {
          var o = n.get(f);
          o && (a.value = yt(o));
        } else if (a === void 0) {
          var c = n.get(f), w = c == null ? void 0 : c.v;
          if (c !== void 0 && w !== E)
            return {
              enumerable: !0,
              configurable: !0,
              value: w,
              writable: !0
            };
        }
        return a;
      },
      has(u, f) {
        var w;
        if (f === gt)
          return !0;
        var a = n.get(f), o = a !== void 0 && a.v !== E || Reflect.has(u, f);
        if (a !== void 0 || h !== null && (!o || (w = Et(u, f)) != null && w.writable)) {
          a === void 0 && (a = l(() => {
            var p = o ? wt(u[f]) : E, d = /* @__PURE__ */ Y(p);
            return d;
          }), n.set(f, a));
          var c = yt(a);
          if (c === E)
            return !1;
        }
        return o;
      },
      set(u, f, a, o) {
        var oe;
        var c = n.get(f), w = f in u;
        if (r && f === "length")
          for (var p = a; p < /** @type {Source<number>} */
          c.v; p += 1) {
            var d = n.get(p + "");
            d !== void 0 ? W(d, E) : p in u && (d = l(() => /* @__PURE__ */ Y(E)), n.set(p + "", d));
          }
        if (c === void 0)
          (!w || (oe = Et(u, f)) != null && oe.writable) && (c = l(() => /* @__PURE__ */ Y(void 0)), W(c, wt(a)), n.set(f, c));
        else {
          w = c.v !== E;
          var nt = l(() => wt(a));
          W(c, nt);
        }
        var rt = Reflect.getOwnPropertyDescriptor(u, f);
        if (rt != null && rt.set && rt.set.call(o, a), !w) {
          if (r && typeof f == "string") {
            var ue = (
              /** @type {Source<number>} */
              n.get("length")
            ), Ut = Number(f);
            Number.isInteger(Ut) && Ut >= ue.v && W(ue, Ut + 1);
          }
          Kt(s);
        }
        return !0;
      },
      ownKeys(u) {
        yt(s);
        var f = Reflect.ownKeys(u).filter((c) => {
          var w = n.get(c);
          return w === void 0 || w.v !== E;
        });
        for (var [a, o] of n)
          o.v !== E && !(a in u) && f.push(a);
        return f;
      },
      setPrototypeOf() {
        yn();
      }
    }
  );
}
var we, Fn, qe, Le;
function gr() {
  if (we === void 0) {
    we = window, Fn = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    qe = Et(e, "firstChild").get, Le = Et(e, "nextSibling").get, ve(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), ve(n) && (n.__t = void 0);
  }
}
function Zt(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Xt(t) {
  return qe.call(t);
}
// @__NO_SIDE_EFFECTS__
function ht(t) {
  return Le.call(t);
}
function mr(t, e) {
  if (!ut)
    return /* @__PURE__ */ Xt(t);
  var n = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ Xt(F)
  );
  if (n === null)
    n = F.appendChild(Zt());
  else if (e && n.nodeType !== xe) {
    var r = Zt();
    return n == null || n.before(r), Tt(r), r;
  }
  return Tt(n), n;
}
function Tr(t, e) {
  if (!ut) {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Xt(
        /** @type {Node} */
        t
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ht(n) : n;
  }
  return F;
}
function br(t, e = 1, n = !1) {
  let r = ut ? F : t;
  for (var s; e--; )
    s = r, r = /** @type {TemplateNode} */
    /* @__PURE__ */ ht(r);
  if (!ut)
    return r;
  if (n && (r == null ? void 0 : r.nodeType) !== xe) {
    var i = Zt();
    return r === null ? s == null || s.after(i) : r.before(i), Tt(i), i;
  }
  return Tt(r), /** @type {TemplateNode} */
  r;
}
function Rr(t) {
  t.textContent = "";
}
function Ar() {
  return !1;
}
function Ue(t) {
  var e = _, n = h;
  V(null), ct(null);
  try {
    return t();
  } finally {
    V(e), ct(n);
  }
}
function He(t) {
  h === null && _ === null && pn(), _ !== null && (_.f & N) !== 0 && h === null && hn(), pt && vn();
}
function jn(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function M(t, e, n, r = !0) {
  var s = h;
  s !== null && (s.f & K) !== 0 && (t |= K);
  var i = {
    ctx: T,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | D,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: s,
    b: s && s.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      it(i), i.f |= ee;
    } catch (f) {
      throw tt(i), f;
    }
  else e !== null && ot(i);
  if (r) {
    var l = i;
    if (n && l.deps === null && l.teardown === null && l.nodes_start === null && l.first === l.last && // either `null`, or a singular child
    (l.f & Nt) === 0 && (l = l.first), l !== null && (l.parent = s, s !== null && jn(l, s), _ !== null && (_.f & x) !== 0 && (t & et) === 0)) {
      var u = (
        /** @type {Derived} */
        _
      );
      (u.effects ?? (u.effects = [])).push(l);
    }
  }
  return i;
}
function Sr(t) {
  He();
  var e = (
    /** @type {Effect} */
    h.f
  ), n = !_ && (e & j) !== 0 && (e & ee) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      T
    );
    (r.e ?? (r.e = [])).push(t);
  } else
    return Be(t);
}
function Be(t) {
  return M(Qt | Se, t, !1);
}
function xr(t) {
  return He(), M(te | Se, t, !0);
}
function Or(t) {
  bt.ensure();
  const e = M(et | Nt, t, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? Ln(e, () => {
      tt(e), r(void 0);
    }) : (tt(e), r(void 0));
  });
}
function kr(t) {
  return M(Qt, t, !1);
}
function Mn(t) {
  return M(ne | Nt, t, !0);
}
function Nr(t, e = 0) {
  return M(te | e, t, !0);
}
function Dr(t, e = [], n = []) {
  Pn(e, n, (r) => {
    M(te, () => t(...r.map(yt)), !0);
  });
}
function Pr(t, e = 0) {
  var n = M(_t | e, t, !0);
  return n;
}
function Ir(t, e = !0) {
  return M(j | Nt, t, !0, e);
}
function Ke(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = pt, r = _;
    Ee(!0), V(null);
    try {
      e.call(null);
    } finally {
      Ee(n), V(r);
    }
  }
}
function Ve(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && Ue(() => {
      s.abort(re);
    });
    var r = n.next;
    (n.f & et) !== 0 ? n.parent = null : tt(n, e), n = r;
  }
}
function Yn(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & j) === 0 && tt(e), e = n;
  }
}
function tt(t, e = !0) {
  var n = !1;
  (e || (t.f & on) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (qn(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), n = !0), Ve(t, e && !n), jt(t, 0), S(t, vt);
  var r = t.transitions;
  if (r !== null)
    for (const i of r)
      i.stop();
  Ke(t);
  var s = t.parent;
  s !== null && s.first !== null && Ge(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function qn(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ht(t)
    );
    t.remove(), t = n;
  }
}
function Ge(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function Ln(t, e) {
  var n = [];
  $e(t, n, !0), Un(n, () => {
    tt(t), e && e();
  });
}
function Un(t, e) {
  var n = t.length;
  if (n > 0) {
    var r = () => --n || e();
    for (var s of t)
      s.out(r);
  } else
    e();
}
function $e(t, e, n) {
  if ((t.f & K) === 0) {
    if (t.f ^= K, t.transitions !== null)
      for (const l of t.transitions)
        (l.is_global || n) && e.push(l);
    for (var r = t.first; r !== null; ) {
      var s = r.next, i = (r.f & Ae) !== 0 || (r.f & j) !== 0;
      $e(r, e, i ? n : !1), r = s;
    }
  }
}
function Cr(t) {
  We(t, !0);
}
function We(t, e) {
  if ((t.f & K) !== 0) {
    t.f ^= K, (t.f & m) === 0 && (S(t, D), ot(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, s = (n.f & Ae) !== 0 || (n.f & j) !== 0;
      We(n, s ? e : !1), n = r;
    }
    if (t.transitions !== null)
      for (const i of t.transitions)
        (i.is_global || e) && i.in();
  }
}
let st = !1;
function ye(t) {
  st = t;
}
let pt = !1;
function Ee(t) {
  pt = t;
}
let _ = null, I = !1;
function V(t) {
  _ = t;
}
let h = null;
function ct(t) {
  h = t;
}
let b = null;
function Ze(t) {
  _ !== null && (b === null ? b = [t] : b.push(t));
}
let g = null, A = 0, k = null;
function Hn(t) {
  k = t;
}
let Xe = 1, Rt = 0, J = Rt;
function ge(t) {
  J = t;
}
let H = !1;
function ze() {
  return ++Xe;
}
function Lt(t) {
  var c;
  var e = t.f;
  if ((e & D) !== 0)
    return !0;
  if ((e & G) !== 0) {
    var n = t.deps, r = (e & N) !== 0;
    if (n !== null) {
      var s, i, l = (e & It) !== 0, u = r && h !== null && !H, f = n.length;
      if ((l || u) && (h === null || (h.f & vt) === 0)) {
        var a = (
          /** @type {Derived} */
          t
        ), o = a.parent;
        for (s = 0; s < f; s++)
          i = n[s], (l || !((c = i == null ? void 0 : i.reactions) != null && c.includes(a))) && (i.reactions ?? (i.reactions = [])).push(a);
        l && (a.f ^= It), u && o !== null && (o.f & N) === 0 && (a.f ^= N);
      }
      for (s = 0; s < f; s++)
        if (i = n[s], Lt(
          /** @type {Derived} */
          i
        ) && Ce(
          /** @type {Derived} */
          i
        ), i.wv > t.wv)
          return !0;
    }
    (!r || h !== null && !H) && S(t, m);
  }
  return !1;
}
function Je(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(b != null && b.includes(t)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & x) !== 0 ? Je(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (n ? S(i, D) : (i.f & m) !== 0 && S(i, G), ot(
        /** @type {Effect} */
        i
      ));
    }
}
function Qe(t) {
  var nt;
  var e = g, n = A, r = k, s = _, i = H, l = b, u = T, f = I, a = J, o = t.f;
  g = /** @type {null | Value[]} */
  null, A = 0, k = null, H = (o & N) !== 0 && (I || !st || _ === null), _ = (o & (j | et)) === 0 ? t : null, b = null, Ct(t.ctx), I = !1, J = ++Rt, t.ac !== null && (Ue(() => {
    t.ac.abort(re);
  }), t.ac = null);
  try {
    t.f |= Vt;
    var c = (
      /** @type {Function} */
      t.fn
    ), w = c(), p = t.deps;
    if (g !== null) {
      var d;
      if (jt(t, A), p !== null && A > 0)
        for (p.length = A + g.length, d = 0; d < g.length; d++)
          p[A + d] = g[d];
      else
        t.deps = p = g;
      if (!H || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (o & x) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (d = A; d < p.length; d++)
          ((nt = p[d]).reactions ?? (nt.reactions = [])).push(t);
    } else p !== null && A < p.length && (jt(t, A), p.length = A);
    if (Dt() && k !== null && !I && p !== null && (t.f & (x | G | D)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      k.length; d++)
        Je(
          k[d],
          /** @type {Effect} */
          t
        );
    return s !== null && s !== t && (Rt++, k !== null && (r === null ? r = k : r.push(.../** @type {Source[]} */
    k))), (t.f & z) !== 0 && (t.f ^= z), w;
  } catch (rt) {
    return bn(rt);
  } finally {
    t.f ^= Vt, g = e, A = n, k = r, _ = s, H = i, b = l, Ct(u), I = f, J = a;
  }
}
function Bn(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = sn.call(n, t);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = e.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  n === null && (e.f & x) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (g === null || !g.includes(e)) && (S(e, G), (e.f & (N | It)) === 0 && (e.f ^= It), Ie(
    /** @type {Derived} **/
    e
  ), jt(
    /** @type {Derived} **/
    e,
    0
  ));
}
function jt(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      Bn(t, n[r]);
}
function it(t) {
  var e = t.f;
  if ((e & vt) === 0) {
    S(t, m);
    var n = h, r = st;
    h = t, st = !0;
    try {
      (e & _t) !== 0 ? Yn(t) : Ve(t), Ke(t);
      var s = Qe(t);
      t.teardown = typeof s == "function" ? s : null, t.wv = Xe;
      var i;
      me && mn && (t.f & D) !== 0 && t.deps;
    } finally {
      st = r, h = n;
    }
  }
}
function yt(t) {
  var e = t.f, n = (e & x) !== 0;
  if (_ !== null && !I) {
    var r = h !== null && (h.f & vt) !== 0;
    if (!r && !(b != null && b.includes(t))) {
      var s = _.deps;
      if ((_.f & Vt) !== 0)
        t.rv < Rt && (t.rv = Rt, g === null && s !== null && s[A] === t ? A++ : g === null ? g = [t] : (!H || !g.includes(t)) && g.push(t));
      else {
        (_.deps ?? (_.deps = [])).push(t);
        var i = t.reactions;
        i === null ? t.reactions = [_] : i.includes(_) || i.push(_);
      }
    }
  } else if (n && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var l = (
      /** @type {Derived} */
      t
    ), u = l.parent;
    u !== null && (u.f & N) === 0 && (l.f ^= N);
  }
  if (pt) {
    if (B.has(t))
      return B.get(t);
    if (n) {
      l = /** @type {Derived} */
      t;
      var f = l.v;
      return ((l.f & m) === 0 && l.reactions !== null || tn(l)) && (f = le(l)), B.set(l, f), f;
    }
  } else n && (l = /** @type {Derived} */
  t, Lt(l) && Ce(l));
  if ((t.f & z) !== 0)
    throw t.v;
  return t.v;
}
function tn(t) {
  if (t.v === E) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (B.has(e) || (e.f & x) !== 0 && tn(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function Fr(t) {
  var e = I;
  try {
    return I = !0, t();
  } finally {
    I = e;
  }
}
const Kn = -7169;
function S(t, e) {
  t.f = t.f & Kn | e;
}
function jr(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (gt in t)
      zt(t);
    else if (!Array.isArray(t))
      for (let e in t) {
        const n = t[e];
        typeof n == "object" && n && gt in n && zt(n);
      }
  }
}
function zt(t, e = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !e.has(t)) {
    e.add(t), t instanceof Date && t.getTime();
    for (let r in t)
      try {
        zt(t[r], e);
      } catch {
      }
    const n = Te(t);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = fn(n);
      for (let s in r) {
        const i = r[s].get;
        if (i)
          try {
            i.call(t);
          } catch {
          }
      }
    }
  }
}
export {
  y as $,
  Zt as A,
  pr as B,
  Oe as C,
  T as D,
  Ae as E,
  dr as F,
  Fn as G,
  Qn as H,
  Jn as I,
  xe as J,
  xr as K,
  Sr as L,
  be as M,
  Fr as N,
  yt as O,
  sr as P,
  jr as Q,
  fe as R,
  hr as S,
  zn as T,
  Dr as U,
  mr as V,
  cr as W,
  br as X,
  vr as Y,
  tr as Z,
  _r as _,
  Ir as a,
  E as a0,
  Ar as a1,
  Cr as a2,
  Ln as a3,
  kr as a4,
  Nr as a5,
  Sn as a6,
  gt as a7,
  Et as a8,
  ar as a9,
  Wn as aa,
  Nn as ab,
  wt as ac,
  W as ad,
  pt as ae,
  vt as af,
  Zn as ag,
  Yt as ah,
  $n as ai,
  Gn as aj,
  Xn as ak,
  ir as al,
  yr as am,
  Er as an,
  Y as ao,
  wr as ap,
  Pr as b,
  F as c,
  tt as d,
  _e as e,
  Tr as f,
  ct as g,
  ut as h,
  rn as i,
  _ as j,
  h as k,
  gr as l,
  Xt as m,
  rr as n,
  ht as o,
  Jt as p,
  ur as q,
  Tt as r,
  V as s,
  or as t,
  er as u,
  se as v,
  lr as w,
  Rr as x,
  nr as y,
  Or as z
};
