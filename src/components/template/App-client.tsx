import { BrowserRouter } from 'react-router-dom';
import App from '@/components/template/App';
import { DataContext } from '@/lib/use-route-data';

// only render in client.
const AppClient: React.FC = () => (
  <DataContext.Provider value={window.STATIC_DATA}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataContext.Provider>
);

export default AppClient;
