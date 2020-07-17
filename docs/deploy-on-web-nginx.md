## 6. Run Nginx

To enable cezerin apps from browser, we need to setup web server.

We need to proxy all requests from web to our cezerin apps.

All requests from admin.domain.com proxy to localhost:3002 (running cezerin2-admin dashboard app)

All requests from domain.com proxy to localhost:3000 (running cezerin2-store frontend app)

All requests from domain.com/api, domain/ajax, domain/images proxy to localhost:3001 (running cezerin2 backend app)

We have cezerin nginx config, you can use this config for web deploy.

[cezerin nginx config](https://raw.githubusercontent.com/Cezerin2/cezerin2/master/docs/nginx.md)

We need to add a new website to Nginx.

1. Change Nginx config file

   ```
   cd /etc/nginx/sites-available
   ```

   open `default` file and paste [this config](https://raw.githubusercontent.com/Cezerin2/cezerin2/master/docs/nginx.md)

P.S. Change admin.cezerin.org at this config to your domain name: admin.your-name.com

2. Reload Nginx configuration
   ```
   nginx -t && service nginx reload
   ```
