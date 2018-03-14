const auth = require('basic-auth')
const express = require('express')
const expressProxy = require('express-http-proxy')
const fs = require('fs')
const helmet = require('helmet')
const https = require('https')
const morgan = require('morgan')
const path = require('path')

const config = require('./config')
const env = require('./env')

const app = express()

app.use(helmet())
app.use(morgan('combined'))

app.use((req, res, next) => {
  const credentials = auth(req)
  if (credentials === undefined || credentials.name !== env.username || credentials.pass !== env.password) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"')
    res.end('Unauthorized')
  } else {
    next()
  }
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.static('public'))

app.use('/', expressProxy(`${config.api.host}:${config.api.port}`, {
  filter: (req, res) => {
    return proxyRequest(req.path, config.api.endpoints)
  }
}))

if (env.disableHttps) {
  app.listen(config.proxy.securePort)
  console.warn('Warning! Proxy is not secured via HTTPS!\n')
} else {
  app.listen(config.proxy.port)

  https.createServer({
    cert: fs.readFileSync(path.resolve(__dirname, config.proxy.sslCert)),
    key: fs.readFileSync(path.resolve(__dirname, config.proxy.sslKey))
  }, app).listen(config.proxy.securePort)
}

console.log(`Listening for requests at port ${config.proxy.securePort} ...`)
console.log(`... and forwarding them to ${config.api.host}:${config.api.port}`)

const proxyRequest = (path, endpoints) => {
  let match = false
  endpoints.forEach((endpoint) => {
    if (path.includes(endpoint)) {
      match = true
    }
  })
  return match
}
