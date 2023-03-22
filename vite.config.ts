/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
import postcss_import from 'postcss-import'

import nesting from 'tailwindcss/nesting'

import postcss_nesting from 'postcss-nesting'

import autoprefixer from 'autoprefixer'

import tailwindcss from 'tailwindcss'

export default defineConfig({
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [postcss_import, nesting(postcss_nesting), autoprefixer, tailwindcss]
    }
  },
  plugins: [react(), svgrPlugin()],
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
