import { BrowserRouter } from 'react-router-dom';
import App from '@/components/template/App';
import { DataContext } from '@/lib/use-route-data';
import { dataStoreId } from '@/client/constants';

const __DATA__ = JSON.parse(window.__DATA__.textContent);

// only render in client.
const AppClient: React.FC = () => (
  <DataContext.Provider value={__DATA__}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataContext.Provider>
);

export default AppClient;
