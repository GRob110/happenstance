import React, { useEffect, useState } from 'react';
//import { useAuth0 } from '@auth0/auth0-react';
//import { getProtectedResource } from '../services/message.service';

window.console.log('home-page.tsx');

// TODO: if logged out on website, need to logout here
// TODO: need to break this out into a separate components and services
export const HomePage: React.FC = () => {
  //const [message, setMessage] = useState<string>('');
  const [messageStored, setMessageStored] = useState<string>('');
  const [userInfo, setUserInfo] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');

  const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
  const server_url = import.meta.env.VITE_APP_API_SERVER_URL;
  const login_url = import.meta.env.VITE_APP_LOGIN_URL;

  useEffect(() => {
    chrome.storage.local.get(['authToken'], (result) => {
      console.log('authToken', result.authToken);
      if (result.authToken) {
        setAuthToken(result.authToken);
        console.log('authToken gotten', result.authToken);
      } else {
        console.log('authToken not gotten');
      }
    });
  }, []);

  function login() {
    chrome.tabs.create({ url: login_url });
    console.log('login clicked');
  };

  function logout() {
    chrome.tabs.create({ url: login_url });
    chrome.storage.local.remove(['authToken']);
    setAuthToken('');
    console.log('logout clicked');
  };

  useEffect(() => {
    if (authToken === '') {
      return;
    }

    let isMounted = true;

    if (authToken === '') {
      return;
    }

    // Gets message using the stored auth token
    const getMessageStored = async (authToken: string) => {
      if (!isMounted) return;

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

    // pulls user info from auth0 with stored token
    const getUserInfo = async (authToken: string) => {
      if (!isMounted) return;

      console.log('fetching message');
      try {
        const response = await fetch(`https://${domain}/userinfo`, {
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
    getUserInfo(authToken);


    return () => {
      isMounted = false;
    };
  }, [authToken]);

  console.log('Home.tsx rendered');
  console.log("messageStored :", messageStored);
  console.log("userInfo :", userInfo);
  console.log("authToken :", authToken);

  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Happenstance
      </h1>
      {authToken !== '' && (
        <div id="content">
          <p>Protected Message Stored: {messageStored}</p>
          <p>Protected User Info: {userInfo}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {authToken === '' && (
        <div id="content">
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};
