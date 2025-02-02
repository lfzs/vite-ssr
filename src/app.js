import { createSSRApp } from 'vue'
import { createHead } from '@unhead/vue'
import 'normalize.css'
import '@/static/style/flex.less'
import App from './App.vue'
import { createRouter } from './router'

export function createApp() {
  const router = createRouter()
  const head = createHead()
  const app = createSSRApp(App)
  app.use(head)
  app.use(router)
  return { app, router, head }
}