const log = require('./logger.js');
const webpack = require('webpack');
const client = require('./webpack/webpack.client.js');
const server = require('./webpack/webpack.server.js');
const rimraf = require('rimraf');
const { distDir, distDirName, clientOutputDir, loadableStatsFile } = require('./webpack/paths.js');
const dayjs = require('dayjs');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const serverCompiler = webpack(server);
const clientCompiler = webpack(client);

function seconds(endTime, startTime) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  return end.diff(start, 'second', true) + 's';
}

rimraf(distDir, () => {
  const start = dayjs(new Date());
  clientCompiler.run((err, stats) => {
    if (err) log.error(`client: ${err.message}`);

    log.success('Static Assets');
    log.info(`Compiled successfully in ${seconds(new Date(), start)}\n`);
  });

  serverCompiler.run((err) => {
    if (err) log.error(`server: ${err.message}`);
    log.success('Server');
    log.info(`Compiled successfully in ${seconds(new Date(), start)}\n`);
  });
});
