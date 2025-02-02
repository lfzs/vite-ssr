import { renderToString } from 'vue/server-renderer'
import { createApp } from './app'

const render = async ({ req }) => {
  const ctx = { req }
  const { app, router, head } = createApp()
  router.push(req.originalUrl)
  await router.isReady()
  const html = await renderToString(app, ctx)
  return { html, head }
}

export {
  render
}