import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  server: {
    port:3000,
  },
  build: {
    rollupOptions: {
      maxParallelFileOps: 10,
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom'],
          'mui-vendors': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled'
          ],
          'router-vendors': ['react-router', 'react-router-dom'],
          'utility-vendors': ['axios', 'react-toastify']
        }
      }
    }
  }
})
