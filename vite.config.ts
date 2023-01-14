// @ts-ignore
import path from 'path'
import { defineConfig } from 'vite'
import vitePWA from 'vite-pwa'
import viteVSCode, { config } from 'vite-vscode'
import react from '@vitejs/plugin-react-swc'
import svgr from '@honkhonk/vite-plugin-svgr'
const srcDir = path.resolve('./src')

export default defineConfig({
  plugins: [
    react(),
    vitePWA(),
    viteVSCode(),
    // @ts-ignore
    svgr.default(),
  ],

  css: {
    devSourcemap: true,
    modules: config.cssModule(),
    preprocessorOptions: {
      scss: {
        additionalData: `@use '$styles/core' as *;\n`,
      },
    },
  },

  resolve: {
    alias: {
      $slice: path.join(srcDir, '/store/slice'),
      ...config.aliases('$', srcDir),
      $src: srcDir,
    },
  },

  server: {
    host: 'localhost',
    port: 3000,
  },

  build: {
    rollupOptions: {
      output: config.groupedOutput(),
    },
  },
})
