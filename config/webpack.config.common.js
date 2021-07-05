const { resolveApp } = require('./paths');

module.exports = {
  entry: {
    main: resolveApp('src/index.tsx'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: resolveApp('src'),
      test: resolveApp('test'),
      assets: resolveApp('src/assets'),
      screens: resolveApp('src/screens'),
      services: resolveApp('src/services'),
      components: resolveApp('src/components'),
      hooks: resolveApp('src/hooks'),
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
      },
      {
        test: /\.(bmp|gif|jpg|png)$/,
        type: 'asset/resource',
      },
    ],
  },
};
