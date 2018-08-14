/*
* @Author: lushijie
* @Date:   2017-05-12 14:00:40
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-14 11:34:06
*/
const webpack = require('webpack');
const argv = require('yargs').argv;
const chalk = require('chalk');
const path = require('path');
const helper = require('lushijie-utils');

const VuePlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CHUNK = argv.chunk;
const CONF = require('./webpack.env.js')({chunk: CHUNK});
const PRO_PATH = CONF.PRO_PATH;
const SRC_PATH = path.join(PRO_PATH, '/client/src');
const isPubEnv = CONF.ENV === 'production';

function getDefineOptions(options) {
  // 字符串sringify处理
  function stringifyString(obj) {
    obj = obj || {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const tmp = obj[key];
      if (typeof tmp === 'string') {
        obj[key] = JSON.stringify(tmp);
      } else if (Object.prototype.toString.call(tmp) === '[object Object]') {
        stringifyString(tmp);
      }
    }
    return obj;
  }
  return stringifyString(options);
}

module.exports = {
  mode: CONF.ENV,
  entry: {
    app: path.join(PRO_PATH, `/client/src/app/${CHUNK}/entry.js`)
  },
  devtool: isPubEnv ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  output: {
    path: path.join(PRO_PATH, `/client/static/dist/chunk_${CHUNK}`),
    publicPath: `/static/dist/chunk_${CHUNK}`,
    filename: isPubEnv ? `[name].[hash:6].js` : `[name].js`,
    chunkFilename: isPubEnv ? `[name].[chunkhash:6].chunk.js` : `[name].chunk.js`,
  },
  devServer: {
    contentBase: path.join(PRO_PATH, 'client')
  },
  resolve: {
    extensions: ['.vue', '.es', '.js', '.css', '.scss', '.json'],
    alias: {
      filters: path.join(SRC_PATH, `/filters`),
      mixins: path.join(SRC_PATH, `/mixins`),
      plugins: path.join(SRC_PATH, `/plugins`),
      request: path.join(SRC_PATH, `/request`),
      store: path.join(SRC_PATH, `/store`),
      validators: path.join(SRC_PATH, `/validators`),
      utils: path.join(SRC_PATH, `/utils`),
      cube: path.join(SRC_PATH, `/app/cube`),
    }
  },
  optimization: {
    minimizer: [
      isPubEnv ? new UglifyJsPlugin() : function() {}
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(j|e)s$|\.vue$/,
        use: 'eslint-loader',
        include: [path.join(PRO_PATH, `/client/src`)],
        exclude: [path.join(PRO_PATH, `/client/node_modules`)],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: [path.join(PRO_PATH, `/client/src`)],
        exclude: [path.join(PRO_PATH, `/client/node_modules`)],
      },
      {
        test: /\.(j|e)s$/,
        use: 'babel-loader?cacheDirectory',
        include: [path.join(PRO_PATH, `/client/src`)],
        exclude: [path.join(PRO_PATH, `/client/node_modules`)],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: [path.join(PRO_PATH, `/client/src`)],
        exclude: [path.join(PRO_PATH, `/client/node_modules`)],
      },
      {
        test: /\.css$/,
        use: [
          isPubEnv ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './img/[name].[hash:6].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './font/[name].[hash:6].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new VuePlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.bundle.css'
    }),
    new webpack.DefinePlugin(getDefineOptions(CONF.DEFINE)),
    new HtmlWebpackPlugin({
      template: path.join(PRO_PATH, `/client/src/app/${CHUNK}/index.html`)
    })
  ]
}
