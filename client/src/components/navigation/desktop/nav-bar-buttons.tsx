import React from 'react';
import { LoginButton } from '../../buttons/login-button';
import { LogoutButton } from '../../buttons/logout-button';
import { OnlineOfflineToggle } from '../../buttons/online-offline-toggle';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const NavBarButtons: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="nav-bar__buttons">
      {!user ? <>
        <LoginButton />
      </> : <>
        <OnlineOfflineToggle />
        <LogoutButton />
      </>}
    </div>
  );
};
