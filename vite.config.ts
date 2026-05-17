import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://webnexfusion.com/webnexfusion',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/server_php/api'),
      },
    },
  },
});
