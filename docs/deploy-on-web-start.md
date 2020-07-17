# How to deploy Cezerin on Web

- [Hosting](#1-hosting)
- [Create droplet](#1-create-droplet)
- [Install NGinx Web Server + MERN Stack](#2-install-mern)
- [Run MongoDB](#3-run-mongodb)
- [Run Cezerin](#4-run-cezerin)
- [Preparing Database](#5-preparing-database)
- [Setup domain with Cloudflare](#6-setup-domain-with-cloudflare)
- [Turn off Developer Mode](#7-turn-off-developer-mode)

## 1. Hosting

You can use any hosting: shared hosting with ssh, VM hosting, VDS hosting, NodeJS hosting, DigitalOcean, cloud services like Heroku, Amazon AWS, Google Cloud, any...)
All you need is MERN stack (MongoDB + ExpressJS + ReactJs + NodeJS), nothing special.
You can install it on virtual machine, or you can use "out of the box" services like Heroku, Google Firebase etc...

I'll use [DigitalOcean](https://m.do.co/c/a1d5495e08b2) to deploy Cezerin.

Register by this link at DigitalOcean and receive free 10\$ coupon to your account.

You can add your site for free for 2 month. 5\$ per month.
coupon code is ACTIVATE10, activate it in your profile - billing tab.

## 2. Create droplet

1. Click **Create droplet**

- Choose an image: `Ubuntu 19.04.4 x64`
- Choose a size: `2 GB (RAM), 1 vCPU, 50 GB (SSD)`
- Choose a datacenter region: `San Francisco`

2. Then SSH to droplet.

## 3. Install NGinx Web Server + MERN Stack

NGinx Web Server Installation

```
apt update && apt install nginx-full
```

[MongoDB 4.x Installation Guide.](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Console command:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
systemctl start mongod
systemctl enable mongod
```

[NodeJS 11.x Installation Guide.](https://github.com/nodesource/distributions/blob/master/README.md)

Console command:

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Update NPM:

```
npm i -g npm
```

PM2 Installation:

```
sudo npm install -g pm2
```

## 3. Run MongoDB

```shell
sudo service mongod start
```

## 4. Install and Run Cezerin

We will install cezerin to the /var/www folder.

Connect by ssh to your hosting.

```shell
cd /var/www
```

Clone cezerin:

```shell
git clone https://github.com/cezerin2/cezerin2
cd cezerin2
```

Cezerin files located in /var/www/cezerin2 folder.

Then just install, build and run cezerin, check this doc.

[Cezerin Installation Guide.](https://github.com/Cezerin2/cezerin2/blob/master/docs/using-source-code.md)

Cezerin apps must be running, console command:

```
pm2 list all
```

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ api                │ fork     │ 2    │ online    │ 5.6%     │ 139.5mb  │
│ 1  │ store              │ fork     │ 3    │ online    │ 6.8%     │ 134.2mb  │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

Ok. Cezerin is started and working. Let's go futher.

## 5. Run Nginx

To enable cezerin apps from browser, we need to setup web server.

We need to proxy all requests from web to our cezerin apps.

All requests from domain.com proxy to localhost:3000 (running cezerin frontend app)

All requests from domain.com/api, domain.com/ajax, domain.com/images proxy to localhost:3001 (running cezerin backend app)

We have cezerin nginx config, so you can use this config for web deploy.

[cezerin nginx config](https://raw.githubusercontent.com/cezerin2/cezerin2/master/docs/nginx.md)

P.S. Change /var/www/cezerin2/ in nginx config to your path if you download cezerin to another folder. 

We need to add a new website to Nginx.

1. Change Nginx config file

   ```
   cd /etc/nginx/sites-available
   ```

   open `default` file and paste [this config](https://raw.githubusercontent.com/cezerin2/cezerin2/master/docs/nginx.md)

2. Reload Nginx configuration
   ```
   nginx -t && service nginx reload
   ```


## 6. Setup domain with CloudFlare

[Cloudflare.](https://www.cloudflare.com)

- Get droplet IP on DigitalOcean
  ![DigitalOcean IP Address](./images/do-ip.png)

- Add `A` and `CNAME` to DNS on CloudFlare
  ![CloudFlare DNS](./images/cf-dns.png)
- Set SSL to `Flexible` on CloudFlare
  ![CloudFlare SSL](./images/cf-ssl.png)

- Turn on `Always use HTTPS` on CloudFlare
  ![CloudFlare Always HTTPS](./images/cf-alway-https.png)

- Add `A` record for admin dashboard:

Type: A
Name: admin
Content: your-droplet-ip-address

## 7. Cezerin configs changes:

You must edit cezerin configs and setup new domain name at configs.

/cezerin2/config/admin.js

Change:

```
http://localhost:3001/api/v1 to https://your-domain-name.com/api/v1
ws://localhost:3001 to wss://your-domain-name.com
```

/cezerin2/config/server.js

Change:

```
http://localhost:3001/api/v1 to https://your-domain-name.com/api/v1
http://localhost:3001/ajax to https://your-domain-name.com/ajax
http://localhost:3000 to https://your-domain-name.com
```

/cezerin2/config/store.js

Change:

```
http://localhost:3001/ajax to https://your-domain-name.com/ajax
```

Rebuild & restart apps with new configs:

```
npm run build
pm2 reload api
pm2 reload store
```

## 8. Final checks

That's all.

If you:

1. Run cezerin.
2. Run webserver nginx with cezerin config.
3. Setup DNS records.

You will see working store in your browser by this urls:

Store: https://your-domain-name.com

API: https://your-domain-name.com/api/v1/settings

Dashboard: https://your-domain-name.com/admin

## 9. Turn off Developer Mode

By default, Cezerin is in developer mode. This means you can access API and Dashboard without authorization (access tokens).

Don't forget to switch off developer mode at working store.
At dev mode api's and dashboard available for all without any restrictions.

To turn off developer mode, you need to do:

- Add access token while install (npm run setup ...) or add email for admin at Admin - Settings - Web tokens
- Set SMTP server in `cezerin2/config/server.js`
- Set false for option `developerMode` from `cezerin2/config/server.js`
- Set false for option `developerMode` from `cezerin2/config/admin.js`
- Rebuild & restart apps with new configs:

```
npm run build
pm2 reload api
pm2 reload store
```

- Production mode is active now.

What is production mode?!

At production mode all requests to api must be authorized with JWT token.

It means nobody can add/edit/delete categories, products, orders, customers, etc. without permission.

Only admins can make this.

You must login before you access to admin.
Login page - https://your-domain-name.com/admin/login

Specify your admin email address and you will receive email with authorization link.

Click to link at email and you will set JWT token at all requests to api.

JWT token added to every request header - Bearer Authentication.

P.S. or you can manually login to the admin, without email.

Add admin JWT key at Admin - Settings - Personal access tokens.

Save your key.

JWT Token looks like this:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiYWRtaW4iXSwianRpIjoiNWUyY2FhODU2MjEyMmYwZjQwODdkNmUyIiwiZW1haWwiOiJ2YW1zaG9wQGdtYWlsLmNvbSIsImlhdCI6MTU3OTk4NTk1MCwiZXhwIjo0MTcxOTg1OTUwfQ.28iql8r_PDARK6Xym2JWWkV3Vk7cBBkMbALbhEyA2oI

Switch to production mode.

And authorizate to admin with this url example: https://your-domain-name.com/admin/login?token=  

Insert you key in the URL, like this:

https://your-domain-name.com/admin/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiYWRtaW4iXSwianRpIjoiNWUyY2FhODU2MjEyMmYwZjQwODdkNmUyIiwiZW1haWwiOiJ2YW1zaG9wQGdtYWlsLmNvbSIsImlhdCI6MTU3OTk4NTk1MCwiZXhwIjo0MTcxOTg1OTUwfQ.28iql8r_PDARK6Xym2JWWkV3Vk7cBBkMbALbhEyA2oI
