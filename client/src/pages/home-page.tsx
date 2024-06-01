import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";
import { getProtectedResource } from "../services/message.service";
import { getUserData, saveUserData } from "../services/user.service";
import { PageLoader } from "../components/page-loader";

window.console.log('home-page.tsx');

export const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [protectedMessage, setProtectedMessage] = useState<string>("");
  const { getAccessTokenSilently, isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const fetchUserDatandMessage = async () => {
      if (!isAuthenticated || !user || !user.sub) {
        console.log('User not authenticated');
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();
        console.log('accessToken: ', accessToken);

        await saveUserData(
          user.sub, 
          { 
            userId: user.sub, 
            name: user.name, 
            email: user.email 
          }, 
          accessToken
        );

        console.log('Saved user data');

        const [{ data: userData, error: userError }, { data: messageData, error: messageError }] = await Promise.all([
          getUserData(user.sub, accessToken),
          getProtectedResource(accessToken),
        ]);

        window.postMessage({ 
          type: 'STORE_TOKEN',
          token: accessToken,
          user: user
        }, '*');

        if (!isMounted) {
          return;
        }

        if (userData) {
          setUserData(userData);
          console.log('Fetched user data: ', userData);
        } else if (userError) {
          console.error(userError);
        }

        if (messageData) {
          setProtectedMessage(JSON.stringify(messageData, null, 2));
        } else if (messageError) {
          console.log(JSON.stringify(messageError, null, 2));
        }

      } catch (error: any) {
        console.error(error);
      }
    };

    if (isAuthenticated && user && user.sub) {
      fetchUserDatandMessage();
    }

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, isAuthenticated, user]);

  console.log('isAuthenticated: ', isAuthenticated);
  console.log('message: ', protectedMessage);
  const test = 'test';

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
              <p id="page-description">
                <span>
                  This page retrieves a <strong>protected message</strong> from an
                  external API. Message: {protectedMessage} Test: {test}
                  Welcome, {userData?.name}!
                </span>
              </p>
            </div>
          )}
        </div>
    </PageLayout>
  );
};
