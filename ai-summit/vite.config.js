import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from ganeshkhetawat.tech/new — the build lands in the portfolio's
// public/ folder so Next's static export ships it as-is.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/new/',
  build: {
    outDir: '../public/new',
    emptyOutDir: true,
  },
})
