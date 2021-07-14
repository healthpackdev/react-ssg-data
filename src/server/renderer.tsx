import ReactDOMServer from 'react-dom/server';
import Html from '@/components/template/html';
import path from 'path';
import { clientOutputDir, distDir, loadableStatsFile, pagesDirName } from '@/tools/webpack/paths';
import { ChunkExtractor } from '@loadable/server';
import clientConfig from '@/tools/webpack/webpack.client';
import AppServer from '@/components/template/App-server';
import fp from 'fastify-plugin';
import { staticData } from '@/lib/use-route-data';
import { UrlToPath } from '@/server/routes/utils';

export const statsFile = path.resolve(distDir, loadableStatsFile);

export type RenderOptions = {
  location: string;
};

export const render = async ({ location }: RenderOptions) => {
  const context = {};
  const locPath = UrlToPath(location);
  const pageEntry = `${pagesDirName}-${locPath}`;

  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints: [...Object.keys(clientConfig.entry), pageEntry],
  });

  const css = <style dangerouslySetInnerHTML={{ __html: await extractor.getCssString() }} />;
  const { staticRouteData } = require(`../data/${locPath}`);
  const routeData = await staticRouteData();
  const data = staticData(location, routeData);
  const AppHTML = ReactDOMServer.renderToString(
    <AppServer staticData={data} location={location} extractor={extractor} context={context} />
  );

  return ReactDOMServer.renderToString(
    <Html staticData={data} scripts={extractor.getScriptElements()} css={css} html={AppHTML} />
  );
};

export const fastifyRenderPlugin = fp(
  (fastify, opts, done) => {
    fastify.decorateReply('render', async function (payload) {
      this.type('text/html');
      this.send(await render(payload));
    });
    fastify.decorate('render', async function (payload) {
      return await render(payload);
    });
    done();
  },
  { name: 'fastify-react-renderer', fastify: '3.x' }
);
