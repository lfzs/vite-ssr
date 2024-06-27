import { createApp } from './app'
const { app, router } = createApp()
router.isReady().then(() => {
  app.mount('#app-6tw222n5mwu')
})