import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		alias: {
			tests: path.resolve(__dirname, './tests'),
		},
		environment: 'jsdom',
		globals: true,
		include: ['**/*.test.{ts,tsx}'],
		setupFiles: './tests/setup.ts',
	},
});
