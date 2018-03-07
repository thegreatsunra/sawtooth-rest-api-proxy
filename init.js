const express = require('express')
const helmet = require('helmet')

const config = require('./config')

const app = express()

app.use(helmet())

app.use(express.static('public'))

app.listen(config.proxy.initPort)

console.log(`Listening for requests at port ${config.proxy.initPort} ...`)
