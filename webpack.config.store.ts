import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import webpack from "webpack"
import { GenerateSW } from "workbox-webpack-plugin"

module.exports = {
  entry: {
    app: ["./src/store/client/index.tsx"],
    theme: ["theme"],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "theme"),
    filename: "assets/js/[name]-[chunkhash].js",
    chunkFilename: "assets/js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "theme",
          test: "theme",
          enforce: true,
        },
      },
    },
  },

  resolve: {
    extensions: [".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.ya?ml$/,
        use: "yaml-loader",
      },
      {
        test: /\.css$/,
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

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve("theme/assets/js"),
        path.resolve("theme/assets/css"),
        path.resolve("theme/assets/sw.js"),
        path.resolve("theme/assets/workbox-*.js"),
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/bundle-[contenthash].css",
      chunkFilename: "assets/css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "theme/index.html",
      inject: "body",
      filename: "assets/index.html",
    }),
    new GenerateSW({
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
