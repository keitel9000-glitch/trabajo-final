import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración mínima de Vite para React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  base: process.env.GH_PAGES ? '/trabajo-final/' : '/',
})
