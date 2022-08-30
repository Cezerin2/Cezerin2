import { CleanWebpackPlugin } from "clean-webpack-plugin"
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import webpack from "webpack"
import applicationConfig from "./config/admin"

const applicationText = require(`./locales/${applicationConfig.language}.json`)

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/admin/client/index.tsx"),
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "redux-thunk",
      "react-router-dom",
      "react-dropzone",
      "redux",
      "redux-form",
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
      src: path.resolve(__dirname, "src/admin/client"),
      routes: path.resolve(__dirname, "src/admin/client/routes"),
      modules: path.resolve(__dirname, "src/admin/client/modules"),
      lib: path.resolve(__dirname, "src/admin/client/lib"),
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
            use: "babel-loader",
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
            test: /\.s[ac]ss$/i,
            use: [
              // Extracts CSS into separate files
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              "css-loader",
              // Loader to process CSS with PostCSS
              "postcss-loader",
              // Compiles Sass to CSS
              "sass-loader",
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
      template: "src/admin/client/index.html",
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
