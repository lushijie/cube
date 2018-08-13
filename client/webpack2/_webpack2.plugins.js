/*
* @Author: lushijie
* @Date:   2017-05-12 14:01:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-05-02 15:18:40
*/
const webpack = require('webpack');
const path = require('path');
const os = require('os');
const helper = require('think-helper');
const CleanPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');

module.exports = {
  // 为打包之后的各个文件添加说明头部
  bannerPluginConf: function(options) {
    const defaultOptions = {
      banner: `This file was last built at ${new Date()} by ${os.hostname()}_${os.platform()}`,
      raw: false,
      entryOnly: false
    };
    options = helper.extend({}, defaultOptions, options);
    return new webpack.BannerPlugin(options);
  },

  // 下次打包清除上一次打包文件
  cleanPluginConf: function(paths, options) {
    paths = paths || ['dist'];
    const defaultOptions = {
      root: __dirname,
      verbose: true,
      dry: false
    };
    options = helper.extend({}, defaultOptions, options);
    return new CleanPlugin(paths, options);
  },

  // gzip
  compressionWebpackPluginConf: function(options) {
    const defaultOptions = {
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + ['js', 'css'].join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    };
    options = helper.extend({}, defaultOptions, options);
    return new CompressionWebpackPlugin(options);
  },

  // 提取common文件模块
  commonsChunkPluginConf: function(options) {
    const defaultOptions = {
      // 1.如果不存在 chunk 为 common 的模块，则从所有模块提取公共到 common 这一公共模块;
      // 2.如果存在 chunk 的 name 为 common 的模块，
      // 则以common 为基础，提取其他模块和common相同的部分并合并到 common 模块
      name: 'common',
      filename: 'common.bundle.js',
      minChunks: 2 // 最少两个模块中存在才进行抽离common
      // chunks:['home','admin']//指定只从哪些chunks中提取common
    };
    options = helper.extend({}, defaultOptions, options);
    return new webpack.optimize.CommonsChunkPlugin(options);
  },

  // definePlugin 会把定义的 string 变量插入到所有JS代码中
  definePluginConf: function(options) {
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
    options = stringifyString(options);
    const defaultOptions = {
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    };
    options = helper.extend({}, defaultOptions, options);
    return new webpack.DefinePlugin(options);
  },

  // dll
  dllPluginConf: function(options) {
    const defaultOptions = {
      // path: path.join(__dirname, 'manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname,
    };
    options = helper.extend({}, defaultOptions, options);
    return new webpack.DllPlugin(options);
  },

  // 常用并且不常变化的打包成dll引入
  dllReferencePluginConf: function(options) {
    const defaultOptions = {
      context: __dirname,
      // manifest: require('./manifest.json'),
    };
    options = helper.extend({}, defaultOptions, options);
    return new webpack.DllReferencePlugin(options);
  },

  // // css 以文件类型引入而不再内嵌到HTML中
  // extractTextPluginConf: function(fileName) {
  //   fileName = fileName || '[name].[hash:5].bundle.css';
  //   return new ExtractTextPlugin(fileName);
  // },

  // js重新编译动态刷新浏览器插件
  hotModuleReplacementPluginConf: function() {
    return new webpack.HotModuleReplacementPlugin();
  },

  // options 支持数组
  htmlWebPackPluginConf: function(options) {
    const defaultOptions = {
      // hash: true,
      inject: true,
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      }
    };
    options = helper.extend({}, defaultOptions, options);
    return new HtmlWebpackPlugin(options);
  },

  // 最小分块大小，小于minChunkSize将不生成分块
  minChunkSizePluginConf: function(minChunkSize) {
    minChunkSize = minChunkSize || 20480; // 20kb
    return new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: minChunkSize
    });
  },

  // noop plugin
  noopPluginConf: function() {
    return function() {};
  },

  // jquery(其他类库亦如此)引入全局的方案，之后不用在每个文件中require('jquery')
  // eg: options = {$: 'jquery'} 相当于每个页面中 let $ = require('jquery')
  // 注意与definePluginConf的区分
  providePluginConf: function(options) {
    options = helper.extend({}, options);
    return new webpack.ProvidePlugin(options);
  },

  // // 文件拷贝插件
  // transferWebpackPluginConf: function(transfer, options) {
  //   options = options || {};
  //   // eg: transfer like
  //   // [{from: 'i18n', to: 'i18n'}] // 'to' is dir in the final dist
  //   return new TransferWebpackPlugin(transfer, options.root || __dirname);
  // },

  // // js压缩组件
  // uglifyJsPluginConf: function(options) {
  //   const defaultOptions = {
  //     comments: false,
  //     beautify: false,
  //     compress: {
  //       warnings: false
  //     },
  //     except: ['$super', '$', 'exports', 'require']
  //   }
  //   options = helper.extend({}, defaultOptions, options);
  //   return new webpack.optimize.UglifyJsPlugin(options);
  // },

  webpackBrowserPluginConf: function(options) {
    return new WebpackBrowserPlugin(options);
  }
}
