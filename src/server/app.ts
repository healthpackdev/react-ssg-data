import type { FastifyInstance } from 'fastify';
import { fastifyRenderPlugin } from '@/server/renderer';
import fastifyStatic from 'fastify-static';
import { clientOutputDir, staticPagesDist } from '@/tools/webpack/paths';
import routes from '@/routes';
import { UrlToPath } from '@/server/routes/utils';
import { output } from '@/tools/webpack/webpack.client';
import chalk from 'chalk';
import log from '@/tools/logger';
import { matchPath } from 'react-router-dom';
import fs from 'fs';
const build = async (app: FastifyInstance) => {
  app.register(fastifyRenderPlugin);
  if (__PROD__) {
    await app.register(fastifyStatic, {
      root: clientOutputDir,
      prefix: output.publicPath + '/',
    });

    routes.forEach((route) => {
      // render data and html files
      const { path, component } = route;
      const html = app.render({ location: path as string });
      const filePath = UrlToPath(path);
      const fileName = filePath.split('/').pop();
      const filePathDist = `${staticPagesDist}/${fileName}`;
      fs.writeFileSync(filePathDist, html);
      fs.writeFileSync(`${filePathDist}.txt`, data);
      log.info(`${chalk.green(fileName)} static file generated`);
    });
    routes.map(({ path }: any) => {
      app.get(path, (req, res) => {
        res.sendFile(`${UrlToPath(path)}.html`, staticPagesDist);
      });
    });
  }
  if (__DEV__) {
    await app.register(require('@/server/development'));
    app.get('*', (req, res) => {
      log.info(`GET ${chalk.magenta(req.url)}`);
      if (
        !routes.some((route) =>
          matchPath(req.url, { path: route.path, exact: route.exact, strict: true })
        )
      ) {
        return res.render({ location: '/404' });
      }

      res.render({ location: req.url });
    });

    app.get('/static/data/:page_path.txt', async (req, res) => {
      const { staticRouteData } = require(`../data/${req.params.page_path}`);
      res.send(await staticRouteData());
    });
  }
};

export default build;
