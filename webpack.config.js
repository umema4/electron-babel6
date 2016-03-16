const path = require('path');
const webpack = require('webpack');
const config = require('config');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './src/js/app.js',
    vendor: ['jquery', 'tether', 'bootstrap'],
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
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }],
  },
  devtool: config.useSourceMap ? '#source-map' : undefined,
  postcss: () => {
    return [autoprefixer, precss];
  },
  plugins: (() => {
    const plugins = [];
    plugins.push(new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }));
    plugins.push(new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }));
    plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push(new webpack.optimize.DedupePlugin());

    if (config.useMinify) {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }));
    }
    return plugins;
  })(),
};
