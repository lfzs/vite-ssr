import { readFileSync } from 'fs'
import { networkInterfaces } from 'os'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const PORT = 5173
const IPv4 = [].concat(...Object.values(networkInterfaces())).find(x => !x.internal && x.family === 'IPv4')?.address

// https://cn.vitejs.dev/guide/ssr.html#setting-up-the-dev-server
async function createServer() {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next)
  })
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = readFileSync('./index.html', 'utf8')
      template = await vite.transformIndexHtml(url, template)
      const { render } = await vite.ssrLoadModule('./src/server.js')
      const { html } = await render({ req })
      res.send(template.replace('<!--ssr-outlet-->', html))
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(PORT, () => {
    console.info('\x1b[36m%s\x1b[0m', `http://localhost:${PORT}/`)
    console.info('\x1b[36m%s\x1b[0m', `http://${IPv4}:${PORT}/`)
  })
}

createServer()
