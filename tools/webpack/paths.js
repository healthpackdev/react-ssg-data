const path = require('path');

const processRoot = process.cwd();

const distDirName = 'build';
const dist = path.resolve(processRoot, distDirName);

const serverDirName = 'server';
const clientDirName = 'client';
const pagesDirName = 'pages';
const datasDirName = 'data';
const sourceDirName = 'src';

const clientOutputDir = path.resolve(dist, 'static');

module.exports.root = path.resolve(processRoot + '/');
module.exports.sourceDir = path.resolve(processRoot, sourceDirName + '/');
module.exports.pagesDir = path.resolve(processRoot, sourceDirName, pagesDirName);
module.exports.staticPagesDist = clientOutputDir;
module.exports.distDirName = distDirName;
module.exports.distDir = dist;

module.exports.exportDist = path.resolve(processRoot, 'out');

module.exports.datasDirName = datasDirName;
module.exports.pagesDirName = pagesDirName;
module.exports.loadableStatsFile = 'build-manifest.json';
module.exports.routeManifestFile = 'route-manifest.json';

module.exports.staticDataURL = '/static/data';
module.exports.staticDataDist = path.resolve(clientOutputDir, datasDirName);

module.exports.serverEntry = path.resolve(sourceDirName, serverDirName, 'index.tsx');
module.exports.serverOutputDir = path.resolve(dist, serverDirName);
module.exports.serverOutputEntry = `server.js`;
module.exports.clientEntry = path.resolve(sourceDirName, clientDirName, 'index.tsx');
module.exports.clientOutputDir = clientOutputDir;
