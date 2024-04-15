import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vitePluginExternal from 'vite-plugin-external';
import tsConfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
		},
		outDir: resolve(__dirname, './dist'),
		rollupOptions: {
			input: Object.fromEntries(
				glob
					.sync('src/**/!(*.spec|*.stories|*.test|*.d|types).{ts,tsx}')
					.map((file) => {
						return [
							relative(
								'src',
								file.slice(0, file.length - extname(file).length)
							),
							fileURLToPath(new URL(file, import.meta.url)),
						];
					})
			),
			output: {
				assetFileNames: '[name][extname]',
				entryFileNames: '[name].js',
			},
		},
	},
	esbuild: {
		jsxDev: false,
	},
	plugins: [
		tsConfigPaths(),
		vitePluginExternal({
			externalizeDeps: [
				...Object.keys({
					...pkg.dependencies,
					...pkg.peerDependencies,
				}),
				'react-dom',
				'react/jsx-dev-runtime',
				'react/jsx-runtime',
			],
			nodeBuiltins: true,
		}),
		react(),
		dts({ include: ['src/**/!(*.spec|*.stories|*.test|*.d).{ts,tsx}'] }),
	],
});
