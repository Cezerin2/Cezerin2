echo "Hello from Cezerin..."
echo "Checking for nodejs and yarnpkg"
node -v
yarn -v
echo "................................"

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

echo "Starting the store..."
echo "You can see the store at http://localhost:3000"
echo "And admin panel at http://localhost:3000/admin"
echo "Thank you for using Cezerin"

echo "If you have any quetions, post them at issues section,"
echo "https://github.com/Cezerin2/Cezerin2/issues"
yarn start
