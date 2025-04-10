import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://food-recipes-oe00.onrender.com',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

