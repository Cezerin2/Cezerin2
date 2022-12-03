const path = require("path")
const { GenerateSW } = require("workbox-webpack-plugin")
const YAML = require("yaml")
const { readFileSync } = require("fs-extra")

const plugin = new GenerateSW({
  swDest: "assets/sw.js",
  clientsClaim: true,
  skipWaiting: true,
  exclude: [/\.html$/],
  runtimeCaching: [
    {
      urlPattern: /\/(images|assets|admin-assets)\//,
      handler: "NetworkFirst",
    },
    {
      urlPattern: /\/api\//,
      handler: "NetworkOnly",
    },
    {
      urlPattern: /\/ajax\/payment_form_settings/,
      handler: "NetworkOnly",
    },
    {
      urlPattern: /\//,
      handler: "NetworkFirst",
      options: {
        networkTimeoutSeconds: 10,
      },
    },
  ],
})

const parse = fileName => {
  const file = readFileSync(`./config/${fileName}.yml`, "utf8")
  const configFile = YAML.parse(file, { strict: false })

  const mapEnvVariables = (key, value) => {
    if (typeof value === "string" && value.includes("${")) {
      const [env, defaultValue = ""] = value.slice(2, -1).split(":")

      const getEnv = process.env[env]

      // If it's not a number, remove the quotes.
      const defaultValueString = defaultValue.includes('"', 0)
        ? defaultValue.slice(1, -1)
        : defaultValue

      const getString = defaultValueString.length > 0 ? defaultValueString : ""

      return `'${getEnv || getString}'`
    }

    return `'${value}'`
  }

  // Parsing environment variables
  const config = Object.fromEntries(
    Object.entries(configFile).map(([key, value]) => [
      key,
      mapEnvVariables(key, value),
    ])
  )

  return config
}

module.exports = {
  modifyPaths({ paths }) {
    const values = paths

    values.appServerIndexJs = path.resolve("./src/store/server")
    values.appClientIndexJs = path.resolve("./src/store/client")

    return values
  },
  modifyWebpackOptions({ options: { webpackOptions } }) {
    const config = webpackOptions

    config.definePluginOptions = {
      "process.env.ADMIN_CONFIG": parse("admin"),
      "process.env.SERVER_CONFIG": parse("server"),
      "process.env.STORE_CONFIG": parse("store"),
      ...config.definePluginOptions,
    }

    return config
  },
  modifyWebpackConfig({ env: { target, dev }, webpackConfig }) {
    const config = webpackConfig

    if (target === "web") {
      config.resolve.fallback = { url: false }
      if (!dev) {
        config.plugins.push(plugin)
        config.devtool = undefined
        config.performance = { hints: false }
      }
    }

    return config
  },
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
        forkTsChecker: {
          typescript: undefined,
          eslint: undefined,
          logger: { infrastructure: "silent", issues: "silent" },
        },
      },
    },
    "scss",
  ],
}
