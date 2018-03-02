# sawtooth-rest-api-proxy

> Reverse proxy for Sawtooth REST API using Express

## Getting started

```bash
git clone git@github.com:thegreatsunra/sawtooth-rest-api-proxy.git

cd sawtooth-rest-api-proxy

npm install
```

Edit the values in `config.js` to reflect the URL of your Sawtooth REST API, and the port that you want the proxy to run on. 

By default, the proxy listens for requests at port `8888` on the current server and forwards them to port `http://localhost:8008`. Using `localhost` for the Sawtooth REST API works for our purposes, but depending on your architecture you may need to specify an IP address.

Responses from the Sawtooth REST API are given generous `Access-Control-Allow-Origin` headers by the proxy, and then sent along to the requesting client.

## Usage

```bash
cd sawtooth-rest-api-proxy

node index.js
```

### Use pm2 to start proxy as a long-running process

```bash
npm install -g pm2

cd sawtooth-rest-api-proxy

pm2 start index.js
```
