import { BuildOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { comlink } from 'vite-plugin-comlink'
import { resolve } from 'path'

import postcss_import from 'postcss-import'
import postcss_nesting from 'postcss-nesting'
// @ts-ignore
import autoprefixer from 'autoprefixer'

const libraryOptions: BuildOptions = {
  lib: {
    entry: resolve(__dirname, 'lib/diorama.js'),
    name: 'Diorama',
    fileName: 'diorama'
  },
  outDir: 'lib',
  assetsDir: 'none',
  minify: true,
  rollupOptions: {
    input: 'src/layout/worker.ts',
    treeshake: {
      preset: 'smallest'
    },
    output: {
      sourcemap: false,
      compact: true
    }
  }
}

export default defineConfig(({ mode }) => ({
  publicDir: mode === 'library' ? false : 'public',
  build: mode === 'library' ? libraryOptions : { ...libraryOptions, outDir: 'docs' },
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
    plugins: () => [comlink()]
  }
}))
