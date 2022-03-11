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

- [GitHub](https://github.com/Cezerin2)
- [Community Site](https://cezerin.org)
- [Demo Store - Plusha Theme](https://plusha.cezerin.net)
- [Demo Store - Default Theme](https://cezerin.net)
- [Demo Dashboard](https://cezerin.net/admin)
- [Telegram Chat: Cezerin](https://t.me/cezerin)
- [Forum](https://groups.google.com/g/cezerin)
- [Docs](https://github.com/Cezerin2/Cezerin2/tree/main/docs)
- [Facebook](https://facebook.com/cezerin)
- [Twitter](https://twitter.com/cezerin2)

## Store

Single-Page Application with React server-side rendering.

SEO Friendly. Google Analytics eCommerce Tracking included.

[Online Demo Store - Plusha Theme](https://plusha.cezerin.net)

[![Cezerin Store Plusha Theme](https://cezerin.org/assets/images/cezerin-plusha-theme.png)](https://plusha.cezerin.net)

[Online Demo Store - Default Theme](https://cezerin.net)

[![Cezerin Store Default Theme](https://cezerin.org/assets/images/cezerin-default-theme.png)](https://cezerin.net)
[![Cezerin Store Default Theme](https://cezerin.org/assets/images/cezerin-mobile-order-summary.png)](https://cezerin.net)

## Dashboard

Client-side dashboard use JSON Web Token (JWT) to access REST API.

[Online Demo Dashboard](https://cezerin.net/admin)

![Cezerin Dashboard](https://cezerin.org/assets/images/cezerin-dashboard-products.png)

## Docs

- Getting Started

  - [Overview](./docs/overview.md)
  - [Online Demo](./docs/online-demo.md)
  - [Application Structure](./docs/application-structure.md)
  - [API Client](https://github.com/cezerin2/cezerin2-client)
  - [API Reference](https://github.com/Cezerin2/Cezerin2/tree/main/docs/api)

- Installation Guides

  - [Prerequisites](./docs/prerequisites.md)
  - [Setup Database](./docs/setup-database.md)
  - [Using source code](./docs/using-source-code.md)
  - [Using docker](./docs/using-docker.md)

- Deploy on Web

  - [Hosting](./docs/deploy-on-web-hosting.md)
  - [Create droplet](./docs/deploy-on-web-droplet.md)
  - [Setup domain](./docs/deploy-on-web-domain.md)
  - [Install NGinx Web Server + MERN Stack](./docs/deploy-on-web-mern.md)
  - [Run MongoDB](./docs/deploy-on-web-mongodb.md)
  - [Run Cezerin](./docs/deploy-on-web-cezerin.md)
  - [Run NGinx](./docs/deploy-on-web-nginx.md)
  - [Cezerin configs changes](./docs/deploy-on-web-cezerin-configs.md)
  - [Final checks](./docs/deploy-on-web-final-checks.md)
  - [Setup Let's Encrypt SSL Certificate](./docs/deploy-on-web-lets-encrypt.md)
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
- [Yarn](https://yarnpkg.com/getting-started/install)
- MongoDB

## Documentation

[Documentation](https://github.com/Cezerin2/Cezerin2/tree/main/docs)

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

| `npm run <script>`    | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `setup`               | Run Cezerin mongodb setup.                                                |
| `compile`             | Compiles the store to disk (`~/dist` by default).                         |
| `compile:watch`       | Compiles the store and theme to disk **and watch** (`~/dist` by default). |
| `webpack:admin`       | Assemble admin bundles.                                                   |
| `webpack:store`       | Assemble store bundles.                                                   |
| `webpack:admin:watch` | Assemble admin bundles **and watch**.                                     |
| `webpack:store:watch` | Assemble store bundles **and watch**.                                     |
| `theme:install`       | Install theme from /public/<file>.zip                                     |
| `theme:export`        | Zip current theme to /public/<file>.zip                                   |
| `theme:compile`       | Compile theme after modification.                                         |
| `theme:build`         | Refresh theme after modification.                                         |
| `build`               | Compile and assemble bundles.                                             |
| `build:watch`         | Compile and assemble bundles **and watch**.                               |
| `lint`                | Check project with eslint.                                                |
| `lint:fix`            | Check and fix project with eslint.                                        |
| `format`              | Format project with prettier.                                             |
| `start:api`           | Start node server.                                                        |
| `start:store`         | Start store server.                                                       |
| `start`               | Start Cezerin.                                                            |
| `watch:api`           | Start node server **and watch**.                                          |

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
