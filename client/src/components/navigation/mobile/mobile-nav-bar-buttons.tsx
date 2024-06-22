import React from 'react';
import { LoginButton } from '../../buttons/login-button';
import { LogoutButton } from '../../buttons/logout-button';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { OnlineOfflineToggle } from '../../buttons/online-offline-toggle';

export const MobileNavBarButtons: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="mobile-nav-bar__buttons">
      {!user ? <LoginButton /> : <>
          <OnlineOfflineToggle />
          <LogoutButton />
        </>
      }
    </div>
  );
};
