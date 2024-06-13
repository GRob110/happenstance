import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLayout } from '../components/page-layout';
import { getUserData, saveUserData } from '../services/user-service';
import { PageLoader } from '../components/page-loader';
import { Sidebar } from '../components/sidebar';
import { Opening } from '../components/opening';
import '../styles/main.css';
import { AllUsersList } from '../components/all-users-list';
import { UserHistory } from '../components/user-history';

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
        const { data: existingUserData } = await getUserData(user.sub, accessToken);

        // Initialize user when first logging in
        // TODO: is there a better place to do this?
        await saveUserData(
          user.sub,
          {
            userId: existingUserData?.userId || user.sub,
            name: existingUserData?.name || user.name,
            email: existingUserData?.email || user.email,
            friends: existingUserData?.friends || [],
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
      {isAuthenticated ? (
        <>
          <Sidebar />
          <div className="main-content">
            <h1 className="content__title text-center text-3xl font-bold my-6">
              Happenstance
            </h1>
            <UserHistory />
            <AllUsersList />
          </div>
        </>
      ) : (
        <Opening />
      )}
    </PageLayout>
  );
};
