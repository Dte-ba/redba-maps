var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'RedbaMap';
var libraryFilename = 'redba-maps';

var plugins = [], outputFile, bundleFile;

outputFile = libraryFilename + '.js';
bundleFile = 'app.bundle.js';

var entry = {};

entry['lib/'+outputFile] = './src/index.js';
entry['app/'+bundleFile] = './app/app.js';

var config = {
  entry: entry,
  devtool: 'source-map',
  output: {
    path: __dirname,
    filename: '[name]',
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
};

var compiler = webpack(config);

var server = new WebpackDevServer(
 compiler, 
  {
    host: 'localhost',
    port: 8080,
    contentBase: './',
    hot: true
  }
);

server.listen(8080, "localhost", function() {});

module.exports = config;