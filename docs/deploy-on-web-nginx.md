## 6. Run Nginx

To enable cezerin apps from browser, we need to setup web server.

We need to proxy all requests from web to our cezerin apps.

All requests from domain.com proxy to localhost:3000 (running cezerin frontend app)

All requests from domain.com/api, domain.com/ajax, domain.com/images proxy to localhost:3001 (running cezerin backend app)

We have cezerin nginx config, so you can use this config for web deploy.

[cezerin nginx config](https://raw.githubusercontent.com/cezerin2/cezerin2/master/docs/nginx.md)

We need to add a new website to Nginx.

1. Change Nginx config file

   ```
   cd /etc/nginx/sites-available
   ```

   open `default` file and paste [this config](https://raw.githubusercontent.com/cezerin2/cezerin2/master/docs/nginx.md)

2. Reload Nginx configuration
   ```
   nginx -t && service nginx reload
   ```
