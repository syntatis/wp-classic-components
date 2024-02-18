import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsConfigPaths(), react()],
	test: {
		alias: {
			tests: resolve(__dirname, './tests'),
		},
		environment: 'jsdom',
		globals: true,
		include: ['**/*.test.{ts,tsx}'],
		setupFiles: './tests/setup.ts',
	},
});
