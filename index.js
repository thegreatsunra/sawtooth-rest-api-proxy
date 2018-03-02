const express = require('express')
const httpProxy = require('http-proxy')

const config = require('./config')

const app = express()
const apiProxy = httpProxy.createProxyServer({
  xfwd: true
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.all('*', (req, res) => {
  console.log(`Redirecting request to ${config.apiUrl}`)
  apiProxy.web(req, res, {
    target: config.apiUrl
  })
})

app.listen(config.proxyPort)

console.log(`Listening for requests at ${config.proxyPort}`)
console.log(`and forwarding them to ${config.apiUrl}`)
