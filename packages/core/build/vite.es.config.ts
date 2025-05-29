import { defineConfig } from "vite";
import { resolve } from "path";
import shell from "shelljs";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";
// import { visualizer } from "rollup-plugin-visualizer";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

export default defineConfig({
  plugins: [
    vue(),
    // visualizer({ filename: "dist/stats.es.html" }),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
    {
      name: "move-theme-after-build",
      apply: "build",
      closeBundle() {
        if (shell.test("-d", "./dist/es/theme")) {
          shell.mv("./dist/es/theme", "./dist");
          console.log("Moved ./dist/es/theme to ./dist");
        }
      },
    },
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    sourcemap: !isProd,
    lib: {
      entry: resolve(__dirname, "../index.ts"),
      name: "ZquareUI",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          if (
            chunkInfo.type === "asset" &&
            /\.(css)$/i.test(chunkInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name as string;
        },
      },
    },
  },
});