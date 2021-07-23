const webpack = require('webpack');
const config = require('./webpack/webpack.server.js');
const rimraf = require('rimraf');
const { distDir, serverOutputEntry, serverOutputDir } = require('./webpack/paths.js');
const nodemon = require('nodemon');
const log = require('./logger.js');
const exec = require('child_process').exec;

rimraf(distDir, (err) => {
  const compiler = webpack(config); // server compiler
  compiler.run(() => {
    // if you want to reload server.js on change

    /* const node = nodemon({
      quiet: true,
     script: `${serverOutputDir}/${serverOutputEntry}`,
      watch: false,
    }); */

    exec(`node ${serverOutputDir}/${serverOutputEntry}`, function (err, stdout, stderr) {
      // Node.js will invoke this callback when process terminates.
      if (err) throw new Error(err);
      if (stderr) console.error(err);
      if (stdout) console.log(stdout);
    });
    log.info('Webpack watching server with nodemon.');
    compiler.watch({}, (e, stats) => {
      // node.restart();
    });
  });
});
