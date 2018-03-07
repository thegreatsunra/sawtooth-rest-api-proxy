const express = require('express')
const expressProxy = require('express-http-proxy')
const fs = require('fs')
const helmet = require('helmet')
const https = require('https')
const path = require('path')

const config = require('./config')

const app = express()

app.use(helmet())

})

app.use(express.static('public'))

app.use('/', expressProxy(`${config.api.host}:${config.api.port}`, {
}))

app.listen(config.proxy.port)

https.createServer({
  cert: fs.readFileSync(path.resolve(__dirname, config.proxy.sslCert)),
  key: fs.readFileSync(path.resolve(__dirname, config.proxy.sslKey))
}, app).listen(config.proxy.securePort)

console.log(`Listening for requests at port ${config.proxy.securePort} ...`)
console.log(`... and forwarding them to ${config.api.host}:${config.api.port}`)

