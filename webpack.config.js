'use strict';

let Extract = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: {
    swipe: './index',
  },

  plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: false,
        },
      }),
      new Extract('swipe.css', {
        allChunks: true,
      }),
  ],

  output: {
    library: 'Swipe',
    libraryTarget: 'window',
    filename: '[name].js',
    path: 'lib',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'node_modules/@sled'),
          path.resolve(__dirname, 'index'),
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel',
      },
      {
        test: /\.styl$/i,
        loader: Extract.extract('style', 'css!stylus'),
      },
    ],
  },
};
