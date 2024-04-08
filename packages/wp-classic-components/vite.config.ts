import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'index.ts'),
			formats: ['es'],
		},
		outDir: resolve(__dirname, './'),
		rollupOptions: {
			external: [
				'react-aria',
				'react-dom',
				'react-stately',
				'react',
				'react/jsx-runtime',
			],
			output: {
				assetFileNames: '[name][extname]',
				entryFileNames: '[name].js',
			},
		},
		target: 'esnext',
	},
	cacheDir: resolve(__dirname, '../../node_modules/.vite'),
	plugins: [tsConfigPaths(), react(), dts({ rollupTypes: true })],
	root: __dirname,
});
