## 7. Setup domain with CloudFlare

[Cloudflare.](https://www.cloudflare.com)

- Get droplet IP on DigitalOcean
  ![DigitalOcean IP Address](https://github.com/Cezerin2/cezerin2/raw/master/docs/images/do-ip.png)

- Add `A` and `CNAME` to DNS on CloudFlare
  ![CloudFlare DNS](https://user-images.githubusercontent.com/3618501/76990802-9c174d00-6959-11ea-8c03-620a2c97e952.png)
- Set SSL to `Flexible` on CloudFlare
  ![CloudFlare SSL](https://github.com/Cezerin2/cezerin2/raw/master/docs/images/cf-ssl.png)

- Turn on `Always use HTTPS` on CloudFlare
  ![CloudFlare Always HTTPS](https://github.com/Cezerin2/cezerin2/raw/master/docs/images/cf-alway-https.png)

- Add `A` record for admin dashboard:

Type: A

Name: admin

Content: your-droplet-ip-address
