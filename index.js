const auth = require('basic-auth')
const cors = require('cors')
const express = require('express')
const expressProxy = require('express-http-proxy')
const fs = require('fs')
const helmet = require('helmet')
const https = require('https')
const morgan = require('morgan')
const path = require('path')

const env = require('./env')

const app = express()

const sawtoothRestApiUrl = `${ env.sawtoothRestApi.host }:${ env.sawtoothRestApi.port }`

app.use(helmet())
app.use(morgan('combined'))
app.use(cors())

app.use((req, res, next) => {
  const credentials = auth(req)
  if (credentials === undefined || credentials.name !== env.username || credentials.pass !== env.password) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="SawtoothRestAPIProxy"')
    res.end('Unauthorized')
  } else {
    next()
  }
})

app.use(express.static('public'))

app.use('/', expressProxy(sawtoothRestApiUrl, {
  filter: (req, res) => {
    return proxyRequest(req.path, env.sawtoothRestApi.endpoints)
  }
}))

if (env.useHttps === false) {
  app.listen(env.proxy.publicPort)
  console.log('\n========================================')
  console.warn('Warning! Proxy is not secured via HTTPS!')
  console.log('========================================\n')

  console.log(`Listening for requests at port ${env.proxy.publicPort}`)
  console.log(`and forwarding them to http://${sawtoothRestApiUrl}`)

} else {
  app.listen(env.proxy.internalPort)
  https.createServer({
    cert: fs.readFileSync(path.resolve(__dirname, env.proxy.sslCert)),
    key: fs.readFileSync(path.resolve(__dirname, env.proxy.sslKey))
  }, app).listen(env.proxy.publicPort)

  console.log(`Listening for requests at port ${env.proxy.publicPort}`)
  console.log(`and forwarding them to https://${sawtoothRestApiUrl}`)
}

const proxyRequest = (path, endpoints) => {
  let match = false
  endpoints.forEach((endpoint) => {
    if (path.includes(endpoint)) {
      match = true
    }
  })
  return match
}
