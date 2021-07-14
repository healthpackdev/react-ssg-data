import clientConfig from '@/tools/webpack/webpack.client';
import webpack from 'webpack';
import type { FastifyInstance } from 'fastify';
import middiePlugin from 'middie';
import fb from 'fastify-plugin';

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
        heartbeat: 2000,
        path: '/static',
      });
      fastify.use(webpackDevMiddleware);
      fastify.use(webpackHotMiddleware);

      done();
    });
  },
  { fastify: '3.x' }
);
export default fastifyDevelopmentPlugin;
