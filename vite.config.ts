/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import postcss_import from 'postcss-import'
import postcss_nesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [postcss_import, postcss_nesting, autoprefixer]
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
