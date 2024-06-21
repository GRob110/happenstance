import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import { PageLoader } from './components/page-loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { LoginPage } from './pages/login-page';

export const App: React.FC = () => {
  const [loading] = useAuthState(auth);

  /*
  if (loading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  */

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
