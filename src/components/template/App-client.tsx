import { BrowserRouter } from 'react-router-dom';
import App from '@/components/template/App';
import { DataContext } from '@/lib/use-route-data';
import { dataStoreId } from '@/client/constants';

// only render in client.
const AppClient: React.FC = () => (
  <DataContext.Provider value={{ data: window[dataStoreId] }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataContext.Provider>
);

export default AppClient;
