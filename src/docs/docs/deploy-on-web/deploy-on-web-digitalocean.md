## Setup domain with DigitalOcean DNS

[DigitalOcean](https://m.do.co/c/a1d5495e08b2)

- Get droplet IP on DigitalOcean

  ![DigitalOcean IP Address](https://raw.githubusercontent.com/Cezerin2/Cezerin2/main/docs/images/cezerin-digitalocean.png)

- Change DNS of your domain name to:

```
ns1.digitalocean.com
ns2.digitalocean.com
```

P.S. You can change DNS at your domain name control panel.

- Check WHOIS of your domain name, ensure that DNS successfully changed.

  ![Domain WHOIS](https://raw.githubusercontent.com/Cezerin2/Cezerin2/main/docs/images/cezerin-digitalocean-dns-domain-whois.png)

- Go to DigitalOcean - Networking - Domains.

  ![DigitalOcean DNS](https://raw.githubusercontent.com/Cezerin2/Cezerin2/main/docs/images/cezerin-digitalocean-dns.png)

- Enter domain name.
- Select droplet.
- Click _Add domain_ button.

- Add `A` and `CNAME` records to DigitalOcean DNS.

_Hostname_ - Must be your domain name.
_Value_ - Must be your droplet ip adddess.

`A` dns record points to our droplet IP address.

Example for cezerin.net:

![DigitalOcean DNS Records](https://raw.githubusercontent.com/Cezerin2/Cezerin2/main/docs/images/cezerin-digitalocean-dns-domain.png)

That's all.

We have domain name points to our digitalocean droplet.

![DigitalOcean DNS Records](https://raw.githubusercontent.com/Cezerin2/Cezerin2/main/docs/images/cezerin-digitalocean-dns-domain-added.png)
