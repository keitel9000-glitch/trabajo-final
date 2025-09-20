const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()
app.use(cors())

const TARGET = process.env.TARGET_API || 'https://rickandmortyapi.com/api'

app.use('/proxy', createProxyMiddleware({ target: TARGET, changeOrigin: true, pathRewrite: { '^/proxy': '' } }))

const PORT = process.env.PORT || 8787
app.listen(PORT, () => console.log(`Proxy escuchando en http://localhost:${PORT} -> ${TARGET}`))
