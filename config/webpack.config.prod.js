/* eslint-disable global-require */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const utils = require('./utilities.js');
const { resolveApp } = require('./paths');
const commonConfig = require('./webpack.config.common');

// eslint-disable-next-line prefer-destructuring
const ENV = process.env.ENV;
process.env.NODE_ENV = 'production';
console.info('ENV: ', process.env.ENV, 'NODE_ENV: ', process.env.NODE_ENV);
console.info(chalk.white.bgGreen.bold('Node version: ', process.version));

const VERSION = require('../package.json').version;

process.env.VERSION = VERSION;

const APP_NAME = require('../package.json').description;

console.info(chalk.white.bgGreen.bold(APP_NAME));
console.info(chalk.white.bgGreen.bold('Версия: ', VERSION));
console.info(chalk.white.bgGreen.bold('Build: ', process.env.NODE_ENV));
console.info(chalk.white.bgGreen.bold('ENV: ', process.env.ENV));

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
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
              grid: true,
            },
            stage: 3,
          }),
        ],
        sourceMap: false,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: false,
      },
    });
  }
  return loaders;
};

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'production',
  bail: true,
  stats: 'errors-only',

  output: {
    path: resolveApp('dist'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: utils.jsxRegex,
        exclude: /node_modules/,
        use: 'babel-loader',
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
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        }),
      },
      {
        test: utils.sassRegex,
        exclude: utils.sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: false,
          },
          'sass-loader'
        ),
      },
      {
        test: utils.sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: {
              mode: 'local',
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'sass-loader'
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
          chunks: 'all',
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
    minimize: true,
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          preset: 'advanced',
          safe: true,
        },
      }),
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

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].chunk.css',
      esModule: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(VERSION),
        ENV: JSON.stringify(ENV),
      },
    }),
  ],
});
