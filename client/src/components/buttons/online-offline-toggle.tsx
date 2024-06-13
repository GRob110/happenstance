import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  saveActiveTab,
  getMostRecentActiveTab,
} from '../../services/user-service';

export const OnlineOfflineToggle: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();

  const handleToggle = async () => {
    const accessToken = await getAccessTokenSilently();
    const newIsOnline = !isOnline;

    const activeTab = async () => {
      if (!newIsOnline) {
        return {
          url: 'offline',
          timestamp: new Date(),
          title: 'offline',
        };
      } else {
        const lastTab = await getMostRecentActiveTab(user!.sub!, accessToken);
        return lastTab.data;
      }
    };
    const activeTabData = await activeTab();
    if (activeTabData && user && user.sub) {
      await saveActiveTab(user.sub, activeTabData, accessToken);
      setIsOnline(newIsOnline);
    } else {
      console.log('No active tab data');
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="relative">
        <span
          className={`block w-10 h-6 rounded-full ${isOnline ? 'bg-customGreen' : 'bg-gray-300'}`}
        ></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isOnline ? 'transform translate-x-4' : 'transform translate-x-0'}`}
        ></span>
      </span>
      <span className="ml-3 text-white">{isOnline ? 'Online' : 'Offline'}</span>
      <input
        type="checkbox"
        className="hidden"
        onChange={handleToggle}
        checked={isOnline}
      />
    </label>
  );
};
