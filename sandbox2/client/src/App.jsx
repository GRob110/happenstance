import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Authenticated: ', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
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
    </>
  )
}

export default App