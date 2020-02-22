# Cezerin - Ecommerce Progressive Web Apps

[![CircleCI](https://circleci.com/gh/Cezerin2/cezerin2/tree/master.svg?style=svg)](https://circleci.com/gh/Cezerin2/cezerin2/tree/master)


Cezerin2 is React and Node.js based eCommerce platform. Allows creating a Progressive Web Apps. This is based from cezerin after project went dead. (https://github.com/cezerin/cezerin)

Built with:
* Node.js v8.9
* React v16
* Redux
* Express
* Babel
* WebPack 4
* MongoDB

## Links
- [GitHub](https://github.com/cezerin2/cezerin2)
- [Community Site](https://cezerin.org)
- [Demo Store](https://demo.cezerin.net)
- [Telegram Chat: Cezerin](https://t.me/cezerin)
- [Docs](https://github.com/cezerin2/cezerin2/blob/master/docs)
- [Facebook](https://facebook.com/cezerin)
- [Twitter](https://twitter.com/cezerin2)

## Dashboard
Client-side dashboard use JSON Web Token (JWT) to access REST API.[Demo dashboard](https://admin.cezerin.net)

![Cezerin Dashboard](https://cezerin.org/assets/images/cezerin-dashboard-products.png)


## Store
Single-Page Application with React server-side rendering. [Demo store](https://demo.cezerin.net)

[![Cezerin Store](https://cezerin.org/assets/images/cezerin-mobile-order-summary.png)](https://demo.cezerin.net)

[![Cezerin Dashboard](https://cezerin.org/assets/images/cezerin-dashboard-products.png)](https://admin.cezerin.net)

## Installation

- [with GitHub](https://github.com/cezerin2/cezerin2/blob/master/docs/using-source-code.md)
- [with Docker](https://github.com/cezerin2/cezerin2/blob/master/docs/using-docker.md)
- [How to deploy a Cezerin2 on Ubuntu 16.04](https://github.com/cezerin2/cezerin2/blob/master/docs/how-to-deploy-a-cezerin2-on-ubuntu-16-04.md)
- [How to deploy a Cezerin2 on Ubuntu 18.04.1 (from GitHub)](https://github.com/cezerin2/cezerin2/blob/master/docs/how-to-deploy-a-cezerin2-on-ubuntu-18-04-1-github.md)

### Requirements
* Node.js >= 8
* MongoDB >= 3.2


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
