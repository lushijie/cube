const webpack = require('webpack');
const argv = require('yargs').argv;
const path = require('path');
const VuePlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CONF = require('./webpack.env.js')(argv.chunk || process.env.npm_package_config_defaultChunk);
const { CHUNK, PRO_ROOT_PATH, MODE, ENV } = CONF;
const SRC_PATH = path.join(PRO_ROOT_PATH, '/client/src');
const isPubEnv = ENV === 'production';
const PRODUCTION_SOURCEMAP = false;
const noop = function() {};

module.exports = {
  mode: CONF.ENV,
  entry: {
    app: path.join(PRO_ROOT_PATH, `/client/src/app/${CHUNK}/entry.js`)
  },
  devtool: isPubEnv ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  output: {
    path: path.join(PRO_ROOT_PATH, `/client/static/dist/${CHUNK}`), // 打包文件输出路径，绝对路径
    publicPath: `/static/dist/${CHUNK}/`, // 打包后浏览器访问服务时的 URL 路径
    filename: isPubEnv ? `[name].[hash:6].js` : `[name].js`,
    chunkFilename: isPubEnv ? `[name].[chunkhash:6].chunk.js` : `[name].chunk.js`,
  },
  devServer: {
    contentBase: path.join(PRO_ROOT_PATH, 'client/'),
    open: true,
    openPage: 'static/dist/cube/html/cube.html#/dashboard?id=123'
  },
  resolve: {
    extensions: ['.vue', '.es', '.js', '.css', '.scss', '.json'],
    alias: {
      filters: path.join(SRC_PATH, '/filters'),
      mixins: path.join(SRC_PATH, '/mixins'),
      plugins: path.join(SRC_PATH, '/plugins'),
      request: path.join(SRC_PATH, '/request'),
      store: path.join(SRC_PATH, '/store'),
      validators: path.join(SRC_PATH, '/validators'),
      utils: path.join(SRC_PATH, '/utils'),
      static: path.join(PRO_ROOT_PATH, '/client/static'),
      cube: path.join(SRC_PATH, '/app/cube'),
    }
  },
  stats: {
    colors: true,
    // children: false,
    chunks: false,
  },
  optimization: {
    minimizer: [
      isPubEnv ? new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: PRODUCTION_SOURCEMAP,
        uglifyOptions: {
          compress: {
            drop_console: true, // 去除 console
            keep_infinity: true, // 去除部分影响性能代码，如：1/0
          },
          output: {
            comments: false, // 去除注释
            beautify: false, // 紧凑输出
          }
        }
      }) : noop,
      isPubEnv ? new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g, // 注意不要写成 /\.css$/g
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: !PRODUCTION_SOURCEMAP
          }
        }
      }) : noop,
    ],
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
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
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
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
    new VuePlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[chunkhash:6].style.css'
    }),
    new webpack.DefinePlugin(CONF.DEFINE),
    new HtmlWebpackPlugin({
      inject: true,
      filename: `./html/${CHUNK}.html`, // webpack-dev-server 无法识别 ..
      template: path.join(PRO_ROOT_PATH, `/client/src/app/${CHUNK}/index.html`),
    })
  ]
};
