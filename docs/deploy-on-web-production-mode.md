## Turn off Developer Mode

By default, Cezerin is in developer mode. This means you can access API and Dashboard without authorization (access tokens).

Don't forget to switch off developer mode at working store.
At dev mode api's and dashboard available for all without any restrictions.

To turn off developer mode, you need to do:

- Add access token while install (npm run setup ...) or add email for admin at Admin - Settings - Web tokens
- Set SMTP server in `cezerin2/config/server.js`
- Set false for option `developerMode` from `cezerin2/config/server.js`
- Set false for option `developerMode` from `cezerin2/config/admin.js`
- Rebuild & restart apps with new configs:

```
npm run build
pm2 reload api
pm2 reload store
```

- Production mode is active now.

What is production mode?!

At production mode all requests to api must be authorized with JWT token.

It means nobody can add/edit/delete categories, products, orders, customers, etc. without permission.

Only admins can make this.

You must login before you access to admin.
Login page - https://your-domain-name.com/admin/login

Specify your admin email address and you will receive email with authorization link.

Click to link at email and you will set JWT token at all requests to api.

JWT token added to every request header - Bearer Authentication.

P.S. or you can manually login to the admin, without email.

Add admin JWT key at Admin - Settings - Personal access tokens.

Save your key.

JWT Token looks like this:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiYWRtaW4iXSwianRpIjoiNWUyY2FhODU2MjEyMmYwZjQwODdkNmUyIiwiZW1haWwiOiJ2YW1zaG9wQGdtYWlsLmNvbSIsImlhdCI6MTU3OTk4NTk1MCwiZXhwIjo0MTcxOTg1OTUwfQ.28iql8r_PDARK6Xym2JWWkV3Vk7cBBkMbALbhEyA2oI

Switch to production mode.

And authorizate to admin with this url example: https://your-domain-name.com/admin/login?token=  

Insert you key in the URL, like this:

https://your-domain-name.com/admin/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOlsiYWRtaW4iXSwianRpIjoiNWUyY2FhODU2MjEyMmYwZjQwODdkNmUyIiwiZW1haWwiOiJ2YW1zaG9wQGdtYWlsLmNvbSIsImlhdCI6MTU3OTk4NTk1MCwiZXhwIjo0MTcxOTg1OTUwfQ.28iql8r_PDARK6Xym2JWWkV3Vk7cBBkMbALbhEyA2oI
