import fastify from 'fastify';
import chalk from 'chalk';
import log from '@/tools/logger';
import build from '@/server/app';

const app = fastify();
const PORT = 3000;

build(app).then(() => {
  if (__PROD__) require('@/server/routes/generate-routes');

  app.listen(PORT).then((addr) => log.success(`Ready! Listening on port - ${chalk.blue(`http://localhost:${PORT}`)}`));
});
