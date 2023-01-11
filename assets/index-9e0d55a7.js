var br = Object.defineProperty;
var xr = (m, l, h) =>
  l in m
    ? br(m, l, { enumerable: !0, configurable: !0, writable: !0, value: h })
    : (m[l] = h);
var Y = (m, l, h) => (xr(m, typeof l != "symbol" ? l + "" : l, h), h);
(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) w(d);
  new MutationObserver((d) => {
    for (const c of d)
      if (c.type === "childList")
        for (const p of c.addedNodes)
          p.tagName === "LINK" && p.rel === "modulepreload" && w(p);
  }).observe(document, { childList: !0, subtree: !0 });
  function h(d) {
    const c = {};
    return (
      d.integrity && (c.integrity = d.integrity),
      d.referrerpolicy && (c.referrerPolicy = d.referrerpolicy),
      d.crossorigin === "use-credentials"
        ? (c.credentials = "include")
        : d.crossorigin === "anonymous"
        ? (c.credentials = "omit")
        : (c.credentials = "same-origin"),
      c
    );
  }
  function w(d) {
    if (d.ep) return;
    d.ep = !0;
    const c = h(d);
    fetch(d.href, c);
  }
})();
var yi =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Lr(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default")
    ? m.default
    : m;
}
var vt = {},
  Tr = {
    get exports() {
      return vt;
    },
    set exports(m) {
      vt = m;
    },
  };
