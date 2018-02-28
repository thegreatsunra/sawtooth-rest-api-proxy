const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const apiProxy = httpProxy.createProxyServer({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }
})

const restApi = 'http://localhost:8008'
const port = 8888

app.all('/*', (req, res) => {
  console.log(`redirecting request to ${restApi}`)
  apiProxy.web(req, res, { target: restApi })
})

app.listen(port)

console.log(`starting proxy at port ${port}`)
