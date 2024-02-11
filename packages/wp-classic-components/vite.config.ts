import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	root: __dirname,
	cacheDir: resolve(__dirname, '../../node_modules/.vite'),
	plugins: [react(), dts({ rollupTypes: true })],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			external: ['clsx', 'react', 'react/jsx-runtime'],
			output: {
				assetFileNames: '[name][extname]',
				entryFileNames: '[name].js',
			},
		},
	},
	test: {
		alias: {
			tests: resolve(__dirname, '../../tests'),
		},
		cache: {
			dir: resolve(__dirname, '../../node_modules/.vitest'),
		},
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.test.{js,ts,mts,jsx,tsx}'],
		setupFiles: resolve(__dirname, '../../tests/setup.ts'),
	},
});
