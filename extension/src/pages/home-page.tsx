import React, { useEffect, useState } from 'react';

// TODO: if logged out on website, need to logout here
// TODO: need to break this out into a separate components and services
export const HomePage: React.FC = () => {
  const [messageStored, setMessageStored] = useState<string>('');
  const [userInfo, setUserInfo] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');

  const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
  const server_url = import.meta.env.VITE_APP_API_SERVER_URL;
  const login_url = import.meta.env.VITE_APP_LOGIN_URL;

  useEffect(() => {
    chrome.storage.local.get(['authToken'], (result) => {
      if (result.authToken) {
        setAuthToken(result.authToken);
        console.log('authToken gotten in homepage');
      } else {
        console.log('authToken not gotten');
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.get(['userId'], (result) => {
      if (result.userId) {
        console.log('userId gotten in homepage');
      } else {
        console.log('userId not gotten');
      }
    });
  }, []);

  function login() {
    chrome.tabs.create({ url: login_url });
  };

  function logout() {
    chrome.tabs.create({ url: login_url });
    chrome.storage.local.remove(['authToken']);
    chrome.storage.local.remove(['userId']);
    setAuthToken('');
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
        setMessageStored(JSON.stringify(data, null, 2));
        return data;
      } catch (error) {
        setMessageStored(JSON.stringify(error, null, 2));
        return error;
      }
    }

    // pulls user info from auth0 with stored token
    const getUserInfo = async (authToken: string) => {
      if (!isMounted) return;

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
        setUserInfo(JSON.stringify(data, null, 2));
        return data;
      } catch (error) {
        setUserInfo(JSON.stringify(error, null, 2));
        return error;
      }
    }

    getMessageStored(authToken);
    getUserInfo(authToken);


    return () => {
      isMounted = false;
    };
  }, [authToken]);

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
