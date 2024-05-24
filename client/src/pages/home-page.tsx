import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";
import { getProtectedResource } from "../services/message.service";

window.console.log('home-page.tsx');

export const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  console.log('early message: ', message);

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log('accessToken: ', accessToken);

      window.postMessage({ 
        type: 'STORE_TOKEN',
        token: accessToken,
        user: user
      }, '*');

      const { data, error } = await getProtectedResource(accessToken);

      console.log('still running data: ', data);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, user]);

  console.log('isAuthenticated: ', isAuthenticated);
  console.log('message: ', message);
  const test = 'test';

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
                  external API. Message: {message} Test: {test}
                </span>
              </p>
            </div>
          )}
        </div>
    </PageLayout>
  );
};
