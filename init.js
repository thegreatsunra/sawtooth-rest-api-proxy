const express = require('express')
const helmet = require('helmet')

const env = require('./env')

const app = express()

app.use(helmet())

app.use(express.static('public'))

app.listen(env.proxy.initPort)

console.log(`Listening for requests at port ${env.proxy.initPort} ...`)
