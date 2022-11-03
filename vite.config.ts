// @ts-nocheck
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      clientPort: 3000,
    },
  },
  plugins: [
    react({
      exclude: [/node_modules/],
      babel: {
        plugins: ['macros', 'styled-components'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@~', replacement: path.resolve(__dirname, './public') },
    ],
  },
})
