import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import AppClient from '@/components/template/App-client';
import { loadableReady } from '@loadable/component';
import 'bootstrap/dist/css/bootstrap.css';

if (__DEV__) {
  require('preact/debug');
}

loadableReady(() => {
  ReactDOM.hydrate(
    <StrictMode>
      <AppClient />
    </StrictMode>,
    document.getElementById('app')
  );
});
