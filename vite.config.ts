import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // Specifies the root directory
  plugins: [react()],
  server: {
    open: true, // Opens the browser automatically
    port: 5173, // Use a different port if necessary
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});