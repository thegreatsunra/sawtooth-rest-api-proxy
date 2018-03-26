const dotenv = require('dotenv')
const yn = require('yn')

dotenv.config()

const env = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  useBasicAuth: yn(process.env.USE_BASIC_AUTH) || false,
  useHttps: yn(process.env.USE_HTTPS) || false,
  proxy: {
    initPort: process.env.PROXY_INIT_PORT || 80,
    internalPort: process.env.PROXY_INTERNAL_PORT || 8887,
    publicPort: process.env.PROXY_PUBLIC_PORT || 8888,
    sslCert: process.env.PROXY_SSL_CERT_PATH || './sslcert/fullchain.pem',
    sslKey: process.env.PROXY_SSL_KEY_PATH || './sslcert/privkey.pem'
  },
  sawtoothRestApi: {
    host: process.env.SAWTOOTH_REST_API_HOST || 'localhost',
    port: process.env.SAWTOOTH_REST_API_PORT || 8008,
    endpoints: [
      'batches',
      'batch_statuses',
      'blocks',
      'peers',
      'receipts',
      'state',
      'status',
      'transactions'
    ]
  }
}

module.exports = env
