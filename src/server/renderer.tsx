import ReactDOMServer from 'react-dom/server';
import Html from '@/components/template/html';
import path from 'path';
import { distDir, loadableStatsFile, pagesDirName } from '@/tools/webpack/paths';
import { ChunkExtractor } from '@loadable/server';
import clientConfig from '@/tools/webpack/webpack.client';
import AppServer from '@/components/template/App-server';
import fp from 'fastify-plugin';
import { UrlToPath, chunkName } from '@/lib/utils';
import { getData } from '@/server/generate-static';

export const statsFile = path.resolve(distDir, loadableStatsFile);

export type RenderOptions = {
  location: string;
  __DATA__?: any;
};

export const render = async ({ location, __DATA__ }: RenderOptions) => {
  const context = {};
  const locPath = UrlToPath(location);
  const pageEntry = `${pagesDirName}-${chunkName(locPath)}`;

  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints: [...Object.keys(clientConfig.entry), pageEntry],
  });

  const css = <style dangerouslySetInnerHTML={{ __html: await extractor.getCssString() }} />;
  if (__DEV__) {
    __DATA__ = await getData(locPath);
  }

  const AppHTML = ReactDOMServer.renderToString(
    <AppServer __DATA__={__DATA__} location={location} extractor={extractor} context={context} />
  );

  return ReactDOMServer.renderToString(
    <Html
      location={location}
      __DATA__={__DATA__}
      scripts={extractor.getScriptElements()}
      css={css}
      html={AppHTML}
    />
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
