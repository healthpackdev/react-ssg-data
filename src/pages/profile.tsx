import { Page } from '@/routes';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteData } from '../lib/use-route-data';

const Profile: Page = () => {
  const data = useRouteData<{ users: { id: number; name: string; email: string }[] }>();

  return (
    <div>
      Go Home <Link to="/">click me</Link>
      {data.users?.map((user) => {
        return (
          <div>
            {user.id} - {user.name} - {user.email}
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
