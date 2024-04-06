const { readFileSync } = require("fs-extra")
const { toSafeInteger } = require("lodash")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { resolve, join, normalize } = require("path")
const { GenerateSW } = require("workbox-webpack-plugin")
const YAML = require("yaml")

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
  const file = readFileSync(`../../config/${fileName}.yml`, "utf8")
  const configFile = YAML.parse(file, { strict: false })

  const mapEnvVariables = value => {
    const parseEnvVariable = () => {
      const [env, defaultValue = ""] = value.slice(2, -1).split(":")

      const getEnv = process.env[env]

      // If it's not a number, remove the quotes.
      const defaultValueString = defaultValue.includes('"', 0)
        ? defaultValue.slice(1, -1)
        : defaultValue

      const getString = defaultValueString.length > 0 ? defaultValueString : ""
      const getValue = `${getEnv || getString}`

      const intValue = toSafeInteger(getValue)
      const booleanValue =
        getValue === "true" || getValue === "false" ? false : null
      const getParsedValue =
        intValue.toString() === getValue ? intValue : booleanValue || getValue

      return getParsedValue
    }

    const variable =
      typeof value === "string" && value.includes("${")
        ? parseEnvVariable()
        : value

    return variable
  }

  // Parsing environment variables
  const config = configObject =>
    Object.fromEntries(
      Object.entries(configObject).map(([key, value]) => [
        key,
        typeof value === "object" && !Array.isArray(value) && value !== null
          ? config(value)
          : mapEnvVariables(value),
      ])
    )

  return JSON.stringify(config(configFile))
}

module.exports = {
  options: {
    disableWebpackbar: true,
  },
  modifyPaths({ paths }) {
    const values = Object.fromEntries(
      Object.entries(paths).map(([key, value]) => [
        key,
        value?.replace(normalize("src/store/build"), "build"),
      ])
    )

    values.appServerIndexJs = resolve("./server")
    values.appClientIndexJs = resolve("./client")

    return values
  },
  modifyWebpackOptions({ options: { webpackOptions } }) {
    const config = webpackOptions

    const rootDir = path => `"${resolve("../../", path)}"`.replace(/\\/g, "/")

    config.terserPluginOptions = undefined
    config.definePluginOptions = {
      "process.env.ADMIN_CONFIG": parse("admin"),
      "process.env.SERVER_CONFIG": parse("server"),
      "process.env.STORE_CONFIG": parse("store"),
      "process.env.PUBLIC_DIR": rootDir("public"),
      "process.env.THEME_DIR": rootDir("theme"),
      ...config.definePluginOptions,
    }

    config.notNodeExternalResMatch = request => /\.tsx?$|theme/.test(request)

    config.babelRule.include = webpackOptions.babelRule.include.concat([
      /\.tsx?$/,
      /theme/,
    ])

    return config
  },
  modifyWebpackConfig({ env: { target, dev }, webpackConfig }) {
    const config = webpackConfig

    if (target === "web") {
      config.resolve.fallback = {
        theme: require.resolve("theme"),
        url: require.resolve("url"),
      }

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
