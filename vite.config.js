import { defineConfig } from 'vite';
import { svelte } from './lib/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { transformSync } from 'esbuild';

const production = process.env.NODE_ENV === 'production';

export default defineConfig({
	root: 'src/',
	build: {
		outDir: '../dist/',
		emptyOutDir: true,
	},
	server: {
		host: process.env.VITE_HOST ?? 'localhost',
		port: process.env.VITE_PORT ?? 3000,
		open: false,
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				typescript({ content }) {
					const { code, map } = transformSync(content, {
						loader: 'ts',
					});
					return { code, map };
				},
				sourceMap: !production,
				svelte: {
					prependData: "@require '.src/styles/global.styl'\n",
				},
				postcss: {
					plugins: [require('autoprefixer')()]
				}
			}),
			dev: !production,
		}),
	],
});
