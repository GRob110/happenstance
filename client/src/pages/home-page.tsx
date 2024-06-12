import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLayout } from '../components/page-layout';
import { saveUserData } from '../services/user-service';
import { PageLoader } from '../components/page-loader';
import { Profile } from '../components/profile';
import '../styles/main.css';
import { UserHistory } from '../components/user-history';
import { AllUsersList } from '../components/all-users-list';
import { FriendsLocations } from '../components/friends-locations';

export const HomePage: React.FC = () => {
  const { getAccessTokenSilently, isAuthenticated, user, isLoading } =
    useAuth0();

  useEffect(() => {
    let isMounted = true;

    const initializeUser = async () => {
      if (!isAuthenticated || !user || !user.sub) {
        console.log('User not authenticated');
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();

        // Initialize user when first logging in
        // TODO: is there a better place to do this?
        await saveUserData(
          user.sub,
          {
            userId: user.sub,
            name: user.name,
            email: user.email,
            friends: [],
          },
          accessToken,
        );

        // Send token to the browser extension
        window.postMessage(
          {
            type: 'STORE_TOKEN',
            token: accessToken,
            userId: user.sub,
          },
          '*',
        );

        if (!isMounted) {
          return;
        }
      } catch (error: any) {
        console.log('error in fetch token: ', error);
      }
    };

    if (isAuthenticated && user && user.sub) {
      initializeUser();
    }

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, isAuthenticated, user]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Happenstance
        </h1>
        {isAuthenticated && (
          <div className="content__body">
            <Profile />
            <UserHistory />
            <AllUsersList />
            <FriendsLocations />
          </div>
        )}
        {!isAuthenticated && (
          <div className="content__body">
            <p>Please login or sign up!</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
