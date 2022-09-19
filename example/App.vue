<template>
  <div style="height: 100%">
    <div class="buttons">
      <button type="button" @click="() => moveSpe('x')">Move in x axis</button>
      <button type="button" @click="() => moveSpe('y')">Move in y axis</button>
      <button type="button" @click="() => moveSpe('z')">Move in z axis</button>
      <button type="button" @click="triggerAnimation">Trigger Spline Animation</button>
    </div>
    <Spline :scene="scene" :onLoad="onLoad" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue-demi";
import type { Application, SPEObject } from "@splinetool/runtime";
import anime from "animejs";
import Spline from "../src/Spline.vue";

export default defineComponent({
  name: "App",
  components: { Spline },
  setup() {
    const scene = ref(
      "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    );
    const cube = ref<SPEObject>();
    const spe = ref<Application>();

    const moveSpe = (direction: "x" | "y" | "z") => {
      if (!cube.value) {
        return;
      }

      const newPosition = { ...cube.value.position };
      switch (direction) {
        case "x":
          newPosition.x += 100;
          break;
        case "y":
          newPosition.y += 100;
          break;
        case "z":
          newPosition.z += 100;
          break;
      }

      anime({
        targets: cube.value.position,
        ...newPosition,
        duration: 500,
      });
    };

    const onLoad = (spline: Application) => {
      spe.value = spline;
      cube.value = spline.findObjectByName("Cube");
    };

    const triggerAnimation = () => {
      spe.value?.emitEvent("mouseHover", "Cube");
      /**
       * Or you can query the spline object first, and then trigger the event:
       * 
       * cube.value?.emitEvent("mouseHover");
       */
    }

    return {
      scene,
      moveSpe,
      onLoad,
      triggerAnimation,
    };
  },
});
</script>
