import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import * as compiler from "@vue/compiler-sfc";
import vue3 from "@vitejs/plugin-vue";
import path from "path";
import { getLibDir } from "./scripts/utils.mjs";
import { isVue2, version } from "vue-demi";

console.log({ version });

const resolve = (str: string) => {
  return path.resolve(__dirname, str);
};

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src"),
      vue: isVue2
        ? resolve("./node_modules/vue2")
        : resolve("./node_modules/vue3"),
      "@vue/composition-api": resolve("./node_modules/@vue/composition-api"),
    },
  },
  build: {
    lib: {
      entry: resolve("./src/Spline.vue"),
      name: "spline-vue",
      fileName: "spline-vue",
    },
    rollupOptions: {
      external: ["@splinetool/runtime", "vue-demi", "vue"],
      output: {
        dir: getLibDir(version),
        globals: {
          vue: "Vue",
          "vue-demi": "VueDemi",
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  plugins: [
    isVue2
      ? createVuePlugin()
      : vue3({
          compiler: compiler,
        }),
  ],
  root: "example",
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "./src/Spline.vue"),
  //     name: "spline-vue",
  //     formats: ["es", "umd"],
  //     fileName: (format) => `spline-vue.${format}.js`,
  //   },
  //   rollupOptions: {
  //     external: ["@splinetool/runtime", "vue"],
  //     output: {
  //       dir: "dist",
  //     },
  //   },
  // },
});
