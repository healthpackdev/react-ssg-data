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

export const getData = async (dataPath) => {
  let generateFunction;
  try {
    const pathOfData = `../${datasDirName}/${dataPath}`;

    delete require.cache[require.resolve(pathOfData)]; // delete cache to avoid requiring server reload on data/* change.
    // is module exist?
    generateFunction = require(pathOfData).default;
  } catch (e) {
    generateFunction = () => ({}); // assign an empty function. if data module doesn't exist
  }
  return await generateFunction();
};

export const generateStaticPage = async (location) => {
  const filename = UrlToPath(location); // / to index
  const object = await getData(filename); // get data from data/{filename}.js
  const html = await render({ location, __DATA__: object }); // render html with __DATA__
  writeFile(path.resolve(staticPagesDist, `${filename}.html`), html);
};

export const generateStaticData = (dataObject, filename) => {
  // create a static /static/data/{filename}.json
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
      // generate static /static/data/{filename}.json remove extension from file.
      generateStaticData(dataObject, dataPath.replace(/(ts|js|jsx|tsx)/, ''));
    }
  });
}
