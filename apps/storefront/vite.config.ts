// apps/storefront/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Exclude test files from build to fix TypeScript errors
    rollupOptions: {
      external: ['**/*.test.*', '**/*.stories.*', '**/__tests__/**']
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
