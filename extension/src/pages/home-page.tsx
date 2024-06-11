import React, { useEffect, useState } from 'react';
import { LoginButton } from '../components/buttons/login-button';
import { LogoutButton } from '../components/buttons/logout-button';
import { ActiveTabsList } from '../components/active-tabs-list';
import { Profile } from '../components/profile';
import { getAccessToken } from '../services/storage.service';

// TODO: if logged out on website, need to logout here
// TODO: need to break this out into a separate components and services
export const HomePage: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessToken();
        setAccessToken(accessToken);
      } catch (error) {
        console.log('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Happenstance
      </h1>
      {accessToken !== '' && (
        <div id="content">
          <LogoutButton />
          <Profile />
          <ActiveTabsList />
        </div>
      )}
      {accessToken === '' && (
        <div id="content">
          <LoginButton />
        </div>
      )}
    </div>
  );
};
