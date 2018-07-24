const webpack = require("webpack");
const path = require("path");

module.exports = {
  target: 'web',
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  entry: path.resolve(__dirname, "./src/app.js"),
  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "bundle.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015","react"]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
