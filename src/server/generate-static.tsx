import fs from 'fs';
import {
  datasDirName,
  pagesDirName,
  sourceDir,
  staticDataDist,
  staticPagesDist,
} from '@/tools/webpack/paths';
import path from 'path';
import { render } from '@/server/renderer';
import { UrlToPath } from '@/lib/utils';
import { writeFile } from '@/server/utils';

const mkdirExist = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
};

export const getData = async (dataPath) => {
  let generateFunction;
  try {
    // is module exist?
    generateFunction = require(`../${datasDirName}/${dataPath}`).default;
  } catch (e) {
    generateFunction = () => ({});
  }
  return await generateFunction();
};

export const generateStaticPage = async (location) => {
  const filename = UrlToPath(location);
  const object = await getData(filename);
  const html = await render({ location, __DATA__: object });
  writeFile(path.resolve(staticPagesDist, `${filename}.html`), html);
};

export const generateStaticData = (dataObject, filename) => {
  writeFile(path.resolve(staticDataDist, `${filename}.json`), JSON.stringify(dataObject));
};
const readdirInSrc = (name, cb) => fs.readdir(path.resolve(sourceDir, name), cb);

export async function generateStaticPages(routes: any[]) {
  for (const route of routes) {
    generateStaticPage(route.path);
  }
}
export async function generateStaticDatas() {
  readdirInSrc(datasDirName, async (err, files) => {
    for (const dataPath of files) {
      const dataObject = await getData(dataPath);
      generateStaticData(dataObject, dataPath.replace(/(ts|js|jsx|tsx)/, ''));
    }
  });
}
