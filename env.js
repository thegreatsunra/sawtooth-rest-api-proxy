const dotenv = require('dotenv')
const yn = require('yn')

dotenv.config()

const env = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  useHttps: yn(process.env.USE_HTTPS) || false,
}

module.exports = env
