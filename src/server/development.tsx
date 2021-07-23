import clientConfig from '@/tools/webpack/webpack.client';
import webpack from 'webpack';
import type { FastifyInstance } from 'fastify';
import middiePlugin from 'middie';
import fb from 'fastify-plugin';
import { fastifyRenderPlugin } from '@/server/renderer';
import routes from '@/routes';
import chalk from 'chalk';
import log from '@/tools/logger';
import { matchPath } from 'react-router-dom';
import { getData } from '@/server/generate-static';

const fastifyDevelopmentPlugin = fb(
  (fastify: FastifyInstance, opts, done) => {
    fastify.register(middiePlugin).then(() => {
      const clientCompiler = webpack(clientConfig as webpack.Configuration);
      const webpackDevMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        stats: false,
        writeToDisk: true,
      });
      const webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler, {
        log: false,
        heartbeat: 5000,
      });
      fastify.use(webpackDevMiddleware);
      fastify.use(webpackHotMiddleware);

      done();
    });
  },
  { fastify: '3.x' }
);

const developmentMode = async (app: FastifyInstance) => {
  await app.register(fastifyRenderPlugin);
  await app.register(fastifyDevelopmentPlugin);
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

  app.get(`/static/data/:page_path.json`, async (req, res) => {
    //@ts-ignore
    const dataObject = await getData(req.params.page_path);

    res.type('application/json').send(dataObject);
  });
};

export default developmentMode;
