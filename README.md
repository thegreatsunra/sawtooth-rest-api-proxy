# sawtooth-rest-api-proxy

> Reverse proxy for Sawtooth REST API using Express

## Getting started

```bash
git clone git@github.com:thegreatsunra/sawtooth-rest-api-proxy.git

cd sawtooth-rest-api-proxy

npm install
```

## Install an SSL certificate via certbot

1) If you haven't configured a hostname for your server yet (e.g. `awesome-server.domain.tld` points to your server) do so now. Something like this might work:

```bash
lsattr /etc/hostname && sudo chattr -i /etc/hostname
sudo sh -c "echo '__YOUR_SERVER_HOSTNAME____' > /etc/hostname"
sudo hostname -F /etc/hostname
sudo chattr +i /etc/hostname
```

2) Log into your DNS service (e.g. Cloudflare) and add your server's hostname and IP address as an "A" record for your domain

3) Make sure port 80 is open on your server (e.g. it isn't being blocked by ufw or another firewall utility)

4) Run the following command, which will start a lightweight static site on your server at port 80

```bash
cd sawtooth-rest-api-proxy

# Many VM providers (e.g. Digital Ocean) require root privileges to run a service on port 80
sudo node init.js
```

5) **Keep that script running.** Now, open a _second_ SSH session on your server and install certbot:

```bash
sudo add-apt-repository -y ppa:certbot/certbot && apt update -yq && apt install -yq certbot
```

6) Issue an SSL certificate for your server, using the init script's Express server to complete certbot's round-trip verification:

```
cd ~/sawtooth-rest-api-proxy && sudo certbot certonly --agree-tos --noninteractive --email __YOUR_EMAIL@DOMAIN.TLD__ --webroot -w ./public -d __YOUR_SERVER_HOSTNAME__
```

7) If the above command was successful, switch back to your _first_ SSH session and stop the `init.js` script via CTRL+C

8) Run the following commands to put your SSL certificate and key in a place where your proxy app has permission to run it (TODO: Make this smarter and better and more secure)

```bash
## Copy your SSL key and certificate into your rest api project folder
sudo cp /etc/letsencrypt/live/__YOUR_SERVER_HOSTNAME__/fullchain.pem ~/sawtooth-rest-api-proxy/sslcert/fullchain.pem  && sudo cp /etc/letsencrypt/live/__YOUR_SERVER_HOSTNAME__/privkey.pem ~/sawtooth-rest-api-proxy/sslcert/privkey.pem

## Change ownership for key files to sawtooth user, and change permissions
## This assumes you have a user on your server named sawtooth, and that user is responsible for running things
sudo chown sawtooth:sawtooth ~/sawtooth-rest-api-proxy/sslcert/privkey.pem ~/sawtooth-rest-api-proxy/sslcert/fullchain.pem && chmod 755 ~/sawtooth-rest-api-proxy/sslcert/privkey.pem ~/sawtooth-rest-api-proxy/sslcert/fullchain.pem
```

9) TODO: Set up a cron job to run certbot and renew certificates every 90 days

10) TODO: Set up a cron job to copy renewed certificate and key files to the proxy app folder

## Configuration

Edit the values in `config.js` to reflect the URL of your Sawtooth REST API, and the port that you want the proxy to run on.

By default, the proxy listens for requests at port `8888` on the current server and forwards them to `localhost:8008`.

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
