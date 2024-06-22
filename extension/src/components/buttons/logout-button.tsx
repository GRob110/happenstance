import React from 'react';
import { signOut } from 'firebase/auth/web-extension';
import { auth } from '../../firebase';

export const LogoutButton: React.FC = () => {

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};
