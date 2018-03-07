const express = require('express')
const expressProxy = require('express-http-proxy')
const fs = require('fs')

const config = require('./config')

const app = express()


})

app.use(express.static('public'))

app.use('/', expressProxy(`${config.api.host}:${config.api.port}`, {
}))

app.listen(config.proxy.port)

