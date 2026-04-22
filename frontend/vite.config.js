import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Permite usar process.env en código cliente si es necesario
    global: 'globalThis',
  },
})
