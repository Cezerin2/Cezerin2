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

### Can't build cezerin2 app (api) on ubuntu, how to fix?

If you have this error:

```javascript
Failed to execute '/usr/bin/node /usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js build --fallback-to-build --module=/root/cezerin2/node_modules/bcrypt/lib/binding/bcrypt_lib.node --module_name=bcrypt_lib --module_path=/root/cezerin2/node_modules/bcrypt/lib/binding --napi_version=4 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v72' (1)
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
```

Possible problem in bcrypt dependency.

Try to install cezerin2 app like this:

```javascript
npm install --save bcrypt
npm audit fix
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

