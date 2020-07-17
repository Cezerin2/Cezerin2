### Prerequisites

- **Nginx `>= 1.14.0`**

```shell
apt update && apt install nginx-full
```

- **Mongodb `>= 3.2`**

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

- **Node.js `v11.x`**

NodeJS 11.x installation:

```shell
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nodejs (edited)
```

- **NPM `>= 6.3.0`**

```shell
npm i -g npm
```

- **PM2 `>= 3.0.3`**

```shell
npm i -g pm2
```
