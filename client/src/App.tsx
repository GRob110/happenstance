import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import { PageLoader } from './components/page-loader';
//import { AuthenticationGuard } from './components/authentication-guard';

window.console.log('app.tsx');

export const App: React.FC = () => {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  window.console.log('app.tsx rendered');

  /*
      <Route
        path="/"
        element={<AuthenticationGuard component={HomePage} />}
      />
      <Route
        path="/callback"
        element={<AuthenticationGuard component={HomePage} />}
      />
  */

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
