## FAQ

Feel free to add your FAQs.
You can add it by making Pull Request to the https://github.com/Cezerin2/cezerin2.github.io

### CORS (Allow-Cross-Origin) Error. How to fix?!

You need to change all configs and replace all localhost with your ip number or domain name.

How it's work.

Check file: /cezerin2/src/index.js
This code:

```javascript
// CORS headers
var allowedOrigins = security.getAccessControlAllowOrigin()
var origin = req.headers.origin
if (allowedOrigins === "*") {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins)
} else {
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
}
```

And this file: /cezerin2/src/lib/security.js

```javascript
const getAccessControlAllowOrigin = () => {
  return [settings.storeBaseUrl, settings.adminBaseURL] || "*"
}
```

storeBaseUrl and adminBaseURL settings located in your config /cezerin2/config/server.js

### Can't build cezerin2-store app, how to fix?

Try to install node-sass before cezerin2-store dependencies.

```javascript
sudo npm i --unsafe-perm node-sass
```

Then download cezerin2-store and try to install:

```javascript
npm i && npm run build
```

### "npm run build" command returns "Error 137", how to fix?

Increase RAM size (free memory) on your machine.

You can see free memory by this console command:

```javascript
free - m
```

### Empty cart after clicking "Add to cart" inside a product, how to fix?

Try to clean the cookies of your browser.


### Registration and password forget emails are empty, how to fix?

If you changed your language (and is different from English, Russian and German), you have to create the templates for your own language. Check the file:
```javascript
src/api/server/setup.ts 
```
and:
```javascript
src/admin/client/modules/settings/email/components/form.tsx
```

### error: uncaughtException: listen EADDRINUSE: address already in use :::3000, how to fix?

Quitting the store and the api in the wrong way can lead to this error. The solution in linux is killing the process that using the port that gives you the error:

to obtain the PID of the process:
```javascript
lsof -t -i:3000
```
to kill the PID:
```javascript
kill -9 PID
```
or more simply in one command: 
```javascript
kill -9 $(lsof -t -i:3001)
```


