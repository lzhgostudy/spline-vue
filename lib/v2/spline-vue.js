import { defineComponent as h, ref as v, watchPostEffect as y } from "vue-demi";
import { Application as F } from "@splinetool/runtime";
const w = h({
  name: "Spline",
  props: {
    scene: {
      type: String,
      required: !0
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    autoRender: {
      type: Boolean,
      default: !1
    },
    onLoad: Function,
    onMouseDown: Function,
    onMouseUp: Function,
    onMouseHover: Function,
    onKeyDown: Function,
    onKeyUp: Function,
    onStart: Function,
    onLookAt: Function,
    onFollow: Function,
    onWheel: Function
  },
  setup(e, s) {
    const c = v(!0), f = (r) => c.value = r, a = v();
    return y((r) => {
      var n;
      f(!0);
      let t;
      const l = [
        {
          name: "mouseDown",
          cb: e.onMouseDown
        },
        {
          name: "mouseUp",
          cb: e.onMouseUp
        },
        {
          name: "mouseHover",
          cb: e.onMouseHover
        },
        {
          name: "keyDown",
          cb: e.onKeyDown
        },
        {
          name: "keyUp",
          cb: e.onKeyUp
        },
        {
          name: "start",
          cb: e.onStart
        },
        {
          name: "lookAt",
          cb: e.onLookAt
        },
        {
          name: "follow",
          cb: e.onFollow
        },
        {
          name: "scroll",
          cb: e.onWheel
        }
      ];
      a.value && (t = new F(a.value, {
        autoRender: (n = e.autoRender) != null ? n : !1
      }), (async () => {
        var d;
        await t.load(e.scene);
        for (let u of l)
          u.cb && t.addEventListener(u.name, u.cb);
        f(!1), (d = e.onLoad) == null || d.call(e, t);
      })()), r == null || r(() => {
        for (let o of l)
          o.cb && t.removeEventListener(o.name, o.cb);
        t == null || t.dispose();
      });
    }), {
      isLoading: c,
      canvasRef: a
    };
  }
});
var R = function() {
  var e = this, s = e.$createElement, c = e._self._c || s;
  return c("canvas", {
    ref: "canvasRef",
    style: Object.assign({
      display: e.isLoading ? "none" : "block"
    }, e.styles)
  });
}, L = [];
function S(e, s, c, f, a, r, t, l) {
  var n = typeof e == "function" ? e.options : e;
  s && (n.render = s, n.staticRenderFns = c, n._compiled = !0), f && (n.functional = !0), r && (n._scopeId = "data-v-" + r);
  var o;
  if (t ? (o = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), a && a.call(this, i), i && i._registeredComponents && i._registeredComponents.add(t);
  }, n._ssrRegister = o) : a && (o = l ? function() {
    a.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), o)
    if (n.functional) {
      n._injectStyles = o;
      var d = n.render;
      n.render = function(b, _) {
        return o.call(_), d(b, _);
      };
    } else {
      var u = n.beforeCreate;
      n.beforeCreate = u ? [].concat(u, o) : [o];
    }
  return {
    exports: e,
    options: n
  };
}
const m = {};
var U = /* @__PURE__ */ S(
  w,
  R,
  L,
  !1,
  g,
  null,
  null,
  null
);
function g(e) {
  for (let s in m)
    this[s] = m[s];
}
const $ = /* @__PURE__ */ function() {
  return U.exports;
}();
export {
  $ as default
};
