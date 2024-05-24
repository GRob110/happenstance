//TODO: better understand the navigate part of this code
import { Auth0Provider, AppState, useAuth0 } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

window.console.log('auth0-provider-with-navigate.tsx');

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
    children,
}: PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element | null => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE;

    window.console.log({ domain, clientId, redirectUri, audience });

    const onRedirectCallback = async (appState?: AppState) => {
        const { getAccessTokenSilently, user } = useAuth0();

        const accessToken = await getAccessTokenSilently();
        console.log('accessToken: ', accessToken);

        window.postMessage({ 
            type: 'STORE_TOKEN',
            token: accessToken,
            user: user
        }, '*');
        console.log('accessToken sent to extension');

        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri && audience)) {
        window.console.error('Missing Auth0 configuration');
        return null;
    }

    window.console.log('Auth0ProviderWithNavigate rendered');

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                audience: audience,
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};