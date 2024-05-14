import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//import './App.css'

function App() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    console.log('Authenticated: ', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={() => logout()}>Log out</button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
      <p>
        {isAuthenticated ? 'You are logged in!' : 'You are not logged in!'}
      </p>
    </div>
  );
}

export default App;
