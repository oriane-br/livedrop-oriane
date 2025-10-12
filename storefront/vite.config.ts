import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Split support engine
          engine: ['./src/assistant/engine.ts'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
