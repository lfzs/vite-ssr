import { readFileSync } from 'fs'
import express from 'express'
import sirv from  'sirv'
import { render } from './server.js'
const PORT = 6678
const app = express()
const template = readFileSync('./index.html', 'utf8')

app.use(sirv('.', { extensions: [] }))
app.get('*', async (req, res) => {
  const { html } = await render({ req })
  res.send(template.replace('<!--ssr-outlet-->', html))
})

app.listen(PORT)
