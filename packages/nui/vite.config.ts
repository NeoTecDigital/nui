import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['src/test-setup.ts'],
	},
	build: {
		lib: {
			entry: 'src/lib/index.ts',
			name: 'nui',
			fileName: 'index',
		},
		rollupOptions: {
			external: ['svelte', 'svelte/store'],
			output: {
				globals: {
					svelte: 'svelte',
				},
			},
		},
	},
});