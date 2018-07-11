const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: ['babel-polyfill','./docs/index.js'],
  output: {
    path: path.resolve(__dirname, './docs/dist'),
    publicPath: '/dist/',
    filename: 's-style.js'
  },
  resolve: {
    alias: {
      'theme$': path.resolve(__dirname, './src/theme.scss')
    }
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './docs'),
    compress: true,
    noInfo: true,
    overlay: true
  },
  devtool: '#eval-source-map',
})