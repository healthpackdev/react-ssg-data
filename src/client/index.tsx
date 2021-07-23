import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { appMountId } from '@/client/constants';

import AppClient from '@/components/template/App-client';
import { loadableReady } from '@loadable/component';

import 'bootstrap/dist/css/bootstrap.css';

if (__DEV__) {
  require('preact/debug');
}

// pass an empty object to data cache.
window.__DATA_CACHE__ = {};

// on loadable ready hydrate the appClient
loadableReady(() => {
  ReactDOM.hydrate(
    <StrictMode>
      <AppClient />
    </StrictMode>,
    document.getElementById(appMountId)
  );
});
