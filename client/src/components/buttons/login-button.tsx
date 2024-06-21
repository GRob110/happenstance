import React from 'react';

import { useNavigate } from 'react-router-dom';

export const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};
