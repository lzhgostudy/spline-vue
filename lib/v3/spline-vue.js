import { defineComponent as d, ref as m, watchPostEffect as v } from "vue-demi";
import { Application as y } from "@splinetool/runtime";
import { openBlock as b, createElementBlock as w, normalizeStyle as F } from "vue";
const k = d({
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
    const o = m(!0), a = (c) => o.value = c, t = m();
    return v((c) => {
      var r;
      a(!0);
      let n;
      const u = [
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
      t.value && (n = new y(t.value, {
        autoRender: (r = e.autoRender) != null ? r : !1
      }), (async () => {
        var f;
        await n.load(e.scene);
        for (let l of u)
          l.cb && n.addEventListener(l.name, l.cb);
        a(!1), (f = e.onLoad) == null || f.call(e, n);
      })()), c == null || c(() => {
        for (let i of u)
          i.cb && n.removeEventListener(i.name, i.cb);
        n == null || n.dispose();
      });
    }), {
      isLoading: o,
      canvasRef: t
    };
  }
}), L = (e, s) => {
  const o = e.__vccOpts || e;
  for (const [a, t] of s)
    o[a] = t;
  return o;
};
function _(e, s, o, a, t, c) {
  return b(), w("canvas", {
    ref: "canvasRef",
    style: F({ display: e.isLoading ? "none" : "block", ...e.styles })
  }, null, 4);
}
const U = /* @__PURE__ */ L(k, [["render", _]]);
export {
  U as default
};
