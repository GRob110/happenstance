import React, { useEffect, useState } from 'react';
import { getActiveTabs } from '../services/user.service';
import { getAccessToken, getUserId } from '../services/storage.service';

export const ActiveTabsList: React.FC = () => {
    const [activeTabs, setActiveTabs] = useState<any[]>([]);

  useEffect(() => {
    const fetchActiveTabs = async () => {
      const accessToken = await getAccessToken();
      const userId = await getUserId();
      const tabs = await getActiveTabs(userId, accessToken);
      if (tabs.data) {
        const parsedData = JSON.parse(tabs.data.text); //should be an array
        setActiveTabs(parsedData);
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