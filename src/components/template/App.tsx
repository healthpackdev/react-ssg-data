import { Route, Switch } from 'react-router-dom';
import routes from '@/routes';

// Shared by client and server.
const App: React.FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} key={route.path.toString()} />
      ))}
    </Switch>
  );
};

export default App;
