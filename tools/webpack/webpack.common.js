const { root, sourceDir } = require('./paths.js');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * @returns webpack.Configuration
 */
const config = ({ isServer }) => ({
  mode: isProduction ? 'production' : 'development', // set the mode of build.
  externals: [], // to update config in webpack.server.js send and empty array
  devtool: false, // I think we are don't need source-maps.
  resolve: {
    alias: {
      '@': [root, sourceDir], // add static tsconfig.json/paths
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
    },
    fallback: {
      buffer: require.resolve('buffer'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'], // allow this modules.
  },
  plugins: [
    // define a __DEV__ and __PROD__ variable to check mode easily.
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(!isProduction),
      __PROD__: JSON.stringify(isProduction),
      __CLIENT__: JSON.stringify(!isServer),
    }),
    // babel transforms <div /> to React.createElement("div") we need to define React at the top
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript', // to transform typescript -> js
              '@babel/preset-react', // to transform jsx -> React
              [
                '@babel/preset-env',
                isServer
                  ? {
                      targets: { node: 'current' }, // target node.
                    }
                  : { targets: '>0.25%', bugfixes: true }, // target browsers.
              ],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import', // support dynamic imports.
              '@babel/plugin-transform-runtime', // use @babel/runtime to reduce bundle size.
              '@loadable/babel-plugin', // Loadable-components babel plugin
            ],
          },
        },
      },
    ],
  },
  performance: isProduction
    ? {
        hints: 'warning',
      }
    : {},
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
});

module.exports = config;
