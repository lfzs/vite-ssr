import { readFileSync } from 'fs'
import express from 'express'
import { renderSSRHead } from '@unhead/ssr'
import { globSync } from 'glob'
import { render } from './src/server.js'
import { SERVER_PORT } from './src/constants/env.js'

const app = express()
app.disable('x-powered-by')
app.use(express.static('.', { index: false }))
const template = readFileSync('./index.html', 'utf8')
const [antdvStyleFileName] = globSync('./assets/antdv.min.*.css')

app.use('*all', async (req, res) => {
  const { html, head } = await render({ req })
  const { headTags } = await renderSSRHead(head)
  const data = template
    .replace('<!--ssrOutlet-->', html)
    .replace('<!--headTags-->', headTags)
    .replace('<!--antdvStyle-->', `<link rel="stylesheet" crossorigin href="/${antdvStyleFileName}">`)
  res.send(data)
})

app.listen(SERVER_PORT, () => console.log(`app listening on port ${SERVER_PORT} 🚀`))
