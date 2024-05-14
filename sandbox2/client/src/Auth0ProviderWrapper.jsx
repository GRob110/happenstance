import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'https://dev-6q2l8zmczwn7un71.us.auth0.com';
  const clientId = 'NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV';
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithHistory;