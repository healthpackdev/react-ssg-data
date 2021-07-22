import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteData } from '../lib/use-route-data';

function home() {
  const myData = useRouteData();
  useEffect(() => {
    console.log(myData);
  }, [myData]);
  return (
    <div>
      <Link to="/profile">Go to Profile.</Link>
    </div>
  );
}

export default home;
