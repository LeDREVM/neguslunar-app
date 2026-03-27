import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const nextcloudTarget = env.VITE_NEXTCLOUD_URL || 'https://ledream.kflw.io'

  return {
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // Désactiver le service worker en développement
    headers: {
      'Service-Worker-Allowed': '/'
    },
    // Proxy Nextcloud pour éviter les erreurs CORS
    proxy: {
      '/nc': {
        target: nextcloudTarget,
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/nc/, '')
      }
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
  }
})