/* @preserve
 * Leaflet 1.9.3, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */ (function (m, l) {
  (function (h, w) {
    w(l);
  })(yi, function (h) {
    var w = "1.9.3";
    function d(t) {
      var e, i, n, o;
      for (i = 1, n = arguments.length; i < n; i++) {
        o = arguments[i];
        for (e in o) t[e] = o[e];
      }
      return t;
    }
    var c =
      Object.create ||
      (function () {
        function t() {}
        return function (e) {
          return (t.prototype = e), new t();
        };
      })();
    function p(t, e) {
      var i = Array.prototype.slice;
      if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
      var n = i.call(arguments, 2);
      return function () {
        return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
      };
    }
    var E = 0;
    function x(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++E), t._leaflet_id;
    }
    function A(t, e, i) {
      var n, o, r, s;
      return (
        (s = function () {
          (n = !1), o && (r.apply(i, o), (o = !1));
        }),
        (r = function () {
          n
            ? (o = arguments)
            : (t.apply(i, arguments), setTimeout(s, e), (n = !0));
        }),
        r
      );
    }
    function f(t, e, i) {
      var n = e[1],
        o = e[0],
        r = n - o;
      return t === n && i ? t : ((((t - o) % r) + r) % r) + o;
    }
    function P() {
      return !1;
    }
    function b(t, e) {
      if (e === !1) return t;
      var i = Math.pow(10, e === void 0 ? 6 : e);
      return Math.round(t * i) / i;
    }
    function k(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function H(t) {
      return k(t).split(/\s+/);
    }
    function D(t, e) {
      Object.prototype.hasOwnProperty.call(t, "options") ||
        (t.options = t.options ? c(t.options) : {});
      for (var i in e) t.options[i] = e[i];
      return t.options;
    }
    function st(t, e, i) {
      var n = [];
      for (var o in t)
        n.push(
          encodeURIComponent(i ? o.toUpperCase() : o) +
            "=" +
            encodeURIComponent(t[o])
        );
      return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
    }
    var lt = /\{ *([\w_ -]+) *\}/g;
    function ht(t, e) {
      return t.replace(lt, function (i, n) {
        var o = e[n];
        if (o === void 0)
          throw new Error("No value provided for variable " + i);
        return typeof o == "function" && (o = o(e)), o;
      });
    }
    var et =
      Array.isArray ||
      function (t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
    function ct(t, e) {
      for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
      return -1;
    }
    var ut = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function Lt(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var yt = 0;
    function q(t) {
      var e = +new Date(),
        i = Math.max(0, 16 - (e - yt));
      return (yt = e + i), window.setTimeout(t, i);
    }
    var mt = window.requestAnimationFrame || Lt("RequestAnimationFrame") || q,
      _ =
        window.cancelAnimationFrame ||
        Lt("CancelAnimationFrame") ||
        Lt("CancelRequestAnimationFrame") ||
        function (t) {
          window.clearTimeout(t);
        };
    function v(t, e, i) {
      if (i && mt === q) t.call(e);
      else return mt.call(window, p(t, e));
    }
    function y(t) {
      t && _.call(window, t);
    }
    var C = {
      __proto__: null,
      extend: d,
      create: c,
      bind: p,
      get lastId() {
        return E;
      },
      stamp: x,
      throttle: A,
      wrapNum: f,
      falseFn: P,
      formatNum: b,
      trim: k,
      splitWords: H,
      setOptions: D,
      getParamString: st,
      template: ht,
      isArray: et,
      indexOf: ct,
      emptyImageUrl: ut,
      requestFn: mt,
      cancelFn: _,
      requestAnimFrame: v,
      cancelAnimFrame: y,
    };
    function M() {}
    (M.extend = function (t) {
      var e = function () {
          D(this),
            this.initialize && this.initialize.apply(this, arguments),
            this.callInitHooks();
        },
        i = (e.__super__ = this.prototype),
        n = c(i);
      (n.constructor = e), (e.prototype = n);
      for (var o in this)
        Object.prototype.hasOwnProperty.call(this, o) &&
          o !== "prototype" &&
          o !== "__super__" &&
          (e[o] = this[o]);
      return (
        t.statics && d(e, t.statics),
        t.includes && (S(t.includes), d.apply(null, [n].concat(t.includes))),
        d(n, t),
        delete n.statics,
        delete n.includes,
        n.options &&
          ((n.options = i.options ? c(i.options) : {}),
          d(n.options, t.options)),
        (n._initHooks = []),
        (n.callInitHooks = function () {
          if (!this._initHooksCalled) {
            i.callInitHooks && i.callInitHooks.call(this),
              (this._initHooksCalled = !0);
            for (var r = 0, s = n._initHooks.length; r < s; r++)
              n._initHooks[r].call(this);
          }
        }),
        e
      );
    }),
      (M.include = function (t) {
        var e = this.prototype.options;
        return (
          d(this.prototype, t),
          t.options &&
            ((this.prototype.options = e), this.mergeOptions(t.options)),
          this
        );
      }),
      (M.mergeOptions = function (t) {
        return d(this.prototype.options, t), this;
      }),
      (M.addInitHook = function (t) {
        var e = Array.prototype.slice.call(arguments, 1),
          i =
            typeof t == "function"
              ? t
              : function () {
                  this[t].apply(this, e);
                };
        return (
          (this.prototype._initHooks = this.prototype._initHooks || []),
          this.prototype._initHooks.push(i),
          this
        );
      });
    function S(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = et(t) ? t : [t];
        for (var e = 0; e < t.length; e++)
          t[e] === L.Mixin.Events &&
            console.warn(
              "Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",
              new Error().stack
            );
      }
    }
    var z = {
      on: function (t, e, i) {
        if (typeof t == "object") for (var n in t) this._on(n, t[n], e);
        else {
          t = H(t);
          for (var o = 0, r = t.length; o < r; o++) this._on(t[o], e, i);
        }
        return this;
      },
      off: function (t, e, i) {
        if (!arguments.length) delete this._events;
        else if (typeof t == "object") for (var n in t) this._off(n, t[n], e);
        else {
          t = H(t);
          for (var o = arguments.length === 1, r = 0, s = t.length; r < s; r++)
            o ? this._off(t[r]) : this._off(t[r], e, i);
        }
        return this;
      },
      _on: function (t, e, i, n) {
        if (typeof e != "function") {
          console.warn("wrong listener type: " + typeof e);
          return;
        }
        if (this._listens(t, e, i) === !1) {
          i === this && (i = void 0);
          var o = { fn: e, ctx: i };
          n && (o.once = !0),
            (this._events = this._events || {}),
            (this._events[t] = this._events[t] || []),
            this._events[t].push(o);
        }
      },
      _off: function (t, e, i) {
        var n, o, r;
        if (this._events && ((n = this._events[t]), !!n)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (o = 0, r = n.length; o < r; o++) n[o].fn = P;
            delete this._events[t];
            return;
          }
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          var s = this._listens(t, e, i);
          if (s !== !1) {
            var a = n[s];
            this._firingCount &&
              ((a.fn = P), (this._events[t] = n = n.slice())),
              n.splice(s, 1);
          }
        }
      },
      fire: function (t, e, i) {
        if (!this.listens(t, i)) return this;
        var n = d({}, e, {
          type: t,
          target: this,
          sourceTarget: (e && e.sourceTarget) || this,
        });
        if (this._events) {
          var o = this._events[t];
          if (o) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var r = 0, s = o.length; r < s; r++) {
              var a = o[r],
                u = a.fn;
              a.once && this.off(t, u, a.ctx), u.call(a.ctx || this, n);
            }
            this._firingCount--;
          }
        }
        return i && this._propagateEvent(n), this;
      },
      listens: function (t, e, i, n) {
        typeof t != "string" && console.warn('"string" type argument expected');
        var o = e;
        typeof e != "function" && ((n = !!e), (o = void 0), (i = void 0));
        var r = this._events && this._events[t];
        if (r && r.length && this._listens(t, o, i) !== !1) return !0;
        if (n) {
          for (var s in this._eventParents)
            if (this._eventParents[s].listens(t, e, i, n)) return !0;
        }
        return !1;
      },
      _listens: function (t, e, i) {
        if (!this._events) return !1;
        var n = this._events[t] || [];
        if (!e) return !!n.length;
        i === this && (i = void 0);
        for (var o = 0, r = n.length; o < r; o++)
          if (n[o].fn === e && n[o].ctx === i) return o;
        return !1;
      },
      once: function (t, e, i) {
        if (typeof t == "object") for (var n in t) this._on(n, t[n], e, !0);
        else {
          t = H(t);
          for (var o = 0, r = t.length; o < r; o++) this._on(t[o], e, i, !0);
        }
        return this;
      },
      addEventParent: function (t) {
        return (
          (this._eventParents = this._eventParents || {}),
          (this._eventParents[x(t)] = t),
          this
        );
      },
      removeEventParent: function (t) {
        return this._eventParents && delete this._eventParents[x(t)], this;
      },
      _propagateEvent: function (t) {
        for (var e in this._eventParents)
          this._eventParents[e].fire(
            t.type,
            d({ layer: t.target, propagatedFrom: t.target }, t),
            !0
          );
      },
    };
    (z.addEventListener = z.on),
      (z.removeEventListener = z.clearAllEventListeners = z.off),
      (z.addOneTimeEventListener = z.once),
      (z.fireEvent = z.fire),
      (z.hasEventListeners = z.listens);
    var $ = M.extend(z);
    function I(t, e, i) {
      (this.x = i ? Math.round(t) : t), (this.y = i ? Math.round(e) : e);
    }
    var F =
      Math.trunc ||
      function (t) {
        return t > 0 ? Math.floor(t) : Math.ceil(t);
      };
    I.prototype = {
      clone: function () {
        return new I(this.x, this.y);
      },
      add: function (t) {
        return this.clone()._add(R(t));
      },
      _add: function (t) {
        return (this.x += t.x), (this.y += t.y), this;
      },
      subtract: function (t) {
        return this.clone()._subtract(R(t));
      },
      _subtract: function (t) {
        return (this.x -= t.x), (this.y -= t.y), this;
      },
      divideBy: function (t) {
        return this.clone()._divideBy(t);
      },
      _divideBy: function (t) {
        return (this.x /= t), (this.y /= t), this;
      },
      multiplyBy: function (t) {
        return this.clone()._multiplyBy(t);
      },
      _multiplyBy: function (t) {
        return (this.x *= t), (this.y *= t), this;
      },
      scaleBy: function (t) {
        return new I(this.x * t.x, this.y * t.y);
      },
      unscaleBy: function (t) {
        return new I(this.x / t.x, this.y / t.y);
      },
      round: function () {
        return this.clone()._round();
      },
      _round: function () {
        return (
          (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
        );
      },
      floor: function () {
        return this.clone()._floor();
      },
      _floor: function () {
        return (
          (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
        );
      },
      ceil: function () {
        return this.clone()._ceil();
      },
      _ceil: function () {
        return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
      },
      trunc: function () {
        return this.clone()._trunc();
      },
      _trunc: function () {
        return (this.x = F(this.x)), (this.y = F(this.y)), this;
      },
      distanceTo: function (t) {
        t = R(t);
        var e = t.x - this.x,
          i = t.y - this.y;
        return Math.sqrt(e * e + i * i);
      },
      equals: function (t) {
        return (t = R(t)), t.x === this.x && t.y === this.y;
      },
      contains: function (t) {
        return (
          (t = R(t)),
          Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        );
      },
      toString: function () {
        return "Point(" + b(this.x) + ", " + b(this.y) + ")";
      },
    };
    function R(t, e, i) {
      return t instanceof I
        ? t
        : et(t)
        ? new I(t[0], t[1])
        : t == null
        ? t
        : typeof t == "object" && "x" in t && "y" in t
        ? new I(t.x, t.y)
        : new I(t, e, i);
    }
    function V(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
          this.extend(i[n]);
    }
    V.prototype = {
      extend: function (t) {
        var e, i;
        if (!t) return this;
        if (t instanceof I || typeof t[0] == "number" || "x" in t) e = i = R(t);
        else if (((t = j(t)), (e = t.min), (i = t.max), !e || !i)) return this;
        return (
          !this.min && !this.max
            ? ((this.min = e.clone()), (this.max = i.clone()))
            : ((this.min.x = Math.min(e.x, this.min.x)),
              (this.max.x = Math.max(i.x, this.max.x)),
              (this.min.y = Math.min(e.y, this.min.y)),
              (this.max.y = Math.max(i.y, this.max.y))),
          this
        );
      },
      getCenter: function (t) {
        return R(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      getBottomLeft: function () {
        return R(this.min.x, this.max.y);
      },
      getTopRight: function () {
        return R(this.max.x, this.min.y);
      },
      getTopLeft: function () {
        return this.min;
      },
      getBottomRight: function () {
        return this.max;
      },
      getSize: function () {
        return this.max.subtract(this.min);
      },
      contains: function (t) {
        var e, i;
        return (
          typeof t[0] == "number" || t instanceof I ? (t = R(t)) : (t = j(t)),
          t instanceof V ? ((e = t.min), (i = t.max)) : (e = i = t),
          e.x >= this.min.x &&
            i.x <= this.max.x &&
            e.y >= this.min.y &&
            i.y <= this.max.y
        );
      },
      intersects: function (t) {
        t = j(t);
        var e = this.min,
          i = this.max,
          n = t.min,
          o = t.max,
          r = o.x >= e.x && n.x <= i.x,
          s = o.y >= e.y && n.y <= i.y;
        return r && s;
      },
      overlaps: function (t) {
        t = j(t);
        var e = this.min,
          i = this.max,
          n = t.min,
          o = t.max,
          r = o.x > e.x && n.x < i.x,
          s = o.y > e.y && n.y < i.y;
        return r && s;
      },
      isValid: function () {
        return !!(this.min && this.max);
      },
      pad: function (t) {
        var e = this.min,
          i = this.max,
          n = Math.abs(e.x - i.x) * t,
          o = Math.abs(e.y - i.y) * t;
        return j(R(e.x - n, e.y - o), R(i.x + n, i.y + o));
      },
      equals: function (t) {
        return t
          ? ((t = j(t)),
            this.min.equals(t.getTopLeft()) &&
              this.max.equals(t.getBottomRight()))
          : !1;
      },
    };
    function j(t, e) {
      return !t || t instanceof V ? t : new V(t, e);
    }
    function it(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
          this.extend(i[n]);
    }
    it.prototype = {
      extend: function (t) {
        var e = this._southWest,
          i = this._northEast,
          n,
          o;
        if (t instanceof K) (n = t), (o = t);
        else if (t instanceof it) {
          if (((n = t._southWest), (o = t._northEast), !n || !o)) return this;
        } else return t ? this.extend(X(t) || tt(t)) : this;
        return (
          !e && !i
            ? ((this._southWest = new K(n.lat, n.lng)),
              (this._northEast = new K(o.lat, o.lng)))
            : ((e.lat = Math.min(n.lat, e.lat)),
              (e.lng = Math.min(n.lng, e.lng)),
              (i.lat = Math.max(o.lat, i.lat)),
              (i.lng = Math.max(o.lng, i.lng))),
          this
        );
      },
      pad: function (t) {
        var e = this._southWest,
          i = this._northEast,
          n = Math.abs(e.lat - i.lat) * t,
          o = Math.abs(e.lng - i.lng) * t;
        return new it(new K(e.lat - n, e.lng - o), new K(i.lat + n, i.lng + o));
      },
      getCenter: function () {
        return new K(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      getSouthWest: function () {
        return this._southWest;
      },
      getNorthEast: function () {
        return this._northEast;
      },
      getNorthWest: function () {
        return new K(this.getNorth(), this.getWest());
      },
      getSouthEast: function () {
        return new K(this.getSouth(), this.getEast());
      },
      getWest: function () {
        return this._southWest.lng;
      },
      getSouth: function () {
        return this._southWest.lat;
      },
      getEast: function () {
        return this._northEast.lng;
      },
      getNorth: function () {
        return this._northEast.lat;
      },
      contains: function (t) {
        typeof t[0] == "number" || t instanceof K || "lat" in t
          ? (t = X(t))
          : (t = tt(t));
        var e = this._southWest,
          i = this._northEast,
          n,
          o;
        return (
          t instanceof it
            ? ((n = t.getSouthWest()), (o = t.getNorthEast()))
            : (n = o = t),
          n.lat >= e.lat && o.lat <= i.lat && n.lng >= e.lng && o.lng <= i.lng
        );
      },
      intersects: function (t) {
        t = tt(t);
        var e = this._southWest,
          i = this._northEast,
          n = t.getSouthWest(),
          o = t.getNorthEast(),
          r = o.lat >= e.lat && n.lat <= i.lat,
          s = o.lng >= e.lng && n.lng <= i.lng;
        return r && s;
      },
      overlaps: function (t) {
        t = tt(t);
        var e = this._southWest,
          i = this._northEast,
          n = t.getSouthWest(),
          o = t.getNorthEast(),
          r = o.lat > e.lat && n.lat < i.lat,
          s = o.lng > e.lng && n.lng < i.lng;
        return r && s;
      },
      toBBoxString: function () {
        return [
          this.getWest(),
          this.getSouth(),
          this.getEast(),
          this.getNorth(),
        ].join(",");
      },
      equals: function (t, e) {
        return t
          ? ((t = tt(t)),
            this._southWest.equals(t.getSouthWest(), e) &&
              this._northEast.equals(t.getNorthEast(), e))
          : !1;
      },
      isValid: function () {
        return !!(this._southWest && this._northEast);
      },
    };
    function tt(t, e) {
      return t instanceof it ? t : new it(t, e);
    }
    function K(t, e, i) {
      if (isNaN(t) || isNaN(e))
        throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
      (this.lat = +t), (this.lng = +e), i !== void 0 && (this.alt = +i);
    }
    K.prototype = {
      equals: function (t, e) {
        if (!t) return !1;
        t = X(t);
        var i = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return i <= (e === void 0 ? 1e-9 : e);
      },
      toString: function (t) {
        return "LatLng(" + b(this.lat, t) + ", " + b(this.lng, t) + ")";
      },
      distanceTo: function (t) {
        return Rt.distance(this, X(t));
      },
      wrap: function () {
        return Rt.wrapLatLng(this);
      },
      toBounds: function (t) {
        var e = (180 * t) / 40075017,
          i = e / Math.cos((Math.PI / 180) * this.lat);
        return tt([this.lat - e, this.lng - i], [this.lat + e, this.lng + i]);
      },
      clone: function () {
        return new K(this.lat, this.lng, this.alt);
      },
    };
    function X(t, e, i) {
      return t instanceof K
        ? t
        : et(t) && typeof t[0] != "object"
        ? t.length === 3
          ? new K(t[0], t[1], t[2])
          : t.length === 2
          ? new K(t[0], t[1])
          : null
        : t == null
        ? t
        : typeof t == "object" && "lat" in t
        ? new K(t.lat, "lng" in t ? t.lng : t.lon, t.alt)
        : e === void 0
        ? null
        : new K(t, e, i);
    }
    var Tt = {
        latLngToPoint: function (t, e) {
          var i = this.projection.project(t),
            n = this.scale(e);
          return this.transformation._transform(i, n);
        },
        pointToLatLng: function (t, e) {
          var i = this.scale(e),
            n = this.transformation.untransform(t, i);
          return this.projection.unproject(n);
        },
        project: function (t) {
          return this.projection.project(t);
        },
        unproject: function (t) {
          return this.projection.unproject(t);
        },
        scale: function (t) {
          return 256 * Math.pow(2, t);
        },
        zoom: function (t) {
          return Math.log(t / 256) / Math.LN2;
        },
        getProjectedBounds: function (t) {
          if (this.infinite) return null;
          var e = this.projection.bounds,
            i = this.scale(t),
            n = this.transformation.transform(e.min, i),
            o = this.transformation.transform(e.max, i);
          return new V(n, o);
        },
        infinite: !1,
        wrapLatLng: function (t) {
          var e = this.wrapLng ? f(t.lng, this.wrapLng, !0) : t.lng,
            i = this.wrapLat ? f(t.lat, this.wrapLat, !0) : t.lat,
            n = t.alt;
          return new K(i, e, n);
        },
        wrapLatLngBounds: function (t) {
          var e = t.getCenter(),
            i = this.wrapLatLng(e),
            n = e.lat - i.lat,
            o = e.lng - i.lng;
          if (n === 0 && o === 0) return t;
          var r = t.getSouthWest(),
            s = t.getNorthEast(),
            a = new K(r.lat - n, r.lng - o),
            u = new K(s.lat - n, s.lng - o);
          return new it(a, u);
        },
      },
      Rt = d({}, Tt, {
        wrapLng: [-180, 180],
        R: 6371e3,
        distance: function (t, e) {
          var i = Math.PI / 180,
            n = t.lat * i,
            o = e.lat * i,
            r = Math.sin(((e.lat - t.lat) * i) / 2),
            s = Math.sin(((e.lng - t.lng) * i) / 2),
            a = r * r + Math.cos(n) * Math.cos(o) * s * s,
            u = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return this.R * u;
        },
      }),
      Li = 6378137,
      Be = {
        R: Li,
        MAX_LATITUDE: 85.0511287798,
        project: function (t) {
          var e = Math.PI / 180,
            i = this.MAX_LATITUDE,
            n = Math.max(Math.min(i, t.lat), -i),
            o = Math.sin(n * e);
          return new I(
            this.R * t.lng * e,
            (this.R * Math.log((1 + o) / (1 - o))) / 2
          );
        },
        unproject: function (t) {
          var e = 180 / Math.PI;
          return new K(
            (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
            (t.x * e) / this.R
          );
        },
        bounds: (function () {
          var t = Li * Math.PI;
          return new V([-t, -t], [t, t]);
        })(),
      };
    function Ze(t, e, i, n) {
      if (et(t)) {
        (this._a = t[0]), (this._b = t[1]), (this._c = t[2]), (this._d = t[3]);
        return;
      }
      (this._a = t), (this._b = e), (this._c = i), (this._d = n);
    }
    Ze.prototype = {
      transform: function (t, e) {
        return this._transform(t.clone(), e);
      },
      _transform: function (t, e) {
        return (
          (e = e || 1),
          (t.x = e * (this._a * t.x + this._b)),
          (t.y = e * (this._c * t.y + this._d)),
          t
        );
      },
      untransform: function (t, e) {
        return (
          (e = e || 1),
          new I((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
        );
      },
    };
    function Yt(t, e, i, n) {
      return new Ze(t, e, i, n);
    }
    var De = d({}, Rt, {
        code: "EPSG:3857",
        projection: Be,
        transformation: (function () {
          var t = 0.5 / (Math.PI * Be.R);
          return Yt(t, 0.5, -t, 0.5);
        })(),
      }),
      Xn = d({}, De, { code: "EPSG:900913" });
    function Ti(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function Si(t, e) {
      var i = "",
        n,
        o,
        r,
        s,
        a,
        u;
      for (n = 0, r = t.length; n < r; n++) {
        for (a = t[n], o = 0, s = a.length; o < s; o++)
          (u = a[o]), (i += (o ? "L" : "M") + u.x + " " + u.y);
        i += e ? (O.svg ? "z" : "x") : "";
      }
      return i || "M0 0";
    }
    var Ne = document.documentElement.style,
      ce = "ActiveXObject" in window,
      Jn = ce && !document.addEventListener,
      Ei = "msLaunchUri" in navigator && !("documentMode" in document),
      Fe = wt("webkit"),
      Mi = wt("android"),
      Ci = wt("android 2") || wt("android 3"),
      Qn = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
      to = Mi && wt("Google") && Qn < 537 && !("AudioNode" in window),
      He = !!window.opera,
      Ri = !Ei && wt("chrome"),
      Oi = wt("gecko") && !Fe && !He && !ce,
      eo = !Ri && wt("safari"),
      Ai = wt("phantom"),
      Ii = "OTransition" in Ne,
      io = navigator.platform.indexOf("Win") === 0,
      ki = ce && "transition" in Ne,
      We =
        "WebKitCSSMatrix" in window &&
        "m11" in new window.WebKitCSSMatrix() &&
        !Ci,
      zi = "MozPerspective" in Ne,
      no = !window.L_DISABLE_3D && (ki || We || zi) && !Ii && !Ai,
      $t = typeof orientation < "u" || wt("mobile"),
      oo = $t && Fe,
      ro = $t && We,
      Bi = !window.PointerEvent && window.MSPointerEvent,
      Zi = !!(window.PointerEvent || Bi),
      Di = "ontouchstart" in window || !!window.TouchEvent,
      so = !window.L_NO_TOUCH && (Di || Zi),
      ao = $t && He,
      ho = $t && Oi,
      uo =
        (window.devicePixelRatio ||
          window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
      lo = (function () {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function () {
              t = !0;
            },
          });
          window.addEventListener("testPassiveEventSupport", P, e),
            window.removeEventListener("testPassiveEventSupport", P, e);
        } catch {}
        return t;
      })(),
      co = (function () {
        return !!document.createElement("canvas").getContext;
      })(),
      Ue = !!(document.createElementNS && Ti("svg").createSVGRect),
      fo =
        !!Ue &&
        (function () {
          var t = document.createElement("div");
          return (
            (t.innerHTML = "<svg/>"),
            (t.firstChild && t.firstChild.namespaceURI) ===
              "http://www.w3.org/2000/svg"
          );
        })(),
      _o =
        !Ue &&
        (function () {
          try {
            var t = document.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var e = t.firstChild;
            return (
              (e.style.behavior = "url(#default#VML)"),
              e && typeof e.adj == "object"
            );
          } catch {
            return !1;
          }
        })(),
      mo = navigator.platform.indexOf("Mac") === 0,
      po = navigator.platform.indexOf("Linux") === 0;
    function wt(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var O = {
        ie: ce,
        ielt9: Jn,
        edge: Ei,
        webkit: Fe,
        android: Mi,
        android23: Ci,
        androidStock: to,
        opera: He,
        chrome: Ri,
        gecko: Oi,
        safari: eo,
        phantom: Ai,
        opera12: Ii,
        win: io,
        ie3d: ki,
        webkit3d: We,
        gecko3d: zi,
        any3d: no,
        mobile: $t,
        mobileWebkit: oo,
        mobileWebkit3d: ro,
        msPointer: Bi,
        pointer: Zi,
        touch: so,
        touchNative: Di,
        mobileOpera: ao,
        mobileGecko: ho,
        retina: uo,
        passiveEvents: lo,
        canvas: co,
        svg: Ue,
        vml: _o,
        inlineSvg: fo,
        mac: mo,
        linux: po,
      },
      Ni = O.msPointer ? "MSPointerDown" : "pointerdown",
      Fi = O.msPointer ? "MSPointerMove" : "pointermove",
      Hi = O.msPointer ? "MSPointerUp" : "pointerup",
      Wi = O.msPointer ? "MSPointerCancel" : "pointercancel",
      Ge = { touchstart: Ni, touchmove: Fi, touchend: Hi, touchcancel: Wi },
      Ui = { touchstart: bo, touchmove: fe, touchend: fe, touchcancel: fe },
      Ft = {},
      Gi = !1;
    function go(t, e, i) {
      return (
        e === "touchstart" && Po(),
        Ui[e]
          ? ((i = Ui[e].bind(this, i)), t.addEventListener(Ge[e], i, !1), i)
          : (console.warn("wrong event specified:", e), P)
      );
    }
    function vo(t, e, i) {
      if (!Ge[e]) {
        console.warn("wrong event specified:", e);
        return;
      }
      t.removeEventListener(Ge[e], i, !1);
    }
    function yo(t) {
      Ft[t.pointerId] = t;
    }
    function wo(t) {
      Ft[t.pointerId] && (Ft[t.pointerId] = t);
    }
    function qi(t) {
      delete Ft[t.pointerId];
    }
    function Po() {
      Gi ||
        (document.addEventListener(Ni, yo, !0),
        document.addEventListener(Fi, wo, !0),
        document.addEventListener(Hi, qi, !0),
        document.addEventListener(Wi, qi, !0),
        (Gi = !0));
    }
    function fe(t, e) {
      if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
        e.touches = [];
        for (var i in Ft) e.touches.push(Ft[i]);
        (e.changedTouches = [e]), t(e);
      }
    }
    function bo(t, e) {
      e.MSPOINTER_TYPE_TOUCH &&
        e.pointerType === e.MSPOINTER_TYPE_TOUCH &&
        at(e),
        fe(t, e);
    }
    function xo(t) {
      var e = {},
        i,
        n;
      for (n in t) (i = t[n]), (e[n] = i && i.bind ? i.bind(t) : i);
      return (
        (t = e),
        (e.type = "dblclick"),
        (e.detail = 2),
        (e.isTrusted = !1),
        (e._simulated = !0),
        e
      );
    }
    var Lo = 200;
    function To(t, e) {
      t.addEventListener("dblclick", e);
      var i = 0,
        n;
      function o(r) {
        if (r.detail !== 1) {
          n = r.detail;
          return;
        }
        if (
          !(
            r.pointerType === "mouse" ||
            (r.sourceCapabilities && !r.sourceCapabilities.firesTouchEvents)
          )
        ) {
          var s = $i(r);
          if (
            !(
              s.some(function (u) {
                return u instanceof HTMLLabelElement && u.attributes.for;
              }) &&
              !s.some(function (u) {
                return (
                  u instanceof HTMLInputElement ||
                  u instanceof HTMLSelectElement
                );
              })
            )
          ) {
            var a = Date.now();
            a - i <= Lo ? (n++, n === 2 && e(xo(r))) : (n = 1), (i = a);
          }
        }
      }
      return t.addEventListener("click", o), { dblclick: e, simDblclick: o };
    }
    function So(t, e) {
      t.removeEventListener("dblclick", e.dblclick),
        t.removeEventListener("click", e.simDblclick);
    }
    var qe = me([
        "transform",
        "webkitTransform",
        "OTransform",
        "MozTransform",
        "msTransform",
      ]),
      Xt = me([
        "webkitTransition",
        "transition",
        "OTransition",
        "MozTransition",
        "msTransition",
      ]),
      ji =
        Xt === "webkitTransition" || Xt === "OTransition"
          ? Xt + "End"
          : "transitionend";
    function Vi(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function Jt(t, e) {
      var i = t.style[e] || (t.currentStyle && t.currentStyle[e]);
      if ((!i || i === "auto") && document.defaultView) {
        var n = document.defaultView.getComputedStyle(t, null);
        i = n ? n[e] : null;
      }
      return i === "auto" ? null : i;
    }
    function G(t, e, i) {
      var n = document.createElement(t);
      return (n.className = e || ""), i && i.appendChild(n), n;
    }
    function Q(t) {
      var e = t.parentNode;
      e && e.removeChild(t);
    }
    function de(t) {
      for (; t.firstChild; ) t.removeChild(t.firstChild);
    }
    function Ht(t) {
      var e = t.parentNode;
      e && e.lastChild !== t && e.appendChild(t);
    }
    function Wt(t) {
      var e = t.parentNode;
      e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
    }
    function je(t, e) {
      if (t.classList !== void 0) return t.classList.contains(e);
      var i = _e(t);
      return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
    }
    function N(t, e) {
      if (t.classList !== void 0)
        for (var i = H(e), n = 0, o = i.length; n < o; n++)
          t.classList.add(i[n]);
      else if (!je(t, e)) {
        var r = _e(t);
        Ve(t, (r ? r + " " : "") + e);
      }
    }
    function nt(t, e) {
      t.classList !== void 0
        ? t.classList.remove(e)
        : Ve(t, k((" " + _e(t) + " ").replace(" " + e + " ", " ")));
    }
    function Ve(t, e) {
      t.className.baseVal === void 0
        ? (t.className = e)
        : (t.className.baseVal = e);
    }
    function _e(t) {
      return (
        t.correspondingElement && (t = t.correspondingElement),
        t.className.baseVal === void 0 ? t.className : t.className.baseVal
      );
    }
    function ft(t, e) {
      "opacity" in t.style
        ? (t.style.opacity = e)
        : "filter" in t.style && Eo(t, e);
    }
    function Eo(t, e) {
      var i = !1,
        n = "DXImageTransform.Microsoft.Alpha";
      try {
        i = t.filters.item(n);
      } catch {
        if (e === 1) return;
      }
      (e = Math.round(e * 100)),
        i
          ? ((i.Enabled = e !== 100), (i.Opacity = e))
          : (t.style.filter += " progid:" + n + "(opacity=" + e + ")");
    }
    function me(t) {
      for (var e = document.documentElement.style, i = 0; i < t.length; i++)
        if (t[i] in e) return t[i];
      return !1;
    }
    function kt(t, e, i) {
      var n = e || new I(0, 0);
      t.style[qe] =
        (O.ie3d
          ? "translate(" + n.x + "px," + n.y + "px)"
          : "translate3d(" + n.x + "px," + n.y + "px,0)") +
        (i ? " scale(" + i + ")" : "");
    }
    function ot(t, e) {
      (t._leaflet_pos = e),
        O.any3d
          ? kt(t, e)
          : ((t.style.left = e.x + "px"), (t.style.top = e.y + "px"));
    }
    function zt(t) {
      return t._leaflet_pos || new I(0, 0);
    }
    var Qt, te, Ke;
    if ("onselectstart" in document)
      (Qt = function () {
        Z(window, "selectstart", at);
      }),
        (te = function () {
          J(window, "selectstart", at);
        });
    else {
      var ee = me([
        "userSelect",
        "WebkitUserSelect",
        "OUserSelect",
        "MozUserSelect",
        "msUserSelect",
      ]);
      (Qt = function () {
        if (ee) {
          var t = document.documentElement.style;
          (Ke = t[ee]), (t[ee] = "none");
        }
      }),
        (te = function () {
          ee && ((document.documentElement.style[ee] = Ke), (Ke = void 0));
        });
    }
    function Ye() {
      Z(window, "dragstart", at);
    }
    function $e() {
      J(window, "dragstart", at);
    }
    var pe, Xe;
    function Je(t) {
      for (; t.tabIndex === -1; ) t = t.parentNode;
      t.style &&
        (ge(),
        (pe = t),
        (Xe = t.style.outline),
        (t.style.outline = "none"),
        Z(window, "keydown", ge));
    }
    function ge() {
      pe &&
        ((pe.style.outline = Xe),
        (pe = void 0),
        (Xe = void 0),
        J(window, "keydown", ge));
    }
    function Ki(t) {
      do t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function Qe(t) {
      var e = t.getBoundingClientRect();
      return {
        x: e.width / t.offsetWidth || 1,
        y: e.height / t.offsetHeight || 1,
        boundingClientRect: e,
      };
    }
    var Mo = {
      __proto__: null,
      TRANSFORM: qe,
      TRANSITION: Xt,
      TRANSITION_END: ji,
      get: Vi,
      getStyle: Jt,
      create: G,
      remove: Q,
      empty: de,
      toFront: Ht,
      toBack: Wt,
      hasClass: je,
      addClass: N,
      removeClass: nt,
      setClass: Ve,
      getClass: _e,
      setOpacity: ft,
      testProp: me,
      setTransform: kt,
      setPosition: ot,
      getPosition: zt,
      get disableTextSelection() {
        return Qt;
      },
      get enableTextSelection() {
        return te;
      },
      disableImageDrag: Ye,
      enableImageDrag: $e,
      preventOutline: Je,
      restoreOutline: ge,
      getSizedParentNode: Ki,
      getScale: Qe,
    };
    function Z(t, e, i, n) {
      if (e && typeof e == "object") for (var o in e) ei(t, o, e[o], i);
      else {
        e = H(e);
        for (var r = 0, s = e.length; r < s; r++) ei(t, e[r], i, n);
      }
      return this;
    }
    var Pt = "_leaflet_events";
    function J(t, e, i, n) {
      if (arguments.length === 1) Yi(t), delete t[Pt];
      else if (e && typeof e == "object") for (var o in e) ii(t, o, e[o], i);
      else if (((e = H(e)), arguments.length === 2))
        Yi(t, function (a) {
          return ct(e, a) !== -1;
        });
      else for (var r = 0, s = e.length; r < s; r++) ii(t, e[r], i, n);
      return this;
    }
    function Yi(t, e) {
      for (var i in t[Pt]) {
        var n = i.split(/\d/)[0];
        (!e || e(n)) && ii(t, n, null, null, i);
      }
    }
    var ti = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel",
    };
    function ei(t, e, i, n) {
      var o = e + x(i) + (n ? "_" + x(n) : "");
      if (t[Pt] && t[Pt][o]) return this;
      var r = function (a) {
          return i.call(n || t, a || window.event);
        },
        s = r;
      !O.touchNative && O.pointer && e.indexOf("touch") === 0
        ? (r = go(t, e, r))
        : O.touch && e === "dblclick"
        ? (r = To(t, r))
        : "addEventListener" in t
        ? e === "touchstart" ||
          e === "touchmove" ||
          e === "wheel" ||
          e === "mousewheel"
          ? t.addEventListener(
              ti[e] || e,
              r,
              O.passiveEvents ? { passive: !1 } : !1
            )
          : e === "mouseenter" || e === "mouseleave"
          ? ((r = function (a) {
              (a = a || window.event), oi(t, a) && s(a);
            }),
            t.addEventListener(ti[e], r, !1))
          : t.addEventListener(e, s, !1)
        : t.attachEvent("on" + e, r),
        (t[Pt] = t[Pt] || {}),
        (t[Pt][o] = r);
    }
    function ii(t, e, i, n, o) {
      o = o || e + x(i) + (n ? "_" + x(n) : "");
      var r = t[Pt] && t[Pt][o];
      if (!r) return this;
      !O.touchNative && O.pointer && e.indexOf("touch") === 0
        ? vo(t, e, r)
        : O.touch && e === "dblclick"
        ? So(t, r)
        : "removeEventListener" in t
        ? t.removeEventListener(ti[e] || e, r, !1)
        : t.detachEvent("on" + e, r),
        (t[Pt][o] = null);
    }
    function Bt(t) {
      return (
        t.stopPropagation
          ? t.stopPropagation()
          : t.originalEvent
          ? (t.originalEvent._stopped = !0)
          : (t.cancelBubble = !0),
        this
      );
    }
    function ni(t) {
      return ei(t, "wheel", Bt), this;
    }
    function ie(t) {
      return (
        Z(t, "mousedown touchstart dblclick contextmenu", Bt),
        (t._leaflet_disable_click = !0),
        this
      );
    }
    function at(t) {
      return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), this;
    }
    function Zt(t) {
      return at(t), Bt(t), this;
    }
    function $i(t) {
      if (t.composedPath) return t.composedPath();
      for (var e = [], i = t.target; i; ) e.push(i), (i = i.parentNode);
      return e;
    }
    function Xi(t, e) {
      if (!e) return new I(t.clientX, t.clientY);
      var i = Qe(e),
        n = i.boundingClientRect;
      return new I(
        (t.clientX - n.left) / i.x - e.clientLeft,
        (t.clientY - n.top) / i.y - e.clientTop
      );
    }
    var Co =
      O.linux && O.chrome
        ? window.devicePixelRatio
        : O.mac
        ? window.devicePixelRatio * 3
        : window.devicePixelRatio > 0
        ? 2 * window.devicePixelRatio
        : 1;
    function Ji(t) {
      return O.edge
        ? t.wheelDeltaY / 2
        : t.deltaY && t.deltaMode === 0
        ? -t.deltaY / Co
        : t.deltaY && t.deltaMode === 1
        ? -t.deltaY * 20
        : t.deltaY && t.deltaMode === 2
        ? -t.deltaY * 60
        : t.deltaX || t.deltaZ
        ? 0
        : t.wheelDelta
        ? (t.wheelDeltaY || t.wheelDelta) / 2
        : t.detail && Math.abs(t.detail) < 32765
        ? -t.detail * 20
        : t.detail
        ? (t.detail / -32765) * 60
        : 0;
    }
    function oi(t, e) {
      var i = e.relatedTarget;
      if (!i) return !0;
      try {
        for (; i && i !== t; ) i = i.parentNode;
      } catch {
        return !1;
      }
      return i !== t;
    }
    var Ro = {
        __proto__: null,
        on: Z,
        off: J,
        stopPropagation: Bt,
        disableScrollPropagation: ni,
        disableClickPropagation: ie,
        preventDefault: at,
        stop: Zt,
        getPropagationPath: $i,
        getMousePosition: Xi,
        getWheelDelta: Ji,
        isExternalTarget: oi,
        addListener: Z,
        removeListener: J,
      },
      Qi = $.extend({
        run: function (t, e, i, n) {
          this.stop(),
            (this._el = t),
            (this._inProgress = !0),
            (this._duration = i || 0.25),
            (this._easeOutPower = 1 / Math.max(n || 0.5, 0.2)),
            (this._startPos = zt(t)),
            (this._offset = e.subtract(this._startPos)),
            (this._startTime = +new Date()),
            this.fire("start"),
            this._animate();
        },
        stop: function () {
          this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function () {
          (this._animId = v(this._animate, this)), this._step();
        },
        _step: function (t) {
          var e = +new Date() - this._startTime,
            i = this._duration * 1e3;
          e < i
            ? this._runFrame(this._easeOut(e / i), t)
            : (this._runFrame(1), this._complete());
        },
        _runFrame: function (t, e) {
          var i = this._startPos.add(this._offset.multiplyBy(t));
          e && i._round(), ot(this._el, i), this.fire("step");
        },
        _complete: function () {
          y(this._animId), (this._inProgress = !1), this.fire("end");
        },
        _easeOut: function (t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        },
      }),
      U = $.extend({
        options: {
          crs: De,
          center: void 0,
          zoom: void 0,
          minZoom: void 0,
          maxZoom: void 0,
          layers: [],
          maxBounds: void 0,
          renderer: void 0,
          zoomAnimation: !0,
          zoomAnimationThreshold: 4,
          fadeAnimation: !0,
          markerZoomAnimation: !0,
          transform3DLimit: 8388608,
          zoomSnap: 1,
          zoomDelta: 1,
          trackResize: !0,
        },
        initialize: function (t, e) {
          (e = D(this, e)),
            (this._handlers = []),
            (this._layers = {}),
            (this._zoomBoundLayers = {}),
            (this._sizeChanged = !0),
            this._initContainer(t),
            this._initLayout(),
            (this._onResize = p(this._onResize, this)),
            this._initEvents(),
            e.maxBounds && this.setMaxBounds(e.maxBounds),
            e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)),
            e.center &&
              e.zoom !== void 0 &&
              this.setView(X(e.center), e.zoom, { reset: !0 }),
            this.callInitHooks(),
            (this._zoomAnimated =
              Xt && O.any3d && !O.mobileOpera && this.options.zoomAnimation),
            this._zoomAnimated &&
              (this._createAnimProxy(),
              Z(this._proxy, ji, this._catchTransitionEnd, this)),
            this._addLayers(this.options.layers);
        },
        setView: function (t, e, i) {
          if (
            ((e = e === void 0 ? this._zoom : this._limitZoom(e)),
            (t = this._limitCenter(X(t), e, this.options.maxBounds)),
            (i = i || {}),
            this._stop(),
            this._loaded && !i.reset && i !== !0)
          ) {
            i.animate !== void 0 &&
              ((i.zoom = d({ animate: i.animate }, i.zoom)),
              (i.pan = d({ animate: i.animate, duration: i.duration }, i.pan)));
            var n =
              this._zoom !== e
                ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom)
                : this._tryAnimatedPan(t, i.pan);
            if (n) return clearTimeout(this._sizeTimer), this;
          }
          return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
        },
        setZoom: function (t, e) {
          return this._loaded
            ? this.setView(this.getCenter(), t, { zoom: e })
            : ((this._zoom = t), this);
        },
        zoomIn: function (t, e) {
          return (
            (t = t || (O.any3d ? this.options.zoomDelta : 1)),
            this.setZoom(this._zoom + t, e)
          );
        },
        zoomOut: function (t, e) {
          return (
            (t = t || (O.any3d ? this.options.zoomDelta : 1)),
            this.setZoom(this._zoom - t, e)
          );
        },
        setZoomAround: function (t, e, i) {
          var n = this.getZoomScale(e),
            o = this.getSize().divideBy(2),
            r = t instanceof I ? t : this.latLngToContainerPoint(t),
            s = r.subtract(o).multiplyBy(1 - 1 / n),
            a = this.containerPointToLatLng(o.add(s));
          return this.setView(a, e, { zoom: i });
        },
        _getBoundsCenterZoom: function (t, e) {
          (e = e || {}), (t = t.getBounds ? t.getBounds() : tt(t));
          var i = R(e.paddingTopLeft || e.padding || [0, 0]),
            n = R(e.paddingBottomRight || e.padding || [0, 0]),
            o = this.getBoundsZoom(t, !1, i.add(n));
          if (
            ((o = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, o) : o),
            o === 1 / 0)
          )
            return { center: t.getCenter(), zoom: o };
          var r = n.subtract(i).divideBy(2),
            s = this.project(t.getSouthWest(), o),
            a = this.project(t.getNorthEast(), o),
            u = this.unproject(s.add(a).divideBy(2).add(r), o);
          return { center: u, zoom: o };
        },
        fitBounds: function (t, e) {
          if (((t = tt(t)), !t.isValid()))
            throw new Error("Bounds are not valid.");
          var i = this._getBoundsCenterZoom(t, e);
          return this.setView(i.center, i.zoom, e);
        },
        fitWorld: function (t) {
          return this.fitBounds(
            [
              [-90, -180],
              [90, 180],
            ],
            t
          );
        },
        panTo: function (t, e) {
          return this.setView(t, this._zoom, { pan: e });
        },
        panBy: function (t, e) {
          if (((t = R(t).round()), (e = e || {}), !t.x && !t.y))
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return (
              this._resetView(
                this.unproject(this.project(this.getCenter()).add(t)),
                this.getZoom()
              ),
              this
            );
          if (
            (this._panAnim ||
              ((this._panAnim = new Qi()),
              this._panAnim.on(
                {
                  step: this._onPanTransitionStep,
                  end: this._onPanTransitionEnd,
                },
                this
              )),
            e.noMoveStart || this.fire("movestart"),
            e.animate !== !1)
          ) {
            N(this._mapPane, "leaflet-pan-anim");
            var i = this._getMapPanePos().subtract(t).round();
            this._panAnim.run(
              this._mapPane,
              i,
              e.duration || 0.25,
              e.easeLinearity
            );
          } else this._rawPanBy(t), this.fire("move").fire("moveend");
          return this;
        },
        flyTo: function (t, e, i) {
          if (((i = i || {}), i.animate === !1 || !O.any3d))
            return this.setView(t, e, i);
          this._stop();
          var n = this.project(this.getCenter()),
            o = this.project(t),
            r = this.getSize(),
            s = this._zoom;
          (t = X(t)), (e = e === void 0 ? s : e);
          var a = Math.max(r.x, r.y),
            u = a * this.getZoomScale(s, e),
            g = o.distanceTo(n) || 1,
            T = 1.42,
            B = T * T;
          function W(rt) {
            var Re = rt ? -1 : 1,
              vr = rt ? u : a,
              yr = u * u - a * a + Re * B * B * g * g,
              wr = 2 * vr * B * g,
              mi = yr / wr,
              kn = Math.sqrt(mi * mi + 1) - mi,
              Pr = kn < 1e-9 ? -18 : Math.log(kn);
            return Pr;
          }
          function _t(rt) {
            return (Math.exp(rt) - Math.exp(-rt)) / 2;
          }
          function Nt(rt) {
            return (Math.exp(rt) + Math.exp(-rt)) / 2;
          }
          function Ce(rt) {
            return _t(rt) / Nt(rt);
          }
          var It = W(0);
          function _i(rt) {
            return a * (Nt(It) / Nt(It + T * rt));
          }
          function _r(rt) {
            return (a * (Nt(It) * Ce(It + T * rt) - _t(It))) / B;
          }
          function mr(rt) {
            return 1 - Math.pow(1 - rt, 1.5);
          }
          var pr = Date.now(),
            An = (W(1) - It) / T,
            gr = i.duration ? 1e3 * i.duration : 1e3 * An * 0.8;
          function In() {
            var rt = (Date.now() - pr) / gr,
              Re = mr(rt) * An;
            rt <= 1
              ? ((this._flyToFrame = v(In, this)),
                this._move(
                  this.unproject(
                    n.add(o.subtract(n).multiplyBy(_r(Re) / g)),
                    s
                  ),
                  this.getScaleZoom(a / _i(Re), s),
                  { flyTo: !0 }
                ))
              : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, i.noMoveStart), In.call(this), this;
        },
        flyToBounds: function (t, e) {
          var i = this._getBoundsCenterZoom(t, e);
          return this.flyTo(i.center, i.zoom, e);
        },
        setMaxBounds: function (t) {
          return (
            (t = tt(t)),
            this.listens("moveend", this._panInsideMaxBounds) &&
              this.off("moveend", this._panInsideMaxBounds),
            t.isValid()
              ? ((this.options.maxBounds = t),
                this._loaded && this._panInsideMaxBounds(),
                this.on("moveend", this._panInsideMaxBounds))
              : ((this.options.maxBounds = null), this)
          );
        },
        setMinZoom: function (t) {
          var e = this.options.minZoom;
          return (
            (this.options.minZoom = t),
            this._loaded &&
            e !== t &&
            (this.fire("zoomlevelschange"),
            this.getZoom() < this.options.minZoom)
              ? this.setZoom(t)
              : this
          );
        },
        setMaxZoom: function (t) {
          var e = this.options.maxZoom;
          return (
            (this.options.maxZoom = t),
            this._loaded &&
            e !== t &&
            (this.fire("zoomlevelschange"),
            this.getZoom() > this.options.maxZoom)
              ? this.setZoom(t)
              : this
          );
        },
        panInsideBounds: function (t, e) {
          this._enforcingBounds = !0;
          var i = this.getCenter(),
            n = this._limitCenter(i, this._zoom, tt(t));
          return (
            i.equals(n) || this.panTo(n, e), (this._enforcingBounds = !1), this
          );
        },
        panInside: function (t, e) {
          e = e || {};
          var i = R(e.paddingTopLeft || e.padding || [0, 0]),
            n = R(e.paddingBottomRight || e.padding || [0, 0]),
            o = this.project(this.getCenter()),
            r = this.project(t),
            s = this.getPixelBounds(),
            a = j([s.min.add(i), s.max.subtract(n)]),
            u = a.getSize();
          if (!a.contains(r)) {
            this._enforcingBounds = !0;
            var g = r.subtract(a.getCenter()),
              T = a.extend(r).getSize().subtract(u);
            (o.x += g.x < 0 ? -T.x : T.x),
              (o.y += g.y < 0 ? -T.y : T.y),
              this.panTo(this.unproject(o), e),
              (this._enforcingBounds = !1);
          }
          return this;
        },
        invalidateSize: function (t) {
          if (!this._loaded) return this;
          t = d({ animate: !1, pan: !0 }, t === !0 ? { animate: !0 } : t);
          var e = this.getSize();
          (this._sizeChanged = !0), (this._lastCenter = null);
          var i = this.getSize(),
            n = e.divideBy(2).round(),
            o = i.divideBy(2).round(),
            r = n.subtract(o);
          return !r.x && !r.y
            ? this
            : (t.animate && t.pan
                ? this.panBy(r)
                : (t.pan && this._rawPanBy(r),
                  this.fire("move"),
                  t.debounceMoveend
                    ? (clearTimeout(this._sizeTimer),
                      (this._sizeTimer = setTimeout(
                        p(this.fire, this, "moveend"),
                        200
                      )))
                    : this.fire("moveend")),
              this.fire("resize", { oldSize: e, newSize: i }));
        },
        stop: function () {
          return (
            this.setZoom(this._limitZoom(this._zoom)),
            this.options.zoomSnap || this.fire("viewreset"),
            this._stop()
          );
        },
        locate: function (t) {
          if (
            ((t = this._locateOptions = d({ timeout: 1e4, watch: !1 }, t)),
            !("geolocation" in navigator))
          )
            return (
              this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported.",
              }),
              this
            );
          var e = p(this._handleGeolocationResponse, this),
            i = p(this._handleGeolocationError, this);
          return (
            t.watch
              ? (this._locationWatchId = navigator.geolocation.watchPosition(
                  e,
                  i,
                  t
                ))
              : navigator.geolocation.getCurrentPosition(e, i, t),
            this
          );
        },
        stopLocate: function () {
          return (
            navigator.geolocation &&
              navigator.geolocation.clearWatch &&
              navigator.geolocation.clearWatch(this._locationWatchId),
            this._locateOptions && (this._locateOptions.setView = !1),
            this
          );
        },
        _handleGeolocationError: function (t) {
          if (this._container._leaflet_id) {
            var e = t.code,
              i =
                t.message ||
                (e === 1
                  ? "permission denied"
                  : e === 2
                  ? "position unavailable"
                  : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(),
              this.fire("locationerror", {
                code: e,
                message: "Geolocation error: " + i + ".",
              });
          }
        },
        _handleGeolocationResponse: function (t) {
          if (this._container._leaflet_id) {
            var e = t.coords.latitude,
              i = t.coords.longitude,
              n = new K(e, i),
              o = n.toBounds(t.coords.accuracy * 2),
              r = this._locateOptions;
            if (r.setView) {
              var s = this.getBoundsZoom(o);
              this.setView(n, r.maxZoom ? Math.min(s, r.maxZoom) : s);
            }
            var a = { latlng: n, bounds: o, timestamp: t.timestamp };
            for (var u in t.coords)
              typeof t.coords[u] == "number" && (a[u] = t.coords[u]);
            this.fire("locationfound", a);
          }
        },
        addHandler: function (t, e) {
          if (!e) return this;
          var i = (this[t] = new e(this));
          return this._handlers.push(i), this.options[t] && i.enable(), this;
        },
        remove: function () {
          if (
            (this._initEvents(!0),
            this.options.maxBounds &&
              this.off("moveend", this._panInsideMaxBounds),
            this._containerId !== this._container._leaflet_id)
          )
            throw new Error(
              "Map container is being reused by another instance"
            );
          try {
            delete this._container._leaflet_id, delete this._containerId;
          } catch {
            (this._container._leaflet_id = void 0),
              (this._containerId = void 0);
          }
          this._locationWatchId !== void 0 && this.stopLocate(),
            this._stop(),
            Q(this._mapPane),
            this._clearControlPos && this._clearControlPos(),
            this._resizeRequest &&
              (y(this._resizeRequest), (this._resizeRequest = null)),
            this._clearHandlers(),
            this._loaded && this.fire("unload");
          var t;
          for (t in this._layers) this._layers[t].remove();
          for (t in this._panes) Q(this._panes[t]);
          return (
            (this._layers = []),
            (this._panes = []),
            delete this._mapPane,
            delete this._renderer,
            this
          );
        },
        createPane: function (t, e) {
          var i =
              "leaflet-pane" +
              (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""),
            n = G("div", i, e || this._mapPane);
          return t && (this._panes[t] = n), n;
        },
        getCenter: function () {
          return (
            this._checkIfLoaded(),
            this._lastCenter && !this._moved()
              ? this._lastCenter.clone()
              : this.layerPointToLatLng(this._getCenterLayerPoint())
          );
        },
        getZoom: function () {
          return this._zoom;
        },
        getBounds: function () {
          var t = this.getPixelBounds(),
            e = this.unproject(t.getBottomLeft()),
            i = this.unproject(t.getTopRight());
          return new it(e, i);
        },
        getMinZoom: function () {
          return this.options.minZoom === void 0
            ? this._layersMinZoom || 0
            : this.options.minZoom;
        },
        getMaxZoom: function () {
          return this.options.maxZoom === void 0
            ? this._layersMaxZoom === void 0
              ? 1 / 0
              : this._layersMaxZoom
            : this.options.maxZoom;
        },
        getBoundsZoom: function (t, e, i) {
          (t = tt(t)), (i = R(i || [0, 0]));
          var n = this.getZoom() || 0,
            o = this.getMinZoom(),
            r = this.getMaxZoom(),
            s = t.getNorthWest(),
            a = t.getSouthEast(),
            u = this.getSize().subtract(i),
            g = j(this.project(a, n), this.project(s, n)).getSize(),
            T = O.any3d ? this.options.zoomSnap : 1,
            B = u.x / g.x,
            W = u.y / g.y,
            _t = e ? Math.max(B, W) : Math.min(B, W);
          return (
            (n = this.getScaleZoom(_t, n)),
            T &&
              ((n = Math.round(n / (T / 100)) * (T / 100)),
              (n = e ? Math.ceil(n / T) * T : Math.floor(n / T) * T)),
            Math.max(o, Math.min(r, n))
          );
        },
        getSize: function () {
          return (
            (!this._size || this._sizeChanged) &&
              ((this._size = new I(
                this._container.clientWidth || 0,
                this._container.clientHeight || 0
              )),
              (this._sizeChanged = !1)),
            this._size.clone()
          );
        },
        getPixelBounds: function (t, e) {
          var i = this._getTopLeftPoint(t, e);
          return new V(i, i.add(this.getSize()));
        },
        getPixelOrigin: function () {
          return this._checkIfLoaded(), this._pixelOrigin;
        },
        getPixelWorldBounds: function (t) {
          return this.options.crs.getProjectedBounds(
            t === void 0 ? this.getZoom() : t
          );
        },
        getPane: function (t) {
          return typeof t == "string" ? this._panes[t] : t;
        },
        getPanes: function () {
          return this._panes;
        },
        getContainer: function () {
          return this._container;
        },
        getZoomScale: function (t, e) {
          var i = this.options.crs;
          return (e = e === void 0 ? this._zoom : e), i.scale(t) / i.scale(e);
        },
        getScaleZoom: function (t, e) {
          var i = this.options.crs;
          e = e === void 0 ? this._zoom : e;
          var n = i.zoom(t * i.scale(e));
          return isNaN(n) ? 1 / 0 : n;
        },
        project: function (t, e) {
          return (
            (e = e === void 0 ? this._zoom : e),
            this.options.crs.latLngToPoint(X(t), e)
          );
        },
        unproject: function (t, e) {
          return (
            (e = e === void 0 ? this._zoom : e),
            this.options.crs.pointToLatLng(R(t), e)
          );
        },
        layerPointToLatLng: function (t) {
          var e = R(t).add(this.getPixelOrigin());
          return this.unproject(e);
        },
        latLngToLayerPoint: function (t) {
          var e = this.project(X(t))._round();
          return e._subtract(this.getPixelOrigin());
        },
        wrapLatLng: function (t) {
          return this.options.crs.wrapLatLng(X(t));
        },
        wrapLatLngBounds: function (t) {
          return this.options.crs.wrapLatLngBounds(tt(t));
        },
        distance: function (t, e) {
          return this.options.crs.distance(X(t), X(e));
        },
        containerPointToLayerPoint: function (t) {
          return R(t).subtract(this._getMapPanePos());
        },
        layerPointToContainerPoint: function (t) {
          return R(t).add(this._getMapPanePos());
        },
        containerPointToLatLng: function (t) {
          var e = this.containerPointToLayerPoint(R(t));
          return this.layerPointToLatLng(e);
        },
        latLngToContainerPoint: function (t) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(X(t)));
        },
        mouseEventToContainerPoint: function (t) {
          return Xi(t, this._container);
        },
        mouseEventToLayerPoint: function (t) {
          return this.containerPointToLayerPoint(
            this.mouseEventToContainerPoint(t)
          );
        },
        mouseEventToLatLng: function (t) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
        },
        _initContainer: function (t) {
          var e = (this._container = Vi(t));
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          Z(e, "scroll", this._onScroll, this), (this._containerId = x(e));
        },
        _initLayout: function () {
          var t = this._container;
          (this._fadeAnimated = this.options.fadeAnimation && O.any3d),
            N(
              t,
              "leaflet-container" +
                (O.touch ? " leaflet-touch" : "") +
                (O.retina ? " leaflet-retina" : "") +
                (O.ielt9 ? " leaflet-oldie" : "") +
                (O.safari ? " leaflet-safari" : "") +
                (this._fadeAnimated ? " leaflet-fade-anim" : "")
            );
          var e = Jt(t, "position");
          e !== "absolute" &&
            e !== "relative" &&
            e !== "fixed" &&
            e !== "sticky" &&
            (t.style.position = "relative"),
            this._initPanes(),
            this._initControlPos && this._initControlPos();
        },
        _initPanes: function () {
          var t = (this._panes = {});
          (this._paneRenderers = {}),
            (this._mapPane = this.createPane("mapPane", this._container)),
            ot(this._mapPane, new I(0, 0)),
            this.createPane("tilePane"),
            this.createPane("overlayPane"),
            this.createPane("shadowPane"),
            this.createPane("markerPane"),
            this.createPane("tooltipPane"),
            this.createPane("popupPane"),
            this.options.markerZoomAnimation ||
              (N(t.markerPane, "leaflet-zoom-hide"),
              N(t.shadowPane, "leaflet-zoom-hide"));
        },
        _resetView: function (t, e, i) {
          ot(this._mapPane, new I(0, 0));
          var n = !this._loaded;
          (this._loaded = !0),
            (e = this._limitZoom(e)),
            this.fire("viewprereset");
          var o = this._zoom !== e;
          this._moveStart(o, i)._move(t, e)._moveEnd(o),
            this.fire("viewreset"),
            n && this.fire("load");
        },
        _moveStart: function (t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function (t, e, i, n) {
          e === void 0 && (e = this._zoom);
          var o = this._zoom !== e;
          return (
            (this._zoom = e),
            (this._lastCenter = t),
            (this._pixelOrigin = this._getNewPixelOrigin(t)),
            n
              ? i && i.pinch && this.fire("zoom", i)
              : ((o || (i && i.pinch)) && this.fire("zoom", i),
                this.fire("move", i)),
            this
          );
        },
        _moveEnd: function (t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function () {
          return (
            y(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
          );
        },
        _rawPanBy: function (t) {
          ot(this._mapPane, this._getMapPanePos().subtract(t));
        },
        _getZoomSpan: function () {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function () {
          this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
        },
        _checkIfLoaded: function () {
          if (!this._loaded) throw new Error("Set map center and zoom first.");
        },
        _initEvents: function (t) {
          (this._targets = {}), (this._targets[x(this._container)] = this);
          var e = t ? J : Z;
          e(
            this._container,
            "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",
            this._handleDOMEvent,
            this
          ),
            this.options.trackResize &&
              e(window, "resize", this._onResize, this),
            O.any3d &&
              this.options.transform3DLimit &&
              (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function () {
          y(this._resizeRequest),
            (this._resizeRequest = v(function () {
              this.invalidateSize({ debounceMoveend: !0 });
            }, this));
        },
        _onScroll: function () {
          (this._container.scrollTop = 0), (this._container.scrollLeft = 0);
        },
        _onMoveEnd: function () {
          var t = this._getMapPanePos();
          Math.max(Math.abs(t.x), Math.abs(t.y)) >=
            this.options.transform3DLimit &&
            this._resetView(this.getCenter(), this.getZoom());
        },
        _findEventTargets: function (t, e) {
          for (
            var i = [],
              n,
              o = e === "mouseout" || e === "mouseover",
              r = t.target || t.srcElement,
              s = !1;
            r;

          ) {
            if (
              ((n = this._targets[x(r)]),
              n &&
                (e === "click" || e === "preclick") &&
                this._draggableMoved(n))
            ) {
              s = !0;
              break;
            }
            if (
              (n && n.listens(e, !0) && ((o && !oi(r, t)) || (i.push(n), o))) ||
              r === this._container
            )
              break;
            r = r.parentNode;
          }
          return (
            !i.length && !s && !o && this.listens(e, !0) && (i = [this]), i
          );
        },
        _isClickDisabled: function (t) {
          for (; t && t !== this._container; ) {
            if (t._leaflet_disable_click) return !0;
            t = t.parentNode;
          }
        },
        _handleDOMEvent: function (t) {
          var e = t.target || t.srcElement;
          if (
            !(
              !this._loaded ||
              e._leaflet_disable_events ||
              (t.type === "click" && this._isClickDisabled(e))
            )
          ) {
            var i = t.type;
            i === "mousedown" && Je(e), this._fireDOMEvent(t, i);
          }
        },
        _mouseEvents: [
          "click",
          "dblclick",
          "mouseover",
          "mouseout",
          "contextmenu",
        ],
        _fireDOMEvent: function (t, e, i) {
          if (t.type === "click") {
            var n = d({}, t);
            (n.type = "preclick"), this._fireDOMEvent(n, n.type, i);
          }
          var o = this._findEventTargets(t, e);
          if (i) {
            for (var r = [], s = 0; s < i.length; s++)
              i[s].listens(e, !0) && r.push(i[s]);
            o = r.concat(o);
          }
          if (o.length) {
            e === "contextmenu" && at(t);
            var a = o[0],
              u = { originalEvent: t };
            if (
              t.type !== "keypress" &&
              t.type !== "keydown" &&
              t.type !== "keyup"
            ) {
              var g = a.getLatLng && (!a._radius || a._radius <= 10);
              (u.containerPoint = g
                ? this.latLngToContainerPoint(a.getLatLng())
                : this.mouseEventToContainerPoint(t)),
                (u.layerPoint = this.containerPointToLayerPoint(
                  u.containerPoint
                )),
                (u.latlng = g
                  ? a.getLatLng()
                  : this.layerPointToLatLng(u.layerPoint));
            }
            for (s = 0; s < o.length; s++)
              if (
                (o[s].fire(e, u, !0),
                u.originalEvent._stopped ||
                  (o[s].options.bubblingMouseEvents === !1 &&
                    ct(this._mouseEvents, e) !== -1))
              )
                return;
          }
        },
        _draggableMoved: function (t) {
          return (
            (t = t.dragging && t.dragging.enabled() ? t : this),
            (t.dragging && t.dragging.moved()) ||
              (this.boxZoom && this.boxZoom.moved())
          );
        },
        _clearHandlers: function () {
          for (var t = 0, e = this._handlers.length; t < e; t++)
            this._handlers[t].disable();
        },
        whenReady: function (t, e) {
          return (
            this._loaded
              ? t.call(e || this, { target: this })
              : this.on("load", t, e),
            this
          );
        },
        _getMapPanePos: function () {
          return zt(this._mapPane) || new I(0, 0);
        },
        _moved: function () {
          var t = this._getMapPanePos();
          return t && !t.equals([0, 0]);
        },
        _getTopLeftPoint: function (t, e) {
          var i =
            t && e !== void 0
              ? this._getNewPixelOrigin(t, e)
              : this.getPixelOrigin();
          return i.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function (t, e) {
          var i = this.getSize()._divideBy(2);
          return this.project(t, e)
            ._subtract(i)
            ._add(this._getMapPanePos())
            ._round();
        },
        _latLngToNewLayerPoint: function (t, e, i) {
          var n = this._getNewPixelOrigin(i, e);
          return this.project(t, e)._subtract(n);
        },
        _latLngBoundsToNewLayerBounds: function (t, e, i) {
          var n = this._getNewPixelOrigin(i, e);
          return j([
            this.project(t.getSouthWest(), e)._subtract(n),
            this.project(t.getNorthWest(), e)._subtract(n),
            this.project(t.getSouthEast(), e)._subtract(n),
            this.project(t.getNorthEast(), e)._subtract(n),
          ]);
        },
        _getCenterLayerPoint: function () {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        _getCenterOffset: function (t) {
          return this.latLngToLayerPoint(t).subtract(
            this._getCenterLayerPoint()
          );
        },
        _limitCenter: function (t, e, i) {
          if (!i) return t;
          var n = this.project(t, e),
            o = this.getSize().divideBy(2),
            r = new V(n.subtract(o), n.add(o)),
            s = this._getBoundsOffset(r, i, e);
          return Math.abs(s.x) <= 1 && Math.abs(s.y) <= 1
            ? t
            : this.unproject(n.add(s), e);
        },
        _limitOffset: function (t, e) {
          if (!e) return t;
          var i = this.getPixelBounds(),
            n = new V(i.min.add(t), i.max.add(t));
          return t.add(this._getBoundsOffset(n, e));
        },
        _getBoundsOffset: function (t, e, i) {
          var n = j(
              this.project(e.getNorthEast(), i),
              this.project(e.getSouthWest(), i)
            ),
            o = n.min.subtract(t.min),
            r = n.max.subtract(t.max),
            s = this._rebound(o.x, -r.x),
            a = this._rebound(o.y, -r.y);
          return new I(s, a);
        },
        _rebound: function (t, e) {
          return t + e > 0
            ? Math.round(t - e) / 2
            : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function (t) {
          var e = this.getMinZoom(),
            i = this.getMaxZoom(),
            n = O.any3d ? this.options.zoomSnap : 1;
          return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
        },
        _onPanTransitionStep: function () {
          this.fire("move");
        },
        _onPanTransitionEnd: function () {
          nt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function (t, e) {
          var i = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(i)
            ? !1
            : (this.panBy(i, e), !0);
        },
        _createAnimProxy: function () {
          var t = (this._proxy = G(
            "div",
            "leaflet-proxy leaflet-zoom-animated"
          ));
          this._panes.mapPane.appendChild(t),
            this.on(
              "zoomanim",
              function (e) {
                var i = qe,
                  n = this._proxy.style[i];
                kt(
                  this._proxy,
                  this.project(e.center, e.zoom),
                  this.getZoomScale(e.zoom, 1)
                ),
                  n === this._proxy.style[i] &&
                    this._animatingZoom &&
                    this._onZoomTransitionEnd();
              },
              this
            ),
            this.on("load moveend", this._animMoveEnd, this),
            this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function () {
          Q(this._proxy),
            this.off("load moveend", this._animMoveEnd, this),
            delete this._proxy;
        },
        _animMoveEnd: function () {
          var t = this.getCenter(),
            e = this.getZoom();
          kt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
        },
        _catchTransitionEnd: function (t) {
          this._animatingZoom &&
            t.propertyName.indexOf("transform") >= 0 &&
            this._onZoomTransitionEnd();
        },
        _nothingToAnimate: function () {
          return !this._container.getElementsByClassName(
            "leaflet-zoom-animated"
          ).length;
        },
        _tryAnimatedZoom: function (t, e, i) {
          if (this._animatingZoom) return !0;
          if (
            ((i = i || {}),
            !this._zoomAnimated ||
              i.animate === !1 ||
              this._nothingToAnimate() ||
              Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
          )
            return !1;
          var n = this.getZoomScale(e),
            o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
          return i.animate !== !0 && !this.getSize().contains(o)
            ? !1
            : (v(function () {
                this._moveStart(!0, !1)._animateZoom(t, e, !0);
              }, this),
              !0);
        },
        _animateZoom: function (t, e, i, n) {
          this._mapPane &&
            (i &&
              ((this._animatingZoom = !0),
              (this._animateToCenter = t),
              (this._animateToZoom = e),
              N(this._mapPane, "leaflet-zoom-anim")),
            this.fire("zoomanim", { center: t, zoom: e, noUpdate: n }),
            this._tempFireZoomEvent ||
              (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
            this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
            setTimeout(p(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function () {
          this._animatingZoom &&
            (this._mapPane && nt(this._mapPane, "leaflet-zoom-anim"),
            (this._animatingZoom = !1),
            this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
            this._tempFireZoomEvent && this.fire("zoom"),
            delete this._tempFireZoomEvent,
            this.fire("move"),
            this._moveEnd(!0));
        },
      });
    function Oo(t, e) {
      return new U(t, e);
    }
    var pt = M.extend({
        options: { position: "topright" },
        initialize: function (t) {
          D(this, t);
        },
        getPosition: function () {
          return this.options.position;
        },
        setPosition: function (t) {
          var e = this._map;
          return (
            e && e.removeControl(this),
            (this.options.position = t),
            e && e.addControl(this),
            this
          );
        },
        getContainer: function () {
          return this._container;
        },
        addTo: function (t) {
          this.remove(), (this._map = t);
          var e = (this._container = this.onAdd(t)),
            i = this.getPosition(),
            n = t._controlCorners[i];
          return (
            N(e, "leaflet-control"),
            i.indexOf("bottom") !== -1
              ? n.insertBefore(e, n.firstChild)
              : n.appendChild(e),
            this._map.on("unload", this.remove, this),
            this
          );
        },
        remove: function () {
          return this._map
            ? (Q(this._container),
              this.onRemove && this.onRemove(this._map),
              this._map.off("unload", this.remove, this),
              (this._map = null),
              this)
            : this;
        },
        _refocusOnMap: function (t) {
          this._map &&
            t &&
            t.screenX > 0 &&
            t.screenY > 0 &&
            this._map.getContainer().focus();
        },
      }),
      ne = function (t) {
        return new pt(t);
      };
    U.include({
      addControl: function (t) {
        return t.addTo(this), this;
      },
      removeControl: function (t) {
        return t.remove(), this;
      },
      _initControlPos: function () {
        var t = (this._controlCorners = {}),
          e = "leaflet-",
          i = (this._controlContainer = G(
            "div",
            e + "control-container",
            this._container
          ));
        function n(o, r) {
          var s = e + o + " " + e + r;
          t[o + r] = G("div", s, i);
        }
        n("top", "left"),
          n("top", "right"),
          n("bottom", "left"),
          n("bottom", "right");
      },
      _clearControlPos: function () {
        for (var t in this._controlCorners) Q(this._controlCorners[t]);
        Q(this._controlContainer),
          delete this._controlCorners,
          delete this._controlContainer;
      },
    });
    var tn = pt.extend({
        options: {
          collapsed: !0,
          position: "topright",
          autoZIndex: !0,
          hideSingleBase: !1,
          sortLayers: !1,
          sortFunction: function (t, e, i, n) {
            return i < n ? -1 : n < i ? 1 : 0;
          },
        },
        initialize: function (t, e, i) {
          D(this, i),
            (this._layerControlInputs = []),
            (this._layers = []),
            (this._lastZIndex = 0),
            (this._handlingClick = !1);
          for (var n in t) this._addLayer(t[n], n);
          for (n in e) this._addLayer(e[n], n, !0);
        },
        onAdd: function (t) {
          this._initLayout(),
            this._update(),
            (this._map = t),
            t.on("zoomend", this._checkDisabledLayers, this);
          for (var e = 0; e < this._layers.length; e++)
            this._layers[e].layer.on("add remove", this._onLayerChange, this);
          return this._container;
        },
        addTo: function (t) {
          return pt.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
        },
        onRemove: function () {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var t = 0; t < this._layers.length; t++)
            this._layers[t].layer.off("add remove", this._onLayerChange, this);
        },
        addBaseLayer: function (t, e) {
          return this._addLayer(t, e), this._map ? this._update() : this;
        },
        addOverlay: function (t, e) {
          return this._addLayer(t, e, !0), this._map ? this._update() : this;
        },
        removeLayer: function (t) {
          t.off("add remove", this._onLayerChange, this);
          var e = this._getLayer(x(t));
          return (
            e && this._layers.splice(this._layers.indexOf(e), 1),
            this._map ? this._update() : this
          );
        },
        expand: function () {
          N(this._container, "leaflet-control-layers-expanded"),
            (this._section.style.height = null);
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return (
            t < this._section.clientHeight
              ? (N(this._section, "leaflet-control-layers-scrollbar"),
                (this._section.style.height = t + "px"))
              : nt(this._section, "leaflet-control-layers-scrollbar"),
            this._checkDisabledLayers(),
            this
          );
        },
        collapse: function () {
          return nt(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function () {
          var t = "leaflet-control-layers",
            e = (this._container = G("div", t)),
            i = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), ie(e), ni(e);
          var n = (this._section = G("section", t + "-list"));
          i &&
            (this._map.on("click", this.collapse, this),
            Z(
              e,
              { mouseenter: this._expandSafely, mouseleave: this.collapse },
              this
            ));
          var o = (this._layersLink = G("a", t + "-toggle", e));
          (o.href = "#"),
            (o.title = "Layers"),
            o.setAttribute("role", "button"),
            Z(
              o,
              {
                keydown: function (r) {
                  r.keyCode === 13 && this._expandSafely();
                },
                click: function (r) {
                  at(r), this._expandSafely();
                },
              },
              this
            ),
            i || this.expand(),
            (this._baseLayersList = G("div", t + "-base", n)),
            (this._separator = G("div", t + "-separator", n)),
            (this._overlaysList = G("div", t + "-overlays", n)),
            e.appendChild(n);
        },
        _getLayer: function (t) {
          for (var e = 0; e < this._layers.length; e++)
            if (this._layers[e] && x(this._layers[e].layer) === t)
              return this._layers[e];
        },
        _addLayer: function (t, e, i) {
          this._map && t.on("add remove", this._onLayerChange, this),
            this._layers.push({ layer: t, name: e, overlay: i }),
            this.options.sortLayers &&
              this._layers.sort(
                p(function (n, o) {
                  return this.options.sortFunction(
                    n.layer,
                    o.layer,
                    n.name,
                    o.name
                  );
                }, this)
              ),
            this.options.autoZIndex &&
              t.setZIndex &&
              (this._lastZIndex++, t.setZIndex(this._lastZIndex)),
            this._expandIfNotCollapsed();
        },
        _update: function () {
          if (!this._container) return this;
          de(this._baseLayersList),
            de(this._overlaysList),
            (this._layerControlInputs = []);
          var t,
            e,
            i,
            n,
            o = 0;
          for (i = 0; i < this._layers.length; i++)
            (n = this._layers[i]),
              this._addItem(n),
              (e = e || n.overlay),
              (t = t || !n.overlay),
              (o += n.overlay ? 0 : 1);
          return (
            this.options.hideSingleBase &&
              ((t = t && o > 1),
              (this._baseLayersList.style.display = t ? "" : "none")),
            (this._separator.style.display = e && t ? "" : "none"),
            this
          );
        },
        _onLayerChange: function (t) {
          this._handlingClick || this._update();
          var e = this._getLayer(x(t.target)),
            i = e.overlay
              ? t.type === "add"
                ? "overlayadd"
                : "overlayremove"
              : t.type === "add"
              ? "baselayerchange"
              : null;
          i && this._map.fire(i, e);
        },
        _createRadioElement: function (t, e) {
          var i =
              '<input type="radio" class="leaflet-control-layers-selector" name="' +
              t +
              '"' +
              (e ? ' checked="checked"' : "") +
              "/>",
            n = document.createElement("div");
          return (n.innerHTML = i), n.firstChild;
        },
        _addItem: function (t) {
          var e = document.createElement("label"),
            i = this._map.hasLayer(t.layer),
            n;
          t.overlay
            ? ((n = document.createElement("input")),
              (n.type = "checkbox"),
              (n.className = "leaflet-control-layers-selector"),
              (n.defaultChecked = i))
            : (n = this._createRadioElement(
                "leaflet-base-layers_" + x(this),
                i
              )),
            this._layerControlInputs.push(n),
            (n.layerId = x(t.layer)),
            Z(n, "click", this._onInputClick, this);
          var o = document.createElement("span");
          o.innerHTML = " " + t.name;
          var r = document.createElement("span");
          e.appendChild(r), r.appendChild(n), r.appendChild(o);
          var s = t.overlay ? this._overlaysList : this._baseLayersList;
          return s.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function () {
          var t = this._layerControlInputs,
            e,
            i,
            n = [],
            o = [];
          this._handlingClick = !0;
          for (var r = t.length - 1; r >= 0; r--)
            (e = t[r]),
              (i = this._getLayer(e.layerId).layer),
              e.checked ? n.push(i) : e.checked || o.push(i);
          for (r = 0; r < o.length; r++)
            this._map.hasLayer(o[r]) && this._map.removeLayer(o[r]);
          for (r = 0; r < n.length; r++)
            this._map.hasLayer(n[r]) || this._map.addLayer(n[r]);
          (this._handlingClick = !1), this._refocusOnMap();
        },
        _checkDisabledLayers: function () {
          for (
            var t = this._layerControlInputs,
              e,
              i,
              n = this._map.getZoom(),
              o = t.length - 1;
            o >= 0;
            o--
          )
            (e = t[o]),
              (i = this._getLayer(e.layerId).layer),
              (e.disabled =
                (i.options.minZoom !== void 0 && n < i.options.minZoom) ||
                (i.options.maxZoom !== void 0 && n > i.options.maxZoom));
        },
        _expandIfNotCollapsed: function () {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function () {
          var t = this._section;
          Z(t, "click", at),
            this.expand(),
            setTimeout(function () {
              J(t, "click", at);
            });
        },
      }),
      Ao = function (t, e, i) {
        return new tn(t, e, i);
      },
      ri = pt.extend({
        options: {
          position: "topleft",
          zoomInText: '<span aria-hidden="true">+</span>',
          zoomInTitle: "Zoom in",
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          zoomOutTitle: "Zoom out",
        },
        onAdd: function (t) {
          var e = "leaflet-control-zoom",
            i = G("div", e + " leaflet-bar"),
            n = this.options;
          return (
            (this._zoomInButton = this._createButton(
              n.zoomInText,
              n.zoomInTitle,
              e + "-in",
              i,
              this._zoomIn
            )),
            (this._zoomOutButton = this._createButton(
              n.zoomOutText,
              n.zoomOutTitle,
              e + "-out",
              i,
              this._zoomOut
            )),
            this._updateDisabled(),
            t.on("zoomend zoomlevelschange", this._updateDisabled, this),
            i
          );
        },
        onRemove: function (t) {
          t.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function () {
          return (this._disabled = !0), this._updateDisabled(), this;
        },
        enable: function () {
          return (this._disabled = !1), this._updateDisabled(), this;
        },
        _zoomIn: function (t) {
          !this._disabled &&
            this._map._zoom < this._map.getMaxZoom() &&
            this._map.zoomIn(
              this._map.options.zoomDelta * (t.shiftKey ? 3 : 1)
            );
        },
        _zoomOut: function (t) {
          !this._disabled &&
            this._map._zoom > this._map.getMinZoom() &&
            this._map.zoomOut(
              this._map.options.zoomDelta * (t.shiftKey ? 3 : 1)
            );
        },
        _createButton: function (t, e, i, n, o) {
          var r = G("a", i, n);
          return (
            (r.innerHTML = t),
            (r.href = "#"),
            (r.title = e),
            r.setAttribute("role", "button"),
            r.setAttribute("aria-label", e),
            ie(r),
            Z(r, "click", Zt),
            Z(r, "click", o, this),
            Z(r, "click", this._refocusOnMap, this),
            r
          );
        },
        _updateDisabled: function () {
          var t = this._map,
            e = "leaflet-disabled";
          nt(this._zoomInButton, e),
            nt(this._zoomOutButton, e),
            this._zoomInButton.setAttribute("aria-disabled", "false"),
            this._zoomOutButton.setAttribute("aria-disabled", "false"),
            (this._disabled || t._zoom === t.getMinZoom()) &&
              (N(this._zoomOutButton, e),
              this._zoomOutButton.setAttribute("aria-disabled", "true")),
            (this._disabled || t._zoom === t.getMaxZoom()) &&
              (N(this._zoomInButton, e),
              this._zoomInButton.setAttribute("aria-disabled", "true"));
        },
      });
    U.mergeOptions({ zoomControl: !0 }),
      U.addInitHook(function () {
        this.options.zoomControl &&
          ((this.zoomControl = new ri()), this.addControl(this.zoomControl));
      });
    var Io = function (t) {
        return new ri(t);
      },
      en = pt.extend({
        options: {
          position: "bottomleft",
          maxWidth: 100,
          metric: !0,
          imperial: !0,
        },
        onAdd: function (t) {
          var e = "leaflet-control-scale",
            i = G("div", e),
            n = this.options;
          return (
            this._addScales(n, e + "-line", i),
            t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this),
            t.whenReady(this._update, this),
            i
          );
        },
        onRemove: function (t) {
          t.off(
            this.options.updateWhenIdle ? "moveend" : "move",
            this._update,
            this
          );
        },
        _addScales: function (t, e, i) {
          t.metric && (this._mScale = G("div", e, i)),
            t.imperial && (this._iScale = G("div", e, i));
        },
        _update: function () {
          var t = this._map,
            e = t.getSize().y / 2,
            i = t.distance(
              t.containerPointToLatLng([0, e]),
              t.containerPointToLatLng([this.options.maxWidth, e])
            );
          this._updateScales(i);
        },
        _updateScales: function (t) {
          this.options.metric && t && this._updateMetric(t),
            this.options.imperial && t && this._updateImperial(t);
        },
        _updateMetric: function (t) {
          var e = this._getRoundNum(t),
            i = e < 1e3 ? e + " m" : e / 1e3 + " km";
          this._updateScale(this._mScale, i, e / t);
        },
        _updateImperial: function (t) {
          var e = t * 3.2808399,
            i,
            n,
            o;
          e > 5280
            ? ((i = e / 5280),
              (n = this._getRoundNum(i)),
              this._updateScale(this._iScale, n + " mi", n / i))
            : ((o = this._getRoundNum(e)),
              this._updateScale(this._iScale, o + " ft", o / e));
        },
        _updateScale: function (t, e, i) {
          (t.style.width = Math.round(this.options.maxWidth * i) + "px"),
            (t.innerHTML = e);
        },
        _getRoundNum: function (t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1),
            i = t / e;
          return (
            (i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1), e * i
          );
        },
      }),
      ko = function (t) {
        return new en(t);
      },
      zo =
        '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',
      si = pt.extend({
        options: {
          position: "bottomright",
          prefix:
            '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' +
            (O.inlineSvg ? zo + " " : "") +
            "Leaflet</a>",
        },
        initialize: function (t) {
          D(this, t), (this._attributions = {});
        },
        onAdd: function (t) {
          (t.attributionControl = this),
            (this._container = G("div", "leaflet-control-attribution")),
            ie(this._container);
          for (var e in t._layers)
            t._layers[e].getAttribution &&
              this.addAttribution(t._layers[e].getAttribution());
          return (
            this._update(),
            t.on("layeradd", this._addAttribution, this),
            this._container
          );
        },
        onRemove: function (t) {
          t.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function (t) {
          t.layer.getAttribution &&
            (this.addAttribution(t.layer.getAttribution()),
            t.layer.once(
              "remove",
              function () {
                this.removeAttribution(t.layer.getAttribution());
              },
              this
            ));
        },
        setPrefix: function (t) {
          return (this.options.prefix = t), this._update(), this;
        },
        addAttribution: function (t) {
          return t
            ? (this._attributions[t] || (this._attributions[t] = 0),
              this._attributions[t]++,
              this._update(),
              this)
            : this;
        },
        removeAttribution: function (t) {
          return t
            ? (this._attributions[t] &&
                (this._attributions[t]--, this._update()),
              this)
            : this;
        },
        _update: function () {
          if (this._map) {
            var t = [];
            for (var e in this._attributions)
              this._attributions[e] && t.push(e);
            var i = [];
            this.options.prefix && i.push(this.options.prefix),
              t.length && i.push(t.join(", ")),
              (this._container.innerHTML = i.join(
                ' <span aria-hidden="true">|</span> '
              ));
          }
        },
      });
    U.mergeOptions({ attributionControl: !0 }),
      U.addInitHook(function () {
        this.options.attributionControl && new si().addTo(this);
      });
    var Bo = function (t) {
      return new si(t);
    };
    (pt.Layers = tn),
      (pt.Zoom = ri),
      (pt.Scale = en),
      (pt.Attribution = si),
      (ne.layers = Ao),
      (ne.zoom = Io),
      (ne.scale = ko),
      (ne.attribution = Bo);
    var bt = M.extend({
      initialize: function (t) {
        this._map = t;
      },
      enable: function () {
        return this._enabled
          ? this
          : ((this._enabled = !0), this.addHooks(), this);
      },
      disable: function () {
        return this._enabled
          ? ((this._enabled = !1), this.removeHooks(), this)
          : this;
      },
      enabled: function () {
        return !!this._enabled;
      },
    });
    bt.addTo = function (t, e) {
      return t.addHandler(e, this), this;
    };
    var Zo = { Events: z },
      nn = O.touch ? "touchstart mousedown" : "mousedown",
      Ot = $.extend({
        options: { clickTolerance: 3 },
        initialize: function (t, e, i, n) {
          D(this, n),
            (this._element = t),
            (this._dragStartTarget = e || t),
            (this._preventOutline = i);
        },
        enable: function () {
          this._enabled ||
            (Z(this._dragStartTarget, nn, this._onDown, this),
            (this._enabled = !0));
        },
        disable: function () {
          this._enabled &&
            (Ot._dragging === this && this.finishDrag(!0),
            J(this._dragStartTarget, nn, this._onDown, this),
            (this._enabled = !1),
            (this._moved = !1));
        },
        _onDown: function (t) {
          if (
            this._enabled &&
            ((this._moved = !1), !je(this._element, "leaflet-zoom-anim"))
          ) {
            if (t.touches && t.touches.length !== 1) {
              Ot._dragging === this && this.finishDrag();
              return;
            }
            if (
              !(
                Ot._dragging ||
                t.shiftKey ||
                (t.which !== 1 && t.button !== 1 && !t.touches)
              ) &&
              ((Ot._dragging = this),
              this._preventOutline && Je(this._element),
              Ye(),
              Qt(),
              !this._moving)
            ) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t,
                i = Ki(this._element);
              (this._startPoint = new I(e.clientX, e.clientY)),
                (this._startPos = zt(this._element)),
                (this._parentScale = Qe(i));
              var n = t.type === "mousedown";
              Z(document, n ? "mousemove" : "touchmove", this._onMove, this),
                Z(
                  document,
                  n ? "mouseup" : "touchend touchcancel",
                  this._onUp,
                  this
                );
            }
          }
        },
        _onMove: function (t) {
          if (this._enabled) {
            if (t.touches && t.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var e = t.touches && t.touches.length === 1 ? t.touches[0] : t,
              i = new I(e.clientX, e.clientY)._subtract(this._startPoint);
            (!i.x && !i.y) ||
              Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance ||
              ((i.x /= this._parentScale.x),
              (i.y /= this._parentScale.y),
              at(t),
              this._moved ||
                (this.fire("dragstart"),
                (this._moved = !0),
                N(document.body, "leaflet-dragging"),
                (this._lastTarget = t.target || t.srcElement),
                window.SVGElementInstance &&
                  this._lastTarget instanceof window.SVGElementInstance &&
                  (this._lastTarget = this._lastTarget.correspondingUseElement),
                N(this._lastTarget, "leaflet-drag-target")),
              (this._newPos = this._startPos.add(i)),
              (this._moving = !0),
              (this._lastEvent = t),
              this._updatePosition());
          }
        },
        _updatePosition: function () {
          var t = { originalEvent: this._lastEvent };
          this.fire("predrag", t),
            ot(this._element, this._newPos),
            this.fire("drag", t);
        },
        _onUp: function () {
          this._enabled && this.finishDrag();
        },
        finishDrag: function (t) {
          nt(document.body, "leaflet-dragging"),
            this._lastTarget &&
              (nt(this._lastTarget, "leaflet-drag-target"),
              (this._lastTarget = null)),
            J(document, "mousemove touchmove", this._onMove, this),
            J(document, "mouseup touchend touchcancel", this._onUp, this),
            $e(),
            te(),
            this._moved &&
              this._moving &&
              this.fire("dragend", {
                noInertia: t,
                distance: this._newPos.distanceTo(this._startPos),
              }),
            (this._moving = !1),
            (Ot._dragging = !1);
        },
      });
    function on(t, e) {
      if (!e || !t.length) return t.slice();
      var i = e * e;
      return (t = Fo(t, i)), (t = No(t, i)), t;
    }
    function rn(t, e, i) {
      return Math.sqrt(oe(t, e, i, !0));
    }
    function Do(t, e, i) {
      return oe(t, e, i);
    }
    function No(t, e) {
      var i = t.length,
        n = typeof Uint8Array != void 0 + "" ? Uint8Array : Array,
        o = new n(i);
      (o[0] = o[i - 1] = 1), ai(t, o, e, 0, i - 1);
      var r,
        s = [];
      for (r = 0; r < i; r++) o[r] && s.push(t[r]);
      return s;
    }
    function ai(t, e, i, n, o) {
      var r = 0,
        s,
        a,
        u;
      for (a = n + 1; a <= o - 1; a++)
        (u = oe(t[a], t[n], t[o], !0)), u > r && ((s = a), (r = u));
      r > i && ((e[s] = 1), ai(t, e, i, n, s), ai(t, e, i, s, o));
    }
    function Fo(t, e) {
      for (var i = [t[0]], n = 1, o = 0, r = t.length; n < r; n++)
        Ho(t[n], t[o]) > e && (i.push(t[n]), (o = n));
      return o < r - 1 && i.push(t[r - 1]), i;
    }
    var sn;
    function an(t, e, i, n, o) {
      var r = n ? sn : Dt(t, i),
        s = Dt(e, i),
        a,
        u,
        g;
      for (sn = s; ; ) {
        if (!(r | s)) return [t, e];
        if (r & s) return !1;
        (a = r || s),
          (u = ve(t, e, a, i, o)),
          (g = Dt(u, i)),
          a === r ? ((t = u), (r = g)) : ((e = u), (s = g));
      }
    }
    function ve(t, e, i, n, o) {
      var r = e.x - t.x,
        s = e.y - t.y,
        a = n.min,
        u = n.max,
        g,
        T;
      return (
        i & 8
          ? ((g = t.x + (r * (u.y - t.y)) / s), (T = u.y))
          : i & 4
          ? ((g = t.x + (r * (a.y - t.y)) / s), (T = a.y))
          : i & 2
          ? ((g = u.x), (T = t.y + (s * (u.x - t.x)) / r))
          : i & 1 && ((g = a.x), (T = t.y + (s * (a.x - t.x)) / r)),
        new I(g, T, o)
      );
    }
    function Dt(t, e) {
      var i = 0;
      return (
        t.x < e.min.x ? (i |= 1) : t.x > e.max.x && (i |= 2),
        t.y < e.min.y ? (i |= 4) : t.y > e.max.y && (i |= 8),
        i
      );
    }
    function Ho(t, e) {
      var i = e.x - t.x,
        n = e.y - t.y;
      return i * i + n * n;
    }
    function oe(t, e, i, n) {
      var o = e.x,
        r = e.y,
        s = i.x - o,
        a = i.y - r,
        u = s * s + a * a,
        g;
      return (
        u > 0 &&
          ((g = ((t.x - o) * s + (t.y - r) * a) / u),
          g > 1
            ? ((o = i.x), (r = i.y))
            : g > 0 && ((o += s * g), (r += a * g))),
        (s = t.x - o),
        (a = t.y - r),
        n ? s * s + a * a : new I(o, r)
      );
    }
    function dt(t) {
      return !et(t[0]) || (typeof t[0][0] != "object" && typeof t[0][0] < "u");
    }
    function hn(t) {
      return (
        console.warn(
          "Deprecated use of _flat, please use L.LineUtil.isFlat instead."
        ),
        dt(t)
      );
    }
    function un(t, e) {
      var i, n, o, r, s, a, u, g;
      if (!t || t.length === 0) throw new Error("latlngs not passed");
      dt(t) ||
        (console.warn("latlngs are not flat! Only the first ring will be used"),
        (t = t[0]));
      var T = [];
      for (var B in t) T.push(e.project(X(t[B])));
      var W = T.length;
      for (i = 0, n = 0; i < W - 1; i++) n += T[i].distanceTo(T[i + 1]) / 2;
      if (n === 0) g = T[0];
      else
        for (i = 0, r = 0; i < W - 1; i++)
          if (
            ((s = T[i]), (a = T[i + 1]), (o = s.distanceTo(a)), (r += o), r > n)
          ) {
            (u = (r - n) / o),
              (g = [a.x - u * (a.x - s.x), a.y - u * (a.y - s.y)]);
            break;
          }
      return e.unproject(R(g));
    }
    var Wo = {
      __proto__: null,
      simplify: on,
      pointToSegmentDistance: rn,
      closestPointOnSegment: Do,
      clipSegment: an,
      _getEdgeIntersection: ve,
      _getBitCode: Dt,
      _sqClosestPointOnSegment: oe,
      isFlat: dt,
      _flat: hn,
      polylineCenter: un,
    };
    function ln(t, e, i) {
      var n,
        o = [1, 4, 2, 8],
        r,
        s,
        a,
        u,
        g,
        T,
        B,
        W;
      for (r = 0, T = t.length; r < T; r++) t[r]._code = Dt(t[r], e);
      for (a = 0; a < 4; a++) {
        for (B = o[a], n = [], r = 0, T = t.length, s = T - 1; r < T; s = r++)
          (u = t[r]),
            (g = t[s]),
            u._code & B
              ? g._code & B ||
                ((W = ve(g, u, B, e, i)), (W._code = Dt(W, e)), n.push(W))
              : (g._code & B &&
                  ((W = ve(g, u, B, e, i)), (W._code = Dt(W, e)), n.push(W)),
                n.push(u));
        t = n;
      }
      return t;
    }
    function cn(t, e) {
      var i, n, o, r, s, a, u, g, T;
      if (!t || t.length === 0) throw new Error("latlngs not passed");
      dt(t) ||
        (console.warn("latlngs are not flat! Only the first ring will be used"),
        (t = t[0]));
      var B = [];
      for (var W in t) B.push(e.project(X(t[W])));
      var _t = B.length;
      for (a = u = g = 0, i = 0, n = _t - 1; i < _t; n = i++)
        (o = B[i]),
          (r = B[n]),
          (s = o.y * r.x - r.y * o.x),
          (u += (o.x + r.x) * s),
          (g += (o.y + r.y) * s),
          (a += s * 3);
      return a === 0 ? (T = B[0]) : (T = [u / a, g / a]), e.unproject(R(T));
    }
    var Uo = { __proto__: null, clipPolygon: ln, polygonCenter: cn },
      hi = {
        project: function (t) {
          return new I(t.lng, t.lat);
        },
        unproject: function (t) {
          return new K(t.y, t.x);
        },
        bounds: new V([-180, -90], [180, 90]),
      },
      ui = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new V(
          [-2003750834279e-5, -1549657073972e-5],
          [2003750834279e-5, 1876465623138e-5]
        ),
        project: function (t) {
          var e = Math.PI / 180,
            i = this.R,
            n = t.lat * e,
            o = this.R_MINOR / i,
            r = Math.sqrt(1 - o * o),
            s = r * Math.sin(n),
            a =
              Math.tan(Math.PI / 4 - n / 2) /
              Math.pow((1 - s) / (1 + s), r / 2);
          return (
            (n = -i * Math.log(Math.max(a, 1e-10))), new I(t.lng * e * i, n)
          );
        },
        unproject: function (t) {
          for (
            var e = 180 / Math.PI,
              i = this.R,
              n = this.R_MINOR / i,
              o = Math.sqrt(1 - n * n),
              r = Math.exp(-t.y / i),
              s = Math.PI / 2 - 2 * Math.atan(r),
              a = 0,
              u = 0.1,
              g;
            a < 15 && Math.abs(u) > 1e-7;
            a++
          )
            (g = o * Math.sin(s)),
              (g = Math.pow((1 - g) / (1 + g), o / 2)),
              (u = Math.PI / 2 - 2 * Math.atan(r * g) - s),
              (s += u);
          return new K(s * e, (t.x * e) / i);
        },
      },
      Go = { __proto__: null, LonLat: hi, Mercator: ui, SphericalMercator: Be },
      qo = d({}, Rt, {
        code: "EPSG:3395",
        projection: ui,
        transformation: (function () {
          var t = 0.5 / (Math.PI * ui.R);
          return Yt(t, 0.5, -t, 0.5);
        })(),
      }),
      fn = d({}, Rt, {
        code: "EPSG:4326",
        projection: hi,
        transformation: Yt(1 / 180, 1, -1 / 180, 0.5),
      }),
      jo = d({}, Tt, {
        projection: hi,
        transformation: Yt(1, 0, -1, 0),
        scale: function (t) {
          return Math.pow(2, t);
        },
        zoom: function (t) {
          return Math.log(t) / Math.LN2;
        },
        distance: function (t, e) {
          var i = e.lng - t.lng,
            n = e.lat - t.lat;
          return Math.sqrt(i * i + n * n);
        },
        infinite: !0,
      });
    (Tt.Earth = Rt),
      (Tt.EPSG3395 = qo),
      (Tt.EPSG3857 = De),
      (Tt.EPSG900913 = Xn),
      (Tt.EPSG4326 = fn),
      (Tt.Simple = jo);
    var gt = $.extend({
      options: {
        pane: "overlayPane",
        attribution: null,
        bubblingMouseEvents: !0,
      },
      addTo: function (t) {
        return t.addLayer(this), this;
      },
      remove: function () {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      removeFrom: function (t) {
        return t && t.removeLayer(this), this;
      },
      getPane: function (t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane);
      },
      addInteractiveTarget: function (t) {
        return (this._map._targets[x(t)] = this), this;
      },
      removeInteractiveTarget: function (t) {
        return delete this._map._targets[x(t)], this;
      },
      getAttribution: function () {
        return this.options.attribution;
      },
      _layerAdd: function (t) {
        var e = t.target;
        if (e.hasLayer(this)) {
          if (
            ((this._map = e),
            (this._zoomAnimated = e._zoomAnimated),
            this.getEvents)
          ) {
            var i = this.getEvents();
            e.on(i, this),
              this.once(
                "remove",
                function () {
                  e.off(i, this);
                },
                this
              );
          }
          this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
        }
      },
    });
    U.include({
      addLayer: function (t) {
        if (!t._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var e = x(t);
        return this._layers[e]
          ? this
          : ((this._layers[e] = t),
            (t._mapToAdd = this),
            t.beforeAdd && t.beforeAdd(this),
            this.whenReady(t._layerAdd, t),
            this);
      },
      removeLayer: function (t) {
        var e = x(t);
        return this._layers[e]
          ? (this._loaded && t.onRemove(this),
            delete this._layers[e],
            this._loaded &&
              (this.fire("layerremove", { layer: t }), t.fire("remove")),
            (t._map = t._mapToAdd = null),
            this)
          : this;
      },
      hasLayer: function (t) {
        return x(t) in this._layers;
      },
      eachLayer: function (t, e) {
        for (var i in this._layers) t.call(e, this._layers[i]);
        return this;
      },
      _addLayers: function (t) {
        t = t ? (et(t) ? t : [t]) : [];
        for (var e = 0, i = t.length; e < i; e++) this.addLayer(t[e]);
      },
      _addZoomLimit: function (t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) &&
          ((this._zoomBoundLayers[x(t)] = t), this._updateZoomLevels());
      },
      _removeZoomLimit: function (t) {
        var e = x(t);
        this._zoomBoundLayers[e] &&
          (delete this._zoomBoundLayers[e], this._updateZoomLevels());
      },
      _updateZoomLevels: function () {
        var t = 1 / 0,
          e = -1 / 0,
          i = this._getZoomSpan();
        for (var n in this._zoomBoundLayers) {
          var o = this._zoomBoundLayers[n].options;
          (t = o.minZoom === void 0 ? t : Math.min(t, o.minZoom)),
            (e = o.maxZoom === void 0 ? e : Math.max(e, o.maxZoom));
        }
        (this._layersMaxZoom = e === -1 / 0 ? void 0 : e),
          (this._layersMinZoom = t === 1 / 0 ? void 0 : t),
          i !== this._getZoomSpan() && this.fire("zoomlevelschange"),
          this.options.maxZoom === void 0 &&
            this._layersMaxZoom &&
            this.getZoom() > this._layersMaxZoom &&
            this.setZoom(this._layersMaxZoom),
          this.options.minZoom === void 0 &&
            this._layersMinZoom &&
            this.getZoom() < this._layersMinZoom &&
            this.setZoom(this._layersMinZoom);
      },
    });
    var Ut = gt.extend({
        initialize: function (t, e) {
          D(this, e), (this._layers = {});
          var i, n;
          if (t) for (i = 0, n = t.length; i < n; i++) this.addLayer(t[i]);
        },
        addLayer: function (t) {
          var e = this.getLayerId(t);
          return (
            (this._layers[e] = t), this._map && this._map.addLayer(t), this
          );
        },
        removeLayer: function (t) {
          var e = t in this._layers ? t : this.getLayerId(t);
          return (
            this._map &&
              this._layers[e] &&
              this._map.removeLayer(this._layers[e]),
            delete this._layers[e],
            this
          );
        },
        hasLayer: function (t) {
          var e = typeof t == "number" ? t : this.getLayerId(t);
          return e in this._layers;
        },
        clearLayers: function () {
          return this.eachLayer(this.removeLayer, this);
        },
        invoke: function (t) {
          var e = Array.prototype.slice.call(arguments, 1),
            i,
            n;
          for (i in this._layers)
            (n = this._layers[i]), n[t] && n[t].apply(n, e);
          return this;
        },
        onAdd: function (t) {
          this.eachLayer(t.addLayer, t);
        },
        onRemove: function (t) {
          this.eachLayer(t.removeLayer, t);
        },
        eachLayer: function (t, e) {
          for (var i in this._layers) t.call(e, this._layers[i]);
          return this;
        },
        getLayer: function (t) {
          return this._layers[t];
        },
        getLayers: function () {
          var t = [];
          return this.eachLayer(t.push, t), t;
        },
        setZIndex: function (t) {
          return this.invoke("setZIndex", t);
        },
        getLayerId: function (t) {
          return x(t);
        },
      }),
      Vo = function (t, e) {
        return new Ut(t, e);
      },
      St = Ut.extend({
        addLayer: function (t) {
          return this.hasLayer(t)
            ? this
            : (t.addEventParent(this),
              Ut.prototype.addLayer.call(this, t),
              this.fire("layeradd", { layer: t }));
        },
        removeLayer: function (t) {
          return this.hasLayer(t)
            ? (t in this._layers && (t = this._layers[t]),
              t.removeEventParent(this),
              Ut.prototype.removeLayer.call(this, t),
              this.fire("layerremove", { layer: t }))
            : this;
        },
        setStyle: function (t) {
          return this.invoke("setStyle", t);
        },
        bringToFront: function () {
          return this.invoke("bringToFront");
        },
        bringToBack: function () {
          return this.invoke("bringToBack");
        },
        getBounds: function () {
          var t = new it();
          for (var e in this._layers) {
            var i = this._layers[e];
            t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
          }
          return t;
        },
      }),
      Ko = function (t, e) {
        return new St(t, e);
      },
      Gt = M.extend({
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          crossOrigin: !1,
        },
        initialize: function (t) {
          D(this, t);
        },
        createIcon: function (t) {
          return this._createIcon("icon", t);
        },
        createShadow: function (t) {
          return this._createIcon("shadow", t);
        },
        _createIcon: function (t, e) {
          var i = this._getIconUrl(t);
          if (!i) {
            if (t === "icon")
              throw new Error(
                "iconUrl not set in Icon options (see the docs)."
              );
            return null;
          }
          var n = this._createImg(i, e && e.tagName === "IMG" ? e : null);
          return (
            this._setIconStyles(n, t),
            (this.options.crossOrigin || this.options.crossOrigin === "") &&
              (n.crossOrigin =
                this.options.crossOrigin === !0
                  ? ""
                  : this.options.crossOrigin),
            n
          );
        },
        _setIconStyles: function (t, e) {
          var i = this.options,
            n = i[e + "Size"];
          typeof n == "number" && (n = [n, n]);
          var o = R(n),
            r = R(
              (e === "shadow" && i.shadowAnchor) ||
                i.iconAnchor ||
                (o && o.divideBy(2, !0))
            );
          (t.className = "leaflet-marker-" + e + " " + (i.className || "")),
            r &&
              ((t.style.marginLeft = -r.x + "px"),
              (t.style.marginTop = -r.y + "px")),
            o && ((t.style.width = o.x + "px"), (t.style.height = o.y + "px"));
        },
        _createImg: function (t, e) {
          return (e = e || document.createElement("img")), (e.src = t), e;
        },
        _getIconUrl: function (t) {
          return (
            (O.retina && this.options[t + "RetinaUrl"]) ||
            this.options[t + "Url"]
          );
        },
      });
    function Yo(t) {
      return new Gt(t);
    }
    var re = Gt.extend({
        options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41],
        },
        _getIconUrl: function (t) {
          return (
            typeof re.imagePath != "string" &&
              (re.imagePath = this._detectIconPath()),
            (this.options.imagePath || re.imagePath) +
              Gt.prototype._getIconUrl.call(this, t)
          );
        },
        _stripUrl: function (t) {
          var e = function (i, n, o) {
            var r = n.exec(i);
            return r && r[o];
          };
          return (
            (t = e(t, /^url\((['"])?(.+)\1\)$/, 2)),
            t && e(t, /^(.*)marker-icon\.png$/, 1)
          );
        },
        _detectIconPath: function () {
          var t = G("div", "leaflet-default-icon-path", document.body),
            e = Jt(t, "background-image") || Jt(t, "backgroundImage");
          if ((document.body.removeChild(t), (e = this._stripUrl(e)), e))
            return e;
          var i = document.querySelector('link[href$="leaflet.css"]');
          return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
        },
      }),
      dn = bt.extend({
        initialize: function (t) {
          this._marker = t;
        },
        addHooks: function () {
          var t = this._marker._icon;
          this._draggable || (this._draggable = new Ot(t, t, !0)),
            this._draggable
              .on(
                {
                  dragstart: this._onDragStart,
                  predrag: this._onPreDrag,
                  drag: this._onDrag,
                  dragend: this._onDragEnd,
                },
                this
              )
              .enable(),
            N(t, "leaflet-marker-draggable");
        },
        removeHooks: function () {
          this._draggable
            .off(
              {
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this
            )
            .disable(),
            this._marker._icon &&
              nt(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function () {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function (t) {
          var e = this._marker,
            i = e._map,
            n = this._marker.options.autoPanSpeed,
            o = this._marker.options.autoPanPadding,
            r = zt(e._icon),
            s = i.getPixelBounds(),
            a = i.getPixelOrigin(),
            u = j(s.min._subtract(a).add(o), s.max._subtract(a).subtract(o));
          if (!u.contains(r)) {
            var g = R(
              (Math.max(u.max.x, r.x) - u.max.x) / (s.max.x - u.max.x) -
                (Math.min(u.min.x, r.x) - u.min.x) / (s.min.x - u.min.x),
              (Math.max(u.max.y, r.y) - u.max.y) / (s.max.y - u.max.y) -
                (Math.min(u.min.y, r.y) - u.min.y) / (s.min.y - u.min.y)
            ).multiplyBy(n);
            i.panBy(g, { animate: !1 }),
              this._draggable._newPos._add(g),
              this._draggable._startPos._add(g),
              ot(e._icon, this._draggable._newPos),
              this._onDrag(t),
              (this._panRequest = v(this._adjustPan.bind(this, t)));
          }
        },
        _onDragStart: function () {
          (this._oldLatLng = this._marker.getLatLng()),
            this._marker.closePopup && this._marker.closePopup(),
            this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function (t) {
          this._marker.options.autoPan &&
            (y(this._panRequest),
            (this._panRequest = v(this._adjustPan.bind(this, t))));
        },
        _onDrag: function (t) {
          var e = this._marker,
            i = e._shadow,
            n = zt(e._icon),
            o = e._map.layerPointToLatLng(n);
          i && ot(i, n),
            (e._latlng = o),
            (t.latlng = o),
            (t.oldLatLng = this._oldLatLng),
            e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function (t) {
          y(this._panRequest),
            delete this._oldLatLng,
            this._marker.fire("moveend").fire("dragend", t);
        },
      }),
      ye = gt.extend({
        options: {
          icon: new re(),
          interactive: !0,
          keyboard: !0,
          title: "",
          alt: "Marker",
          zIndexOffset: 0,
          opacity: 1,
          riseOnHover: !1,
          riseOffset: 250,
          pane: "markerPane",
          shadowPane: "shadowPane",
          bubblingMouseEvents: !1,
          autoPanOnFocus: !0,
          draggable: !1,
          autoPan: !1,
          autoPanPadding: [50, 50],
          autoPanSpeed: 10,
        },
        initialize: function (t, e) {
          D(this, e), (this._latlng = X(t));
        },
        onAdd: function (t) {
          (this._zoomAnimated =
            this._zoomAnimated && t.options.markerZoomAnimation),
            this._zoomAnimated && t.on("zoomanim", this._animateZoom, this),
            this._initIcon(),
            this.update();
        },
        onRemove: function (t) {
          this.dragging &&
            this.dragging.enabled() &&
            ((this.options.draggable = !0), this.dragging.removeHooks()),
            delete this.dragging,
            this._zoomAnimated && t.off("zoomanim", this._animateZoom, this),
            this._removeIcon(),
            this._removeShadow();
        },
        getEvents: function () {
          return { zoom: this.update, viewreset: this.update };
        },
        getLatLng: function () {
          return this._latlng;
        },
        setLatLng: function (t) {
          var e = this._latlng;
          return (
            (this._latlng = X(t)),
            this.update(),
            this.fire("move", { oldLatLng: e, latlng: this._latlng })
          );
        },
        setZIndexOffset: function (t) {
          return (this.options.zIndexOffset = t), this.update();
        },
        getIcon: function () {
          return this.options.icon;
        },
        setIcon: function (t) {
          return (
            (this.options.icon = t),
            this._map && (this._initIcon(), this.update()),
            this._popup && this.bindPopup(this._popup, this._popup.options),
            this
          );
        },
        getElement: function () {
          return this._icon;
        },
        update: function () {
          if (this._icon && this._map) {
            var t = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(t);
          }
          return this;
        },
        _initIcon: function () {
          var t = this.options,
            e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
            i = t.icon.createIcon(this._icon),
            n = !1;
          i !== this._icon &&
            (this._icon && this._removeIcon(),
            (n = !0),
            t.title && (i.title = t.title),
            i.tagName === "IMG" && (i.alt = t.alt || "")),
            N(i, e),
            t.keyboard &&
              ((i.tabIndex = "0"), i.setAttribute("role", "button")),
            (this._icon = i),
            t.riseOnHover &&
              this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex,
              }),
            this.options.autoPanOnFocus &&
              Z(i, "focus", this._panOnFocus, this);
          var o = t.icon.createShadow(this._shadow),
            r = !1;
          o !== this._shadow && (this._removeShadow(), (r = !0)),
            o && (N(o, e), (o.alt = "")),
            (this._shadow = o),
            t.opacity < 1 && this._updateOpacity(),
            n && this.getPane().appendChild(this._icon),
            this._initInteraction(),
            o && r && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function () {
          this.options.riseOnHover &&
            this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex,
            }),
            this.options.autoPanOnFocus &&
              J(this._icon, "focus", this._panOnFocus, this),
            Q(this._icon),
            this.removeInteractiveTarget(this._icon),
            (this._icon = null);
        },
        _removeShadow: function () {
          this._shadow && Q(this._shadow), (this._shadow = null);
        },
        _setPos: function (t) {
          this._icon && ot(this._icon, t),
            this._shadow && ot(this._shadow, t),
            (this._zIndex = t.y + this.options.zIndexOffset),
            this._resetZIndex();
        },
        _updateZIndex: function (t) {
          this._icon && (this._icon.style.zIndex = this._zIndex + t);
        },
        _animateZoom: function (t) {
          var e = this._map
            ._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
            .round();
          this._setPos(e);
        },
        _initInteraction: function () {
          if (
            this.options.interactive &&
            (N(this._icon, "leaflet-interactive"),
            this.addInteractiveTarget(this._icon),
            dn)
          ) {
            var t = this.options.draggable;
            this.dragging &&
              ((t = this.dragging.enabled()), this.dragging.disable()),
              (this.dragging = new dn(this)),
              t && this.dragging.enable();
          }
        },
        setOpacity: function (t) {
          return (
            (this.options.opacity = t), this._map && this._updateOpacity(), this
          );
        },
        _updateOpacity: function () {
          var t = this.options.opacity;
          this._icon && ft(this._icon, t), this._shadow && ft(this._shadow, t);
        },
        _bringToFront: function () {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function () {
          this._updateZIndex(0);
        },
        _panOnFocus: function () {
          var t = this._map;
          if (t) {
            var e = this.options.icon.options,
              i = e.iconSize ? R(e.iconSize) : R(0, 0),
              n = e.iconAnchor ? R(e.iconAnchor) : R(0, 0);
            t.panInside(this._latlng, {
              paddingTopLeft: n,
              paddingBottomRight: i.subtract(n),
            });
          }
        },
        _getPopupAnchor: function () {
          return this.options.icon.options.popupAnchor;
        },
        _getTooltipAnchor: function () {
          return this.options.icon.options.tooltipAnchor;
        },
      });
    function $o(t, e) {
      return new ye(t, e);
    }
    var At = gt.extend({
        options: {
          stroke: !0,
          color: "#3388ff",
          weight: 3,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
          dashArray: null,
          dashOffset: null,
          fill: !1,
          fillColor: null,
          fillOpacity: 0.2,
          fillRule: "evenodd",
          interactive: !0,
          bubblingMouseEvents: !0,
        },
        beforeAdd: function (t) {
          this._renderer = t.getRenderer(this);
        },
        onAdd: function () {
          this._renderer._initPath(this),
            this._reset(),
            this._renderer._addPath(this);
        },
        onRemove: function () {
          this._renderer._removePath(this);
        },
        redraw: function () {
          return this._map && this._renderer._updatePath(this), this;
        },
        setStyle: function (t) {
          return (
            D(this, t),
            this._renderer &&
              (this._renderer._updateStyle(this),
              this.options.stroke &&
                t &&
                Object.prototype.hasOwnProperty.call(t, "weight") &&
                this._updateBounds()),
            this
          );
        },
        bringToFront: function () {
          return this._renderer && this._renderer._bringToFront(this), this;
        },
        bringToBack: function () {
          return this._renderer && this._renderer._bringToBack(this), this;
        },
        getElement: function () {
          return this._path;
        },
        _reset: function () {
          this._project(), this._update();
        },
        _clickTolerance: function () {
          return (
            (this.options.stroke ? this.options.weight / 2 : 0) +
            (this._renderer.options.tolerance || 0)
          );
        },
      }),
      we = At.extend({
        options: { fill: !0, radius: 10 },
        initialize: function (t, e) {
          D(this, e),
            (this._latlng = X(t)),
            (this._radius = this.options.radius);
        },
        setLatLng: function (t) {
          var e = this._latlng;
          return (
            (this._latlng = X(t)),
            this.redraw(),
            this.fire("move", { oldLatLng: e, latlng: this._latlng })
          );
        },
        getLatLng: function () {
          return this._latlng;
        },
        setRadius: function (t) {
          return (this.options.radius = this._radius = t), this.redraw();
        },
        getRadius: function () {
          return this._radius;
        },
        setStyle: function (t) {
          var e = (t && t.radius) || this._radius;
          return At.prototype.setStyle.call(this, t), this.setRadius(e), this;
        },
        _project: function () {
          (this._point = this._map.latLngToLayerPoint(this._latlng)),
            this._updateBounds();
        },
        _updateBounds: function () {
          var t = this._radius,
            e = this._radiusY || t,
            i = this._clickTolerance(),
            n = [t + i, e + i];
          this._pxBounds = new V(this._point.subtract(n), this._point.add(n));
        },
        _update: function () {
          this._map && this._updatePath();
        },
        _updatePath: function () {
          this._renderer._updateCircle(this);
        },
        _empty: function () {
          return (
            this._radius && !this._renderer._bounds.intersects(this._pxBounds)
          );
        },
        _containsPoint: function (t) {
          return (
            t.distanceTo(this._point) <= this._radius + this._clickTolerance()
          );
        },
      });
    function Xo(t, e) {
      return new we(t, e);
    }
    var li = we.extend({
      initialize: function (t, e, i) {
        if (
          (typeof e == "number" && (e = d({}, i, { radius: e })),
          D(this, e),
          (this._latlng = X(t)),
          isNaN(this.options.radius))
        )
          throw new Error("Circle radius cannot be NaN");
        this._mRadius = this.options.radius;
      },
      setRadius: function (t) {
        return (this._mRadius = t), this.redraw();
      },
      getRadius: function () {
        return this._mRadius;
      },
      getBounds: function () {
        var t = [this._radius, this._radiusY || this._radius];
        return new it(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: At.prototype.setStyle,
      _project: function () {
        var t = this._latlng.lng,
          e = this._latlng.lat,
          i = this._map,
          n = i.options.crs;
        if (n.distance === Rt.distance) {
          var o = Math.PI / 180,
            r = this._mRadius / Rt.R / o,
            s = i.project([e + r, t]),
            a = i.project([e - r, t]),
            u = s.add(a).divideBy(2),
            g = i.unproject(u).lat,
            T =
              Math.acos(
                (Math.cos(r * o) - Math.sin(e * o) * Math.sin(g * o)) /
                  (Math.cos(e * o) * Math.cos(g * o))
              ) / o;
          (isNaN(T) || T === 0) && (T = r / Math.cos((Math.PI / 180) * e)),
            (this._point = u.subtract(i.getPixelOrigin())),
            (this._radius = isNaN(T) ? 0 : u.x - i.project([g, t - T]).x),
            (this._radiusY = u.y - s.y);
        } else {
          var B = n.unproject(
            n.project(this._latlng).subtract([this._mRadius, 0])
          );
          (this._point = i.latLngToLayerPoint(this._latlng)),
            (this._radius = this._point.x - i.latLngToLayerPoint(B).x);
        }
        this._updateBounds();
      },
    });
    function Jo(t, e, i) {
      return new li(t, e, i);
    }
    var Et = At.extend({
      options: { smoothFactor: 1, noClip: !1 },
      initialize: function (t, e) {
        D(this, e), this._setLatLngs(t);
      },
      getLatLngs: function () {
        return this._latlngs;
      },
      setLatLngs: function (t) {
        return this._setLatLngs(t), this.redraw();
      },
      isEmpty: function () {
        return !this._latlngs.length;
      },
      closestLayerPoint: function (t) {
        for (
          var e = 1 / 0, i = null, n = oe, o, r, s = 0, a = this._parts.length;
          s < a;
          s++
        )
          for (var u = this._parts[s], g = 1, T = u.length; g < T; g++) {
            (o = u[g - 1]), (r = u[g]);
            var B = n(t, o, r, !0);
            B < e && ((e = B), (i = n(t, o, r)));
          }
        return i && (i.distance = Math.sqrt(e)), i;
      },
      getCenter: function () {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return un(this._defaultShape(), this._map.options.crs);
      },
      getBounds: function () {
        return this._bounds;
      },
      addLatLng: function (t, e) {
        return (
          (e = e || this._defaultShape()),
          (t = X(t)),
          e.push(t),
          this._bounds.extend(t),
          this.redraw()
        );
      },
      _setLatLngs: function (t) {
        (this._bounds = new it()), (this._latlngs = this._convertLatLngs(t));
      },
      _defaultShape: function () {
        return dt(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      _convertLatLngs: function (t) {
        for (var e = [], i = dt(t), n = 0, o = t.length; n < o; n++)
          i
            ? ((e[n] = X(t[n])), this._bounds.extend(e[n]))
            : (e[n] = this._convertLatLngs(t[n]));
        return e;
      },
      _project: function () {
        var t = new V();
        (this._rings = []),
          this._projectLatlngs(this._latlngs, this._rings, t),
          this._bounds.isValid() &&
            t.isValid() &&
            ((this._rawPxBounds = t), this._updateBounds());
      },
      _updateBounds: function () {
        var t = this._clickTolerance(),
          e = new I(t, t);
        this._rawPxBounds &&
          (this._pxBounds = new V([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e),
          ]));
      },
      _projectLatlngs: function (t, e, i) {
        var n = t[0] instanceof K,
          o = t.length,
          r,
          s;
        if (n) {
          for (s = [], r = 0; r < o; r++)
            (s[r] = this._map.latLngToLayerPoint(t[r])), i.extend(s[r]);
          e.push(s);
        } else for (r = 0; r < o; r++) this._projectLatlngs(t[r], e, i);
      },
      _clipPoints: function () {
        var t = this._renderer._bounds;
        if (
          ((this._parts = []),
          !(!this._pxBounds || !this._pxBounds.intersects(t)))
        ) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var e = this._parts,
            i,
            n,
            o,
            r,
            s,
            a,
            u;
          for (i = 0, o = 0, r = this._rings.length; i < r; i++)
            for (u = this._rings[i], n = 0, s = u.length; n < s - 1; n++)
              (a = an(u[n], u[n + 1], t, n, !0)),
                a &&
                  ((e[o] = e[o] || []),
                  e[o].push(a[0]),
                  (a[1] !== u[n + 1] || n === s - 2) && (e[o].push(a[1]), o++));
        }
      },
      _simplifyPoints: function () {
        for (
          var t = this._parts,
            e = this.options.smoothFactor,
            i = 0,
            n = t.length;
          i < n;
          i++
        )
          t[i] = on(t[i], e);
      },
      _update: function () {
        this._map &&
          (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function () {
        this._renderer._updatePoly(this);
      },
      _containsPoint: function (t, e) {
        var i,
          n,
          o,
          r,
          s,
          a,
          u = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
        for (i = 0, r = this._parts.length; i < r; i++)
          for (
            a = this._parts[i], n = 0, s = a.length, o = s - 1;
            n < s;
            o = n++
          )
            if (!(!e && n === 0) && rn(t, a[o], a[n]) <= u) return !0;
        return !1;
      },
    });
    function Qo(t, e) {
      return new Et(t, e);
    }
    Et._flat = hn;
    var qt = Et.extend({
      options: { fill: !0 },
      isEmpty: function () {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      getCenter: function () {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return cn(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function (t) {
        var e = Et.prototype._convertLatLngs.call(this, t),
          i = e.length;
        return (
          i >= 2 && e[0] instanceof K && e[0].equals(e[i - 1]) && e.pop(), e
        );
      },
      _setLatLngs: function (t) {
        Et.prototype._setLatLngs.call(this, t),
          dt(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function () {
        return dt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function () {
        var t = this._renderer._bounds,
          e = this.options.weight,
          i = new I(e, e);
        if (
          ((t = new V(t.min.subtract(i), t.max.add(i))),
          (this._parts = []),
          !(!this._pxBounds || !this._pxBounds.intersects(t)))
        ) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var n = 0, o = this._rings.length, r; n < o; n++)
            (r = ln(this._rings[n], t, !0)), r.length && this._parts.push(r);
        }
      },
      _updatePath: function () {
        this._renderer._updatePoly(this, !0);
      },
      _containsPoint: function (t) {
        var e = !1,
          i,
          n,
          o,
          r,
          s,
          a,
          u,
          g;
        if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
        for (r = 0, u = this._parts.length; r < u; r++)
          for (
            i = this._parts[r], s = 0, g = i.length, a = g - 1;
            s < g;
            a = s++
          )
            (n = i[s]),
              (o = i[a]),
              n.y > t.y != o.y > t.y &&
                t.x < ((o.x - n.x) * (t.y - n.y)) / (o.y - n.y) + n.x &&
                (e = !e);
        return e || Et.prototype._containsPoint.call(this, t, !0);
      },
    });
    function tr(t, e) {
      return new qt(t, e);
    }
    var Mt = St.extend({
      initialize: function (t, e) {
        D(this, e), (this._layers = {}), t && this.addData(t);
      },
      addData: function (t) {
        var e = et(t) ? t : t.features,
          i,
          n,
          o;
        if (e) {
          for (i = 0, n = e.length; i < n; i++)
            (o = e[i]),
              (o.geometries || o.geometry || o.features || o.coordinates) &&
                this.addData(o);
          return this;
        }
        var r = this.options;
        if (r.filter && !r.filter(t)) return this;
        var s = Pe(t, r);
        return s
          ? ((s.feature = Le(t)),
            (s.defaultOptions = s.options),
            this.resetStyle(s),
            r.onEachFeature && r.onEachFeature(t, s),
            this.addLayer(s))
          : this;
      },
      resetStyle: function (t) {
        return t === void 0
          ? this.eachLayer(this.resetStyle, this)
          : ((t.options = d({}, t.defaultOptions)),
            this._setLayerStyle(t, this.options.style),
            this);
      },
      setStyle: function (t) {
        return this.eachLayer(function (e) {
          this._setLayerStyle(e, t);
        }, this);
      },
      _setLayerStyle: function (t, e) {
        t.setStyle &&
          (typeof e == "function" && (e = e(t.feature)), t.setStyle(e));
      },
    });
    function Pe(t, e) {
      var i = t.type === "Feature" ? t.geometry : t,
        n = i ? i.coordinates : null,
        o = [],
        r = e && e.pointToLayer,
        s = (e && e.coordsToLatLng) || ci,
        a,
        u,
        g,
        T;
      if (!n && !i) return null;
      switch (i.type) {
        case "Point":
          return (a = s(n)), _n(r, t, a, e);
        case "MultiPoint":
          for (g = 0, T = n.length; g < T; g++)
            (a = s(n[g])), o.push(_n(r, t, a, e));
          return new St(o);
        case "LineString":
        case "MultiLineString":
          return (u = be(n, i.type === "LineString" ? 0 : 1, s)), new Et(u, e);
        case "Polygon":
        case "MultiPolygon":
          return (u = be(n, i.type === "Polygon" ? 1 : 2, s)), new qt(u, e);
        case "GeometryCollection":
          for (g = 0, T = i.geometries.length; g < T; g++) {
            var B = Pe(
              {
                geometry: i.geometries[g],
                type: "Feature",
                properties: t.properties,
              },
              e
            );
            B && o.push(B);
          }
          return new St(o);
        case "FeatureCollection":
          for (g = 0, T = i.features.length; g < T; g++) {
            var W = Pe(i.features[g], e);
            W && o.push(W);
          }
          return new St(o);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function _n(t, e, i, n) {
      return t ? t(e, i) : new ye(i, n && n.markersInheritOptions && n);
    }
    function ci(t) {
      return new K(t[1], t[0], t[2]);
    }
    function be(t, e, i) {
      for (var n = [], o = 0, r = t.length, s; o < r; o++)
        (s = e ? be(t[o], e - 1, i) : (i || ci)(t[o])), n.push(s);
      return n;
    }
    function fi(t, e) {
      return (
        (t = X(t)),
        t.alt !== void 0
          ? [b(t.lng, e), b(t.lat, e), b(t.alt, e)]
          : [b(t.lng, e), b(t.lat, e)]
      );
    }
    function xe(t, e, i, n) {
      for (var o = [], r = 0, s = t.length; r < s; r++)
        o.push(e ? xe(t[r], dt(t[r]) ? 0 : e - 1, i, n) : fi(t[r], n));
      return !e && i && o.push(o[0].slice()), o;
    }
    function jt(t, e) {
      return t.feature ? d({}, t.feature, { geometry: e }) : Le(e);
    }
    function Le(t) {
      return t.type === "Feature" || t.type === "FeatureCollection"
        ? t
        : { type: "Feature", properties: {}, geometry: t };
    }
    var di = {
      toGeoJSON: function (t) {
        return jt(this, {
          type: "Point",
          coordinates: fi(this.getLatLng(), t),
        });
      },
    };
    ye.include(di),
      li.include(di),
      we.include(di),
      Et.include({
        toGeoJSON: function (t) {
          var e = !dt(this._latlngs),
            i = xe(this._latlngs, e ? 1 : 0, !1, t);
          return jt(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: i,
          });
        },
      }),
      qt.include({
        toGeoJSON: function (t) {
          var e = !dt(this._latlngs),
            i = e && !dt(this._latlngs[0]),
            n = xe(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
          return (
            e || (n = [n]),
            jt(this, { type: (i ? "Multi" : "") + "Polygon", coordinates: n })
          );
        },
      }),
      Ut.include({
        toMultiPoint: function (t) {
          var e = [];
          return (
            this.eachLayer(function (i) {
              e.push(i.toGeoJSON(t).geometry.coordinates);
            }),
            jt(this, { type: "MultiPoint", coordinates: e })
          );
        },
        toGeoJSON: function (t) {
          var e =
            this.feature && this.feature.geometry && this.feature.geometry.type;
          if (e === "MultiPoint") return this.toMultiPoint(t);
          var i = e === "GeometryCollection",
            n = [];
          return (
            this.eachLayer(function (o) {
              if (o.toGeoJSON) {
                var r = o.toGeoJSON(t);
                if (i) n.push(r.geometry);
                else {
                  var s = Le(r);
                  s.type === "FeatureCollection"
                    ? n.push.apply(n, s.features)
                    : n.push(s);
                }
              }
            }),
            i
              ? jt(this, { geometries: n, type: "GeometryCollection" })
              : { type: "FeatureCollection", features: n }
          );
        },
      });
    function mn(t, e) {
      return new Mt(t, e);
    }
    var er = mn,
      Te = gt.extend({
        options: {
          opacity: 1,
          alt: "",
          interactive: !1,
          crossOrigin: !1,
          errorOverlayUrl: "",
          zIndex: 1,
          className: "",
        },
        initialize: function (t, e, i) {
          (this._url = t), (this._bounds = tt(e)), D(this, i);
        },
        onAdd: function () {
          this._image ||
            (this._initImage(),
            this.options.opacity < 1 && this._updateOpacity()),
            this.options.interactive &&
              (N(this._image, "leaflet-interactive"),
              this.addInteractiveTarget(this._image)),
            this.getPane().appendChild(this._image),
            this._reset();
        },
        onRemove: function () {
          Q(this._image),
            this.options.interactive &&
              this.removeInteractiveTarget(this._image);
        },
        setOpacity: function (t) {
          return (
            (this.options.opacity = t),
            this._image && this._updateOpacity(),
            this
          );
        },
        setStyle: function (t) {
          return t.opacity && this.setOpacity(t.opacity), this;
        },
        bringToFront: function () {
          return this._map && Ht(this._image), this;
        },
        bringToBack: function () {
          return this._map && Wt(this._image), this;
        },
        setUrl: function (t) {
          return (this._url = t), this._image && (this._image.src = t), this;
        },
        setBounds: function (t) {
          return (this._bounds = tt(t)), this._map && this._reset(), this;
        },
        getEvents: function () {
          var t = { zoom: this._reset, viewreset: this._reset };
          return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
        },
        setZIndex: function (t) {
          return (this.options.zIndex = t), this._updateZIndex(), this;
        },
        getBounds: function () {
          return this._bounds;
        },
        getElement: function () {
          return this._image;
        },
        _initImage: function () {
          var t = this._url.tagName === "IMG",
            e = (this._image = t ? this._url : G("img"));
          if (
            (N(e, "leaflet-image-layer"),
            this._zoomAnimated && N(e, "leaflet-zoom-animated"),
            this.options.className && N(e, this.options.className),
            (e.onselectstart = P),
            (e.onmousemove = P),
            (e.onload = p(this.fire, this, "load")),
            (e.onerror = p(this._overlayOnError, this, "error")),
            (this.options.crossOrigin || this.options.crossOrigin === "") &&
              (e.crossOrigin =
                this.options.crossOrigin === !0
                  ? ""
                  : this.options.crossOrigin),
            this.options.zIndex && this._updateZIndex(),
            t)
          ) {
            this._url = e.src;
            return;
          }
          (e.src = this._url), (e.alt = this.options.alt);
        },
        _animateZoom: function (t) {
          var e = this._map.getZoomScale(t.zoom),
            i = this._map._latLngBoundsToNewLayerBounds(
              this._bounds,
              t.zoom,
              t.center
            ).min;
          kt(this._image, i, e);
        },
        _reset: function () {
          var t = this._image,
            e = new V(
              this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
              this._map.latLngToLayerPoint(this._bounds.getSouthEast())
            ),
            i = e.getSize();
          ot(t, e.min),
            (t.style.width = i.x + "px"),
            (t.style.height = i.y + "px");
        },
        _updateOpacity: function () {
          ft(this._image, this.options.opacity);
        },
        _updateZIndex: function () {
          this._image &&
            this.options.zIndex !== void 0 &&
            this.options.zIndex !== null &&
            (this._image.style.zIndex = this.options.zIndex);
        },
        _overlayOnError: function () {
          this.fire("error");
          var t = this.options.errorOverlayUrl;
          t && this._url !== t && ((this._url = t), (this._image.src = t));
        },
        getCenter: function () {
          return this._bounds.getCenter();
        },
      }),
      ir = function (t, e, i) {
        return new Te(t, e, i);
      },
      pn = Te.extend({
        options: {
          autoplay: !0,
          loop: !0,
          keepAspectRatio: !0,
          muted: !1,
          playsInline: !0,
        },
        _initImage: function () {
          var t = this._url.tagName === "VIDEO",
            e = (this._image = t ? this._url : G("video"));
          if (
            (N(e, "leaflet-image-layer"),
            this._zoomAnimated && N(e, "leaflet-zoom-animated"),
            this.options.className && N(e, this.options.className),
            (e.onselectstart = P),
            (e.onmousemove = P),
            (e.onloadeddata = p(this.fire, this, "load")),
            t)
          ) {
            for (
              var i = e.getElementsByTagName("source"), n = [], o = 0;
              o < i.length;
              o++
            )
              n.push(i[o].src);
            this._url = i.length > 0 ? n : [e.src];
            return;
          }
          et(this._url) || (this._url = [this._url]),
            !this.options.keepAspectRatio &&
              Object.prototype.hasOwnProperty.call(e.style, "objectFit") &&
              (e.style.objectFit = "fill"),
            (e.autoplay = !!this.options.autoplay),
            (e.loop = !!this.options.loop),
            (e.muted = !!this.options.muted),
            (e.playsInline = !!this.options.playsInline);
          for (var r = 0; r < this._url.length; r++) {
            var s = G("source");
            (s.src = this._url[r]), e.appendChild(s);
          }
        },
      });
    function nr(t, e, i) {
      return new pn(t, e, i);
    }
    var gn = Te.extend({
      _initImage: function () {
        var t = (this._image = this._url);
        N(t, "leaflet-image-layer"),
          this._zoomAnimated && N(t, "leaflet-zoom-animated"),
          this.options.className && N(t, this.options.className),
          (t.onselectstart = P),
          (t.onmousemove = P);
      },
    });
    function or(t, e, i) {
      return new gn(t, e, i);
    }
    var xt = gt.extend({
      options: {
        interactive: !1,
        offset: [0, 0],
        className: "",
        pane: void 0,
        content: "",
      },
      initialize: function (t, e) {
        t && (t instanceof K || et(t))
          ? ((this._latlng = X(t)), D(this, e))
          : (D(this, t), (this._source = e)),
          this.options.content && (this._content = this.options.content);
      },
      openOn: function (t) {
        return (
          (t = arguments.length ? t : this._source._map),
          t.hasLayer(this) || t.addLayer(this),
          this
        );
      },
      close: function () {
        return this._map && this._map.removeLayer(this), this;
      },
      toggle: function (t) {
        return (
          this._map
            ? this.close()
            : (arguments.length ? (this._source = t) : (t = this._source),
              this._prepareOpen(),
              this.openOn(t._map)),
          this
        );
      },
      onAdd: function (t) {
        (this._zoomAnimated = t._zoomAnimated),
          this._container || this._initLayout(),
          t._fadeAnimated && ft(this._container, 0),
          clearTimeout(this._removeTimeout),
          this.getPane().appendChild(this._container),
          this.update(),
          t._fadeAnimated && ft(this._container, 1),
          this.bringToFront(),
          this.options.interactive &&
            (N(this._container, "leaflet-interactive"),
            this.addInteractiveTarget(this._container));
      },
      onRemove: function (t) {
        t._fadeAnimated
          ? (ft(this._container, 0),
            (this._removeTimeout = setTimeout(
              p(Q, void 0, this._container),
              200
            )))
          : Q(this._container),
          this.options.interactive &&
            (nt(this._container, "leaflet-interactive"),
            this.removeInteractiveTarget(this._container));
      },
      getLatLng: function () {
        return this._latlng;
      },
      setLatLng: function (t) {
        return (
          (this._latlng = X(t)),
          this._map && (this._updatePosition(), this._adjustPan()),
          this
        );
      },
      getContent: function () {
        return this._content;
      },
      setContent: function (t) {
        return (this._content = t), this.update(), this;
      },
      getElement: function () {
        return this._container;
      },
      update: function () {
        this._map &&
          ((this._container.style.visibility = "hidden"),
          this._updateContent(),
          this._updateLayout(),
          this._updatePosition(),
          (this._container.style.visibility = ""),
          this._adjustPan());
      },
      getEvents: function () {
        var t = { zoom: this._updatePosition, viewreset: this._updatePosition };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      isOpen: function () {
        return !!this._map && this._map.hasLayer(this);
      },
      bringToFront: function () {
        return this._map && Ht(this._container), this;
      },
      bringToBack: function () {
        return this._map && Wt(this._container), this;
      },
      _prepareOpen: function (t) {
        var e = this._source;
        if (!e._map) return !1;
        if (e instanceof St) {
          e = null;
          var i = this._source._layers;
          for (var n in i)
            if (i[n]._map) {
              e = i[n];
              break;
            }
          if (!e) return !1;
          this._source = e;
        }
        if (!t)
          if (e.getCenter) t = e.getCenter();
          else if (e.getLatLng) t = e.getLatLng();
          else if (e.getBounds) t = e.getBounds().getCenter();
          else throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent: function () {
        if (this._content) {
          var t = this._contentNode,
            e =
              typeof this._content == "function"
                ? this._content(this._source || this)
                : this._content;
          if (typeof e == "string") t.innerHTML = e;
          else {
            for (; t.hasChildNodes(); ) t.removeChild(t.firstChild);
            t.appendChild(e);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function () {
        if (this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng),
            e = R(this.options.offset),
            i = this._getAnchor();
          this._zoomAnimated
            ? ot(this._container, t.add(i))
            : (e = e.add(t).add(i));
          var n = (this._containerBottom = -e.y),
            o = (this._containerLeft =
              -Math.round(this._containerWidth / 2) + e.x);
          (this._container.style.bottom = n + "px"),
            (this._container.style.left = o + "px");
        }
      },
      _getAnchor: function () {
        return [0, 0];
      },
    });
    U.include({
      _initOverlay: function (t, e, i, n) {
        var o = e;
        return (
          o instanceof t || (o = new t(n).setContent(e)), i && o.setLatLng(i), o
        );
      },
    }),
      gt.include({
        _initOverlay: function (t, e, i, n) {
          var o = i;
          return (
            o instanceof t
              ? (D(o, n), (o._source = this))
              : ((o = e && !n ? e : new t(n, this)), o.setContent(i)),
            o
          );
        },
      });
    var Se = xt.extend({
        options: {
          pane: "popupPane",
          offset: [0, 7],
          maxWidth: 300,
          minWidth: 50,
          maxHeight: null,
          autoPan: !0,
          autoPanPaddingTopLeft: null,
          autoPanPaddingBottomRight: null,
          autoPanPadding: [5, 5],
          keepInView: !1,
          closeButton: !0,
          autoClose: !0,
          closeOnEscapeKey: !0,
          className: "",
        },
        openOn: function (t) {
          return (
            (t = arguments.length ? t : this._source._map),
            !t.hasLayer(this) &&
              t._popup &&
              t._popup.options.autoClose &&
              t.removeLayer(t._popup),
            (t._popup = this),
            xt.prototype.openOn.call(this, t)
          );
        },
        onAdd: function (t) {
          xt.prototype.onAdd.call(this, t),
            t.fire("popupopen", { popup: this }),
            this._source &&
              (this._source.fire("popupopen", { popup: this }, !0),
              this._source instanceof At || this._source.on("preclick", Bt));
        },
        onRemove: function (t) {
          xt.prototype.onRemove.call(this, t),
            t.fire("popupclose", { popup: this }),
            this._source &&
              (this._source.fire("popupclose", { popup: this }, !0),
              this._source instanceof At || this._source.off("preclick", Bt));
        },
        getEvents: function () {
          var t = xt.prototype.getEvents.call(this);
          return (
            (this.options.closeOnClick !== void 0
              ? this.options.closeOnClick
              : this._map.options.closePopupOnClick) &&
              (t.preclick = this.close),
            this.options.keepInView && (t.moveend = this._adjustPan),
            t
          );
        },
        _initLayout: function () {
          var t = "leaflet-popup",
            e = (this._container = G(
              "div",
              t +
                " " +
                (this.options.className || "") +
                " leaflet-zoom-animated"
            )),
            i = (this._wrapper = G("div", t + "-content-wrapper", e));
          if (
            ((this._contentNode = G("div", t + "-content", i)),
            ie(e),
            ni(this._contentNode),
            Z(e, "contextmenu", Bt),
            (this._tipContainer = G("div", t + "-tip-container", e)),
            (this._tip = G("div", t + "-tip", this._tipContainer)),
            this.options.closeButton)
          ) {
            var n = (this._closeButton = G("a", t + "-close-button", e));
            n.setAttribute("role", "button"),
              n.setAttribute("aria-label", "Close popup"),
              (n.href = "#close"),
              (n.innerHTML = '<span aria-hidden="true">&#215;</span>'),
              Z(
                n,
                "click",
                function (o) {
                  at(o), this.close();
                },
                this
              );
          }
        },
        _updateLayout: function () {
          var t = this._contentNode,
            e = t.style;
          (e.width = ""), (e.whiteSpace = "nowrap");
          var i = t.offsetWidth;
          (i = Math.min(i, this.options.maxWidth)),
            (i = Math.max(i, this.options.minWidth)),
            (e.width = i + 1 + "px"),
            (e.whiteSpace = ""),
            (e.height = "");
          var n = t.offsetHeight,
            o = this.options.maxHeight,
            r = "leaflet-popup-scrolled";
          o && n > o ? ((e.height = o + "px"), N(t, r)) : nt(t, r),
            (this._containerWidth = this._container.offsetWidth);
        },
        _animateZoom: function (t) {
          var e = this._map._latLngToNewLayerPoint(
              this._latlng,
              t.zoom,
              t.center
            ),
            i = this._getAnchor();
          ot(this._container, e.add(i));
        },
        _adjustPan: function () {
          if (this.options.autoPan) {
            if (
              (this._map._panAnim && this._map._panAnim.stop(),
              this._autopanning)
            ) {
              this._autopanning = !1;
              return;
            }
            var t = this._map,
              e = parseInt(Jt(this._container, "marginBottom"), 10) || 0,
              i = this._container.offsetHeight + e,
              n = this._containerWidth,
              o = new I(this._containerLeft, -i - this._containerBottom);
            o._add(zt(this._container));
            var r = t.layerPointToContainerPoint(o),
              s = R(this.options.autoPanPadding),
              a = R(this.options.autoPanPaddingTopLeft || s),
              u = R(this.options.autoPanPaddingBottomRight || s),
              g = t.getSize(),
              T = 0,
              B = 0;
            r.x + n + u.x > g.x && (T = r.x + n - g.x + u.x),
              r.x - T - a.x < 0 && (T = r.x - a.x),
              r.y + i + u.y > g.y && (B = r.y + i - g.y + u.y),
              r.y - B - a.y < 0 && (B = r.y - a.y),
              (T || B) &&
                (this.options.keepInView && (this._autopanning = !0),
                t.fire("autopanstart").panBy([T, B]));
          }
        },
        _getAnchor: function () {
          return R(
            this._source && this._source._getPopupAnchor
              ? this._source._getPopupAnchor()
              : [0, 0]
          );
        },
      }),
      rr = function (t, e) {
        return new Se(t, e);
      };
    U.mergeOptions({ closePopupOnClick: !0 }),
      U.include({
        openPopup: function (t, e, i) {
          return this._initOverlay(Se, t, e, i).openOn(this), this;
        },
        closePopup: function (t) {
          return (t = arguments.length ? t : this._popup), t && t.close(), this;
        },
      }),
      gt.include({
        bindPopup: function (t, e) {
          return (
            (this._popup = this._initOverlay(Se, this._popup, t, e)),
            this._popupHandlersAdded ||
              (this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup,
              }),
              (this._popupHandlersAdded = !0)),
            this
          );
        },
        unbindPopup: function () {
          return (
            this._popup &&
              (this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup,
              }),
              (this._popupHandlersAdded = !1),
              (this._popup = null)),
            this
          );
        },
        openPopup: function (t) {
          return (
            this._popup &&
              (this instanceof St || (this._popup._source = this),
              this._popup._prepareOpen(t || this._latlng) &&
                this._popup.openOn(this._map)),
            this
          );
        },
        closePopup: function () {
          return this._popup && this._popup.close(), this;
        },
        togglePopup: function () {
          return this._popup && this._popup.toggle(this), this;
        },
        isPopupOpen: function () {
          return this._popup ? this._popup.isOpen() : !1;
        },
        setPopupContent: function (t) {
          return this._popup && this._popup.setContent(t), this;
        },
        getPopup: function () {
          return this._popup;
        },
        _openPopup: function (t) {
          if (!(!this._popup || !this._map)) {
            Zt(t);
            var e = t.layer || t.target;
            if (this._popup._source === e && !(e instanceof At)) {
              this._map.hasLayer(this._popup)
                ? this.closePopup()
                : this.openPopup(t.latlng);
              return;
            }
            (this._popup._source = e), this.openPopup(t.latlng);
          }
        },
        _movePopup: function (t) {
          this._popup.setLatLng(t.latlng);
        },
        _onKeyPress: function (t) {
          t.originalEvent.keyCode === 13 && this._openPopup(t);
        },
      });
    var Ee = xt.extend({
        options: {
          pane: "tooltipPane",
          offset: [0, 0],
          direction: "auto",
          permanent: !1,
          sticky: !1,
          opacity: 0.9,
        },
        onAdd: function (t) {
          xt.prototype.onAdd.call(this, t),
            this.setOpacity(this.options.opacity),
            t.fire("tooltipopen", { tooltip: this }),
            this._source &&
              (this.addEventParent(this._source),
              this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function (t) {
          xt.prototype.onRemove.call(this, t),
            t.fire("tooltipclose", { tooltip: this }),
            this._source &&
              (this.removeEventParent(this._source),
              this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function () {
          var t = xt.prototype.getEvents.call(this);
          return this.options.permanent || (t.preclick = this.close), t;
        },
        _initLayout: function () {
          var t = "leaflet-tooltip",
            e =
              t +
              " " +
              (this.options.className || "") +
              " leaflet-zoom-" +
              (this._zoomAnimated ? "animated" : "hide");
          (this._contentNode = this._container = G("div", e)),
            this._container.setAttribute("role", "tooltip"),
            this._container.setAttribute("id", "leaflet-tooltip-" + x(this));
        },
        _updateLayout: function () {},
        _adjustPan: function () {},
        _setPosition: function (t) {
          var e,
            i,
            n = this._map,
            o = this._container,
            r = n.latLngToContainerPoint(n.getCenter()),
            s = n.layerPointToContainerPoint(t),
            a = this.options.direction,
            u = o.offsetWidth,
            g = o.offsetHeight,
            T = R(this.options.offset),
            B = this._getAnchor();
          a === "top"
            ? ((e = u / 2), (i = g))
            : a === "bottom"
            ? ((e = u / 2), (i = 0))
            : a === "center"
            ? ((e = u / 2), (i = g / 2))
            : a === "right"
            ? ((e = 0), (i = g / 2))
            : a === "left"
            ? ((e = u), (i = g / 2))
            : s.x < r.x
            ? ((a = "right"), (e = 0), (i = g / 2))
            : ((a = "left"), (e = u + (T.x + B.x) * 2), (i = g / 2)),
            (t = t.subtract(R(e, i, !0)).add(T).add(B)),
            nt(o, "leaflet-tooltip-right"),
            nt(o, "leaflet-tooltip-left"),
            nt(o, "leaflet-tooltip-top"),
            nt(o, "leaflet-tooltip-bottom"),
            N(o, "leaflet-tooltip-" + a),
            ot(o, t);
        },
        _updatePosition: function () {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function (t) {
          (this.options.opacity = t), this._container && ft(this._container, t);
        },
        _animateZoom: function (t) {
          var e = this._map._latLngToNewLayerPoint(
            this._latlng,
            t.zoom,
            t.center
          );
          this._setPosition(e);
        },
        _getAnchor: function () {
          return R(
            this._source &&
              this._source._getTooltipAnchor &&
              !this.options.sticky
              ? this._source._getTooltipAnchor()
              : [0, 0]
          );
        },
      }),
      sr = function (t, e) {
        return new Ee(t, e);
      };
    U.include({
      openTooltip: function (t, e, i) {
        return this._initOverlay(Ee, t, e, i).openOn(this), this;
      },
      closeTooltip: function (t) {
        return t.close(), this;
      },
    }),
      gt.include({
        bindTooltip: function (t, e) {
          return (
            this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
            (this._tooltip = this._initOverlay(Ee, this._tooltip, t, e)),
            this._initTooltipInteractions(),
            this._tooltip.options.permanent &&
              this._map &&
              this._map.hasLayer(this) &&
              this.openTooltip(),
            this
          );
        },
        unbindTooltip: function () {
          return (
            this._tooltip &&
              (this._initTooltipInteractions(!0),
              this.closeTooltip(),
              (this._tooltip = null)),
            this
          );
        },
        _initTooltipInteractions: function (t) {
          if (!(!t && this._tooltipHandlersAdded)) {
            var e = t ? "off" : "on",
              i = { remove: this.closeTooltip, move: this._moveTooltip };
            this._tooltip.options.permanent
              ? (i.add = this._openTooltip)
              : ((i.mouseover = this._openTooltip),
                (i.mouseout = this.closeTooltip),
                (i.click = this._openTooltip),
                this._map
                  ? this._addFocusListeners()
                  : (i.add = this._addFocusListeners)),
              this._tooltip.options.sticky && (i.mousemove = this._moveTooltip),
              this[e](i),
              (this._tooltipHandlersAdded = !t);
          }
        },
        openTooltip: function (t) {
          return (
            this._tooltip &&
              (this instanceof St || (this._tooltip._source = this),
              this._tooltip._prepareOpen(t) &&
                (this._tooltip.openOn(this._map),
                this.getElement
                  ? this._setAriaDescribedByOnLayer(this)
                  : this.eachLayer &&
                    this.eachLayer(this._setAriaDescribedByOnLayer, this))),
            this
          );
        },
        closeTooltip: function () {
          if (this._tooltip) return this._tooltip.close();
        },
        toggleTooltip: function () {
          return this._tooltip && this._tooltip.toggle(this), this;
        },
        isTooltipOpen: function () {
          return this._tooltip.isOpen();
        },
        setTooltipContent: function (t) {
          return this._tooltip && this._tooltip.setContent(t), this;
        },
        getTooltip: function () {
          return this._tooltip;
        },
        _addFocusListeners: function () {
          this.getElement
            ? this._addFocusListenersOnLayer(this)
            : this.eachLayer &&
              this.eachLayer(this._addFocusListenersOnLayer, this);
        },
        _addFocusListenersOnLayer: function (t) {
          var e = t.getElement();
          e &&
            (Z(
              e,
              "focus",
              function () {
                (this._tooltip._source = t), this.openTooltip();
              },
              this
            ),
            Z(e, "blur", this.closeTooltip, this));
        },
        _setAriaDescribedByOnLayer: function (t) {
          var e = t.getElement();
          e && e.setAttribute("aria-describedby", this._tooltip._container.id);
        },
        _openTooltip: function (t) {
          !this._tooltip ||
            !this._map ||
            (this._map.dragging && this._map.dragging.moving()) ||
            ((this._tooltip._source = t.layer || t.target),
            this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0));
        },
        _moveTooltip: function (t) {
          var e = t.latlng,
            i,
            n;
          this._tooltip.options.sticky &&
            t.originalEvent &&
            ((i = this._map.mouseEventToContainerPoint(t.originalEvent)),
            (n = this._map.containerPointToLayerPoint(i)),
            (e = this._map.layerPointToLatLng(n))),
            this._tooltip.setLatLng(e);
        },
      });
    var vn = Gt.extend({
      options: {
        iconSize: [12, 12],
        html: !1,
        bgPos: null,
        className: "leaflet-div-icon",
      },
      createIcon: function (t) {
        var e = t && t.tagName === "DIV" ? t : document.createElement("div"),
          i = this.options;
        if (
          (i.html instanceof Element
            ? (de(e), e.appendChild(i.html))
            : (e.innerHTML = i.html !== !1 ? i.html : ""),
          i.bgPos)
        ) {
          var n = R(i.bgPos);
          e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
        }
        return this._setIconStyles(e, "icon"), e;
      },
      createShadow: function () {
        return null;
      },
    });
    function ar(t) {
      return new vn(t);
    }
    Gt.Default = re;
    var se = gt.extend({
      options: {
        tileSize: 256,
        opacity: 1,
        updateWhenIdle: O.mobile,
        updateWhenZooming: !0,
        updateInterval: 200,
        zIndex: 1,
        bounds: null,
        minZoom: 0,
        maxZoom: void 0,
        maxNativeZoom: void 0,
        minNativeZoom: void 0,
        noWrap: !1,
        pane: "tilePane",
        className: "",
        keepBuffer: 2,
      },
      initialize: function (t) {
        D(this, t);
      },
      onAdd: function () {
        this._initContainer(),
          (this._levels = {}),
          (this._tiles = {}),
          this._resetView();
      },
      beforeAdd: function (t) {
        t._addZoomLimit(this);
      },
      onRemove: function (t) {
        this._removeAllTiles(),
          Q(this._container),
          t._removeZoomLimit(this),
          (this._container = null),
          (this._tileZoom = void 0);
      },
      bringToFront: function () {
        return (
          this._map && (Ht(this._container), this._setAutoZIndex(Math.max)),
          this
        );
      },
      bringToBack: function () {
        return (
          this._map && (Wt(this._container), this._setAutoZIndex(Math.min)),
          this
        );
      },
      getContainer: function () {
        return this._container;
      },
      setOpacity: function (t) {
        return (this.options.opacity = t), this._updateOpacity(), this;
      },
      setZIndex: function (t) {
        return (this.options.zIndex = t), this._updateZIndex(), this;
      },
      isLoading: function () {
        return this._loading;
      },
      redraw: function () {
        if (this._map) {
          this._removeAllTiles();
          var t = this._clampZoom(this._map.getZoom());
          t !== this._tileZoom && ((this._tileZoom = t), this._updateLevels()),
            this._update();
        }
        return this;
      },
      getEvents: function () {
        var t = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd,
        };
        return (
          this.options.updateWhenIdle ||
            (this._onMove ||
              (this._onMove = A(
                this._onMoveEnd,
                this.options.updateInterval,
                this
              )),
            (t.move = this._onMove)),
          this._zoomAnimated && (t.zoomanim = this._animateZoom),
          t
        );
      },
      createTile: function () {
        return document.createElement("div");
      },
      getTileSize: function () {
        var t = this.options.tileSize;
        return t instanceof I ? t : new I(t, t);
      },
      _updateZIndex: function () {
        this._container &&
          this.options.zIndex !== void 0 &&
          this.options.zIndex !== null &&
          (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function (t) {
        for (
          var e = this.getPane().children,
            i = -t(-1 / 0, 1 / 0),
            n = 0,
            o = e.length,
            r;
          n < o;
          n++
        )
          (r = e[n].style.zIndex),
            e[n] !== this._container && r && (i = t(i, +r));
        isFinite(i) &&
          ((this.options.zIndex = i + t(-1, 1)), this._updateZIndex());
      },
      _updateOpacity: function () {
        if (this._map && !O.ielt9) {
          ft(this._container, this.options.opacity);
          var t = +new Date(),
            e = !1,
            i = !1;
          for (var n in this._tiles) {
            var o = this._tiles[n];
            if (!(!o.current || !o.loaded)) {
              var r = Math.min(1, (t - o.loaded) / 200);
              ft(o.el, r),
                r < 1
                  ? (e = !0)
                  : (o.active ? (i = !0) : this._onOpaqueTile(o),
                    (o.active = !0));
            }
          }
          i && !this._noPrune && this._pruneTiles(),
            e &&
              (y(this._fadeFrame),
              (this._fadeFrame = v(this._updateOpacity, this)));
        }
      },
      _onOpaqueTile: P,
      _initContainer: function () {
        this._container ||
          ((this._container = G(
            "div",
            "leaflet-layer " + (this.options.className || "")
          )),
          this._updateZIndex(),
          this.options.opacity < 1 && this._updateOpacity(),
          this.getPane().appendChild(this._container));
      },
      _updateLevels: function () {
        var t = this._tileZoom,
          e = this.options.maxZoom;
        if (t !== void 0) {
          for (var i in this._levels)
            (i = Number(i)),
              this._levels[i].el.children.length || i === t
                ? ((this._levels[i].el.style.zIndex = e - Math.abs(t - i)),
                  this._onUpdateLevel(i))
                : (Q(this._levels[i].el),
                  this._removeTilesAtZoom(i),
                  this._onRemoveLevel(i),
                  delete this._levels[i]);
          var n = this._levels[t],
            o = this._map;
          return (
            n ||
              ((n = this._levels[t] = {}),
              (n.el = G(
                "div",
                "leaflet-tile-container leaflet-zoom-animated",
                this._container
              )),
              (n.el.style.zIndex = e),
              (n.origin = o
                .project(o.unproject(o.getPixelOrigin()), t)
                .round()),
              (n.zoom = t),
              this._setZoomTransform(n, o.getCenter(), o.getZoom()),
              P(n.el.offsetWidth),
              this._onCreateLevel(n)),
            (this._level = n),
            n
          );
        }
      },
      _onUpdateLevel: P,
      _onRemoveLevel: P,
      _onCreateLevel: P,
      _pruneTiles: function () {
        if (this._map) {
          var t,
            e,
            i = this._map.getZoom();
          if (i > this.options.maxZoom || i < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (t in this._tiles) (e = this._tiles[t]), (e.retain = e.current);
          for (t in this._tiles)
            if (((e = this._tiles[t]), e.current && !e.active)) {
              var n = e.coords;
              this._retainParent(n.x, n.y, n.z, n.z - 5) ||
                this._retainChildren(n.x, n.y, n.z, n.z + 2);
            }
          for (t in this._tiles) this._tiles[t].retain || this._removeTile(t);
        }
      },
      _removeTilesAtZoom: function (t) {
        for (var e in this._tiles)
          this._tiles[e].coords.z === t && this._removeTile(e);
      },
      _removeAllTiles: function () {
        for (var t in this._tiles) this._removeTile(t);
      },
      _invalidateAll: function () {
        for (var t in this._levels)
          Q(this._levels[t].el),
            this._onRemoveLevel(Number(t)),
            delete this._levels[t];
        this._removeAllTiles(), (this._tileZoom = void 0);
      },
      _retainParent: function (t, e, i, n) {
        var o = Math.floor(t / 2),
          r = Math.floor(e / 2),
          s = i - 1,
          a = new I(+o, +r);
        a.z = +s;
        var u = this._tileCoordsToKey(a),
          g = this._tiles[u];
        return g && g.active
          ? ((g.retain = !0), !0)
          : (g && g.loaded && (g.retain = !0),
            s > n ? this._retainParent(o, r, s, n) : !1);
      },
      _retainChildren: function (t, e, i, n) {
        for (var o = 2 * t; o < 2 * t + 2; o++)
          for (var r = 2 * e; r < 2 * e + 2; r++) {
            var s = new I(o, r);
            s.z = i + 1;
            var a = this._tileCoordsToKey(s),
              u = this._tiles[a];
            if (u && u.active) {
              u.retain = !0;
              continue;
            } else u && u.loaded && (u.retain = !0);
            i + 1 < n && this._retainChildren(o, r, i + 1, n);
          }
      },
      _resetView: function (t) {
        var e = t && (t.pinch || t.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
      },
      _animateZoom: function (t) {
        this._setView(t.center, t.zoom, !0, t.noUpdate);
      },
      _clampZoom: function (t) {
        var e = this.options;
        return e.minNativeZoom !== void 0 && t < e.minNativeZoom
          ? e.minNativeZoom
          : e.maxNativeZoom !== void 0 && e.maxNativeZoom < t
          ? e.maxNativeZoom
          : t;
      },
      _setView: function (t, e, i, n) {
        var o = Math.round(e);
        (this.options.maxZoom !== void 0 && o > this.options.maxZoom) ||
        (this.options.minZoom !== void 0 && o < this.options.minZoom)
          ? (o = void 0)
          : (o = this._clampZoom(o));
        var r = this.options.updateWhenZooming && o !== this._tileZoom;
        (!n || r) &&
          ((this._tileZoom = o),
          this._abortLoading && this._abortLoading(),
          this._updateLevels(),
          this._resetGrid(),
          o !== void 0 && this._update(t),
          i || this._pruneTiles(),
          (this._noPrune = !!i)),
          this._setZoomTransforms(t, e);
      },
      _setZoomTransforms: function (t, e) {
        for (var i in this._levels)
          this._setZoomTransform(this._levels[i], t, e);
      },
      _setZoomTransform: function (t, e, i) {
        var n = this._map.getZoomScale(i, t.zoom),
          o = t.origin
            .multiplyBy(n)
            .subtract(this._map._getNewPixelOrigin(e, i))
            .round();
        O.any3d ? kt(t.el, o, n) : ot(t.el, o);
      },
      _resetGrid: function () {
        var t = this._map,
          e = t.options.crs,
          i = (this._tileSize = this.getTileSize()),
          n = this._tileZoom,
          o = this._map.getPixelWorldBounds(this._tileZoom);
        o && (this._globalTileRange = this._pxBoundsToTileRange(o)),
          (this._wrapX = e.wrapLng &&
            !this.options.noWrap && [
              Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
              Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y),
            ]),
          (this._wrapY = e.wrapLat &&
            !this.options.noWrap && [
              Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
              Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y),
            ]);
      },
      _onMoveEnd: function () {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function (t) {
        var e = this._map,
          i = e._animatingZoom
            ? Math.max(e._animateToZoom, e.getZoom())
            : e.getZoom(),
          n = e.getZoomScale(i, this._tileZoom),
          o = e.project(t, this._tileZoom).floor(),
          r = e.getSize().divideBy(n * 2);
        return new V(o.subtract(r), o.add(r));
      },
      _update: function (t) {
        var e = this._map;
        if (e) {
          var i = this._clampZoom(e.getZoom());
          if (
            (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0)
          ) {
            var n = this._getTiledPixelBounds(t),
              o = this._pxBoundsToTileRange(n),
              r = o.getCenter(),
              s = [],
              a = this.options.keepBuffer,
              u = new V(
                o.getBottomLeft().subtract([a, -a]),
                o.getTopRight().add([a, -a])
              );
            if (
              !(
                isFinite(o.min.x) &&
                isFinite(o.min.y) &&
                isFinite(o.max.x) &&
                isFinite(o.max.y)
              )
            )
              throw new Error("Attempted to load an infinite number of tiles");
            for (var g in this._tiles) {
              var T = this._tiles[g].coords;
              (T.z !== this._tileZoom || !u.contains(new I(T.x, T.y))) &&
                (this._tiles[g].current = !1);
            }
            if (Math.abs(i - this._tileZoom) > 1) {
              this._setView(t, i);
              return;
            }
            for (var B = o.min.y; B <= o.max.y; B++)
              for (var W = o.min.x; W <= o.max.x; W++) {
                var _t = new I(W, B);
                if (((_t.z = this._tileZoom), !!this._isValidTile(_t))) {
                  var Nt = this._tiles[this._tileCoordsToKey(_t)];
                  Nt ? (Nt.current = !0) : s.push(_t);
                }
              }
            if (
              (s.sort(function (It, _i) {
                return It.distanceTo(r) - _i.distanceTo(r);
              }),
              s.length !== 0)
            ) {
              this._loading || ((this._loading = !0), this.fire("loading"));
              var Ce = document.createDocumentFragment();
              for (W = 0; W < s.length; W++) this._addTile(s[W], Ce);
              this._level.el.appendChild(Ce);
            }
          }
        }
      },
      _isValidTile: function (t) {
        var e = this._map.options.crs;
        if (!e.infinite) {
          var i = this._globalTileRange;
          if (
            (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x)) ||
            (!e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
          )
            return !1;
        }
        if (!this.options.bounds) return !0;
        var n = this._tileCoordsToBounds(t);
        return tt(this.options.bounds).overlaps(n);
      },
      _keyToBounds: function (t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function (t) {
        var e = this._map,
          i = this.getTileSize(),
          n = t.scaleBy(i),
          o = n.add(i),
          r = e.unproject(n, t.z),
          s = e.unproject(o, t.z);
        return [r, s];
      },
      _tileCoordsToBounds: function (t) {
        var e = this._tileCoordsToNwSe(t),
          i = new it(e[0], e[1]);
        return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
      },
      _tileCoordsToKey: function (t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      _keyToTileCoords: function (t) {
        var e = t.split(":"),
          i = new I(+e[0], +e[1]);
        return (i.z = +e[2]), i;
      },
      _removeTile: function (t) {
        var e = this._tiles[t];
        e &&
          (Q(e.el),
          delete this._tiles[t],
          this.fire("tileunload", {
            tile: e.el,
            coords: this._keyToTileCoords(t),
          }));
      },
      _initTile: function (t) {
        N(t, "leaflet-tile");
        var e = this.getTileSize();
        (t.style.width = e.x + "px"),
          (t.style.height = e.y + "px"),
          (t.onselectstart = P),
          (t.onmousemove = P),
          O.ielt9 && this.options.opacity < 1 && ft(t, this.options.opacity);
      },
      _addTile: function (t, e) {
        var i = this._getTilePos(t),
          n = this._tileCoordsToKey(t),
          o = this.createTile(this._wrapCoords(t), p(this._tileReady, this, t));
        this._initTile(o),
          this.createTile.length < 2 && v(p(this._tileReady, this, t, null, o)),
          ot(o, i),
          (this._tiles[n] = { el: o, coords: t, current: !0 }),
          e.appendChild(o),
          this.fire("tileloadstart", { tile: o, coords: t });
      },
      _tileReady: function (t, e, i) {
        e && this.fire("tileerror", { error: e, tile: i, coords: t });
        var n = this._tileCoordsToKey(t);
        (i = this._tiles[n]),
          i &&
            ((i.loaded = +new Date()),
            this._map._fadeAnimated
              ? (ft(i.el, 0),
                y(this._fadeFrame),
                (this._fadeFrame = v(this._updateOpacity, this)))
              : ((i.active = !0), this._pruneTiles()),
            e ||
              (N(i.el, "leaflet-tile-loaded"),
              this.fire("tileload", { tile: i.el, coords: t })),
            this._noTilesToLoad() &&
              ((this._loading = !1),
              this.fire("load"),
              O.ielt9 || !this._map._fadeAnimated
                ? v(this._pruneTiles, this)
                : setTimeout(p(this._pruneTiles, this), 250)));
      },
      _getTilePos: function (t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function (t) {
        var e = new I(
          this._wrapX ? f(t.x, this._wrapX) : t.x,
          this._wrapY ? f(t.y, this._wrapY) : t.y
        );
        return (e.z = t.z), e;
      },
      _pxBoundsToTileRange: function (t) {
        var e = this.getTileSize();
        return new V(
          t.min.unscaleBy(e).floor(),
          t.max.unscaleBy(e).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function () {
        for (var t in this._tiles) if (!this._tiles[t].loaded) return !1;
        return !0;
      },
    });
    function hr(t) {
      return new se(t);
    }
    var Vt = se.extend({
      options: {
        minZoom: 0,
        maxZoom: 18,
        subdomains: "abc",
        errorTileUrl: "",
        zoomOffset: 0,
        tms: !1,
        zoomReverse: !1,
        detectRetina: !1,
        crossOrigin: !1,
        referrerPolicy: !1,
      },
      initialize: function (t, e) {
        (this._url = t),
          (e = D(this, e)),
          e.detectRetina && O.retina && e.maxZoom > 0
            ? ((e.tileSize = Math.floor(e.tileSize / 2)),
              e.zoomReverse
                ? (e.zoomOffset--,
                  (e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)))
                : (e.zoomOffset++,
                  (e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1))),
              (e.minZoom = Math.max(0, e.minZoom)))
            : e.zoomReverse
            ? (e.minZoom = Math.min(e.maxZoom, e.minZoom))
            : (e.maxZoom = Math.max(e.minZoom, e.maxZoom)),
          typeof e.subdomains == "string" &&
            (e.subdomains = e.subdomains.split("")),
          this.on("tileunload", this._onTileRemove);
      },
      setUrl: function (t, e) {
        return (
          this._url === t && e === void 0 && (e = !0),
          (this._url = t),
          e || this.redraw(),
          this
        );
      },
      createTile: function (t, e) {
        var i = document.createElement("img");
        return (
          Z(i, "load", p(this._tileOnLoad, this, e, i)),
          Z(i, "error", p(this._tileOnError, this, e, i)),
          (this.options.crossOrigin || this.options.crossOrigin === "") &&
            (i.crossOrigin =
              this.options.crossOrigin === !0 ? "" : this.options.crossOrigin),
          typeof this.options.referrerPolicy == "string" &&
            (i.referrerPolicy = this.options.referrerPolicy),
          (i.alt = ""),
          (i.src = this.getTileUrl(t)),
          i
        );
      },
      getTileUrl: function (t) {
        var e = {
          r: O.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl(),
        };
        if (this._map && !this._map.options.crs.infinite) {
          var i = this._globalTileRange.max.y - t.y;
          this.options.tms && (e.y = i), (e["-y"] = i);
        }
        return ht(this._url, d(e, this.options));
      },
      _tileOnLoad: function (t, e) {
        O.ielt9 ? setTimeout(p(t, this, null, e), 0) : t(null, e);
      },
      _tileOnError: function (t, e, i) {
        var n = this.options.errorTileUrl;
        n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
      },
      _onTileRemove: function (t) {
        t.tile.onload = null;
      },
      _getZoomForUrl: function () {
        var t = this._tileZoom,
          e = this.options.maxZoom,
          i = this.options.zoomReverse,
          n = this.options.zoomOffset;
        return i && (t = e - t), t + n;
      },
      _getSubdomain: function (t) {
        var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
        return this.options.subdomains[e];
      },
      _abortLoading: function () {
        var t, e;
        for (t in this._tiles)
          if (
            this._tiles[t].coords.z !== this._tileZoom &&
            ((e = this._tiles[t].el),
            (e.onload = P),
            (e.onerror = P),
            !e.complete)
          ) {
            e.src = ut;
            var i = this._tiles[t].coords;
            Q(e),
              delete this._tiles[t],
              this.fire("tileabort", { tile: e, coords: i });
          }
      },
      _removeTile: function (t) {
        var e = this._tiles[t];
        if (e)
          return (
            e.el.setAttribute("src", ut), se.prototype._removeTile.call(this, t)
          );
      },
      _tileReady: function (t, e, i) {
        if (!(!this._map || (i && i.getAttribute("src") === ut)))
          return se.prototype._tileReady.call(this, t, e, i);
      },
    });
    function yn(t, e) {
      return new Vt(t, e);
    }
    var wn = Vt.extend({
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        layers: "",
        styles: "",
        format: "image/jpeg",
        transparent: !1,
        version: "1.1.1",
      },
      options: { crs: null, uppercase: !1 },
      initialize: function (t, e) {
        this._url = t;
        var i = d({}, this.defaultWmsParams);
        for (var n in e) n in this.options || (i[n] = e[n]);
        e = D(this, e);
        var o = e.detectRetina && O.retina ? 2 : 1,
          r = this.getTileSize();
        (i.width = r.x * o), (i.height = r.y * o), (this.wmsParams = i);
      },
      onAdd: function (t) {
        (this._crs = this.options.crs || t.options.crs),
          (this._wmsVersion = parseFloat(this.wmsParams.version));
        var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
        (this.wmsParams[e] = this._crs.code), Vt.prototype.onAdd.call(this, t);
      },
      getTileUrl: function (t) {
        var e = this._tileCoordsToNwSe(t),
          i = this._crs,
          n = j(i.project(e[0]), i.project(e[1])),
          o = n.min,
          r = n.max,
          s = (
            this._wmsVersion >= 1.3 && this._crs === fn
              ? [o.y, o.x, r.y, r.x]
              : [o.x, o.y, r.x, r.y]
          ).join(","),
          a = Vt.prototype.getTileUrl.call(this, t);
        return (
          a +
          st(this.wmsParams, a, this.options.uppercase) +
          (this.options.uppercase ? "&BBOX=" : "&bbox=") +
          s
        );
      },
      setParams: function (t, e) {
        return d(this.wmsParams, t), e || this.redraw(), this;
      },
    });
    function ur(t, e) {
      return new wn(t, e);
    }
    (Vt.WMS = wn), (yn.wms = ur);
    var Ct = gt.extend({
        options: { padding: 0.1 },
        initialize: function (t) {
          D(this, t), x(this), (this._layers = this._layers || {});
        },
        onAdd: function () {
          this._container ||
            (this._initContainer(),
            this._zoomAnimated && N(this._container, "leaflet-zoom-animated")),
            this.getPane().appendChild(this._container),
            this._update(),
            this.on("update", this._updatePaths, this);
        },
        onRemove: function () {
          this.off("update", this._updatePaths, this), this._destroyContainer();
        },
        getEvents: function () {
          var t = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd,
          };
          return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
        },
        _onAnimZoom: function (t) {
          this._updateTransform(t.center, t.zoom);
        },
        _onZoom: function () {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function (t, e) {
          var i = this._map.getZoomScale(e, this._zoom),
            n = this._map.getSize().multiplyBy(0.5 + this.options.padding),
            o = this._map.project(this._center, e),
            r = n
              .multiplyBy(-i)
              .add(o)
              .subtract(this._map._getNewPixelOrigin(t, e));
          O.any3d ? kt(this._container, r, i) : ot(this._container, r);
        },
        _reset: function () {
          this._update(), this._updateTransform(this._center, this._zoom);
          for (var t in this._layers) this._layers[t]._reset();
        },
        _onZoomEnd: function () {
          for (var t in this._layers) this._layers[t]._project();
        },
        _updatePaths: function () {
          for (var t in this._layers) this._layers[t]._update();
        },
        _update: function () {
          var t = this.options.padding,
            e = this._map.getSize(),
            i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
          (this._bounds = new V(i, i.add(e.multiplyBy(1 + t * 2)).round())),
            (this._center = this._map.getCenter()),
            (this._zoom = this._map.getZoom());
        },
      }),
      Pn = Ct.extend({
        options: { tolerance: 0 },
        getEvents: function () {
          var t = Ct.prototype.getEvents.call(this);
          return (t.viewprereset = this._onViewPreReset), t;
        },
        _onViewPreReset: function () {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function () {
          Ct.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function () {
          var t = (this._container = document.createElement("canvas"));
          Z(t, "mousemove", this._onMouseMove, this),
            Z(
              t,
              "click dblclick mousedown mouseup contextmenu",
              this._onClick,
              this
            ),
            Z(t, "mouseout", this._handleMouseOut, this),
            (t._leaflet_disable_events = !0),
            (this._ctx = t.getContext("2d"));
        },
        _destroyContainer: function () {
          y(this._redrawRequest),
            delete this._ctx,
            Q(this._container),
            J(this._container),
            delete this._container;
        },
        _updatePaths: function () {
          if (!this._postponeUpdatePaths) {
            var t;
            this._redrawBounds = null;
            for (var e in this._layers) (t = this._layers[e]), t._update();
            this._redraw();
          }
        },
        _update: function () {
          if (!(this._map._animatingZoom && this._bounds)) {
            Ct.prototype._update.call(this);
            var t = this._bounds,
              e = this._container,
              i = t.getSize(),
              n = O.retina ? 2 : 1;
            ot(e, t.min),
              (e.width = n * i.x),
              (e.height = n * i.y),
              (e.style.width = i.x + "px"),
              (e.style.height = i.y + "px"),
              O.retina && this._ctx.scale(2, 2),
              this._ctx.translate(-t.min.x, -t.min.y),
              this.fire("update");
          }
        },
        _reset: function () {
          Ct.prototype._reset.call(this),
            this._postponeUpdatePaths &&
              ((this._postponeUpdatePaths = !1), this._updatePaths());
        },
        _initPath: function (t) {
          this._updateDashArray(t), (this._layers[x(t)] = t);
          var e = (t._order = { layer: t, prev: this._drawLast, next: null });
          this._drawLast && (this._drawLast.next = e),
            (this._drawLast = e),
            (this._drawFirst = this._drawFirst || this._drawLast);
        },
        _addPath: function (t) {
          this._requestRedraw(t);
        },
        _removePath: function (t) {
          var e = t._order,
            i = e.next,
            n = e.prev;
          i ? (i.prev = n) : (this._drawLast = n),
            n ? (n.next = i) : (this._drawFirst = i),
            delete t._order,
            delete this._layers[x(t)],
            this._requestRedraw(t);
        },
        _updatePath: function (t) {
          this._extendRedrawBounds(t),
            t._project(),
            t._update(),
            this._requestRedraw(t);
        },
        _updateStyle: function (t) {
          this._updateDashArray(t), this._requestRedraw(t);
        },
        _updateDashArray: function (t) {
          if (typeof t.options.dashArray == "string") {
            var e = t.options.dashArray.split(/[, ]+/),
              i = [],
              n,
              o;
            for (o = 0; o < e.length; o++) {
              if (((n = Number(e[o])), isNaN(n))) return;
              i.push(n);
            }
            t.options._dashArray = i;
          } else t.options._dashArray = t.options.dashArray;
        },
        _requestRedraw: function (t) {
          this._map &&
            (this._extendRedrawBounds(t),
            (this._redrawRequest =
              this._redrawRequest || v(this._redraw, this)));
        },
        _extendRedrawBounds: function (t) {
          if (t._pxBounds) {
            var e = (t.options.weight || 0) + 1;
            (this._redrawBounds = this._redrawBounds || new V()),
              this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])),
              this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
          }
        },
        _redraw: function () {
          (this._redrawRequest = null),
            this._redrawBounds &&
              (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()),
            this._clear(),
            this._draw(),
            (this._redrawBounds = null);
        },
        _clear: function () {
          var t = this._redrawBounds;
          if (t) {
            var e = t.getSize();
            this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
          } else
            this._ctx.save(),
              this._ctx.setTransform(1, 0, 0, 1, 0, 0),
              this._ctx.clearRect(
                0,
                0,
                this._container.width,
                this._container.height
              ),
              this._ctx.restore();
        },
        _draw: function () {
          var t,
            e = this._redrawBounds;
          if ((this._ctx.save(), e)) {
            var i = e.getSize();
            this._ctx.beginPath(),
              this._ctx.rect(e.min.x, e.min.y, i.x, i.y),
              this._ctx.clip();
          }
          this._drawing = !0;
          for (var n = this._drawFirst; n; n = n.next)
            (t = n.layer),
              (!e || (t._pxBounds && t._pxBounds.intersects(e))) &&
                t._updatePath();
          (this._drawing = !1), this._ctx.restore();
        },
        _updatePoly: function (t, e) {
          if (this._drawing) {
            var i,
              n,
              o,
              r,
              s = t._parts,
              a = s.length,
              u = this._ctx;
            if (a) {
              for (u.beginPath(), i = 0; i < a; i++) {
                for (n = 0, o = s[i].length; n < o; n++)
                  (r = s[i][n]), u[n ? "lineTo" : "moveTo"](r.x, r.y);
                e && u.closePath();
              }
              this._fillStroke(u, t);
            }
          }
        },
        _updateCircle: function (t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point,
              i = this._ctx,
              n = Math.max(Math.round(t._radius), 1),
              o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
            o !== 1 && (i.save(), i.scale(1, o)),
              i.beginPath(),
              i.arc(e.x, e.y / o, n, 0, Math.PI * 2, !1),
              o !== 1 && i.restore(),
              this._fillStroke(i, t);
          }
        },
        _fillStroke: function (t, e) {
          var i = e.options;
          i.fill &&
            ((t.globalAlpha = i.fillOpacity),
            (t.fillStyle = i.fillColor || i.color),
            t.fill(i.fillRule || "evenodd")),
            i.stroke &&
              i.weight !== 0 &&
              (t.setLineDash &&
                t.setLineDash((e.options && e.options._dashArray) || []),
              (t.globalAlpha = i.opacity),
              (t.lineWidth = i.weight),
              (t.strokeStyle = i.color),
              (t.lineCap = i.lineCap),
              (t.lineJoin = i.lineJoin),
              t.stroke());
        },
        _onClick: function (t) {
          for (
            var e = this._map.mouseEventToLayerPoint(t),
              i,
              n,
              o = this._drawFirst;
            o;
            o = o.next
          )
            (i = o.layer),
              i.options.interactive &&
                i._containsPoint(e) &&
                (!(t.type === "click" || t.type === "preclick") ||
                  !this._map._draggableMoved(i)) &&
                (n = i);
          this._fireEvent(n ? [n] : !1, t);
        },
        _onMouseMove: function (t) {
          if (
            !(
              !this._map ||
              this._map.dragging.moving() ||
              this._map._animatingZoom
            )
          ) {
            var e = this._map.mouseEventToLayerPoint(t);
            this._handleMouseHover(t, e);
          }
        },
        _handleMouseOut: function (t) {
          var e = this._hoveredLayer;
          e &&
            (nt(this._container, "leaflet-interactive"),
            this._fireEvent([e], t, "mouseout"),
            (this._hoveredLayer = null),
            (this._mouseHoverThrottled = !1));
        },
        _handleMouseHover: function (t, e) {
          if (!this._mouseHoverThrottled) {
            for (var i, n, o = this._drawFirst; o; o = o.next)
              (i = o.layer),
                i.options.interactive && i._containsPoint(e) && (n = i);
            n !== this._hoveredLayer &&
              (this._handleMouseOut(t),
              n &&
                (N(this._container, "leaflet-interactive"),
                this._fireEvent([n], t, "mouseover"),
                (this._hoveredLayer = n))),
              this._fireEvent(
                this._hoveredLayer ? [this._hoveredLayer] : !1,
                t
              ),
              (this._mouseHoverThrottled = !0),
              setTimeout(
                p(function () {
                  this._mouseHoverThrottled = !1;
                }, this),
                32
              );
          }
        },
        _fireEvent: function (t, e, i) {
          this._map._fireDOMEvent(e, i || e.type, t);
        },
        _bringToFront: function (t) {
          var e = t._order;
          if (e) {
            var i = e.next,
              n = e.prev;
            if (i) i.prev = n;
            else return;
            n ? (n.next = i) : i && (this._drawFirst = i),
              (e.prev = this._drawLast),
              (this._drawLast.next = e),
              (e.next = null),
              (this._drawLast = e),
              this._requestRedraw(t);
          }
        },
        _bringToBack: function (t) {
          var e = t._order;
          if (e) {
            var i = e.next,
              n = e.prev;
            if (n) n.next = i;
            else return;
            i ? (i.prev = n) : n && (this._drawLast = n),
              (e.prev = null),
              (e.next = this._drawFirst),
              (this._drawFirst.prev = e),
              (this._drawFirst = e),
              this._requestRedraw(t);
          }
        },
      });
    function bn(t) {
      return O.canvas ? new Pn(t) : null;
    }
    var ae = (function () {
        try {
          return (
            document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
            function (t) {
              return document.createElement("<lvml:" + t + ' class="lvml">');
            }
          );
        } catch {}
        return function (t) {
          return document.createElement(
            "<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">'
          );
        };
      })(),
      lr = {
        _initContainer: function () {
          this._container = G("div", "leaflet-vml-container");
        },
        _update: function () {
          this._map._animatingZoom ||
            (Ct.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function (t) {
          var e = (t._container = ae("shape"));
          N(e, "leaflet-vml-shape " + (this.options.className || "")),
            (e.coordsize = "1 1"),
            (t._path = ae("path")),
            e.appendChild(t._path),
            this._updateStyle(t),
            (this._layers[x(t)] = t);
        },
        _addPath: function (t) {
          var e = t._container;
          this._container.appendChild(e),
            t.options.interactive && t.addInteractiveTarget(e);
        },
        _removePath: function (t) {
          var e = t._container;
          Q(e), t.removeInteractiveTarget(e), delete this._layers[x(t)];
        },
        _updateStyle: function (t) {
          var e = t._stroke,
            i = t._fill,
            n = t.options,
            o = t._container;
          (o.stroked = !!n.stroke),
            (o.filled = !!n.fill),
            n.stroke
              ? (e || (e = t._stroke = ae("stroke")),
                o.appendChild(e),
                (e.weight = n.weight + "px"),
                (e.color = n.color),
                (e.opacity = n.opacity),
                n.dashArray
                  ? (e.dashStyle = et(n.dashArray)
                      ? n.dashArray.join(" ")
                      : n.dashArray.replace(/( *, *)/g, " "))
                  : (e.dashStyle = ""),
                (e.endcap = n.lineCap.replace("butt", "flat")),
                (e.joinstyle = n.lineJoin))
              : e && (o.removeChild(e), (t._stroke = null)),
            n.fill
              ? (i || (i = t._fill = ae("fill")),
                o.appendChild(i),
                (i.color = n.fillColor || n.color),
                (i.opacity = n.fillOpacity))
              : i && (o.removeChild(i), (t._fill = null));
        },
        _updateCircle: function (t) {
          var e = t._point.round(),
            i = Math.round(t._radius),
            n = Math.round(t._radiusY || i);
          this._setPath(
            t,
            t._empty()
              ? "M0 0"
              : "AL " +
                  e.x +
                  "," +
                  e.y +
                  " " +
                  i +
                  "," +
                  n +
                  " 0," +
                  65535 * 360
          );
        },
        _setPath: function (t, e) {
          t._path.v = e;
        },
        _bringToFront: function (t) {
          Ht(t._container);
        },
        _bringToBack: function (t) {
          Wt(t._container);
        },
      },
      Me = O.vml ? ae : Ti,
      he = Ct.extend({
        _initContainer: function () {
          (this._container = Me("svg")),
            this._container.setAttribute("pointer-events", "none"),
            (this._rootGroup = Me("g")),
            this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function () {
          Q(this._container),
            J(this._container),
            delete this._container,
            delete this._rootGroup,
            delete this._svgSize;
        },
        _update: function () {
          if (!(this._map._animatingZoom && this._bounds)) {
            Ct.prototype._update.call(this);
            var t = this._bounds,
              e = t.getSize(),
              i = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) &&
              ((this._svgSize = e),
              i.setAttribute("width", e.x),
              i.setAttribute("height", e.y)),
              ot(i, t.min),
              i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")),
              this.fire("update");
          }
        },
        _initPath: function (t) {
          var e = (t._path = Me("path"));
          t.options.className && N(e, t.options.className),
            t.options.interactive && N(e, "leaflet-interactive"),
            this._updateStyle(t),
            (this._layers[x(t)] = t);
        },
        _addPath: function (t) {
          this._rootGroup || this._initContainer(),
            this._rootGroup.appendChild(t._path),
            t.addInteractiveTarget(t._path);
        },
        _removePath: function (t) {
          Q(t._path),
            t.removeInteractiveTarget(t._path),
            delete this._layers[x(t)];
        },
        _updatePath: function (t) {
          t._project(), t._update();
        },
        _updateStyle: function (t) {
          var e = t._path,
            i = t.options;
          e &&
            (i.stroke
              ? (e.setAttribute("stroke", i.color),
                e.setAttribute("stroke-opacity", i.opacity),
                e.setAttribute("stroke-width", i.weight),
                e.setAttribute("stroke-linecap", i.lineCap),
                e.setAttribute("stroke-linejoin", i.lineJoin),
                i.dashArray
                  ? e.setAttribute("stroke-dasharray", i.dashArray)
                  : e.removeAttribute("stroke-dasharray"),
                i.dashOffset
                  ? e.setAttribute("stroke-dashoffset", i.dashOffset)
                  : e.removeAttribute("stroke-dashoffset"))
              : e.setAttribute("stroke", "none"),
            i.fill
              ? (e.setAttribute("fill", i.fillColor || i.color),
                e.setAttribute("fill-opacity", i.fillOpacity),
                e.setAttribute("fill-rule", i.fillRule || "evenodd"))
              : e.setAttribute("fill", "none"));
        },
        _updatePoly: function (t, e) {
          this._setPath(t, Si(t._parts, e));
        },
        _updateCircle: function (t) {
          var e = t._point,
            i = Math.max(Math.round(t._radius), 1),
            n = Math.max(Math.round(t._radiusY), 1) || i,
            o = "a" + i + "," + n + " 0 1,0 ",
            r = t._empty()
              ? "M0 0"
              : "M" +
                (e.x - i) +
                "," +
                e.y +
                o +
                i * 2 +
                ",0 " +
                o +
                -i * 2 +
                ",0 ";
          this._setPath(t, r);
        },
        _setPath: function (t, e) {
          t._path.setAttribute("d", e);
        },
        _bringToFront: function (t) {
          Ht(t._path);
        },
        _bringToBack: function (t) {
          Wt(t._path);
        },
      });
    O.vml && he.include(lr);
    function xn(t) {
      return O.svg || O.vml ? new he(t) : null;
    }
    U.include({
      getRenderer: function (t) {
        var e =
          t.options.renderer ||
          this._getPaneRenderer(t.options.pane) ||
          this.options.renderer ||
          this._renderer;
        return (
          e || (e = this._renderer = this._createRenderer()),
          this.hasLayer(e) || this.addLayer(e),
          e
        );
      },
      _getPaneRenderer: function (t) {
        if (t === "overlayPane" || t === void 0) return !1;
        var e = this._paneRenderers[t];
        return (
          e === void 0 &&
            ((e = this._createRenderer({ pane: t })),
            (this._paneRenderers[t] = e)),
          e
        );
      },
      _createRenderer: function (t) {
        return (this.options.preferCanvas && bn(t)) || xn(t);
      },
    });
    var Ln = qt.extend({
      initialize: function (t, e) {
        qt.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
      },
      setBounds: function (t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function (t) {
        return (
          (t = tt(t)),
          [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast(),
          ]
        );
      },
    });
    function cr(t, e) {
      return new Ln(t, e);
    }
    (he.create = Me),
      (he.pointsToPath = Si),
      (Mt.geometryToLayer = Pe),
      (Mt.coordsToLatLng = ci),
      (Mt.coordsToLatLngs = be),
      (Mt.latLngToCoords = fi),
      (Mt.latLngsToCoords = xe),
      (Mt.getFeature = jt),
      (Mt.asFeature = Le),
      U.mergeOptions({ boxZoom: !0 });
    var Tn = bt.extend({
      initialize: function (t) {
        (this._map = t),
          (this._container = t._container),
          (this._pane = t._panes.overlayPane),
          (this._resetStateTimeout = 0),
          t.on("unload", this._destroy, this);
      },
      addHooks: function () {
        Z(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function () {
        J(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function () {
        return this._moved;
      },
      _destroy: function () {
        Q(this._pane), delete this._pane;
      },
      _resetState: function () {
        (this._resetStateTimeout = 0), (this._moved = !1);
      },
      _clearDeferredResetState: function () {
        this._resetStateTimeout !== 0 &&
          (clearTimeout(this._resetStateTimeout),
          (this._resetStateTimeout = 0));
      },
      _onMouseDown: function (t) {
        if (!t.shiftKey || (t.which !== 1 && t.button !== 1)) return !1;
        this._clearDeferredResetState(),
          this._resetState(),
          Qt(),
          Ye(),
          (this._startPoint = this._map.mouseEventToContainerPoint(t)),
          Z(
            document,
            {
              contextmenu: Zt,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown,
            },
            this
          );
      },
      _onMouseMove: function (t) {
        this._moved ||
          ((this._moved = !0),
          (this._box = G("div", "leaflet-zoom-box", this._container)),
          N(this._container, "leaflet-crosshair"),
          this._map.fire("boxzoomstart")),
          (this._point = this._map.mouseEventToContainerPoint(t));
        var e = new V(this._point, this._startPoint),
          i = e.getSize();
        ot(this._box, e.min),
          (this._box.style.width = i.x + "px"),
          (this._box.style.height = i.y + "px");
      },
      _finish: function () {
        this._moved && (Q(this._box), nt(this._container, "leaflet-crosshair")),
          te(),
          $e(),
          J(
            document,
            {
              contextmenu: Zt,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown,
            },
            this
          );
      },
      _onMouseUp: function (t) {
        if (
          !(t.which !== 1 && t.button !== 1) &&
          (this._finish(), !!this._moved)
        ) {
          this._clearDeferredResetState(),
            (this._resetStateTimeout = setTimeout(
              p(this._resetState, this),
              0
            ));
          var e = new it(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
        }
      },
      _onKeyDown: function (t) {
        t.keyCode === 27 &&
          (this._finish(), this._clearDeferredResetState(), this._resetState());
      },
    });
    U.addInitHook("addHandler", "boxZoom", Tn),
      U.mergeOptions({ doubleClickZoom: !0 });
    var Sn = bt.extend({
      addHooks: function () {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function () {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function (t) {
        var e = this._map,
          i = e.getZoom(),
          n = e.options.zoomDelta,
          o = t.originalEvent.shiftKey ? i - n : i + n;
        e.options.doubleClickZoom === "center"
          ? e.setZoom(o)
          : e.setZoomAround(t.containerPoint, o);
      },
    });
    U.addInitHook("addHandler", "doubleClickZoom", Sn),
      U.mergeOptions({
        dragging: !0,
        inertia: !0,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: 0.2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0,
      });
    var En = bt.extend({
      addHooks: function () {
        if (!this._draggable) {
          var t = this._map;
          (this._draggable = new Ot(t._mapPane, t._container)),
            this._draggable.on(
              {
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this
            ),
            this._draggable.on("predrag", this._onPreDragLimit, this),
            t.options.worldCopyJump &&
              (this._draggable.on("predrag", this._onPreDragWrap, this),
              t.on("zoomend", this._onZoomEnd, this),
              t.whenReady(this._onZoomEnd, this));
        }
        N(this._map._container, "leaflet-grab leaflet-touch-drag"),
          this._draggable.enable(),
          (this._positions = []),
          (this._times = []);
      },
      removeHooks: function () {
        nt(this._map._container, "leaflet-grab"),
          nt(this._map._container, "leaflet-touch-drag"),
          this._draggable.disable();
      },
      moved: function () {
        return this._draggable && this._draggable._moved;
      },
      moving: function () {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function () {
        var t = this._map;
        if (
          (t._stop(),
          this._map.options.maxBounds && this._map.options.maxBoundsViscosity)
        ) {
          var e = tt(this._map.options.maxBounds);
          (this._offsetLimit = j(
            this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
            this._map
              .latLngToContainerPoint(e.getSouthEast())
              .multiplyBy(-1)
              .add(this._map.getSize())
          )),
            (this._viscosity = Math.min(
              1,
              Math.max(0, this._map.options.maxBoundsViscosity)
            ));
        } else this._offsetLimit = null;
        t.fire("movestart").fire("dragstart"),
          t.options.inertia && ((this._positions = []), (this._times = []));
      },
      _onDrag: function (t) {
        if (this._map.options.inertia) {
          var e = (this._lastTime = +new Date()),
            i = (this._lastPos =
              this._draggable._absPos || this._draggable._newPos);
          this._positions.push(i), this._times.push(e), this._prunePositions(e);
        }
        this._map.fire("move", t).fire("drag", t);
      },
      _prunePositions: function (t) {
        for (; this._positions.length > 1 && t - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function () {
        var t = this._map.getSize().divideBy(2),
          e = this._map.latLngToLayerPoint([0, 0]);
        (this._initialWorldOffset = e.subtract(t).x),
          (this._worldWidth = this._map.getPixelWorldBounds().getSize().x);
      },
      _viscousLimit: function (t, e) {
        return t - (t - e) * this._viscosity;
      },
      _onPreDragLimit: function () {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var t = this._draggable._newPos.subtract(this._draggable._startPos),
            e = this._offsetLimit;
          t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)),
            t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)),
            t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)),
            t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)),
            (this._draggable._newPos = this._draggable._startPos.add(t));
        }
      },
      _onPreDragWrap: function () {
        var t = this._worldWidth,
          e = Math.round(t / 2),
          i = this._initialWorldOffset,
          n = this._draggable._newPos.x,
          o = ((n - e + i) % t) + e - i,
          r = ((n + e + i) % t) - e - i,
          s = Math.abs(o + i) < Math.abs(r + i) ? o : r;
        (this._draggable._absPos = this._draggable._newPos.clone()),
          (this._draggable._newPos.x = s);
      },
      _onDragEnd: function (t) {
        var e = this._map,
          i = e.options,
          n = !i.inertia || t.noInertia || this._times.length < 2;
        if ((e.fire("dragend", t), n)) e.fire("moveend");
        else {
          this._prunePositions(+new Date());
          var o = this._lastPos.subtract(this._positions[0]),
            r = (this._lastTime - this._times[0]) / 1e3,
            s = i.easeLinearity,
            a = o.multiplyBy(s / r),
            u = a.distanceTo([0, 0]),
            g = Math.min(i.inertiaMaxSpeed, u),
            T = a.multiplyBy(g / u),
            B = g / (i.inertiaDeceleration * s),
            W = T.multiplyBy(-B / 2).round();
          !W.x && !W.y
            ? e.fire("moveend")
            : ((W = e._limitOffset(W, e.options.maxBounds)),
              v(function () {
                e.panBy(W, {
                  duration: B,
                  easeLinearity: s,
                  noMoveStart: !0,
                  animate: !0,
                });
              }));
        }
      },
    });
    U.addInitHook("addHandler", "dragging", En),
      U.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 });
    var Mn = bt.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173],
      },
      initialize: function (t) {
        (this._map = t),
          this._setPanDelta(t.options.keyboardPanDelta),
          this._setZoomDelta(t.options.zoomDelta);
      },
      addHooks: function () {
        var t = this._map._container;
        t.tabIndex <= 0 && (t.tabIndex = "0"),
          Z(
            t,
            {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown,
            },
            this
          ),
          this._map.on(
            { focus: this._addHooks, blur: this._removeHooks },
            this
          );
      },
      removeHooks: function () {
        this._removeHooks(),
          J(
            this._map._container,
            {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown,
            },
            this
          ),
          this._map.off(
            { focus: this._addHooks, blur: this._removeHooks },
            this
          );
      },
      _onMouseDown: function () {
        if (!this._focused) {
          var t = document.body,
            e = document.documentElement,
            i = t.scrollTop || e.scrollTop,
            n = t.scrollLeft || e.scrollLeft;
          this._map._container.focus(), window.scrollTo(n, i);
        }
      },
      _onFocus: function () {
        (this._focused = !0), this._map.fire("focus");
      },
      _onBlur: function () {
        (this._focused = !1), this._map.fire("blur");
      },
      _setPanDelta: function (t) {
        var e = (this._panKeys = {}),
          i = this.keyCodes,
          n,
          o;
        for (n = 0, o = i.left.length; n < o; n++) e[i.left[n]] = [-1 * t, 0];
        for (n = 0, o = i.right.length; n < o; n++) e[i.right[n]] = [t, 0];
        for (n = 0, o = i.down.length; n < o; n++) e[i.down[n]] = [0, t];
        for (n = 0, o = i.up.length; n < o; n++) e[i.up[n]] = [0, -1 * t];
      },
      _setZoomDelta: function (t) {
        var e = (this._zoomKeys = {}),
          i = this.keyCodes,
          n,
          o;
        for (n = 0, o = i.zoomIn.length; n < o; n++) e[i.zoomIn[n]] = t;
        for (n = 0, o = i.zoomOut.length; n < o; n++) e[i.zoomOut[n]] = -t;
      },
      _addHooks: function () {
        Z(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function () {
        J(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function (t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var e = t.keyCode,
            i = this._map,
            n;
          if (e in this._panKeys) {
            if (!i._panAnim || !i._panAnim._inProgress)
              if (
                ((n = this._panKeys[e]),
                t.shiftKey && (n = R(n).multiplyBy(3)),
                i.options.maxBounds &&
                  (n = i._limitOffset(R(n), i.options.maxBounds)),
                i.options.worldCopyJump)
              ) {
                var o = i.wrapLatLng(
                  i.unproject(i.project(i.getCenter()).add(n))
                );
                i.panTo(o);
              } else i.panBy(n);
          } else if (e in this._zoomKeys)
            i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
          else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
            i.closePopup();
          else return;
          Zt(t);
        }
      },
    });
    U.addInitHook("addHandler", "keyboard", Mn),
      U.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60,
      });
    var Cn = bt.extend({
      addHooks: function () {
        Z(this._map._container, "wheel", this._onWheelScroll, this),
          (this._delta = 0);
      },
      removeHooks: function () {
        J(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function (t) {
        var e = Ji(t),
          i = this._map.options.wheelDebounceTime;
        (this._delta += e),
          (this._lastMousePos = this._map.mouseEventToContainerPoint(t)),
          this._startTime || (this._startTime = +new Date());
        var n = Math.max(i - (+new Date() - this._startTime), 0);
        clearTimeout(this._timer),
          (this._timer = setTimeout(p(this._performZoom, this), n)),
          Zt(t);
      },
      _performZoom: function () {
        var t = this._map,
          e = t.getZoom(),
          i = this._map.options.zoomSnap || 0;
        t._stop();
        var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
          o = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(n))))) / Math.LN2,
          r = i ? Math.ceil(o / i) * i : o,
          s = t._limitZoom(e + (this._delta > 0 ? r : -r)) - e;
        (this._delta = 0),
          (this._startTime = null),
          s &&
            (t.options.scrollWheelZoom === "center"
              ? t.setZoom(e + s)
              : t.setZoomAround(this._lastMousePos, e + s));
      },
    });
    U.addInitHook("addHandler", "scrollWheelZoom", Cn);
    var fr = 600;
    U.mergeOptions({
      tapHold: O.touchNative && O.safari && O.mobile,
      tapTolerance: 15,
    });
    var Rn = bt.extend({
      addHooks: function () {
        Z(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function () {
        J(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function (t) {
        if ((clearTimeout(this._holdTimeout), t.touches.length === 1)) {
          var e = t.touches[0];
          (this._startPos = this._newPos = new I(e.clientX, e.clientY)),
            (this._holdTimeout = setTimeout(
              p(function () {
                this._cancel(),
                  this._isTapValid() &&
                    (Z(document, "touchend", at),
                    Z(
                      document,
                      "touchend touchcancel",
                      this._cancelClickPrevent
                    ),
                    this._simulateEvent("contextmenu", e));
              }, this),
              fr
            )),
            Z(document, "touchend touchcancel contextmenu", this._cancel, this),
            Z(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        J(document, "touchend", at), J(document, "touchend touchcancel", t);
      },
      _cancel: function () {
        clearTimeout(this._holdTimeout),
          J(document, "touchend touchcancel contextmenu", this._cancel, this),
          J(document, "touchmove", this._onMove, this);
      },
      _onMove: function (t) {
        var e = t.touches[0];
        this._newPos = new I(e.clientX, e.clientY);
      },
      _isTapValid: function () {
        return (
          this._newPos.distanceTo(this._startPos) <=
          this._map.options.tapTolerance
        );
      },
      _simulateEvent: function (t, e) {
        var i = new MouseEvent(t, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY,
        });
        (i._simulated = !0), e.target.dispatchEvent(i);
      },
    });
    U.addInitHook("addHandler", "tapHold", Rn),
      U.mergeOptions({ touchZoom: O.touch, bounceAtZoomLimits: !0 });
    var On = bt.extend({
      addHooks: function () {
        N(this._map._container, "leaflet-touch-zoom"),
          Z(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function () {
        nt(this._map._container, "leaflet-touch-zoom"),
          J(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function (t) {
        var e = this._map;
        if (
          !(
            !t.touches ||
            t.touches.length !== 2 ||
            e._animatingZoom ||
            this._zooming
          )
        ) {
          var i = e.mouseEventToContainerPoint(t.touches[0]),
            n = e.mouseEventToContainerPoint(t.touches[1]);
          (this._centerPoint = e.getSize()._divideBy(2)),
            (this._startLatLng = e.containerPointToLatLng(this._centerPoint)),
            e.options.touchZoom !== "center" &&
              (this._pinchStartLatLng = e.containerPointToLatLng(
                i.add(n)._divideBy(2)
              )),
            (this._startDist = i.distanceTo(n)),
            (this._startZoom = e.getZoom()),
            (this._moved = !1),
            (this._zooming = !0),
            e._stop(),
            Z(document, "touchmove", this._onTouchMove, this),
            Z(document, "touchend touchcancel", this._onTouchEnd, this),
            at(t);
        }
      },
      _onTouchMove: function (t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var e = this._map,
            i = e.mouseEventToContainerPoint(t.touches[0]),
            n = e.mouseEventToContainerPoint(t.touches[1]),
            o = i.distanceTo(n) / this._startDist;
          if (
            ((this._zoom = e.getScaleZoom(o, this._startZoom)),
            !e.options.bounceAtZoomLimits &&
              ((this._zoom < e.getMinZoom() && o < 1) ||
                (this._zoom > e.getMaxZoom() && o > 1)) &&
              (this._zoom = e._limitZoom(this._zoom)),
            e.options.touchZoom === "center")
          ) {
            if (((this._center = this._startLatLng), o === 1)) return;
          } else {
            var r = i._add(n)._divideBy(2)._subtract(this._centerPoint);
            if (o === 1 && r.x === 0 && r.y === 0) return;
            this._center = e.unproject(
              e.project(this._pinchStartLatLng, this._zoom).subtract(r),
              this._zoom
            );
          }
          this._moved || (e._moveStart(!0, !1), (this._moved = !0)),
            y(this._animRequest);
          var s = p(
            e._move,
            e,
            this._center,
            this._zoom,
            { pinch: !0, round: !1 },
            void 0
          );
          (this._animRequest = v(s, this, !0)), at(t);
        }
      },
      _onTouchEnd: function () {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        (this._zooming = !1),
          y(this._animRequest),
          J(document, "touchmove", this._onTouchMove, this),
          J(document, "touchend touchcancel", this._onTouchEnd, this),
          this._map.options.zoomAnimation
            ? this._map._animateZoom(
                this._center,
                this._map._limitZoom(this._zoom),
                !0,
                this._map.options.zoomSnap
              )
            : this._map._resetView(
                this._center,
                this._map._limitZoom(this._zoom)
              );
      },
    });
    U.addInitHook("addHandler", "touchZoom", On),
      (U.BoxZoom = Tn),
      (U.DoubleClickZoom = Sn),
      (U.Drag = En),
      (U.Keyboard = Mn),
      (U.ScrollWheelZoom = Cn),
      (U.TapHold = Rn),
      (U.TouchZoom = On),
      (h.Bounds = V),
      (h.Browser = O),
      (h.CRS = Tt),
      (h.Canvas = Pn),
      (h.Circle = li),
      (h.CircleMarker = we),
      (h.Class = M),
      (h.Control = pt),
      (h.DivIcon = vn),
      (h.DivOverlay = xt),
      (h.DomEvent = Ro),
      (h.DomUtil = Mo),
      (h.Draggable = Ot),
      (h.Evented = $),
      (h.FeatureGroup = St),
      (h.GeoJSON = Mt),
      (h.GridLayer = se),
      (h.Handler = bt),
      (h.Icon = Gt),
      (h.ImageOverlay = Te),
      (h.LatLng = K),
      (h.LatLngBounds = it),
      (h.Layer = gt),
      (h.LayerGroup = Ut),
      (h.LineUtil = Wo),
      (h.Map = U),
      (h.Marker = ye),
      (h.Mixin = Zo),
      (h.Path = At),
      (h.Point = I),
      (h.PolyUtil = Uo),
      (h.Polygon = qt),
      (h.Polyline = Et),
      (h.Popup = Se),
      (h.PosAnimation = Qi),
      (h.Projection = Go),
      (h.Rectangle = Ln),
      (h.Renderer = Ct),
      (h.SVG = he),
      (h.SVGOverlay = gn),
      (h.TileLayer = Vt),
      (h.Tooltip = Ee),
      (h.Transformation = Ze),
      (h.Util = C),
      (h.VideoOverlay = pn),
      (h.bind = p),
      (h.bounds = j),
      (h.canvas = bn),
      (h.circle = Jo),
      (h.circleMarker = Xo),
      (h.control = ne),
      (h.divIcon = ar),
      (h.extend = d),
      (h.featureGroup = Ko),
      (h.geoJSON = mn),
      (h.geoJson = er),
      (h.gridLayer = hr),
      (h.icon = Yo),
      (h.imageOverlay = ir),
      (h.latLng = X),
      (h.latLngBounds = tt),
      (h.layerGroup = Vo),
      (h.map = Oo),
      (h.marker = $o),
      (h.point = R),
      (h.polygon = tr),
      (h.polyline = Qo),
      (h.popup = rr),
      (h.rectangle = cr),
      (h.setOptions = D),
      (h.stamp = x),
      (h.svg = xn),
      (h.svgOverlay = or),
      (h.tileLayer = yn),
      (h.tooltip = sr),
      (h.transformation = Yt),
      (h.version = w),
      (h.videoOverlay = nr);
    var dr = window.L;
    (h.noConflict = function () {
      return (window.L = dr), this;
    }),
      (window.L = h);
  });
})(Tr, vt);
function Sr(m) {
  const { x: l, y: h, altitude: w } = m,
    d = new Map();
  m.crs && d.set("crs", m.crs),
    m.uncertaintyInMeters && d.set("u", m.uncertaintyInMeters.toString());
  function* c(x) {
    for (const A of x) yield A.join("=");
  }
  let E = `geo:${(w ? [h, l, w] : [h, l]).join(",")}`;
  return d.size > 0 && (E = [E, ...c(d)].join()), E;
}
class Er extends URL {
  constructor(h) {
    super(Sr(h));
    Y(this, "x");
    Y(this, "y");
    Y(this, "altitude");
    Y(this, "crs");
    Y(this, "uncertainty");
    (this.x = h.x),
      (this.y = h.y),
      (this.altitude = h.altitude),
      (this.crs = h.crs),
      (this.uncertainty = h.uncertaintyInMeters);
  }
  toString() {
    return super.toString();
  }
  get latLngTuple() {
    return [this.y, this.x];
  }
  get xyTuple() {
    return [this.x, this.y];
  }
}
function Mr(...m) {
  let [l, h] = m;
  const w = document.createElement("progress");
  w.textContent = "Getting milepost…";
  const d = vt.divIcon({ html: w });
  return h ? (h.icon = d) : (h = { icon: d }), vt.marker(l, h);
}
const zn = 4326,
  Bn = new vt.LatLngBounds([
    [45.54, -116.91],
    [49.05, -124.79],
  ]);
var jn = {},
  le = {},
  Cr = {
    get exports() {
      return le;
    },
    set exports(m) {
      le = m;
    },
  };
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ (function (
  m
) {
  var l,
    h,
    w,
    d,
    c,
    p,
    E,
    x,
    A,
    f,
    P,
    b,
    k,
    H,
    D,
    st,
    lt,
    ht,
    et,
    ct,
    ut,
    Lt,
    yt;
  (function (q) {
    var mt =
      typeof yi == "object"
        ? yi
        : typeof self == "object"
        ? self
        : typeof this == "object"
        ? this
        : {};
    q(_(mt, _(m.exports)));
    function _(v, y) {
      return (
        v !== mt &&
          (typeof Object.create == "function"
            ? Object.defineProperty(v, "__esModule", { value: !0 })
            : (v.__esModule = !0)),
        function (C, M) {
          return (v[C] = y ? y(C, M) : M);
        }
      );
    }
  })(function (q) {
    var mt =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (_, v) {
          _.__proto__ = v;
        }) ||
      function (_, v) {
        for (var y in v) v.hasOwnProperty(y) && (_[y] = v[y]);
      };
    (l = function (_, v) {
      mt(_, v);
      function y() {
        this.constructor = _;
      }
      _.prototype =
        v === null ? Object.create(v) : ((y.prototype = v.prototype), new y());
    }),
      (h =
        Object.assign ||
        function (_) {
          for (var v, y = 1, C = arguments.length; y < C; y++) {
            v = arguments[y];
            for (var M in v)
              Object.prototype.hasOwnProperty.call(v, M) && (_[M] = v[M]);
          }
          return _;
        }),
      (w = function (_, v) {
        var y = {};
        for (var C in _)
          Object.prototype.hasOwnProperty.call(_, C) &&
            v.indexOf(C) < 0 &&
            (y[C] = _[C]);
        if (_ != null && typeof Object.getOwnPropertySymbols == "function")
          for (
            var M = 0, C = Object.getOwnPropertySymbols(_);
            M < C.length;
            M++
          )
            v.indexOf(C[M]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(_, C[M]) &&
              (y[C[M]] = _[C[M]]);
        return y;
      }),
      (d = function (_, v, y, C) {
        var M = arguments.length,
          S =
            M < 3
              ? v
              : C === null
              ? (C = Object.getOwnPropertyDescriptor(v, y))
              : C,
          z;
        if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
          S = Reflect.decorate(_, v, y, C);
        else
          for (var $ = _.length - 1; $ >= 0; $--)
            (z = _[$]) &&
              (S = (M < 3 ? z(S) : M > 3 ? z(v, y, S) : z(v, y)) || S);
        return M > 3 && S && Object.defineProperty(v, y, S), S;
      }),
      (c = function (_, v) {
        return function (y, C) {
          v(y, C, _);
        };
      }),
      (p = function (_, v) {
        if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
          return Reflect.metadata(_, v);
      }),
      (E = function (_, v, y, C) {
        function M(S) {
          return S instanceof y
            ? S
            : new y(function (z) {
                z(S);
              });
        }
        return new (y || (y = Promise))(function (S, z) {
          function $(R) {
            try {
              F(C.next(R));
            } catch (V) {
              z(V);
            }
          }
          function I(R) {
            try {
              F(C.throw(R));
            } catch (V) {
              z(V);
            }
          }
          function F(R) {
            R.done ? S(R.value) : M(R.value).then($, I);
          }
          F((C = C.apply(_, v || [])).next());
        });
      }),
      (x = function (_, v) {
        var y = {
            label: 0,
            sent: function () {
              if (S[0] & 1) throw S[1];
              return S[1];
            },
            trys: [],
            ops: [],
          },
          C,
          M,
          S,
          z;
        return (
          (z = { next: $(0), throw: $(1), return: $(2) }),
          typeof Symbol == "function" &&
            (z[Symbol.iterator] = function () {
              return this;
            }),
          z
        );
        function $(F) {
          return function (R) {
            return I([F, R]);
          };
        }
        function I(F) {
          if (C) throw new TypeError("Generator is already executing.");
          for (; y; )
            try {
              if (
                ((C = 1),
                M &&
                  (S =
                    F[0] & 2
                      ? M.return
                      : F[0]
                      ? M.throw || ((S = M.return) && S.call(M), 0)
                      : M.next) &&
                  !(S = S.call(M, F[1])).done)
              )
                return S;
              switch (((M = 0), S && (F = [F[0] & 2, S.value]), F[0])) {
                case 0:
                case 1:
                  S = F;
                  break;
                case 4:
                  return y.label++, { value: F[1], done: !1 };
                case 5:
                  y.label++, (M = F[1]), (F = [0]);
                  continue;
                case 7:
                  (F = y.ops.pop()), y.trys.pop();
                  continue;
                default:
                  if (
                    ((S = y.trys),
                    !(S = S.length > 0 && S[S.length - 1]) &&
                      (F[0] === 6 || F[0] === 2))
                  ) {
                    y = 0;
                    continue;
                  }
                  if (F[0] === 3 && (!S || (F[1] > S[0] && F[1] < S[3]))) {
                    y.label = F[1];
                    break;
                  }
                  if (F[0] === 6 && y.label < S[1]) {
                    (y.label = S[1]), (S = F);
                    break;
                  }
                  if (S && y.label < S[2]) {
                    (y.label = S[2]), y.ops.push(F);
                    break;
                  }
                  S[2] && y.ops.pop(), y.trys.pop();
                  continue;
              }
              F = v.call(_, y);
            } catch (R) {
              (F = [6, R]), (M = 0);
            } finally {
              C = S = 0;
            }
          if (F[0] & 5) throw F[1];
          return { value: F[0] ? F[1] : void 0, done: !0 };
        }
      }),
      (yt = function (_, v, y, C) {
        C === void 0 && (C = y), (_[C] = v[y]);
      }),
      (A = function (_, v) {
        for (var y in _)
          y !== "default" && !v.hasOwnProperty(y) && (v[y] = _[y]);
      }),
      (f = function (_) {
        var v = typeof Symbol == "function" && Symbol.iterator,
          y = v && _[v],
          C = 0;
        if (y) return y.call(_);
        if (_ && typeof _.length == "number")
          return {
            next: function () {
              return (
                _ && C >= _.length && (_ = void 0),
                { value: _ && _[C++], done: !_ }
              );
            },
          };
        throw new TypeError(
          v ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }),
      (P = function (_, v) {
        var y = typeof Symbol == "function" && _[Symbol.iterator];
        if (!y) return _;
        var C = y.call(_),
          M,
          S = [],
          z;
        try {
          for (; (v === void 0 || v-- > 0) && !(M = C.next()).done; )
            S.push(M.value);
        } catch ($) {
          z = { error: $ };
        } finally {
          try {
            M && !M.done && (y = C.return) && y.call(C);
          } finally {
            if (z) throw z.error;
          }
        }
        return S;
      }),
      (b = function () {
        for (var _ = [], v = 0; v < arguments.length; v++)
          _ = _.concat(P(arguments[v]));
        return _;
      }),
      (k = function () {
        for (var _ = 0, v = 0, y = arguments.length; v < y; v++)
          _ += arguments[v].length;
        for (var C = Array(_), M = 0, v = 0; v < y; v++)
          for (var S = arguments[v], z = 0, $ = S.length; z < $; z++, M++)
            C[M] = S[z];
        return C;
      }),
      (H = function (_) {
        return this instanceof H ? ((this.v = _), this) : new H(_);
      }),
      (D = function (_, v, y) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var C = y.apply(_, v || []),
          M,
          S = [];
        return (
          (M = {}),
          z("next"),
          z("throw"),
          z("return"),
          (M[Symbol.asyncIterator] = function () {
            return this;
          }),
          M
        );
        function z(j) {
          C[j] &&
            (M[j] = function (it) {
              return new Promise(function (tt, K) {
                S.push([j, it, tt, K]) > 1 || $(j, it);
              });
            });
        }
        function $(j, it) {
          try {
            I(C[j](it));
          } catch (tt) {
            V(S[0][3], tt);
          }
        }
        function I(j) {
          j.value instanceof H
            ? Promise.resolve(j.value.v).then(F, R)
            : V(S[0][2], j);
        }
        function F(j) {
          $("next", j);
        }
        function R(j) {
          $("throw", j);
        }
        function V(j, it) {
          j(it), S.shift(), S.length && $(S[0][0], S[0][1]);
        }
      }),
      (st = function (_) {
        var v, y;
        return (
          (v = {}),
          C("next"),
          C("throw", function (M) {
            throw M;
          }),
          C("return"),
          (v[Symbol.iterator] = function () {
            return this;
          }),
          v
        );
        function C(M, S) {
          v[M] = _[M]
            ? function (z) {
                return (y = !y)
                  ? { value: H(_[M](z)), done: M === "return" }
                  : S
                  ? S(z)
                  : z;
              }
            : S;
        }
      }),
      (lt = function (_) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var v = _[Symbol.asyncIterator],
          y;
        return v
          ? v.call(_)
          : ((_ = typeof f == "function" ? f(_) : _[Symbol.iterator]()),
            (y = {}),
            C("next"),
            C("throw"),
            C("return"),
            (y[Symbol.asyncIterator] = function () {
              return this;
            }),
            y);
        function C(S) {
          y[S] =
            _[S] &&
            function (z) {
              return new Promise(function ($, I) {
                (z = _[S](z)), M($, I, z.done, z.value);
              });
            };
        }
        function M(S, z, $, I) {
          Promise.resolve(I).then(function (F) {
            S({ value: F, done: $ });
          }, z);
        }
      }),
      (ht = function (_, v) {
        return (
          Object.defineProperty
            ? Object.defineProperty(_, "raw", { value: v })
            : (_.raw = v),
          _
        );
      }),
      (et = function (_) {
        if (_ && _.__esModule) return _;
        var v = {};
        if (_ != null)
          for (var y in _) Object.hasOwnProperty.call(_, y) && (v[y] = _[y]);
        return (v.default = _), v;
      }),
      (ct = function (_) {
        return _ && _.__esModule ? _ : { default: _ };
      }),
      (ut = function (_, v) {
        if (!v.has(_))
          throw new TypeError("attempted to get private field on non-instance");
        return v.get(_);
      }),
      (Lt = function (_, v, y) {
        if (!v.has(_))
          throw new TypeError("attempted to set private field on non-instance");
        return v.set(_, y), y;
      }),
      q("__extends", l),
      q("__assign", h),
      q("__rest", w),
      q("__decorate", d),
      q("__param", c),
      q("__metadata", p),
      q("__awaiter", E),
      q("__generator", x),
      q("__exportStar", A),
      q("__createBinding", yt),
      q("__values", f),
      q("__read", P),
      q("__spread", b),
      q("__spreadArrays", k),
      q("__await", H),
      q("__asyncGenerator", D),
      q("__asyncDelegator", st),
      q("__asyncValues", lt),
      q("__makeTemplateObject", ht),
      q("__importStar", et),
      q("__importDefault", ct),
      q("__classPrivateFieldGet", ut),
      q("__classPrivateFieldSet", Lt);
  });
})(Cr);
var pi = {},
  Zn;
function Vn() {
  return (
    Zn ||
      ((Zn = 1),
      (function (m) {
        Object.defineProperty(m, "__esModule", { value: !0 });
        var l;
        (function (w) {
          (w[(w.INCREASE = 1)] = "INCREASE"),
            (w[(w.DECREASE = 2)] = "DECREASE"),
            (w[(w.BOTH = 3)] = "BOTH"),
            (w[(w.RAMP = 4)] = "RAMP"),
            (w[(w.FT = 8)] = "FT"),
            (w[(w.TURNBACK = 16)] = "TURNBACK");
        })((l = m.LrsType || (m.LrsType = {})));
        function h(w) {
          var d = null;
          if (typeof w == "string")
            if (/^i/i.test(w)) d = l.INCREASE;
            else if (/^d/i.test(w)) d = l.DECREASE;
            else if (/^b/i.test(w)) d = l.BOTH;
            else if (/^r/i.test(w)) d = l.RAMP;
            else if (/^f/i.test(w)) d = l.FT;
            else if (/t/i.test(w)) d = l.TURNBACK;
            else throw new Error("Invalid value: " + w);
          else if (
            (typeof w == "number" && w >= 1 && w <= 4) ||
            w === 8 ||
            w === 16
          )
            d = w;
          else throw new Error("Invalid value: " + w);
          return d;
        }
        m.getLrsTypeValue = h;
      })(pi)),
    pi
  );
}
var ue = {},
  Oe = {},
  Dn;
function bi() {
  if (Dn) return Oe;
  (Dn = 1), Object.defineProperty(Oe, "__esModule", { value: !0 });
  var m = le,
    l = (function (h) {
      m.__extends(w, h);
      function w(d, c) {
        var p = this,
          E = 'Not in expected format: "' + d + '".';
        return (
          c && (E += " Expected format: " + c),
          (p = h.call(this, E) || this),
          (p.value = d),
          (p.expectedFormat = c || null),
          p
        );
      }
      return w;
    })(Error);
  return (Oe.default = l), Oe;
}
var gi = {},
  Nn;
function ze() {
  return (
    Nn ||
      ((Nn = 1),
      (function (m) {
        Object.defineProperty(m, "__esModule", { value: !0 });
        var l = bi();
        m.routeRe = /^(\d{3})(?:([A-Z0-9]{2})([A-Z0-9]{0,6}))?/i;
        var h = {
            AR: "Alternate Route",
            CD: "Collector Distributor (Dec)",
            CO: "Couplet",
            CI: "Collector Distributor (Inc)",
            FI: "Frontage Road (Inc)",
            FD: "Frontage Road (Dec)",
            LX: "Crossroad within Interchange",
            RL: "Reversible Lane",
            SP: "Spur",
            TB: "Transitional Turnback",
            TR: "Temporary Route",
            PR: "Proposed Route",
            FS: "Ferry Ship (Boat)",
            FT: "Ferry Terminal",
            UC: "Under Construction",
            HI: "Grade-Separated HOV (Inc)",
            HD: "Grade-Separated HOV (Dec)",
          },
          w = {
            P: "Off Ramp (Inc)",
            Q: "On Ramp (Inc)",
            R: "Off Ramp (Dec)",
            S: "On Ramp (Dec)",
          };
        for (var d in w)
          if (w.hasOwnProperty(d)) {
            for (var c = w[d], p = void 0, E = 1, x = 10; E < x; E += 1)
              (p = "" + d + E), (h[p] = c + " " + E);
            (p = d + "U"), (h[p] = "Extension of " + d + " ramp");
          }
        var A = {
            "2NDST": "2nd St.",
            "3RDAVE": "3rd Ave.",
            "6THST": "6th St.",
            ABERDN: "Aberdeen",
            ANACOR: "Anacortes",
            ANACRT: "Anacortes",
            ANAFT2: "ANAFT2",
            AURORA: "Aurora",
            BOONE: "Boone St.",
            BREMER: "Bremerton",
            BROWNE: "Browne St.",
            BURKE: "Beverly Burke Rd.",
            CANBY: "Fort Canby",
            CEDRWY: "Cedar Way",
            CLEELM: "Cle Elem",
            CLINTN: "Clifton",
            COLFAX: "Colfax",
            COUGAR: "Cougar",
            COUPLT: "COUPLT",
            COUPVL: "Coupville",
            CRWNPT: "Crown Point",
            CS0631: "CS0631",
            DIVISN: "Division",
            EAGHBR: "Eagle Harbor",
            EDMOND: "Edmonds",
            EVERET: "Everett",
            FAUNTL: "Fauntleroy",
            FIFE: "Fife",
            FRIDAY: "Friday Harbor",
            GNESSE: "GNESSE",
            GORST: "Gorst",
            HERON: "Heron St.",
            HQUIAM: "Hoquiam",
            HYAK: "Hyak Dr.",
            KELRNO: "Keller North",
            KELRSO: "Keller South",
            KELSO: "Kelso",
            KINFT1: "KINFT1",
            KINGST: "Kingston",
            KNGSTN: "Kingston",
            LEAHY: "Leahy",
            LONNGR: "LONNGR",
            LOPEZ: "Lopez",
            MARYHL: "Maryhill",
            MKLTEO: "Mukilteo",
            MONROE: "Monroe",
            MORA: "Mora Rd.",
            MTBAKR: "Mt. Baker",
            MUKILT: "Mukilteo",
            NEWPRT: "Newport",
            NSC: "NSC",
            OLD504: "Old 504",
            OMAK: "Omak",
            ORCAS: "Orcas Island",
            ORGBEG: "ORGBEG",
            ORGMID: "ORGMID",
            ORGSPR: "ORGSPR",
            ORONDO: "Orondo",
            OSO: "Oso",
            PAINE: "Paine",
            PEARL: "Pearl St.",
            PRTANG: "Port Angeles",
            PTDEFI: "Pt. Defiance",
            PTTFT2: "PTTFT2",
            PTTOWN: "Port Townsend",
            PULLMN: "Pullman",
            PURDY: "Purdy Ln.",
            REDMND: "Redmond",
            SEATAC: "SeaTac",
            SEATTL: "Seattle",
            SHAW: "Shaw Island",
            SIDNEY: "Sidney",
            SLVRDL: "Silverdale",
            SOUTHW: "Southworth",
            SUMAS: "Sumas",
            TAHLEQ: "Tahlequa",
            TUNNEL: "Tunnel",
            UNDRWD: "Underwood",
            VANCVR: "Vancouver",
            VASHON: "Vashon",
            VIADCT: "Alaskan Way Viaduct",
            WALULA: "Wallula Junction",
            WENTCH: "Wenatchee",
            WESTPT: "Westport",
            WINSLO: "Winslow",
            XBASE: "XBASE",
            YELMLP: "Yelm Loop",
          },
          f = (function () {
            function P(b) {
              b = b.trim();
              var k;
              if (!b) throw new TypeError("No route ID was provided.");
              if (((k = b.match(m.routeRe)), !k))
                throw new l.default(b, m.routeRe);
              (this._sr = k[1]),
                (this._rrt = k[2] || null),
                (this._rrq = k[3] || null);
            }
            return (
              (P.sort = function (b, k) {
                if (b.sr > k.sr) return 1;
                if (b.sr < k.sr) return -1;
                if (b.rrq !== null && k.rrq !== null)
                  return b.rrq === k.rrq
                    ? 0
                    : b.mainlineIntersectionMP === null &&
                      k.mainlineIntersectionMP !== null
                    ? -1
                    : (b.mainlineIntersectionMP !== null &&
                        k.mainlineIntersectionMP === null) ||
                      b.rrq > k.rrq
                    ? 1
                    : -1;
                var H = b.toString(),
                  D = k.toString();
                return H === D ? 0 : H > D ? 1 : -1;
              }),
              Object.defineProperty(P.prototype, "sr", {
                get: function () {
                  return this._sr;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(P.prototype, "rrt", {
                get: function () {
                  return this._rrt;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(P.prototype, "rrq", {
                get: function () {
                  return this._rrq;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(P.prototype, "rrtDescription", {
                get: function () {
                  return this._rrt ? h[this._rrt] : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(P.prototype, "rrqDescription", {
                get: function () {
                  var b = null;
                  if (this._rrq !== null)
                    if (A[this._rrq]) b = A[this._rrq];
                    else {
                      var k = this.mainlineIntersectionMP;
                      k !== null ? (b = " @ MP " + k) : (b = this._rrq);
                    }
                  return b;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(P.prototype, "description", {
                get: function () {
                  var b;
                  return (
                    this._rrt
                      ? this._rrq
                        ? this.mainlineIntersectionMP !== null
                          ? (b = [
                              this._sr,
                              this.rrtDescription,
                              "@ MP",
                              this.mainlineIntersectionMP,
                            ].join(" "))
                          : (b = [
                              this._sr,
                              this.rrtDescription,
                              this.rrqDescription,
                            ].join(" "))
                        : (b = [this._sr, this.rrtDescription].join(" "))
                      : (b = [this._sr, "Mainline"].join(" ")),
                    b
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(P.prototype, "mainlineIntersectionMP", {
                get: function () {
                  var b = null,
                    k = /^(\d+)([BCRS])?$/i,
                    H = this._rrq ? this._rrq.match(k) : null;
                  return (
                    H &&
                      ((b = parseInt(H[1], 10)),
                      (b = b / 100),
                      H[2] && (b = [b, H[2]].join(""))),
                    b
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              (P.prototype.toString = function () {
                var b = [this.sr];
                return (
                  this.rrt && (b.push(this.rrt), this.rrq && b.push(this.rrq)),
                  b.join("")
                );
              }),
              P
            );
          })();
        m.default = f;
      })(gi)),
    gi
  );
}
var vi = {},
  Fn;
function Kn() {
  return (
    Fn ||
      ((Fn = 1),
      (function (m) {
        Object.defineProperty(m, "__esModule", { value: !0 });
        var l;
        (function (p) {
          (p[(p.SR = 0)] = "SR"),
            (p[(p.IS = 1)] = "IS"),
            (p[(p.US = 2)] = "US"),
            (p[(p.RA = 3)] = "RA"),
            (p[(p.LC = 4)] = "LC"),
            (p[(p.FT = 5)] = "FT"),
            (p[(p.PR = 6)] = "PR"),
            (p[(p.CN = 7)] = "CN"),
            (p[(p.TB = 8)] = "TB");
        })((l = m.RouteTypes || (m.RouteTypes = {})));
        var h = ["SR", "IS", "US", "RA", "LC", "FT", "PR", "CN", "TB"],
          w = /^(?:(SR)|(IS)|(US)|(RA)|(LC)|(FT)|(PR)|(CN)|(TB))$/i;
        function d(p) {
          var E = null;
          if (typeof p == "string") {
            var x = p.match(w);
            x &&
              (x[1]
                ? (E = l.SR)
                : x[2]
                ? (E = l.IS)
                : x[3]
                ? (E = l.US)
                : x[4]
                ? (E = l.RA)
                : x[5]
                ? (E = l.LC)
                : x[6]
                ? (E = l.FT)
                : x[7]
                ? (E = l.PR)
                : x[8]
                ? (E = l.CN)
                : x[9] && (E = l.TB));
          } else
            typeof p == "number" &&
              Math.trunc(p) === p &&
              p >= 0 &&
              p <= 8 &&
              (E = p);
          return E;
        }
        m.getRouteTypeValue = d;
        function c(p) {
          var E;
          if (typeof p == "number" && p >= 0 && p < h.length) E = l[p];
          else if (typeof p == "string" && w.test(p)) E = p.toUpperCase();
          else throw new Error("Invalid value");
          return E;
        }
        m.getRouteTypeAbbreviation = c;
      })(vi)),
    vi
  );
}
var Hn;
function wi() {
  if (Hn) return ue;
  (Hn = 1), Object.defineProperty(ue, "__esModule", { value: !0 });
  var m = bi(),
    l = Vn(),
    h = ze(),
    w = Kn();
  function d(E, x) {
    var A;
    if (/^(?:(?:Current)|(?:\d{4,8}))$/.test(E)) {
      A = [];
      for (var f in x)
        if (x.hasOwnProperty(f) && f.trim()) {
          var P = x[f],
            b = null;
          try {
            typeof P == "number"
              ? (b = new p(f, P))
              : P.hasOwnProperty("routeType") &&
                (b = new p(f, P.direction, P.routeType));
          } catch (k) {
            if (!(k instanceof m.default)) throw k;
          }
          b && A.push(b);
        }
    } else A = x;
    return A;
  }
  function c(E) {
    return JSON.parse(E, d);
  }
  ue.parseRoutes = c;
  var p = (function () {
    function E(x, A, f) {
      (this._name = x),
        (this._lrsTypes = l.getLrsTypeValue(A)),
        (this._routeType = f != null ? w.getRouteTypeValue(f) : null),
        (this._routeId = new h.default(this._name));
    }
    return (
      Object.defineProperty(E.prototype, "name", {
        get: function () {
          return this._name;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "isMainline", {
        get: function () {
          return !this.routeId.rrt;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "label", {
        get: function () {
          var x,
            A = this.routeTypeAbbreviation,
            f = parseInt(this.routeId.sr, 10);
          return (
            A &&
              (A === "SR"
                ? (x = "WA-" + f)
                : A === "US"
                ? (x = A + "-" + f)
                : A === "IS" && (x = "I-" + f)),
            x || (x = String(f)),
            x
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "lrsTypes", {
        get: function () {
          return this._lrsTypes;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "routeType", {
        get: function () {
          return this._routeType;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "routeTypeAbbreviation", {
        get: function () {
          return this.routeType !== null
            ? w.getRouteTypeAbbreviation(this.routeType)
            : null;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "routeId", {
        get: function () {
          return this._routeId;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "isIncrease", {
        get: function () {
          return (
            this._lrsTypes === l.LrsType.INCREASE ||
            this._lrsTypes === l.LrsType.BOTH
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "isDecrease", {
        get: function () {
          return (
            this.lrsTypes === l.LrsType.DECREASE ||
            this.lrsTypes === l.LrsType.BOTH
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "isBoth", {
        get: function () {
          return this.lrsTypes === l.LrsType.BOTH;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(E.prototype, "isRamp", {
        get: function () {
          return this.lrsTypes === l.LrsType.RAMP;
        },
        enumerable: !0,
        configurable: !0,
      }),
      E
    );
  })();
  return (ue.default = p), ue;
}
var Ae = {},
  Kt = {},
  Wn;
function xi() {
  if (Wn) return Kt;
  (Wn = 1), Object.defineProperty(Kt, "__esModule", { value: !0 });
  function m(w, d) {
    var c;
    if (
      ((d === null || typeof d > "u") && (d = "this"),
      typeof w < "u" && w !== null)
    ) {
      if (((w = Number(w)), isNaN(w)))
        throw new Error(
          "If " + d + " property is provided, it must be a number."
        );
      c = w;
    } else if (w === null) return null;
    return c;
  }
  Kt.toNumber = m;
  function l(w) {
    return w.getMonth() + 1;
  }
  Kt.getActualMonth = l;
  function h(w) {
    if (typeof w > "u" || w === null) return w;
    if (typeof w != "object" || !(w instanceof Array))
      throw new Error("array must be an Array object.");
    for (var d = [], c = 0, p = w.length; c < p; c += 1) {
      var E = w[c];
      if (typeof E == "object" && E instanceof Array)
        for (var x = h(E), A = 0, f = x.length; A < f; A += 1) d.push(x[A]);
      else d.push(E);
    }
    return d;
  }
  return (Kt.flattenArray = h), Kt;
}
var Un;
function Pi() {
  if (Un) return Ae;
  (Un = 1), Object.defineProperty(Ae, "__esModule", { value: !0 });
  var m = ze(),
    l = xi(),
    h = /^([\d\.]+)(B)?$/i,
    w = (function () {
      function d(c) {
        if (!(c && typeof c == "object"))
          throw new TypeError("No data provided");
        (this.Id = typeof c.Id < "u" ? c.Id : null),
          (this.Route = typeof c.Route < "u" ? c.Route : null),
          (this.Decrease = typeof c.Decrease < "u" ? c.Decrease : null),
          (this.Arm = typeof c.Arm < "u" ? c.Arm : null),
          (this.Srmp = typeof c.Srmp < "u" ? c.Srmp : null),
          (this.Back = typeof c.Back < "u" ? c.Back : null),
          (this.ReferenceDate =
            typeof c.ReferenceDate < "u" ? c.ReferenceDate : null),
          (this.ResponseDate =
            typeof c.ResponseDate < "u" ? c.ResponseDate : null),
          (this.RealignmentDate =
            typeof c.RealignmentDate < "u" ? c.RealignmentDate : null),
          (this.EndArm = typeof c.EndArm < "u" ? c.EndArm : null),
          (this.EndSrmp = typeof c.EndSrmp < "u" ? c.EndSrmp : null),
          (this.EndBack = typeof c.EndBack < "u" ? c.EndBack : null),
          (this.EndReferenceDate =
            typeof c.EndReferenceDate < "u" ? c.EndReferenceDate : null),
          (this.EndResponseDate =
            typeof c.EndResponseDate < "u" ? c.EndResponseDate : null),
          (this.EndRealignmentDate =
            typeof c.EndRealignmentDate < "u" ? c.EndRealignmentDate : null),
          (this.ArmCalcReturnCode =
            typeof c.ArmCalcReturnCode < "u" ? c.ArmCalcReturnCode : null),
          (this.ArmCalcEndReturnCode =
            typeof c.ArmCalcEndReturnCode < "u"
              ? c.ArmCalcEndReturnCode
              : null),
          (this.ArmCalcReturnMessage =
            typeof c.ArmCalcReturnMessage < "u"
              ? c.ArmCalcReturnMessage
              : null),
          (this.ArmCalcEndReturnMessage =
            typeof c.ArmCalcEndReturnMessage < "u"
              ? c.ArmCalcEndReturnMessage
              : null),
          (this.LocatingError =
            typeof c.LocatingError < "u" ? c.LocatingError : null),
          (this.RouteGeometry =
            typeof c.RouteGeometry < "u" ? c.RouteGeometry : null),
          (this.EventPoint = typeof c.EventPoint < "u" ? c.EventPoint : null),
          (this.Distance = typeof c.Distance < "u" ? c.Distance : null),
          (this.Angle = typeof c.Angle < "u" ? c.Angle : null);
        for (var p in this)
          this.hasOwnProperty(p) &&
            /Date$/gi.test(p) &&
            (typeof this[p] == "string" || typeof this[p] == "number") &&
            (this[p] = new Date(this[p]));
      }
      return (
        (d.prototype.isLine = function () {
          return this.EndArm !== null || this.EndSrmp !== null;
        }),
        (d.prototype.toJSON = function () {
          var c = {},
            p =
              /^(?:(?:Id)|(?:(?:End)?Arm)|(ReturnCode)|(Distance)|(Angle))$/gi,
            E = /Srmp$/gi,
            x = /(?:Decrease)|(Back)$/gi,
            A = /Date$/i;
          for (var f in this)
            if (this.hasOwnProperty(f)) {
              var P = this[f];
              if (P && P instanceof Date && A.test(f))
                c[f] = [
                  String(l.getActualMonth(P)),
                  String(P.getDate()),
                  String(P.getFullYear()),
                ].join("/");
              else if (p.test(f)) P !== null && (c[f] = l.toNumber(P, f));
              else if (E.test(f)) {
                if (typeof P == "number") c[f] = P;
                else if (typeof P == "string") {
                  var b = h.exec(P);
                  if (b)
                    (c[f] = Number(b[1])),
                      b[2] &&
                        (/End$/.test(f)
                          ? (c.EndBack = !0)
                          : f === "Srmp" && (c.Back = !0));
                  else
                    throw new Error(
                      ["Invalid", f, "value:", String(P)].join(" ")
                    );
                }
              } else if (f === "Route") {
                if (typeof P == "string") {
                  var b = m.routeRe.exec(this[f]);
                  if (b) c.Route = b[0];
                  else throw new Error("Route is invalidly formatted.");
                } else if (P !== null)
                  throw new Error("Route must be a string.");
              } else
                x.test(f)
                  ? (c[f] = P === null ? null : Boolean(P))
                  : P !== null && (c[f] = P);
            }
          return c;
        }),
        d
      );
    })();
  return (Ae.default = w), Ae;
}
var Ie = {},
  Gn;
function qn() {
  if (Gn) return Ie;
  (Gn = 1), Object.defineProperty(Ie, "__esModule", { value: !0 });
  var m = le,
    l = wi(),
    h = Pi(),
    w = xi();
  function d(A) {
    var f = [];
    for (var P in A)
      if (A.hasOwnProperty(P)) {
        var b = A[P];
        b == null && (b = ""), f.push([P, encodeURIComponent(b)].join("="));
      }
    return f.join("&");
  }
  function c(A, f) {
    return typeof A == "string" ? A.length > 2e3 : !1;
  }
  function p(A, f) {
    return typeof f == "object" && f.hasOwnProperty("Route")
      ? new h.default(f)
      : f;
  }
  function E(A) {
    var f;
    return (
      typeof A == "object" && A instanceof Date
        ? (f = [
            String(w.getActualMonth(A)),
            String(A.getDate()),
            String(A.getFullYear()),
          ].join("/"))
        : (f = A || ""),
      f
    );
  }
  var x = (function () {
    function A(f, P, b, k) {
      f === void 0 &&
        (f =
          "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe"),
        P === void 0 && (P = "Find Route Locations"),
        b === void 0 && (b = "Find Nearest Route Locations"),
        k === void 0 && (k = "Route Info"),
        (this.url = f),
        (this.findRouteLocationsOperationName = P),
        (this.findNearestRouteLocationsOperationName = b),
        (this.routesResourceName = k),
        (this.layerList = null);
    }
    return (
      Object.defineProperty(A.prototype, "mapServiceUrl", {
        get: function () {
          var f = this.url.match(/.+\/MapServer/gi);
          if (f) return f[0];
        },
        enumerable: !0,
        configurable: !0,
      }),
      (A.prototype.getRouteList = function (f) {
        return (
          f === void 0 && (f = !0),
          m.__awaiter(this, void 0, void 0, function () {
            var P, b, k, H, D;
            return m.__generator(this, function (st) {
              switch (st.label) {
                case 0:
                  return this.layerList
                    ? [2, this.layerList]
                    : ((P = [this.url, this.routesResourceName].join("/")),
                      (b = { f: "json" }),
                      f || (b.callback = "jsonp"),
                      (P = [P, d(b)].join("?")),
                      [4, fetch(P)]);
                case 1:
                  return (
                    (k = st.sent()),
                    k.status !== 200
                      ? [3, 8]
                      : ((D = l.parseRoutes), [4, k.text()])
                  );
                case 2:
                  return (
                    (H = D.apply(void 0, [st.sent()])),
                    H.error
                      ? this.routesResourceName === "Route Info" &&
                        H.error.code === 400
                        ? ((this.routesResourceName = "routes"),
                          [4, this.getRouteList(f)])
                        : [3, 4]
                      : [3, 6]
                  );
                case 3:
                  return [2, st.sent()];
                case 4:
                  throw Error(H.error);
                case 5:
                  return [3, 7];
                case 6:
                  return (this.layerList = H), [2, this.layerList];
                case 7:
                  return [3, 9];
                case 8:
                  throw Error(k.statusText);
                case 9:
                  return [2];
              }
            });
          })
        );
      }),
      (A.prototype.findRouteLocations = function (f) {
        return m.__awaiter(this, void 0, void 0, function () {
          var P, b, k, H, D, st, lt, ht, et, ct, ut, Lt, yt, q, mt;
          return m.__generator(this, function (_) {
            switch (_.label) {
              case 0:
                if (
                  ((P = f.locations),
                  (b = f.referenceDate || ""),
                  (k = f.outSR || null),
                  (H = f.lrsYear || null),
                  (D = f.useCors != null ? f.useCors : !0),
                  typeof P != "object" || !(P instanceof Array))
                )
                  throw new Error(
                    "The locations parameter must be an array of RouteLocations with at least one element."
                  );
                if (!P.length)
                  throw new Error("locations does not have enough elements.");
                if (
                  (typeof b == "object" &&
                    b instanceof Date &&
                    (b = [
                      String(w.getActualMonth(b)),
                      String(b.getDate()),
                      String(b.getFullYear()),
                    ].join("/")),
                  typeof k < "u" &&
                    k !== null &&
                    typeof k != "number" &&
                    typeof k != "string")
                )
                  throw new Error(
                    "Unexpected outSR type.  Must be a WKID (number), WKT (string), or omitted (null or undefined)."
                  );
                if (typeof H < "u" && H !== null && typeof H != "string")
                  throw new Error(
                    "Invalid lrsYear.  Must be either a string or omitted altogether."
                  );
                return (
                  (st = {
                    f: "json",
                    locations: JSON.stringify(P),
                    outSR: k || null,
                    referenceDate: b || null,
                    lrsYear: H || null,
                  }),
                  (lt = [this.url, this.findRouteLocationsOperationName].join(
                    "/"
                  )),
                  D || (st.callback = "jsonp"),
                  (ht = d(st)),
                  (et = c([lt, ht].join("?")) ? "POST" : "GET"),
                  et === "GET"
                    ? ((lt = [lt, ht].join("?")), (ht = null))
                    : ((ut = new Headers()),
                      ut.append(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                      ),
                      (ct = { method: et, headers: ut, body: ht }),
                      D && (ct.mode = "cors")),
                  [4, fetch(lt, ct)]
                );
              case 1:
                return (Lt = _.sent()), (mt = (q = JSON).parse), [4, Lt.text()];
              case 2:
                if (((yt = mt.apply(q, [_.sent(), p])), yt.error))
                  throw Error(yt);
                return [2, yt];
            }
          });
        });
      }),
      (A.prototype.findNearestRouteLocations = function (f) {
        return m.__awaiter(this, void 0, void 0, function () {
          var P, b, k, H, D, st, lt, ht, et, ct;
          return m.__generator(this, function (ut) {
            switch (ut.label) {
              case 0:
                if (
                  ((P = { f: "json" }),
                  f.useCors == null && (f.useCors = !0),
                  typeof f.referenceDate > "u" || f.referenceDate === null)
                )
                  throw new Error("referenceDate not provided.");
                if (
                  ((P.referenceDate = E(f.referenceDate)),
                  (f.coordinates = w.flattenArray(f.coordinates)),
                  typeof f.coordinates != "object" ||
                    !(f.coordinates instanceof Array))
                )
                  throw new TypeError(
                    "The coordinates parameter must be an array of numbers."
                  );
                if (f.coordinates.length < 2 || f.coordinates.length % 2 !== 0)
                  throw new TypeError(
                    "The coordinates array must contain at least two elements and consist of an even number of elements."
                  );
                if (
                  ((P.coordinates = JSON.stringify(f.coordinates)),
                  typeof f.searchRadius != "number" || f.searchRadius <= 0)
                )
                  throw new Error(
                    "searchRadius must be a number that is greater than zero."
                  );
                if (
                  ((P.searchRadius = f.searchRadius),
                  typeof f.inSR != "number" && typeof f.outSR != "string")
                )
                  throw new Error(
                    "Unexpected inSR type.  The inSR value must be either a WKID (number) or a WKT (string)."
                  );
                if (
                  ((P.inSR = f.inSR),
                  typeof f.outSR < "u" &&
                    f.outSR !== null &&
                    typeof f.outSR != "number" &&
                    typeof f.outSR != "string")
                )
                  throw new Error(
                    "Unexpected outSR type.  Must be a WKID (number), WKT (string), or omitted (null or undefined)."
                  );
                if (
                  ((P.outSR = f.outSR),
                  typeof f.lrsYear < "u" &&
                    f.lrsYear !== null &&
                    typeof f.lrsYear != "string")
                )
                  throw new Error(
                    "Invalid lrsYear.  Must be either a string or omitted altogether."
                  );
                if (
                  ((P.lrsYear = f.lrsYear || void 0),
                  (P.routeFilter = f.routeFilter || void 0),
                  typeof f.routeFilter < "u" &&
                    typeof f.routeFilter != "string")
                )
                  throw new Error(
                    "Invalid route filter type.  The routeFilter parameter should be either a string or omitted altogether."
                  );
                return (
                  (b = [
                    this.url,
                    this.findNearestRouteLocationsOperationName,
                  ].join("/")),
                  f.useCors || (P.callback = "jsonp"),
                  (k = d(P)),
                  (H = c(b + "?" + k) ? "POST" : "GET"),
                  H === "GET"
                    ? (b = [b, k].join("?"))
                    : ((st = new Headers()),
                      st.append(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                      ),
                      (D = { body: k, method: H, headers: st }),
                      f.useCors && (D.mode = "cors")),
                  [4, fetch(b, D)]
                );
              case 1:
                return (
                  (lt = ut.sent()), (ct = (et = JSON).parse), [4, lt.text()]
                );
              case 2:
                if (((ht = ct.apply(et, [ut.sent(), p])), ht.error))
                  throw Error(ht);
                return [2, ht];
            }
          });
        });
      }),
      A
    );
  })();
  return (Ie.default = x), Ie;
}
(function (m) {
  Object.defineProperty(m, "__esModule", { value: !0 });
  var l = le;
  l.__exportStar(Vn(), m),
    l.__exportStar(wi(), m),
    l.__exportStar(ze(), m),
    l.__exportStar(Pi(), m),
    l.__exportStar(qn(), m),
    l.__exportStar(Kn(), m),
    l.__exportStar(xi(), m);
  var h = bi();
  m.FormatError = h.default;
  var w = wi();
  m.Route = w.default;
  var d = ze();
  m.RouteId = d.default;
  var c = Pi();
  m.RouteLocation = c.default;
  var p = qn();
  (m.RouteLocator = p.default), (m.default = p.default);
})(jn);
const Rr = Lr(jn);
function Yn(m) {
  console.group(`Entering ${Yn.name}…`);
  for (const l of ["x", "y"])
    if (
      (console.log(
        `Checking to see if object has a ${l} property that is a number…`
      ),
      !(Object.hasOwn(m, l) && typeof m[l] == "number"))
    )
      return console.warn(`mismatch: ${m}`, m), console.groupEnd(), !1;
  return console.groupEnd(), !0;
}
class Or {
  constructor(l) {
    Y(this, "RouteGeometry");
    Y(this, "Id");
    Y(this, "Route");
    Y(this, "Decrease");
    Y(this, "Arm");
    Y(this, "Srmp");
    Y(this, "Back");
    Y(this, "ReferenceDate");
    Y(this, "ResponseDate");
    Y(this, "EndArm");
    Y(this, "EndSrmp");
    Y(this, "EndBack");
    Y(this, "EndReferenceDate");
    Y(this, "EndResponseDate");
    Y(this, "RealignmentDate");
    Y(this, "EndRealignmentDate");
    Y(this, "ArmCalcReturnCode");
    Y(this, "ArmCalcEndReturnCode");
    Y(this, "ArmCalcReturnMessage");
    Y(this, "ArmCalcEndReturnMessage");
    Y(this, "LocatingError");
    Y(this, "EventPoint");
    Y(this, "Distance");
    Y(this, "Angle");
    (this.RouteGeometry = l.RouteGeometry),
      (this.Id = l.Id),
      (this.Route = l.Route),
      (this.Decrease = l.Decrease),
      (this.Arm = l.Arm),
      (this.Srmp = l.Srmp),
      (this.Back = l.Back),
      (this.ReferenceDate = l.ReferenceDate),
      (this.ResponseDate = l.ResponseDate),
      (this.EndArm = l.EndArm),
      (this.EndSrmp = l.EndSrmp),
      (this.EndBack = l.EndBack),
      (this.EndReferenceDate = l.EndReferenceDate),
      (this.EndResponseDate = l.EndResponseDate),
      (this.RealignmentDate = l.RealignmentDate),
      (this.EndRealignmentDate = l.EndRealignmentDate),
      (this.ArmCalcReturnCode = l.ArmCalcReturnCode),
      (this.ArmCalcEndReturnCode = l.ArmCalcEndReturnCode),
      (this.ArmCalcReturnMessage = l.ArmCalcReturnMessage),
      (this.ArmCalcEndReturnMessage = l.ArmCalcEndReturnMessage),
      (this.LocatingError = l.LocatingError),
      (this.EventPoint = l.EventPoint),
      (this.Distance = l.Distance),
      (this.Angle = l.Angle);
  }
  get routeGeometryXY() {
    return [this.RouteGeometry.x, this.RouteGeometry.y];
  }
  get leafletLatLngTuple() {
    const [l, h] = this.routeGeometryXY;
    return [h, l];
  }
  get leafletLatLngLiteral() {
    const [l, h] = this.routeGeometryXY;
    return { lat: h, lng: l };
  }
  get routeGeometryLatLng() {
    return vt.latLng(this.RouteGeometry.y, this.RouteGeometry.x);
  }
  static isPointRouteLocation(l) {
    return (l == null ? void 0 : l.RouteGeometry) && Yn(l.RouteGeometry);
  }
  static convertToLtLng(l) {
    return [l.y, l.x];
  }
}
const Ar =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/ElcRestSOE/MapServer/exts/ElcRestSoe";
async function Ir(m, l) {
  const h = [m.lng, m.lat],
    w = (l == null ? void 0 : l.elcUrl) ?? Ar;
  let d;
  return (
    l != null && l.findNearestRouteLocationParameters
      ? (d = l.findNearestRouteLocationParameters)
      : (d = {
          coordinates: h,
          inSR: zn,
          outSR: zn,
          referenceDate: new Date(),
          searchRadius: 200,
        }),
    console.debug("elc parameters", { url: w, params: d }),
    (await new Rr(w).findNearestRouteLocations(d)).map((E) => new Or(E))
  );
}
function kr(m) {
  const l = zr(m);
  return vt.popup({ content: l });
}
const $n = "_blank";
function zr(m) {
  const [l, h] = m.routeGeometryXY,
    w = `${m.Route}${m.Decrease ? " (Decrease)" : ""}`,
    d = `${m.Srmp}${m.Back ? "B" : ""}`,
    c = `${w}@${d}`,
    p = document.createDocumentFragment(),
    E = document.createElement("div");
  (E.innerText = c), p.appendChild(E);
  const x = document.createElement("div");
  p.appendChild(x);
  const A = Br(l, h);
  x.appendChild(document.createTextNode(" ")), x.appendChild(A);
  const f = document.createElement("div");
  return f.appendChild(p), f;
}
function Br(m, l) {
  const h = document.createDocumentFragment(),
    w = new Er({ x: m, y: l }),
    d = Zr(w),
    c = document.createElement("a");
  return (
    (c.href = "https://geouri.org/about/"),
    (c.textContent = "(What is this?)"),
    (c.target = $n),
    h.append(d, document.createTextNode(" "), c),
    h
  );
}
function Zr(m, l = "Geo URI") {
  const h = document.createElement("a");
  return (
    (h.href = m.toString()),
    (h.textContent = l ?? m.toString()),
    (h.target = $n),
    h
  );
}
function Dr(m) {
  const l = kr(m),
    h = m.leafletLatLngLiteral;
  return vt.marker(h).bindPopup(l);
}
const ke = vt.map("map", { maxBounds: Bn }).fitBounds(Bn);
vt.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(ke);
ke.on("click", async (m) => {
  console.log(`user clicked on ${m.latlng}`, m);
  const { latlng: l } = m;
  let h = null;
  const w = Mr(l).addTo(ke);
  try {
    h = await Ir(l);
  } catch (d) {
    console.error(`ELC Error at ${l}`, {
      "Leaflet mouse event": m,
      "ELC Error": d,
    });
  } finally {
    w.remove();
  }
  if (h) for (const d of h) console.debug("elcResult", d), Dr(d).addTo(ke);
});
