const path = require('path')
const fs = require('fs')
const httpProxy = require('http-proxy')

const config = require('./config')

const proxy = httpProxy.createServer({
  xfwd: true,
  target: {
    host: config.api.host,
    port: config.api.port
  },
  ssl: {
    key: fs.readFileSync(path.join('./sslcert', 'privkey.pem'), 'utf8'),
    cert: fs.readFileSync(path.join('./sslcert', 'fullchain.pem'), 'utf8')
  },
  secure: true
})

proxy.listen(config.proxy.port)

proxy.on('proxyRes', (proxyRes, req, res) => {
  console.log('Sent response from proxy')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
})

proxy.on('error', (error) => {
  console.log('error', error)
})

proxy.on('proxyReq', () => {
  console.log('Received request at proxy')
})

console.log(`Listening for requests at :${config.proxy.port}`)
console.log(`and forwarding them to ${config.api.host}:${config.api.port}`)
