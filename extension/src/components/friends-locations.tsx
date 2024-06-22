import React, { useEffect, useState } from 'react';
import { getActiveTabs, getUserData } from '../services/user-service';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth/';

export const FriendsLocations: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<any[]>([]);
  const [user] = useAuthState(auth);
  const [friendNames, setFriendNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log('useEffect, get active tabs');
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    const unsubscribe = getActiveTabs(user.uid, (tabsData) => {
      if (Array.isArray(tabsData)) {
        setActiveTabs(tabsData);
        console.log('Fetched active tabs: ', tabsData);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    console.log('useEffect, get friend names');
    const fetchFriendNames = async () => {
      const names: { [key: string]: string } = {};
      for (const tab of activeTabs) {
        console.log('tab', tab);
        const name = await friendName(tab.friendId);
        console.log('tab, name', tab.friendId, name);
        console.log('tab.name, friendId, name', tab.name, tab.friendId, name);
        names[tab.friendId] = name;
      }
      setFriendNames(names);
    };

    if (activeTabs.length > 0) {
      fetchFriendNames();
    }
  }, [activeTabs]);

  const friendName = async (userId: string) => {
    console.log('friendName', userId);
    try {
      const friend = await getUserData(userId);
      console.log('friend', friend);
      return friend?.name || 'Unknown';
    } catch (error) {
      console.error('Error fetching friend name: ', error);
      return 'Unknown';
    }
  };

  return (
    <div>
      <h3>Friends' Active Tabs</h3>
      {activeTabs.length > 0 ? (
        <ul>
          {activeTabs.map((tab, index) => (
            <li key={index}>
              <p>
                <strong>Name:</strong> {friendNames[tab.friendId]}
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
