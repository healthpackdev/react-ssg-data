import { Page } from '@/routes';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteData } from '../lib/use-route-data';

const Profile: Page = () => {
  const data = useRouteData();
  return (
    <div>
      Go Home <Link to="/">click me</Link>
    </div>
  );
};

export default Profile;
