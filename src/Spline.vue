<template>
  <canvas
    ref="canvasRef"
    :style="{ display: isLoading ? 'none' : 'block', ...styles }"
  />
</template>
<script lang="ts">
export interface SplineProps
  extends Omit<
    CanvasHTMLAttributes,
    | "onLoad"
    | "onMouseDown"
    | "onMouseUp"
    | "onMouseHover"
    | "onKeyDown"
    | "onKeyUp"
    | "onWheel"
  > {
  scene: string;
  styles?: Record<string, string>;
  onLoad?: (e: Application) => void;
  onMouseDown?: (e: SplineEvent) => void;
  onMouseUp?: (e: SplineEvent) => void;
  onMouseHover?: (e: SplineEvent) => void;
  onKeyDown?: (e: SplineEvent) => void;
  onKeyUp?: (e: SplineEvent) => void;
  onStart?: (e: SplineEvent) => void;
  onLookAt?: (e: SplineEvent) => void;
  onFollow?: (e: SplineEvent) => void;
  onWheel?: (e: SplineEvent) => void;
  autoRender?: boolean;
}
import { CanvasHTMLAttributes } from "@vue/runtime-dom";
import { defineComponent, ref, watchPostEffect } from "vue-demi";
import { Application } from "@splinetool/runtime";
import type { SplineEvent, SplineEventName } from "@splinetool/runtime";

type OnCleanup = (cleanupFn: () => void) => void;

export default defineComponent({
  name: "Spline",
  props: {
    scene: {
      type: String,
      required: true,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    autoRender: {
      type: Boolean,
      default: false,
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
    onWheel: Function,
  },
  setup(props, context) {
    const isLoading = ref<boolean>(true);
    const setLoading = (loading: boolean) => (isLoading.value = loading);
    const canvasRef = ref<HTMLCanvasElement>();
    
    watchPostEffect((onCleanup?: OnCleanup) => {
      setLoading(true);
      
      let speApp: Application;
      const events: Array<{
        name: SplineEventName;
        cb?: ((e: SplineEvent) => void);
      }> = [
        {
          name: "mouseDown",
          cb: (props as SplineProps).onMouseDown,
        },
        {
          name: "mouseUp",
          cb: (props as SplineProps).onMouseUp,
        },
        {
          name: "mouseHover",
          cb: (props as SplineProps).onMouseHover,
        },
        {
          name: "keyDown",
          cb: (props as SplineProps).onKeyDown,
        },
        {
          name: "keyUp",
          cb: (props as SplineProps).onKeyUp,
        },
        {
          name: "start",
          cb: (props as SplineProps).onStart,
        },
        {
          name: "lookAt",
          cb: (props as SplineProps).onLookAt,
        },
        {
          name: "follow",
          cb: (props as SplineProps).onFollow,
        },
        {
          name: "scroll",
          cb: (props as SplineProps).onWheel,
        },
      ];

      if (canvasRef.value) {
        speApp = new Application(canvasRef.value, {
          autoRender: props.autoRender ?? false,
        });

        const init = async () => {
          await speApp.load(props.scene);

          for (let event of events) {
            if (event.cb) {
              speApp.addEventListener(event.name, event.cb);
            }
          }

          setLoading(false);
          props.onLoad?.(speApp);
        };

        init();
      }

      onCleanup?.(() => {
        for (let event of events) {
          if (event.cb) {
            speApp.removeEventListener(event.name, event.cb);
          }
        }
        speApp?.dispose();
      });
    });

    return {
      isLoading,
      canvasRef,
    };
  },
});

</script>
