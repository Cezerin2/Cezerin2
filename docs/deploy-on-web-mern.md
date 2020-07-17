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
