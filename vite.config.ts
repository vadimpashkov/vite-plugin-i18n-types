/// <reference types="vitest" />
// SEE: Configure Vitest (https://vitest.dev/config/)

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

// SEE: https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
	define: {
		__TEST__: process.env.VITEST === 'true',
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: pkg.name,
			fileName: 'index',
		},
		rollupOptions: {
			external: ['vite', 'fs', 'path', 'child_process', 'chalk'],
			output: {
				globals: {
					vite: 'vite',
					fs: 'fs',
					path: 'path',
					child_process: 'child_process',
					chalk: 'chalk',
				},
			},
		},
	},
	plugins: [
		dts({
			entryRoot: 'src',
			include: ['src'],
			exclude: ['tests'],
			rollupTypes: true,
		}),
	],
	test: {
		globals: true,
		environment: 'node',
		include: ['tests/**/*.test.ts'],
	},
});
