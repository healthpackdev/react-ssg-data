const webpack = require('webpack');
const config = require('./webpack/webpack.server.js');
const rimraf = require('rimraf');
const { distDir, serverOutputEntry, serverOutputDir } = require('./webpack/paths.js');
const nodemon = require('nodemon');
const log = require('./logger.js');

rimraf(distDir, (err) => {
  const compiler = webpack(config); // server compiler
  compiler.run(() => {
    const node = nodemon({
      quiet: true,
      script: `${serverOutputDir}/${serverOutputEntry}`,
      watch: false,
    });

    log.info('Webpack watching server with nodemon.');
    compiler.watch({}, (e, stats) => {
      node.restart();
    });
  });
});
