const webpack = require('webpack');
const argv = require('yargs').argv;
const path = require('path');
const VuePlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ONLINE_SOURCE_MAP = false;
const CONF = require('./webpack.env.js')(argv.chunk || process.env.npm_package_config_defaultChunk);
const { CHUNK, PRO_ROOT_PATH, MODE, ENV } = CONF;
const SRC_PATH = path.join(PRO_ROOT_PATH, '/client/src');
const isPubEnv = ENV === 'production';
const noop = function() {};

module.exports = {
  mode: CONF.ENV,
  entry: {
    app: path.join(PRO_ROOT_PATH, `/client/src/app/${CHUNK}/index.js`)
  },
  devtool: isPubEnv ? (ONLINE_SOURCE_MAP && 'cheap-module-source-map') : 'cheap-module-eval-source-map',
  output: {
    path: path.join(PRO_ROOT_PATH, `/client/static/dist/${CHUNK}`), // 打包文件输出路径，绝对路径
    publicPath: `/static/dist/${CHUNK}/`, // 打包后浏览器访问服务时的 URL 路径
    filename: isPubEnv ? `./js/[name].[hash:6].js` : `./js/[name].js`,
    chunkFilename: isPubEnv ? `./js/chunk/[name].[chunkhash:6].chunk.js` : `./js/chunk/[name].chunk.js`,
  },
  devServer: {
    contentBase: path.join(PRO_ROOT_PATH, 'client/'),
    open: true,
    openPage: `static/dist/cube/html/${CHUNK}.html#/dashboard?id=123`
  },
  resolve: {
    extensions: ['.vue', '.es', '.js', '.css', '.scss', '.json'],
    alias: {
      app: path.join(SRC_PATH, '/app'),
      filters: path.join(SRC_PATH, '/filters'),
      mixins: path.join(SRC_PATH, '/mixins'),
      plugins: path.join(SRC_PATH, '/plugins'),
      store: path.join(SRC_PATH, '/store'),
      validators: path.join(SRC_PATH, '/validators'),
      utils: path.join(SRC_PATH, '/utils'),
      [CHUNK]: path.join(SRC_PATH, `/app/${CHUNK}`),
      static: path.join(PRO_ROOT_PATH, '/client/static'),
    }
  },
  stats: {
    colors: true,
    children: false,
    warnings: false,
  },
  optimization: {
    minimizer: [
      isPubEnv ? new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: ONLINE_SOURCE_MAP,
        uglifyOptions: {
          compress: { },
          output: {
            comments: false, // 去除注释
            beautify: false, // 紧凑输出
          }
        }
      }) : noop,
      isPubEnv ? new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g, // 注意不要写成 /\.css$/g
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          safe: true,
          map: ONLINE_SOURCE_MAP && {
            inline: false
          },
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
        }
      }) : noop,
    ],
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          chunks: 'all',
          // test: /\.css$/,
          test(m) {
            return m.constructor.name === 'CssModule' && !!m.content;
          },
          enforce: true,
          minSize: 40000,
        },
      },
    }
  },
  performance: {
    maxAssetSize: isPubEnv ? 1 * 1024 * 1024 : 5 * 1024 * 1024,
    maxEntrypointSize: isPubEnv ? 3 * 1024 * 1024 : 10 * 1024 * 1024,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(j|e)s$|\.vue$/,
        use: 'eslint-loader',
        include: [path.join(PRO_ROOT_PATH, `/client/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/client/node_modules`)],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: [path.join(PRO_ROOT_PATH, `/client/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/client/node_modules`)],
      },
      {
        test: /\.(j|e)s$/,
        use: 'babel-loader?cacheDirectory',
        include: [path.join(PRO_ROOT_PATH, `/client/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/client/node_modules`)],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: [path.join(PRO_ROOT_PATH, `/client/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/client/node_modules`)],
      },
      {
        test: /\.css$/,
        use: [
          isPubEnv ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: `./img/[name].[hash:6].[ext]`
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: `./font/[name].[hash:6].[ext]`
          }
        }]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.MinChunkSizePlugin({
    //   minChunkSize: 30 * 1024
    // }),
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 15,
    // }),
    new VuePlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash:6].css',
      chunkFilename: './css/chunk/[name].[chunkhash:6].css'
    }),
    new webpack.DefinePlugin(CONF.DEFINE),
    new HtmlWebpackPlugin({
      inject: true,
      filename: `./html/${CHUNK}.html`, // webpack-dev-server 无法识别 ..
      template: path.join(PRO_ROOT_PATH, `/client/src/app/${CHUNK}/index.html`),
    }),
  ]
};
