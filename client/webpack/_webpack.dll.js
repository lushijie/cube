/*
* @Author: lushijie
* @Date:   2018-04-12 10:18:09
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-13 16:51:48
*/
const chalk = require('chalk');
const exec = require('child_process').exec;
const path = require('path');
const PLUGINS = require('./webpack.plugins.js');

const vendors = {
  admin: [
    'vue',
    'vue-resource',
    'vue-router',
    'vuex',
    'element-ui',
    'vue-croppa'
  ],
  user: [
    'vue',
    'vue-resource',
    'vue-router',
    'vuex',
    'element-ui'
  ]
};

module.exports = function(CONF) {
  const PRO_PATH = CONF.PRO_PATH;
  const APP_NAME = CONF.DEFINE.INJECT.APPNAME;
  const MODE = CONF.MODE;
  const CHUNK = CONF.CHUNK;
  const isProduction = (CONF.ENV === 'production');

  const workflow = {
    cache: true,
    devtool: '', // 'cheap-module-source-map',
    output: {
      path: path.join(PRO_PATH, `/server/www/static/vendor_${CHUNK}/`),
      publicPath: `/static/vendor_${CHUNK}/`,
      library: '[name]_[chunkhash:6]',
      filename: `[name].${MODE}.[hash:6].js`,
    },
    entry: {
      vendor: vendors[CHUNK],
    },
    module: {
      rules: [
      ]
    },
    plugins: [
      PLUGINS.dllPluginConf({
        path: path.join(PRO_PATH, `/client/webpack2/manifest/${CONF.CHUNK}.${MODE}.json`),
        name: '[name]_[chunkhash:6]',
        context: PRO_PATH,
      }),

      (isProduction === 'production') ? PLUGINS.definePluginConf({}) : PLUGINS.noopPluginConf(),

      PLUGINS.uglifyJsPluginConf(),

      PLUGINS.htmlWebPackPluginConf({
        filename: `vendor.html`,
        template: path.join(PRO_PATH, `/client/src/html/${CHUNK}.html`),
        staticPath: `/static`, // htmlWebpackPlugin.options.staticPath
        title: APP_NAME
      }),

      PLUGINS.bannerPluginConf()
    ]
  };
  return workflow;
}
