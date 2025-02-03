import { createSSRApp } from 'vue'
import { createHead } from '@unhead/vue'
import 'ant-design-vue/dist/reset.css'
import '@/static/style/flex.less'
import '@/static/style/reset.less'
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
