const path = require('path');
const webpack = require('webpack');
const config = require('config');

module.exports = {
  entry: {
    app: './src/js/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/assets/'),
    publicPath: '/assets/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0'],
      },
    }],
  },
  devtool: config.useSourceMap ? '#source-map' : undefined,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
};
