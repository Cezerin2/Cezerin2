## Cezerin configs changes:

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

P.S. Example of configs for cezerin.net domain you can download here [cezerin2-demo-config-sample.zip](https://github.com/cezerin2/cezerin2/raw/master/docs/config-samples/cezerin2-demo-config-sample.zip)
