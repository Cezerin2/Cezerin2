#!/bin/sh

# Shell commands to quick setup on droplet

echo "Updating Packages"
sudo apt update
sudo apt upgrade -y
echo "................................"

echo "Installing nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion
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
sudo apt install mongodb-org nginx -y
echo "................................"

echo "Cloning Cezerin"
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

echo "Building theme file"
yarn theme:compile
echo "................................"

echo "Adding theme file"
yarn add ./theme
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

echo "To run node commands, run: source ~/.bashrc"
echo "To restart bash for nvm"

echo "................................"

echo "Thank you for using Cezerin"

echo "If you have any quetions, post them at issues section,"
echo "https://github.com/Cezerin2/Cezerin2/issues"
