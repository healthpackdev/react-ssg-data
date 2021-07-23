import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteData } from '../lib/use-route-data';

function home() {
  const myData = useRouteData<{ repos: { name: string; description: string; url: string }[] }>();

  return (
    <div>
      <Link to="/profile">Go to Profile.</Link>
      {myData.repos.map((repo) => (
        <div key={repo.name}>
          <a href={repo.url}>{repo.name}</a> {repo.description}
        </div>
      ))}
    </div>
  );
}

export default home;
