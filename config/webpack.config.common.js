const { resolveApp } = require('./paths');

module.exports = {
  entry: {
    main: resolveApp('src/index.tsx'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: resolveApp('src'),
      lib: resolveApp('src/lib'),
      'ui-kit': resolveApp('src/lib/ui-kit'),
      test: resolveApp('test'),
      assets: resolveApp('src/assets'),
      pages: resolveApp('src/pages'),
      screens: resolveApp('src/screens'),
      services: resolveApp('src/services'),
      components: resolveApp('src/components'),
      typings: resolveApp('src/typings'),
      hooks: resolveApp('src/hooks'),
      providers: resolveApp('src/providers'),
      context: resolveApp('src/context'),
      utils: resolveApp('src/utils'),
      icons: resolveApp('src/icons'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|ico|svg)$/,
        type: 'asset/inline',
        // loader: require.resolve('file-loader'),
        // options: {
        //   name: 'static/media/[name].[hash:8].[ext]',
        // },
      },
      {
        test: /\.(bmp|gif|jpg|png)$/,
        type: 'asset/resource',
        // loader: require.resolve('url-loader'),
        // options: {
        //   limit: '10000',
        //   name: 'static/media/[name].[hash:8].[ext]',
        // },
      },
    ],
  },
};
