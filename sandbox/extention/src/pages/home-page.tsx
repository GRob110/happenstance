import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getProtectedResource } from '../services/message.service';

window.console.log('home-page.tsx');

export const HomePage: React.FC = () => {

  chrome.action.onClicked.addListener{(
    
  )}
  const [message, setMessage] = useState<string>("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log('access token: ', accessToken);
      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
        console.log("data: ", data);
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
        console.log("error: ",  error);
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  window.console.log('Home.tsx rendered');

  window.console.log("message :", message);
  
  return (
    <div>
      <h1>Happenstance Extension</h1>
      <p>Protected Message: {message}</p>
    </div>
  );
};
