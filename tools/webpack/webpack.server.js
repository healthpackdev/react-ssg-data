const nodeExternals = require('webpack-node-externals');
const commonConfig = require('./webpack.common.js');
const { serverEntry, serverOutputEntry, serverOutputDir } = require('./paths.js');

const config = commonConfig({ isServer: true });

// push node default modules like path, fs, http
config.externals.push(nodeExternals());

// multi-compiler helper.
config.name = 'server';

// bundle for node.
config.target = 'node';

config.entry = [serverEntry];
config.output = {
  path: serverOutputDir,
  filename: serverOutputEntry,
  // if it is doesn't exist returns: [name].server.js
  chunkFilename: '[name].js',
};

// ignore css files in server bundle (generate empty) because pages are also in server <App />
config.module.rules.push({ test: /\.s?(a|c)ss$/, use: 'ignore-loader' });

config.node = {
  __dirname: true,
  __filename: true,
  global: true,
};

module.exports = config;
