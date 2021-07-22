import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { appMountId } from '@/client/constants';

import AppClient from '@/components/template/App-client';
import { loadableReady } from '@loadable/component';

import 'bootstrap/dist/css/bootstrap.css';

if (__DEV__) {
  require('preact/debug');
}
window.__DATA_CACHE__ = {};

loadableReady(() => {
  ReactDOM.hydrate(
    <StrictMode>
      <AppClient />
    </StrictMode>,
    document.getElementById(appMountId)
  );
});
