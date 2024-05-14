import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-6q2l8zmczwn7un71.us.auth0.com'
      clientId='NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV'
      authorizationParams={{
        redirectUri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
