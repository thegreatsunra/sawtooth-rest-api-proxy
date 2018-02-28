const express = require('express')
const httpProxy = require('http-proxy')

const config = require('./config')

const app = express()
const apiProxy = httpProxy.createProxyServer()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.all('/*', (req, res) => {
  console.log(`redirecting request to ${config.apiUrl}`)
  apiProxy.web(req, res, {
    target: config.apiUrl
  })
})

app.listen(config.proxyPort)

console.log(`Starting proxy server at port ${config.proxyPort}`)
console.log(`Listening for requests at ${config.apiUrl}`)
