import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
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
