/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { comlink } from 'vite-plugin-comlink'

// https://vitejs.dev/config/
import postcss_import from 'postcss-import'
import postcss_nesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  build: {
    outDir: 'docs'
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [postcss_import(), postcss_nesting(), autoprefixer()]
    }
  },
  plugins: [react(), comlink()],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  worker: {
    plugins: [comlink()]
  }
})
