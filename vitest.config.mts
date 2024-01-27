import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		alias: {
			test: path.resolve(__dirname, './test'),
		},
		environment: 'jsdom',
		globals: true,
		include: ['**/*.test.{ts,tsx}'],
		setupFiles: './test/setup.ts',
	},
});
