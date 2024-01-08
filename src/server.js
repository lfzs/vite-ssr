import { renderToString } from 'vue/server-renderer'
import { createApp } from './app'

const render = async ({ req }) => {
  const { app } = createApp()
  const ctx = { req }
  const html = await renderToString(app, ctx)
  return { html }
}


export {
  render
}