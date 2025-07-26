import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or vue/svelte if applicable
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Fantasy App',
        short_name: 'Fantasy',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#6200ee',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
});
