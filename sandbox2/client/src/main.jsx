import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Auth0ProviderWithHistory from './Auth0ProviderWrapper';

ReactDOM.render(
  <Auth0ProviderWithHistory>
    <App />
  </Auth0ProviderWithHistory>,
  document.getElementById('root')
);