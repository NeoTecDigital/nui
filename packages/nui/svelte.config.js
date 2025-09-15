import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
		},
	},
	package: {
		source: 'src/lib',
		dir: 'dist',
		exports: (file) => file === 'index.ts' || file.includes('/index.ts'),
		files: (file) => !file.includes('.test.') && !file.includes('.spec.'),
	},
};

export default config;