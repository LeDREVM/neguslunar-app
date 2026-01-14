import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // Désactiver le service worker en développement
    headers: {
      'Service-Worker-Allowed': '/'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  // Désactiver le service worker
  worker: {
    format: 'es'
  }
})
