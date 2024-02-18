import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
		},
		outDir: resolve(__dirname, './'),
		rollupOptions: {
			external: ['clsx', 'react', 'react/jsx-runtime'],
			output: {
				assetFileNames: '[name][extname]',
				entryFileNames: '[name].js',
			},
		},
	},
	cacheDir: resolve(__dirname, '../../node_modules/.vite'),
	plugins: [react(), dts({ rollupTypes: true })],
	root: __dirname,
});
