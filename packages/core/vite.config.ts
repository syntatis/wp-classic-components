import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [react(), dts()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			external: ['clsx', 'react', 'react/jsx-runtime'],
		},
	},
});
