server {
        # Dynamic image resizing server
        listen 127.0.0.1:8443;
        server_tokens off;
        location ~ "^/resize/(?<entity>\w+)/(?<id>\w+)/(?<width>[1-9][0-9][0-9]{1}|[1][0-9][0-9][0-9]{1})/(?<file>.+)$" {
                alias /home/admin/web/yourdomain/public_html/public/content/images/$entity/$id/$file;
                image_filter_buffer 20M;
                image_filter_jpeg_quality 85;
                image_filter_interlace on;
                image_filter resize $width 100;

                proxy_pass https://127.0.0.1:8443/resize/$entity/$id/$width/$file;
                proxy_redirect https://127.0.0.1:8443/resize/$entity/$id/$width/$file https://yourIp:3000/resize/$entity/$id/$width/$file;
        }
}

# Cache rule for resized images
proxy_cache_path /tmp/nginx-images-cache2/ levels=1:2 keys_zone=images:10m inactive=30d max_size=5g use_temp_path=off;

server {
    listen      yourIp:443;
    server_name yourdomain www.yourdomain;
    ssl         on;
    ssl_certificate /etc/letsencrypt/live/yourdomain-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain-0001/privkey.pem;
    error_log  /var/log/apache2/domains/yourdomain.error.log error;

    gzip              on;
    gzip_comp_level   2;
    gzip_min_length   1024;
    gzip_vary         on;
    gzip_proxied      expired no-cache no-store private auth;
    gzip_types        application/x-javascript application/javascript application/xml application/json text/xml text/css text$

    client_body_timeout 12;
    client_header_timeout 12;
    reset_timedout_connection on;
    send_timeout 10;
    server_tokens off;
    client_max_body_size 50m;

    expires 1y;
    access_log off;
    log_not_found off;
    root /home/admin/web/yourdomain/public_html/public/content;

        location ~ "^/images/products/(?<entity>\w+)/(?<id>\w+)/(?<width>[1-9][0-9][0-9]{1}|[1][0-9][0-9][0-9]{1})/(?<file>.+)$" {
                # /images/products/id/100/file.jpg >>> Proxy to internal image resizing server
                proxy_pass http://yourIp:8888/resize/$entity/$id/$width/$file;
                proxy_redirect http://yourIp:8888/resize/$entity/$id/$width/$file https://yourIp:8443/resize/$entity/$id/$width/$file;
                proxy_cache images;
                proxy_cache_valid 200 30d;
        }

        location /admin {
                alias /home/admin/web/yourdomain/public_html/public/admin/;
                try_files /index.html /index.html;
        }

        location /admin-assets/ {
                alias /home/admin/web/yourdomain/public_html/public/admin-assets/;
        }

        location /assets/ {
                alias /home/admin/web/yourdomain/public_html/theme/assets/;
        }

        location /sw.js {
                root /home/admin/web/yourdomain/public_html/theme/assets/;
        }

        location ~ ^/(api|ajax|ws)/ {
                # Proxy to NodeJS
                expires off;
                proxy_pass       http://yourIp:3001;
                proxy_redirect http://yourIp:3001 https://yourIp:3001;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }

        location / {
                try_files $uri @proxy;
        }

        location @proxy {
                # Proxy to NodeJS
                expires off;
                proxy_pass       http://yourIp:3000;
                proxy_redirect http://yourIp:3000 https://yourIp:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

    location ~ /\.ht    {return 404;}
    location ~ /\.svn/  {return 404;}
    location ~ /\.git/  {return 404;}
    location ~ /\.hg/   {return 404;}
    location ~ /\.bzr/  {return 404;}

    include /home/admin/conf/web/snginx.yourdomain.conf*;
}