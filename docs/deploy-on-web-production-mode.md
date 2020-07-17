## 10. Turn off Developer Mode

By default, Cezerin is in developer mode. This means you can access API and Dashboard without authorization (access tokens).

Don't forget to switch off developer mode at working store.
At dev mode api's and dashboard available for all without any restrictions.

To turn off developer mode, you need to do:

- Add access token while install (npm run setup ...) or add email at Admin - Settings - Web tokens
- Set SMTP server in `cezerin2/config/server.js`
- Set false for option `developerMode` from `cezerin2/config/server.js`
- Set false for option `developerMode` from `cezerin2-store/config/store.js`
- Set false for option `developerMode` from `cezerin2-admin/config/admin.js`
- Rebuild & restart apps with new configs:

cezerin (backend app does not need to be build, just reload):

```
pm2 reload api
```

cezerin2-store:

```
npm run build
pm2 reload store
```

cezerin2-admin:

```
npm run build
pm2 reload admin
```

- Production mode is active now.

What is production mode?!

At production mode all requests to api must be authorized with JWT token.
You must login before you access to admin.
Login page - https://admin.your-domain-name.com/login

Specify your admin email address and email with authorize link will be send to you.

Click to link at email and you will set JWT token at all requests to api.

JWT token added to every request header - Bearer Authentication.
