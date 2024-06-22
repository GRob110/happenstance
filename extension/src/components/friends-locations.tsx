import React, { useEffect, useState } from 'react';
import { getActiveTabs } from '../services/user-service';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth/';

export const FriendsLocations: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<any[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchActiveTabs = async () => {
      if (!user) {
        console.log('User not authenticated');
        return;
      }

      try {
        await getActiveTabs(user.uid, (tabsData) => {
          if (Array.isArray(tabsData)) {
            setActiveTabs(tabsData);
            console.log('Fetched active tabs: ', tabsData);
          }
        })
      } catch (error) {
        console.error('Error fetching active tabs: ', error);
      }
    };

    if (user) {
      fetchActiveTabs();
    }
  }, [user]);

  return (
    <div>
      <h3>Friends' Active Tabs</h3>
      {activeTabs.length > 0 ? (
        <ul>
          {activeTabs.map((tab, index) => (
            <li key={index}>
              <p>
                <strong>Name:</strong> {tab.name}
              </p>
              <p>
                <strong>URL:</strong> {tab.activeTab?.url}
              </p>
              <p>
                <strong>Title:</strong> {tab.activeTab?.title}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends active.</p>
      )}
    </div>
  );
};
