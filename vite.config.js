import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/auth': 'http://localhost:8080',
      '/api/customers': 'http://localhost:8080',
      '/api/subscriptions': 'http://localhost:8080',
      '/api/billing': 'http://localhost:8080',
      '/api/images': 'http://localhost:5000',
      '/api/batches': 'http://localhost:5000',
    },
  },
});
