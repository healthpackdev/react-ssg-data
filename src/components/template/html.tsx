import React from 'react';
import type { ChunkExtractor } from '@loadable/server';
import { appMountId, dataStoreId } from '@/client/constants';

interface HtmlProps {
  html: string;
  scripts: ReturnType<ChunkExtractor['getScriptElements']>;
  css: JSX.Element;
  __DATA__: any;
}

// PureComponent - only render in server.
const Html: React.FC<HtmlProps> = React.memo(({ html, scripts, css, __DATA__ }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        {css}
      </head>
      <body>
        <div id={appMountId} dangerouslySetInnerHTML={{ __html: html }} />
        <script
          type="application/json"
          id={dataStoreId}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(__DATA__),
          }}
        />
        {scripts}
      </body>
    </html>
  );
});

export default Html;
