import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ? '/appointment-booking-app/' : '/',
    server: {
      proxy: {
        '/api/email': {
          target: 'https://api.resend.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/email/, '/emails'),
          headers: {
            'Authorization': `Bearer ${env.VITE_RESEND_API_KEY}`
          }
        }
      }
    }
  };
});