import { readFileSync } from 'fs'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import portfinder from 'portfinder'
import ip from 'ip'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { DEV_PORT } from './src/constants/env.js'

// https://cn.vitejs.dev/guide/ssr.html#setting-up-the-dev-server
// TODO routerBase https://github.com/bluwy/create-vite-extra/blob/master/template-ssr-vanilla/server.js
async function createServer() {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  app.use(vite.middlewares)
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

  const port = await portfinder.getPortPromise({ port: DEV_PORT })
  const IPv4 = ip.address()
  app.listen(port, () => {
    consola.log(colors.cyan(`  ➜  http://localhost:${port}/`))
    consola.log(colors.cyan(`  ➜  http://${IPv4}:${port}/`))
  })
}

createServer()
