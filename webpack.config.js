const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: `vtranslit-scheme.js`,
    path: path.join(__dirname, 'dist'),
  },
};
