import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getProtectedResource } from '../services/message.service';
import { PageLayout } from '../components/page-layout';

window.console.log('home-page.tsx');

export const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messageStored, setMessageStored] = useState<string>('');
  const [userInfo, setUserInfo] = useState<string>('');

  const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
  const server_url = import.meta.env.VITE_APP_API_SERVER_URL;
  const login_url = import.meta.env.VITE_APP_LOGIN_URL;


  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  console.log('isAuthenticated', isAuthenticated);

  let authToken = '';

  chrome.storage.local.get(['authToken'], (result) => {
    console.log('authToken', result.authToken);
    if (result.authToken) {
      authToken = result.authToken;
      console.log('authToken gotten', result.authToken);
    } else {
      console.log('authToken not gotten');
    }
  });

  function login() {
    chrome.tabs.create({ url: login_url });
    console.log('login clicked');
  };

  function logout() {
    chrome.tabs.create({ url: login_url });
    chrome.storage.local.remove(['authToken']);
    console.log('logout clicked');
  };

  useEffect(() => {
    let isMounted = true;

    // Gets message using the stored auth token
    const getMessageStored = async (authToken: string) => {
      console.log('fetching message');
      try {
        const response = await fetch(`${server_url}/api/messages/protected`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');  
        }
        const data = await response.json();
        console.log('message info', data);
        setMessageStored(JSON.stringify(data, null, 2));
        return data;
      } catch (error) {
        setMessageStored(JSON.stringify(error, null, 2));
        console.error('There has been a problem with your fetch operation:', error);
        return error;
      }
    }

    // gets api message using token pulled from auth0 directly
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

    // pulls user info from auth0 with stored token
    const getUserInfo = async (authToken: string) => {
      console.log('fetching message');
      try {
        const response = await fetch(`https://${domain}/api/messages/protected`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');  
        }
        const data = await response.json();
        console.log('message info', data);
        setUserInfo(JSON.stringify(data, null, 2));
        return data;
      } catch (error) {
        setUserInfo(JSON.stringify(error, null, 2));
        console.error('There has been a problem with your fetch operation:', error);
        return error;
      }
    }

    getMessageStored(authToken);
    getMessage();
    getUserInfo(authToken);


    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  window.console.log('Home.tsx rendered');

  window.console.log("message :", message);
  window.console.log("messageStored :", messageStored);
  window.console.log("userInfo :", userInfo);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Happenstance
        </h1>
        {isAuthenticated && (
          <div id="content">
            <p>Protected Message: {message}</p>
            <p>Protected Message Stored: {messageStored}</p>
            <p>Protected User Info: {userInfo}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
        {!isAuthenticated && (
          <div id="content">
            <button onClick={login}>Login</button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
