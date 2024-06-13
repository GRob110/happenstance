import React from 'react';
import { Profile } from './profile';
import { FriendsLocations } from './friends-locations';

export const Sidebar: React.FC = () => {

  return (
    <div className="sidebar">
      <Profile />
      <FriendsLocations />
    </div>
  );
};