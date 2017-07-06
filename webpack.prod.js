var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'RedbaMap';
var libraryFilename = 'redba-maps';

var plugins = [], outputFile, bundleFile;

plugins.push(
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({ 
    minimize: true,
    sourceMap: true,
    mangle: false,
    warnings: false,
 })
);

outputFile = 'redba-maps.min.js';
bundleFile = 'app.bundle.min.js';

var entry = {};

entry['lib/'+outputFile] = './src/index.js';
entry['app/'+bundleFile] = './app/app.js';

var configs = [
  {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/lib/',
      filename: 'redba-maps.min.js',
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: { 
    'RedbaMap': 'RedbaMap',
    'window.RedbaMap': 'RedbaMap',
    'google': 'google',
    'window.google': 'google'
    },
    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel',
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js']
    },
    plugins: plugins
  },
  {
    entry: './app/app.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/app/',
      filename: 'app.bundle.[hash].min.js'
    },
    externals: {
      "google": "google",
      'RedbaMap': 'RedbaMap',
      'jquery': '$'
    },
    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel',
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js']
    },
    plugins: plugins
  }
];

module.exports = configs;