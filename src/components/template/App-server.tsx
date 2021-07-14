import { ChunkExtractorManager } from '@loadable/server';
import { StaticRouter, StaticRouterProps } from 'react-router-dom';
import App from '@/components/template/App';
import { DataContext } from '@/lib/use-route-data';

export interface AppServerProps {
  location: string;
  context: StaticRouterProps['context'];
  extractor: ChunkExtractorManager['props']['extractor'];
  staticData: any;
}
// only render in server.
const AppServer: React.FC<AppServerProps> = ({ location, context, extractor, staticData }) => {
  return (
    <ChunkExtractorManager extractor={extractor}>
      <DataContext.Provider value={staticData}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </DataContext.Provider>
    </ChunkExtractorManager>
  );
};

export default AppServer;
