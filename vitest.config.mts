import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
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
