import path from 'path'
import { defineConfig } from 'vite'
import vitePWA from 'vite-pwa'
import viteVSCode, { createAlias } from 'vite-vscode'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'

const isDevMode = process.env.NODE_ENV !== 'production'
const srcDir = path.resolve('./src')
const config = {
  static: 'static',
  assets: 'assets',
}

const plugins = [
  react(),
  // @ts-ignore
  svgr.default(),
  // vitePWA(),
  viteVSCode(),
]

const css = {
  modules: {
    generateScopedName: isDevMode
      ? '[local]___[name]--[hash:base64:5]'
      : '[hash:base64]',
  },
  preprocessorOptions: {
    scss: {
      additionalData: `@use '$styles/core' as *;\n`,
    },
  },
}

const resolve = {
  alias: {
    $slice: path.join(srcDir, '/store/slice'),
    ...createAlias('$', srcDir),
    $src: srcDir,
  },
}

const server = {
  host: 'localhost',
  port: 3000,
}

const build = {
  rollupOptions: {
    output: {
      assetFileNames: (file) => {
        const ext = file.name.split('.').at(-1)
        const outputFolder =
          ext === 'css' || ext === 'js' ? '' : config.assets + '/'
        return `${config.static}/${outputFolder}[name]-[hash][extname]`
      },
      entryFileNames: `${config.static}/[name]-[hash].js`,
      chunkFileNames: `${config.static}/chunk-[name]-[hash].js`,
    },
  },
}

export default defineConfig({ plugins, css, resolve, server, build })
