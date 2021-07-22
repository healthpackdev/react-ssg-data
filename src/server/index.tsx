import fastify from 'fastify';
import chalk from 'chalk';
import log from '@/tools/logger';
import developmentMode from '@/server/development';
import build from '@/server/build';
console.log('build');
if (__PROD__) build();

if (__DEV__) {
  const app = fastify();
  const PORT = process.env.PORT || 3000;
  developmentMode(app).then(() => {
    app
      .listen(PORT)
      .then((addr) =>
        log.success(`Ready! Listening on port - ${chalk.blue(`http://localhost:${PORT}`)}`)
      );
  });
}
