const log = require('./logger.js');
const webpack = require('webpack');
const client = require('./webpack/webpack.client.js');
const server = require('./webpack/webpack.server.js');
const rimraf = require('rimraf');
const { distDir, clientOutputDir, exportDist } = require('./webpack/paths.js');
const dayjs = require('dayjs');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const multiCompiler = webpack([client, server]);

function seconds(endTime, startTime) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  return end.diff(start, 'second', true) + 's';
}

rimraf(distDir, () => {
  rimraf.sync(exportDist);
  const start = dayjs(new Date());
  multiCompiler.run((err, stats) => {
    if (stats.hasErrors()) throw new Error(JSON.stringify(stats.toJson().errors));

    log.success('Client & Server');
    log.info(`Compiled successfully in ${seconds(new Date(), start)}\n`);
    const startExport = new Date();
    log.info('Exporting static files...');
    execSync(`npm run export`);
    fs.copySync(clientOutputDir, exportDist);
    log.success(`Exported static files to ${exportDist} in ${seconds(new Date(), startExport)}`);
    rimraf.sync(distDir);
  });
});
