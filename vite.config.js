import { join, resolve } from 'path'
import { copyFileSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import computedToken from './src/static/style/antdv/computedToken'
import vars from './src/static/style/vars'
const copyFile = () => ({
  buildEnd: () =>
    ['./package.json', './pnpm-lock.yaml', 'ecosystem.config.js'].forEach(path =>
      copyFileSync(path, join('dist', path)),
    ),
})

export default defineConfig(({ isSsrBuild }) => {
  const envDir = './env'

  return {
    plugins: [vue(), vueJsx(), isSsrBuild && copyFile()].filter(Boolean),
    envDir,
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: { ...vars, ...computedToken },
          javascriptEnabled: true,
        },
      },
    },
    build: {
      reportCompressedSize: false,
      ...(isSsrBuild
        ? {
            emptyOutDir: false,
            copyPublicDir: false,
          }
        : {
            target: ['es2022', 'edge120', 'firefox120', 'chrome120', 'safari16'],
          }),
    },
  }
})
