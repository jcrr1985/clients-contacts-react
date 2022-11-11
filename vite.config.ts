// @ts-nocheck
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

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
        plugins: ['macros', '@emotion'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: './bundle_stats.html',
        }),
      ],
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@~', replacement: path.resolve(__dirname, './public') },
    ],
  },
})
