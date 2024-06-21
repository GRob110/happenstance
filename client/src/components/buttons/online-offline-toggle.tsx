import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  saveActiveTab,
  getMostRecentActiveTab,
} from '../../services/user-service';

// TODO: update active tab when turned on with last active tab

export const OnlineOfflineToggle: React.FC = () => {
  const [user] = useAuthState(auth);
  const [isOnline, setIsOnline] = useState(true);
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const [userData] = useDocumentData(userDocRef);

  useEffect(() => {
    if (userData) {
      setIsOnline(userData.activeTab.url !== 'offline');
    }
  }, [userData]);

  const handleToggle = async () => {
    const newIsOnline = !isOnline;

    if (user) {
      const activeTab = newIsOnline ? await getMostRecentActiveTab(user.uid) : { url: 'offline', timestamp: new Date(), title: 'Offline' };
      if (activeTab) {
        await saveActiveTab(user.uid, activeTab);
      }
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
