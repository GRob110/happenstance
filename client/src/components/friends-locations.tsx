import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getActiveTabs } from '../services/user.service';

export const FriendsLocations: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<any[]>([]);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchActiveTabs = async () => {
      if (!isAuthenticated || !user || !user.sub) {
        console.log('User not authenticated');
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();
        const { data: tabsData, error } = await getActiveTabs(user.sub, accessToken);

        if (Array.isArray(tabsData)) {
          setActiveTabs(tabsData);
          console.log('Fetched active tabs: ', tabsData);
        } else if (error) {
          console.error(error);
        }
      } catch (error: any) {
        console.log('Error fetching active tabs: ', error);
      }
    };

    if (isAuthenticated && user && user.sub) {
      fetchActiveTabs();
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  return (
    <div>
      <h3>Friends' Active Tabs</h3>
      {activeTabs.length > 0 ? (
        <ul>
          {activeTabs.map((tab, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {tab.name}</p>
              <p><strong>URL:</strong> {tab.activeTab?.url}</p>
              <p><strong>Title:</strong> {tab.activeTab?.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends active.</p>
      )}
    </div>
  );
};