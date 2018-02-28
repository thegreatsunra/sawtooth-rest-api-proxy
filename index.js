const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const apiProxy = httpProxy.createProxyServer()

const restApi = 'http://localhost:8008'
const port = 8888

app.all('/*', (req, res) => {
  console.log(`redirecting request to ${restApi}`)
  apiProxy.web(req, res, { target: restApi })
})

app.listen(port)

console.log(`starting proxy at port ${port}`)
