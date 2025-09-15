import { f as b, a as k } from "../chunks/BBxvU1hr.js";
import { D as x, K as y, L as i, M as l, N as $, O as v, P as B, Q as D, R as E, S as F, f as K, U as L, F as M, B as N, V as u, W as m, X as O } from "../chunks/B7HyO7zA.js";
import { s as _ } from "../chunks/Bq6EJNkR.js";
import { a as P, p as g } from "../chunks/y9XZWXWT.js";
import "svelte";
function Q(a = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    x
  ), e = t.l.u;
  if (!e) return;
  let r = () => D(t.s);
  if (a) {
    let o = 0, s = (
      /** @type {Record<string, any>} */
      {}
    );
    const c = E(() => {
      let n = !1;
      const p = t.s;
      for (const f in p)
        p[f] !== s[f] && (s[f] = p[f], n = !0);
      return n && o++, o;
    });
    r = () => v(c);
  }
  e.b.length && y(() => {
    d(t, r), l(e.b);
  }), i(() => {
    const o = $(() => e.m.map(B));
    return () => {
      for (const s of o)
        typeof s == "function" && s();
    };
  }), e.a.length && i(() => {
    d(t, r), l(e.a);
  });
}
function d(a, t) {
  if (a.l.s)
    for (const e of a.l.s) v(e);
  t();
}
F();
const R = {
  get error() {
    return g.error;
  },
  get status() {
    return g.status;
  }
};
P.updated.check;
const h = R;
var S = b("<h1> </h1> <p> </p>", 1);
function q(a, t) {
  N(t, !1), Q();
  var e = S(), r = K(e), o = u(r, !0);
  m(r);
  var s = O(r, 2), c = u(s, !0);
  m(s), L(() => {
    var n;
    _(o, h.status), _(c, (n = h.error) == null ? void 0 : n.message);
  }), k(a, e), M();
}
export {
  q as component
};
