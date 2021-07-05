const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const utils = require('./utilities.js');
const {resolveApp} = require('./paths');
const commonConfig = require('./webpack.config.common');

process.env.NODE_ENV = 'production';

const VERSION = require('../package.json').version;
const APP_NAME = require('../package.json').description;

console.info(chalk.white.bgGreen.bold(APP_NAME));
console.info(chalk.white.bgGreen.bold('Версия: ', VERSION));
console.info(chalk.white.bgGreen.bold('Build: ', 'production'));

module.exports = env => {
  console.info(chalk.white.bgGreen.bold('ENV mode: ', env.ENV, env.USE_API_MOCKS));
  return webpackMerge.merge(commonConfig, {
    mode: 'production',
    bail: true,
    stats: 'errors-only',

    output: {
      path: resolveApp('dist'),
      filename: 'static/js/[name].[chunkhash].js',
      chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
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
      minimize: true,
      minimizer: [
        new TerserPlugin({}),
      ],
    },

    performance: {
      hints: false,
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        title: APP_NAME,
        filename: 'index.html',
        template: resolveApp('src/index.html'),
        favicon: resolveApp('src/favicon.ico'),
        chunksSortMode: 'none',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),

      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),

      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        RTL_SKIP_AUTO_CLEANUP: 'false',
        ENV: env.ENV,
        USE_API_MOCKS: env.USE_API_MOCKS ?? 'false',
      }),
    ],
  });
};
