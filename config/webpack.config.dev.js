const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');
const utils = require('./utilities');
const {resolveApp} = require('./paths');
const commonConfig = require('./webpack.config.common');

const ENV = 'development';
process.env.NODE_ENV = ENV;
process.env.ENV = ENV;

const VERSION = require('../package.json').version;

process.env.VERSION = VERSION;

const APP_NAME = require('../package.json').description;

console.log(chalk.white.bgGreen.bold(APP_NAME));
console.log(chalk.white.bgGreen.bold('Версия: ', VERSION));
console.log(chalk.white.bgGreen.bold('Build: ', process.env.NODE_ENV));
console.log(chalk.white.bgGreen.bold('Node version: ', process.version));

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: true,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    });
  }
  return loaders;
};

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  bail: true,
  target: 'web',

  output: {
    path: resolveApp('dist'),
    pathinfo: true,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: utils.jsxRegex,
        exclude: /node_modules/,
        use: 'babel-loader',
        // use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: utils.tsxRegex,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: utils.cssRegex,
        exclude: utils.cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      {
        test: utils.cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        }),
      },
      {
        test: utils.sassRegex,
        exclude: utils.sassModuleRegex,
        use: getStyleLoaders({importLoaders: 2, sourceMap: true}, 'sass-loader'),
      },
      {
        test: utils.sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: {
              mode: 'local',
              localIdentName: '[name]__[local]--[hash:base64:5]',
              // context: path.resolve(__dirname, 'src'),
              // hashPrefix: 'my-custom-hash',
            },
          },
          'sass-loader',
        ),
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'async',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
    noEmitOnErrors: true,
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `${APP_NAME} || ${ENV.toUpperCase()}`,
      filename: 'index.html',
      template: resolveApp('src/index.html'),
      favicon: resolveApp('src/favicon.ico'),
      inject: true,
      hash: true,
      chunksSortMode: 'none',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'asyncChunks',
    }),

    new ReactRefreshWebpackPlugin(),

    new WebpackBar({
      name: `ENV: ${ENV}  VERSION: ${VERSION}`,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(VERSION),
        ENV: JSON.stringify(ENV),
      },
    }),

    new Dotenv(),
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    noInfo: true,
    stats: 'minimal',
    contentBase: resolveApp('src'),
    proxy: {
      '/gateway/*': {
        target: 'https://cash.staging.productcloud.ru',
        changeOrigin: true,
        secure: false,
        headers: {
          Host: 'cash.staging.productcloud.ru',
        },
      },
    },
  },
});
