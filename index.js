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

proxy.on('proxyReq', (proxyReq) => {
  proxyReq.setHeader('Access-Control-Allow-Origin', '*')
  proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

})
