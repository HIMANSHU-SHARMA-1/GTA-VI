import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    // Listen on all network interfaces so LAN/port-forwarding works
    host: true,
    // Use a fixed port for predictable forwarding
    port: 5000,
    strictPort: true,
    // Enable CORS for access through proxies/tunnels if needed
    cors: true,
  },
  preview: {
    host: true,
    port: 5000,
    strictPort: true,
    cors: true,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
