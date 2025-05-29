import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import shell from 'shelljs'
import vue from '@vitejs/plugin-vue'
// import { visualizer } from 'rollup-plugin-visualizer'
import terser from '@rollup/plugin-terser'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

function copyCssPlugin(): Plugin {
  return {
    name: 'copy-css-after-build',
    closeBundle() {
      if (shell.test('-f', './dist/umd/index.css')) {
        shell.cp('./dist/umd/index.css', './dist/index.css')
        console.log('✅ Copied index.css to ./dist')
      } else {
        console.warn('⚠️ index.css not found, skipping copy.')
      }
    },
  }
}

export default defineConfig({
  plugins: [
    vue(),
    copyCssPlugin(),
    // visualizer({
    //   filename: 'dist/status.umd.html',
    // }),
    terser({
      compress: {
        drop_console: ['log'],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'EricUI',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') return 'index.css'
          return chunkInfo.name || '[name]'
        },
      },
    },
  },
})