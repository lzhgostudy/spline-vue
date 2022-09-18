<template>
  <div style="height: 100%">
    <div class="buttons">
      <button type="button" @click="() => moveSpe('x')">Move in x axis</button>
      <button type="button" @click="() => moveSpe('y')">Move in y axis</button>
      <button type="button" @click="() => moveSpe('z')">Move in z axis</button>
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
    const spe = ref<SPEObject>();
    const moveSpe = (direction: "x" | "y" | "z") => {
      if (!spe.value) {
        return;
      }

      const newPosition = { ...spe.value.position };
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
        targets: spe.value.position,
        ...newPosition,
        duration: 500,
      });
    };
    const onLoad = (spline: Application) => {
      spe.value = spline.findObjectByName("Cube");
    };

    return {
      scene,
      moveSpe,
      onLoad,
    };
  },
});
</script>
