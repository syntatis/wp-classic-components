import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	root: __dirname,
	cacheDir: resolve(__dirname, '../../node_modules/.vite'),
	plugins: [react(), dts({ rollupTypes: true })],
	build: {
		outDir: resolve(__dirname, './'),
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
});
