const dotenv = require('dotenv')

dotenv.config()

const env = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  disableHttps: process.env.DISABLE_HTTPS || false
}

module.exports = env
