import { e as V, s as S, g as D, i as P, j as Y, k as C, l as T, m as j, C as R, H as q, o as B, p as E, q as g, r as A, t as F, c as v, u as W, v as $, w as z, x as G, y as J, z as K, A as Q, a as U, B as X, D as Z, h as b, F as x } from "./B7HyO7zA.js";
import { b as rr } from "./BBxvU1hr.js";
const er = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ new Set();
let k = null;
function m(r) {
  var O;
  var e = this, s = (
    /** @type {Node} */
    e.ownerDocument
  ), _ = r.type, l = ((O = r.composedPath) == null ? void 0 : O.call(r)) || [], t = (
    /** @type {null | Element} */
    l[0] || r.target
  );
  k = r;
  var o = 0, f = k === r && r.__root;
  if (f) {
    var u = l.indexOf(f);
    if (u !== -1 && (e === document || e === /** @type {any} */
    window)) {
      r.__root = e;
      return;
    }
    var h = l.indexOf(e);
    if (h === -1)
      return;
    u <= h && (o = u);
  }
  if (t = /** @type {Element} */
  l[o] || r.target, t !== e) {
    V(r, "currentTarget", {
      configurable: !0,
      get() {
        return t || s;
      }
    });
    var w = Y, i = C;
    S(null), D(null);
    try {
      for (var a, n = []; t !== null; ) {
        var d = t.assignedSlot || t.parentNode || /** @type {any} */
        t.host || null;
        try {
          var c = t["__" + _];
          if (c != null && (!/** @type {any} */
          t.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          r.target === t))
            if (P(c)) {
              var [I, ...L] = c;
              I.apply(t, [r, ...L]);
            } else
              c.call(t, r);
        } catch (y) {
          a ? n.push(y) : a = y;
        }
        if (r.cancelBubble || d === e || d === null)
          break;
        t = d;
      }
      if (a) {
        for (let y of n)
          queueMicrotask(() => {
            throw y;
          });
        throw a;
      }
    } finally {
      r.__root = e, delete r.currentTarget, S(w), D(i);
    }
  }
}
const tr = ["touchstart", "touchmove"];
function ar(r) {
  return tr.includes(r);
}
function ir(r, e) {
  var s = e == null ? "" : typeof e == "object" ? e + "" : e;
  s !== (r.__t ?? (r.__t = r.nodeValue)) && (r.__t = s, r.nodeValue = s + "");
}
function sr(r, e) {
  return H(r, e);
}
function lr(r, e) {
  T(), e.intro = e.intro ?? !1;
  const s = e.target, _ = b, l = v;
  try {
    for (var t = (
      /** @type {TemplateNode} */
      j(s)
    ); t && (t.nodeType !== R || /** @type {Comment} */
    t.data !== q); )
      t = /** @type {TemplateNode} */
      B(t);
    if (!t)
      throw E;
    g(!0), A(
      /** @type {Comment} */
      t
    ), F();
    const o = H(r, { ...e, anchor: t });
    if (v === null || v.nodeType !== R || /** @type {Comment} */
    v.data !== W)
      throw $(), E;
    return g(!1), /**  @type {Exports} */
    o;
  } catch (o) {
    if (o instanceof Error && o.message.split(`
`).some((f) => f.startsWith("https://svelte.dev/e/")))
      throw o;
    return o !== E && console.warn("Failed to hydrate: ", o), e.recover === !1 && z(), T(), G(s), g(!1), sr(r, e);
  } finally {
    g(_), A(l);
  }
}
const p = /* @__PURE__ */ new Map();
function H(r, { target: e, anchor: s, props: _ = {}, events: l, context: t, intro: o = !0 }) {
  T();
  var f = /* @__PURE__ */ new Set(), u = (i) => {
    for (var a = 0; a < i.length; a++) {
      var n = i[a];
      if (!f.has(n)) {
        f.add(n);
        var d = ar(n);
        e.addEventListener(n, m, { passive: d });
        var c = p.get(n);
        c === void 0 ? (document.addEventListener(n, m, { passive: d }), p.set(n, 1)) : p.set(n, c + 1);
      }
    }
  };
  u(J(er)), M.add(u);
  var h = void 0, w = K(() => {
    var i = s ?? e.appendChild(Q());
    return U(() => {
      if (t) {
        X({});
        var a = (
          /** @type {ComponentContext} */
          Z
        );
        a.c = t;
      }
      l && (_.$$events = l), b && rr(
        /** @type {TemplateNode} */
        i,
        null
      ), h = r(i, _) || {}, b && (C.nodes_end = v), t && x();
    }), () => {
      var d;
      for (var a of f) {
        e.removeEventListener(a, m);
        var n = (
          /** @type {number} */
          p.get(a)
        );
        --n === 0 ? (document.removeEventListener(a, m), p.delete(a)) : p.set(a, n);
      }
      M.delete(u), i !== s && ((d = i.parentNode) == null || d.removeChild(i));
    };
  });
  return N.set(h, w), h;
}
let N = /* @__PURE__ */ new WeakMap();
function dr(r, e) {
  const s = N.get(r);
  return s ? (N.delete(r), s(e)) : Promise.resolve();
}
export {
  lr as h,
  sr as m,
  ir as s,
  dr as u
};
