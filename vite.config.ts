import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

// vite.config.ts
export default {
  server: {
    proxy: {
      '/collect': {
        target: 'https://appsignal-endpoint.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/collect/, ''),
      },
    },
  },
};