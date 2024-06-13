//TODO: better understand the navigate part of this code
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
  children,
}: PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element | null => {
  const navigate = useNavigate();

  const DOMAIN = import.meta.env.VITE_APP_AUTH0_DOMAIN;
  const CLIENT_ID = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL;
  const AUDIENCE = import.meta.env.VITE_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = async (appState?: AppState) => {
    // TODO: figure out best way to send token to extension
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(DOMAIN && CLIENT_ID && REDIRECT_URI && AUDIENCE)) {
    window.console.error('Missing Auth0 configuration');
    return null;
  }

  return (
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        audience: AUDIENCE,
        redirect_uri: REDIRECT_URI,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
