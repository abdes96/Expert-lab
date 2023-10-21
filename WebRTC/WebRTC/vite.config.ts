import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodePolyfills from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), NodePolyfills({
    buffer: true,
    process: true,
  }),],
})
