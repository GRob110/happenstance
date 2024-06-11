import React, { useEffect, useState } from 'react';
import { getActiveTabs } from '../services/user.service';
import { getAccessToken, getUserId } from '../services/storage.service';

export const ActiveTabsList: React.FC = () => {
    const [activeTabs, setActiveTabs] = useState<any[]>([]);

  useEffect(() => {
    const fetchActiveTabs = async () => {
      try {
        const accessToken = await getAccessToken();
        const userId = await getUserId();
        const tabs = await getActiveTabs(userId, accessToken);
        console.log('Active tabs fetched:', tabs.data);
        if (Array.isArray(tabs.data)) {
          setActiveTabs(tabs.data);
        }
      } catch (error) {
        console.log('Error fetching active tabs:', error);
      }
    };

    fetchActiveTabs();
  }, []);

  return (
    <ul>
        {activeTabs.map((tab, index) => (
          <li key={index}>{tab.name}: {tab.activeTab?.url}</li>
        ))}
    </ul>
  );
};