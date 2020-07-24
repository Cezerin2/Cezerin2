# Cezerin is React and Node.js based eCommerce platform. React Shopping Cart.

Cezerin - Ecommerce Progressive Web Apps. Complete Solution.

## Cezerin Platform:

1. Cezerin API - Backend.
2. Cezerin Store - Frontend.
3. Cezerin Admin - Dashboard.
4. Cezerin Client - JavaScript client for Cezerin REST API.

## Built with:

- NodeJS
- ReactJs
- Redux
- ExpressJs
- Babel
- WebPack
- MongoDB

## Links

- [GitHub](https://github.com/cezerin2)
- [Community Site](https://cezerin.org)
- [Demo Store](https://cezerin.net)
- [Demo Dashboard](https://cezerin.net/admin)
- [Telegram Chat: Cezerin](https://t.me/cezerin)
- [Forum](https://groups.google.com/g/cezerin)
- [Docs](https://github.com/cezerin2/cezerin2/blob/master/docs)
- [Facebook](https://facebook.com/cezerin)
- [Twitter](https://twitter.com/cezerin2)

## Dashboard

Client-side dashboard use JSON Web Token (JWT) to access REST API.

[Online Demo Dashboard](https://cezerin.net/admin)

![Cezerin Dashboard](https://cezerin.org/assets/images/cezerin-dashboard-products.png)


## Store
Single-Page Application with React server-side rendering.

SEO Friendly. Google Analytics eCommerce Tracking included.

[Online Demo Store](https://cezerin.net)

[![Cezerin Store](https://cezerin.org/assets/images/cezerin-mobile-order-summary.png)](https://cezerin.net)

[![Cezerin Dashboard](https://cezerin.org/assets/images/cezerin-dashboard-products.png)](https://cezerin.net/admin)


## Docs

- Getting Started

  - [Overview](./docs/overview.md)
  - [Application Structure](./docs/application-structure.md)

- Installation Guides

  - [Prerequisites](./docs/prerequisites.md)
  - [Setup Database](./docs/setup-database.md)
  - [Using source code](./docs/using-source-code.md)
  - [Using docker](./docs/using-docker.md)

- Deploy on Web

  - [Hosting](./docs/deploy-on-web-hosting.md)
  - [Create droplet](./docs/deploy-on-web-droplet.md)
  - [Setup domain](deploy-on-web-domain.md)
  -- [Register domain](deploy-on-web-domain-registration.md)
  -- [Setup domain with DigitalOcean DNS](deploy-on-web-digitalocean.md)
  -- [Setup domain with Cloudflare](deploy-on-web-cloudflare.md)
  - [Install NGinx Web Server + MERN Stack](./docs/deploy-on-web-mern.md)
  - [Run MongoDB](./docs/deploy-on-web-mongodb.md)
  - [Run Cezerin](./docs/deploy-on-web-cezerin.md)
  - [Run NGinx](./docs/deploy-on-web-nginx.md)
  - [Cezerin configs changes](./docs/deploy-on-web-cezerin-configs.md)
  - [Final checks](./docs/deploy-on-web-final-checks.md)
  - [Setup Let's Encrypt SSL Certificate](deploy-on-web-lets-encrypt.md)
  - [Turn off Developer Mode](./docs/deploy-on-web-production-mode.md)

- API

  - [API Reference](./docs/api)
  - [API Client](https://github.com/cezerin2/cezerin2-client)

- Help
  - [FAQ](./docs/faq.md)
  - [HowTos](./docs/howtos.md)
  - [Help and Support](./docs/help-and-support.md)

### Requirements

- Node.js
- MongoDB


## Documentation

[Documentation](https://github.com/cezerin2/cezerin2/tree/master/docs)


## Application Structure

```
.
├── config                   # Project and build configurations
├── dist                     # Distribution folder
├── locales                  # Text files
├── logs                     # Log files
├── public                   # Static public assets and uploads
│   ├── admin                # Dashboard index.html
│   ├── admin-assets         # Dashboard assets
│   └── content              # Store root folder
|
├── scripts                  # Shell scripts for theme install/export
├── src                      # Application source code
│   ├── admin                # Dashboard application
│   │   └── client           # Client side code
│   ├── api                  # REST API
│   │   └── server           # Server side code
│   ├── store                # Store application
│   |   ├── client             # Client side code
│   |   ├── server             # Server side code
│   |   └── shared             # Universal code
│   └── index.js             # Server application start point
├── theme                    # Theme as a local package
└── process.json             # pm2 process file
```

## NPM Scripts

|`npm run <script>`|Description|
|------------------|-----------|
|`clean:admin`|Delete admin asset bundles.|
|`clean:store`|Delete store asset bundles.|
|`compile:dev`|Compiles the application to disk **and watch** (`~/dist` by default).|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`webpack:admin:dev`|Assemble admin bundles **and watch**.|
|`webpack:store:dev`|Assemble store bundles **and watch**.|
|`webpack:admin:prod`|Assemble admin bundles.|
|`webpack:store:prod`|Assemble store bundles.|
|`theme:install`|Install theme from /public/<file>.zip|
|`theme:export`|Zip current theme to /public/<file>.zip|
|`theme:copy`|Compile theme and copy assets to /public/|
|`theme:build:dev`|Refresh theme after modification **and watch**.|
|`theme:build:prod`|Refresh theme after modification.|
|`build:dev`|Compile and assemble bundles **and watch**.|
|`build`|Compile and assemble bundles.|
|`start`|Start node server.|

## Financial contributions

We also welcome financial contributions in full transparency on our [open collective](https://opencollective.com/cezerin2).
Anyone can file an expense. If the expense makes sense for the development of the community, it will be "merged" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.

## Credits


### Contributors

Thank you to all the people who have already contributed to cezerin2!
<a href="https://github.com/Cezerin2/cezerin2/graphs/contributors"><img src="https://opencollective.com/cezerin2/contributors.svg?width=890" /></a>


### Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/cezerin2#backer)]

<a href="https://opencollective.com/cezerin2#backers" target="_blank"><img src="https://opencollective.com/cezerin2/tiers/backer.svg?avatarHeight=36&width=600"></a>


### Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/cezerin2#sponsor))

<a href="https://opencollective.com/cezerin2#sponsor" target="_blank"><img src="https://opencollective.com/cezerin2/tiers/sponsor.svg?avatarHeight=36&width=600"></a>


## Contributing

If you can, please contribute by reporting issues, discussing ideas, or submitting pull requests with patches and new features. We do our best to respond to all issues and pull requests within a day or two, and make patch releases to npm regularly.


## Licence

This software is provided free of charge and without restriction under the MIT License
