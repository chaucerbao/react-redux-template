"use strict";

var path = require("path");

var src = path.join(__dirname, "src"),
  dest = path.join(__dirname, "public");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: ["./src/index.js"]
  },
  output: {
    path: path.join(dest, "assets"),
    publicPath: "/assets/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", "css?sourceMap&minimize!postcss")
    }]
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({addDependencyTo: webpack}),
      require("postcss-mixins"),
      require("postcss-simple-vars"),
      require("postcss-nested")
    ];
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],
  resolve: {
    root: [path.resolve("src")],
    extensions: ["", ".js", ".css"]
  },
  devServer: {
    contentBase: dest,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    inline: true
  }
};
