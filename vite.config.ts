import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { type BuildOptions, defineConfig } from 'vite'
import { comlink } from 'vite-plugin-comlink'

// @ts-ignore
import autoprefixer from 'autoprefixer'
import postcss_import from 'postcss-import'
import postcss_nesting from 'postcss-nesting'

const libraryOptions: BuildOptions = {
	lib: {
		entry: resolve(__dirname, 'src/index.ts'),
		name: 'Diorama',
		fileName: 'diorama'
	},
	target: 'esnext',
	outDir: 'lib',
	assetsDir: 'none',
	minify: true,
	rollupOptions: {
		input: 'src/layout/worker.ts',
		output: {
			sourcemap: false,
			compact: true
		}
	}
}

const buildOptions: BuildOptions = {
	outDir: 'docs',
	assetsDir: 'none',
	minify: true,
	rollupOptions: {
		treeshake: true,
		output: {
			sourcemap: false,
			compact: true
		}
	}
}

export default defineConfig(({ mode }) => ({
	publicDir: mode === 'library' ? false : 'public',
	build: mode === 'library' ? libraryOptions : buildOptions,
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
