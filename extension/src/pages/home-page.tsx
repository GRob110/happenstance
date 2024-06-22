import React from 'react';
import { LogoutButton } from '../components/buttons/logout-button';
import { Profile } from '../components/profile';
import { LoginForm } from '../forms/login-form';
import { FriendsLocations } from '../components/friends-locations';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

// TODO: if logged out on website, need to logout here
// TODO: need to break this out into a separate components and services
export const HomePage: React.FC = () => {
  console.log('home-page.tsx');
  const [user] = useAuthState(auth);
  console.log('user', user);

  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Happenstance
      </h1>
      {user ? (
        <div id="content">
          <LogoutButton />
          <Profile />
          <FriendsLocations />
        </div>
      ) : (
        <div id="content">
          <LoginForm />
        </div>
      )}
    </div>
  );
};
