#!/bin/sh

# Shell commands to quick setup on droplet

echo "Updating Packages"
sudo apt update
sudo apt upgrade -y
echo "................................"

echo "Installing nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
echo "................................"

echo "Installing node and enabling yarn"
nvm install --lts
echo "Node version"
node -v

corepack enable
echo "Yarn version"
yarn -v
echo "................................"

echo "Installing pm2"
yarn global add pm2
echo "................................"

echo "Installing mongodb and nginx"
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install mongodb-org nginx -y
echo "................................"

echo "Cloning Cezerin"
mkdir /var/www
cd /var/www
git clone https://github.com/Cezerin2/Cezerin2.git
echo "................................"

echo "Updating config files"
cd Cezerin2

echo "................................"

echo "Building Cezerin"
echo "Installing Packages"
yarn
echo "................................"

echo "Building Cezerin"
yarn build
echo "................................"

echo "Running Cezerin setup"
yarn setup
echo "................................"

echo "Starting Cezerin"
pm2 start process.json
pm2 status
echo "................................"

echo "Thank you for using Cezerin"

echo "If you have any quetions, post them at issues section,"
echo "https://github.com/Cezerin2/Cezerin2/issues"
