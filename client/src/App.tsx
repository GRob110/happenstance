import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import { LoginPage } from './pages/login-page';

export const App: React.FC = () => {

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
