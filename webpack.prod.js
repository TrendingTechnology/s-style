const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    entry: ['babel-polyfill','./src/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 's-style.js'
    },
    mode: 'production',
    devtool: '#source-map'
})