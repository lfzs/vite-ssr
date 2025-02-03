import { readFileSync } from 'fs'
import express from 'express'
import { renderSSRHead } from '@unhead/ssr'
import { render } from './src/server.js'
import { SERVER_PORT } from './src/constants/env.js'
import { extractAntdvStyle } from './scripts/extractAntdvStyle.js'

const app = express()
app.use(express.static('.', { index: false }))
const template = readFileSync('./index.html', 'utf8')
const { fileName } = extractAntdvStyle()

app.use('*all', async (req, res) => {
  const { html, head } = await render({ req })
  const { headTags } = await renderSSRHead(head)
  const data = template
    .replace('<!--ssrOutlet-->', html)
    .replace('<!--headTags-->', headTags)
    .replace('<!--antdvStyle-->', `<link rel="stylesheet" crossorigin href="${fileName}">`)
  res.send(data)
})

app.listen(SERVER_PORT)
