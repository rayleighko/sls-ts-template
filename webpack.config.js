// const webpack = require("webpack")
const slsw = require("serverless-webpack")
const path = require("path")
var nodeExternals = require("webpack-node-externals")

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  resolve: {
    extensions: [".mjs", ".json", ".ts"],
    symlinks: false,
    cacheWithContext: false,

    // 추가된 부분 START
    alias: {
      "@api": path.resolve(__dirname, "api"),
      "@service": path.resolve(__dirname, "service"),
      "@model": path.resolve(__dirname, "model"),
      "@test": path.resolve(__dirname, "test"),
      "@util": path.resolve(__dirname, "util"),
      "@config": path.resolve(__dirname, "config"),
    },
    // 추가된 부분 END
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: "ts-loader",
        exclude: [
          [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, ".webpack"),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: true,
    //   eslintOptions: {
    //     cache: true
    //   }
    // })
  ],
}
