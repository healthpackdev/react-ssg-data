// this file will imported from server runtime.

const commonConfig = require('./webpack.common.js');
const { clientOutputDir, clientEntry, distDir, loadableStatsFile } = require('./paths.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const PreactRefreshPlugin = require('@prefresh/webpack');
const config = commonConfig({ isServer: false });
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');

// multi-compiler name.
config.name = 'client';

// bundle for web.
config.target = 'web';
config.entry = {
  main: clientEntry,
  ['hot-middleware-entry']: 'webpack-hot-middleware/client?timeout=5000&overlay=false',
};
// if (!isProduction)
//   config.entry['webpack-hmr'] = 'webpack-hot-middleware/client';

config.output = {
  path: clientOutputDir,
  publicPath: '/static',
  filename: isProduction ? `chunks/[name].[chunkhash:8].js` : `chunks/[name].js`,
};
// allow css in client
config.module.rules.push({
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
});

config.optimization = {
  moduleIds: 'named',
  chunkIds: 'named',
  runtimeChunk: 'single',
};
// Splitting css by pages.
config.plugins.push(
  // Hot reloading with Prefresh
  new webpack.HotModuleReplacementPlugin(),
  new PreactRefreshPlugin(),
  new MiniCssExtractPlugin({
    filename: isProduction ? `css/[chunkhash].css` : `css/[name].css`,
    chunkFilename: isProduction ? `css/[id].css` : `css/[name].css`,
  }),
  // Code-splitting with react made easy.
  new LoadablePlugin({
    writeToDisk: { filename: distDir },
    filename: loadableStatsFile,
    outputAsset: false,
  })
);
if (!isProduction)
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    // better logging errors
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    })
  );

if (process.env.ANALYZE === 'true')
  config.plugins.push(
    new StatoscopeWebpackPlugin({
      saveReportTo: path.resolve(distDir, 'analyze', 'static-[hash].html'),
      saveStatsTo: path.resolve(distDir, 'analyze', 'stats-static-[hash].json'),
    })
  );

module.exports = config;
