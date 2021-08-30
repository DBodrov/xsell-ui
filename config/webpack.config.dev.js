const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');
const utils = require('./utilities');
const {resolveApp} = require('./paths');
const commonConfig = require('./webpack.config.common');

process.env.NODE_ENV = 'development';
const VERSION = require('../package.json').version;

const APP_NAME = require('../package.json').description;

console.log(chalk.white.bgGreen.bold(APP_NAME));
console.log(chalk.white.bgGreen.bold('Версия: ', VERSION));
console.log(chalk.white.bgGreen.bold('Build: ', 'development'));
console.log(chalk.white.bgGreen.bold('Node version: ', process.version));

module.exports = env => {
  console.log('USE API MOCKS = ', env.USE_API_MOCKS ?? 'false');
  return webpackMerge.merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    bail: true,
    target: 'web',
    stats: 'minimal',

    output: {
      path: resolveApp('dist'),
      pathinfo: true,
      filename: 'static/js/[name].bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
    },

    module: {
      rules: [
        {
          test: utils.tsxRegex,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: 'runtime',
      },
      emitOnErrors: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: `${APP_NAME} || DEVELOPMENT`,
        filename: 'index.html',
        template: resolveApp('src/index.html'),
        favicon: resolveApp('src/favicon.ico'),
        inject: true,
        hash: true,
        chunksSortMode: 'none',
      }),
      new ReactRefreshWebpackPlugin(),

      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),

      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        USE_API_MOCKS: env.USE_API_MOCKS ?? 'false',
      }),

      new WebpackBar({}),
    ],

    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 8080,
      hot: true,
      static: {
        directory: resolveApp('dist'),
      },
      proxy: {
        '/gateway': {
          target: 'https://dc-stage.cvm.isb',
          changeOrigin: true,
          secure: false,
          headers: {
            Host: 'dc-stage.cvm.isb',
          },
        },
      },
    },
  });
};
