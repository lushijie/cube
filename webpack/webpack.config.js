const webpack = require('webpack');
const path = require('path');
const dayjs = require('dayjs');
const argv = require('yargs').argv;
const VuePlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CONF = require('./webpack.env.js')(argv);
const { PRO_ROOT_PATH, ENV, SOURCE_MAP } = CONF;
const SRC_PATH = path.join(PRO_ROOT_PATH, '/src');
const isPubEnv = ENV === 'production';
const noop = function() {};

module.exports = {
  mode: CONF.ENV,
  entry: {
    app: path.join(PRO_ROOT_PATH, `/src/app.js`)
  },
  // devtool: isPubEnv ? (SOURCE_MAP && 'cheap-module-source-map') : 'cheap-module-eval-source-map',
  devtool: SOURCE_MAP ? 'cheap-module-source-map' : '',
  output: {
    path: path.join(PRO_ROOT_PATH, `/static/dist`), // 打包文件输出路径，绝对路径
    publicPath: `/static/dist/`, // 打包后浏览器访问服务时的 URL 路径
    filename: isPubEnv ? `./js/[name].[hash:6].js` : `./js/[name].js`,
    chunkFilename: isPubEnv ? `./js/chunk/[name].[chunkhash:6].chunk.js` : `./js/chunk/[name].chunk.js`,
  },
  devServer: {
    contentBase: PRO_ROOT_PATH,
    open: true,
    openPage: `static/dist/html/app.html#/dashboard?treeId=${dayjs().format('YYYYMMDD')}`,
    disableHostCheck: true,
    // port: 8080,
  },
  resolve: {
    extensions: ['.vue', '.es', '.js', '.css', '.scss', '.json'],
    alias: {
      app: path.join(SRC_PATH, '/app'),
      pages: path.join(SRC_PATH, '/app/pages'),
      filters: path.join(SRC_PATH, '/filters'),
      mixins: path.join(SRC_PATH, '/mixins'),
      plugins: path.join(SRC_PATH, '/plugins'),
      store: path.join(SRC_PATH, '/store'),
      validators: path.join(SRC_PATH, '/validators'),
      utils: path.join(SRC_PATH, '/utils'),
      packages: path.join(SRC_PATH, '/packages'),
      static: path.join(PRO_ROOT_PATH, '/static'),
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
        sourceMap: SOURCE_MAP,
        uglifyOptions: {
          compress: { },
          output: {
            comments: false, // 去除注释
            beautify: false, // 紧凑输出
          }
        }
      }) : noop,
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g, // 注意不要写成 /\.css$/g
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: SOURCE_MAP,
        },
        cssProcessorPluginOptions: {
          safe: true,
          sourceMap: SOURCE_MAP && {
            inline: false
          },
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
        }
      }),
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
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(j|e)s$|\.vue$/,
        use: 'eslint-loader',
        include: [path.join(PRO_ROOT_PATH, `/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/node_modules`)],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: [path.join(PRO_ROOT_PATH, `/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/node_modules`)],
      },
      {
        test: /\.(j|e)s$/,
        use: 'babel-loader?cacheDirectory',
        include: [path.join(PRO_ROOT_PATH, `/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/node_modules`)],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: [path.join(PRO_ROOT_PATH, `/src`)],
        exclude: [path.join(PRO_ROOT_PATH, `/node_modules`)],
      },
      {
        test: /\.css$/,
        use: [
          // isPubEnv ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: SOURCE_MAP,
            }
          },
          {
            loader: 'postcss-loader', // config see in postcss.config.js
            options: {
              sourceMap: SOURCE_MAP,
            },
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
      filename: './css/[name].[hash:6].css',
      chunkFilename: './css/chunk/[name].[chunkhash:6].css'
    }),

    new webpack.DefinePlugin(CONF.DEFINE),

    new HtmlWebpackPlugin({
      inject: true,
      filename: `./html/app.html`, // webpack-dev-server 无法识别 ..，所以这里使用 .
      template: path.join(PRO_ROOT_PATH, `/src/index.html`),
    }),
  ]
};
