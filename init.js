const express = require('express')
const fs = require('fs')
const helmet = require('helmet')
const path = require('path')

const env = require('./env')
const random = require('./random')

const app = express()

const username = random.createWord() + '-' + random.createWord()
const password = random.createString(24, 'lowercasenumbers')

const output = `USERNAME=${username}\nPASSWORD=${password}\nUSE_HTTPS=false\nUSE_BASIC_AUTH=false`

fs.writeFile(path.resolve(__dirname, './.env'), output, (err) => {
  if (err) {
    return console.log(err)
  }
})

console.log('Saved a new basic-auth username and password combination to .env\n')
console.log(`USERNAME:\n${username}\n`)
console.log(`PASSWORD:\n${password}\n`)

app.use(helmet())

app.use(express.static('public'))

app.listen(env.proxy.initPort)

console.log(`Listening for requests at port ${env.proxy.initPort} ...`)
