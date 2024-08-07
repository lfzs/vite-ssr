import { join } from 'path'
import { copyFileSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const copyFile = () => ({
  buildEnd: () => ['./package.json', './pnpm-lock.yaml']
      .forEach(path => copyFileSync(path, join('dist', path)))
})

export default defineConfig(({ mode, isSsrBuild }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      isSsrBuild && copyFile()
    ].filter(Boolean),
    build: {
      ...(isSsrBuild ? {
        target: 'esnext',
        emptyOutDir: false,
        copyPublicDir: false,
      } : {})
    }
  }
})
