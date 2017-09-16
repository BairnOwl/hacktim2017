const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: './js/index.js',
  output: {
    path: __dirname + "/src/",
    filename: 'index.min.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}