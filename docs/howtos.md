## HowTos

### How to significantly speed up the development process?

1. Do it first

```javascript
npm install --save-dev nodemon
```

2. Then add

```javascript
"start:dev": "nodemon -r esm dist/store/server/index.js"
```

in the script section file package.json

3. Open 3 terminals

4. execute commands (each in a separate terminal)

```javascript
npm run build:watch
npm run start:api
npm run start:dev
```

nodemon views file change and restarts the store

"build:watch" first builds everything, and then rebuilds only the changed

it does not reload the page in the browser automatically, but significantly speeds up the development process

### Feel free to add your HowTos.

You can add it by making Pull Request to the https://github.com/Cezerin2/cezerin2.github.io
