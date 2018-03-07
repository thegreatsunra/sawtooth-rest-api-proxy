const config = {
  api: {
    host: 'localhost',
    port: 8008,
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
  },
  proxy: {
    port: 8887,
    securePort: 8888,
    sslCert: './sslcert/fullchain.pem',
    sslKey: './sslcert/privkey.pem'
  }
}

module.exports = config
