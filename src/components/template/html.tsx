import React from 'react';
import type { ChunkExtractor } from '@loadable/server';
import serialize from 'serialize-javascript';

interface HtmlProps {
  html: string;
  scripts: ReturnType<ChunkExtractor['getScriptElements']>;
  css: JSX.Element;
  staticData: any;
}

// PureComponent - only render in server.
const Html: React.FC<HtmlProps> = React.memo(({ html, scripts, css, staticData }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        {css}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: html }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.STATIC_DATA = ${serialize(staticData)};`,
          }}
        />
        {scripts}
      </body>
    </html>
  );
});

export default Html;
