import { CleanWebpackPlugin } from "clean-webpack-plugin"
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { readFileSync } from "fs-extra"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import sass from "sass"
import webpack from "webpack"
import YAML from "yaml"
import { Admin } from "./config/types/admin"

const file = readFileSync("./config/admin.yml", "utf8")
const applicationConfig = <Admin>YAML.parse(file)

const applicationText = require(`./public/admin-assets/locales/${applicationConfig.language}.json`)

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/admin/src/index.tsx"),
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "redux-thunk",
      "react-router-dom",
      "react-dropzone",
      "redux",
      "redux-form-material-ui",
      "material-ui",
    ],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "public"),
    filename: "admin-assets/js/[name]-[chunkhash].js",
    chunkFilename: "admin-assets/js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true,
        },
      },
    },
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/admin"),
      routes: path.resolve(__dirname, "src/admin/src/routes"),
      apps: path.resolve(__dirname, "src/admin/src/apps"),
      modules: path.resolve(__dirname, "src/admin/src/modules"),
      lib: path.resolve(__dirname, "src/admin/src/lib"),
    },
    extensions: [".tsx", ".js"],
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
              },
            },
          },
          {
            test: /\.ya?ml$/,
            use: "yaml-loader",
          },
          {
            test: /\.css$/,
            include: [path.resolve(__dirname, "public")],
            exclude: [path.resolve(__dirname, "src")],
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: false,
                  importLoaders: true,
                },
              },
              "postcss-loader",
            ],
          },
          {
            test: /\.css$/,
            exclude: [path.resolve(__dirname, "node_modules|public")],
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: {
                    localIdentName: "[name]__[local]___[hash:base64:5]",
                  },
                },
              },
              "postcss-loader",
            ],
          },
          {
            test: /\.sass$/i,
            use: [
              // Extracts CSS into separate files
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              {
                loader: "css-loader",
                options: {
                  esModule: true,
                  modules: {
                    // TODO namedExport: true,
                  },
                },
              },
              // Loader to process CSS with PostCSS
              "postcss-loader",
              // Compiles SASS to CSS
              {
                loader: "sass-loader",
                options: {
                  sassOptions: {
                    logger: sass.Logger.silent,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },

  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: true,
    //     },
    //   },
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve("public/admin-assets/js"),
        path.resolve("public/admin-assets/css/bundle-*.css"),
      ],
    }),
    new webpack.DefinePlugin({
      applicationText: JSON.stringify(applicationText),
    }),
    new MiniCssExtractPlugin({
      filename: "admin-assets/css/bundle-[contenthash].css",
      chunkFilename: "admin-assets/css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/admin/index.html",
      language: applicationConfig.language,
      inject: "body",
      filename: "admin/index.html",
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false,
    }),
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}
