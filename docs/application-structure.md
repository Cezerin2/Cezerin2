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

### NPM Scripts

| `npm run <script>`   | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `clean:admin`        | Delete admin asset bundles.                                           |
| `clean:store`        | Delete store asset bundles.                                           |
| `compile:dev`        | Compiles the application to disk **and watch** (`~/dist` by default). |
| `compile`            | Compiles the application to disk (`~/dist` by default).               |
| `webpack:admin:dev`  | Assemble admin bundles **and watch**.                                 |
| `webpack:store:dev`  | Assemble store bundles **and watch**.                                 |
| `webpack:admin:prod` | Assemble admin bundles.                                               |
| `webpack:store:prod` | Assemble store bundles.                                               |
| `theme:install`      | Install theme from /public/<file>.zip                                 |
| `theme:export`       | Zip current theme to /public/<file>.zip                               |
| `theme:copy`         | Compile theme and copy assets to /public/                             |
| `theme:build:dev`    | Refresh theme after modification **and watch**.                       |
| `theme:build:prod`   | Refresh theme after modification.                                     |
| `build:dev`          | Compile and assemble bundles **and watch**.                           |
| `build`              | Compile and assemble bundles.                                         |
| `start`              | Start node server.                                                    |
