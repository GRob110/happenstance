import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserData } from '../services/user-service';

export const Profile: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (user && user.sub) {
          const accessToken = await getAccessTokenSilently();
          const { data } = await getUserData(user.sub, accessToken);
          setUserInfo(data);
        } else {
          console.log('User information is not available.');
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };

    if (user) {
      fetchUserInfo();
      const interval = setInterval(fetchUserInfo, 5000);
      return () => clearInterval(interval);
    }
  }, [getAccessTokenSilently, user]);

  return (
    <div className="border border-gray-300 p-4 rounded-lg max-w-xs mx-auto">
      {userInfo ? (
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <img className="w-12 h-12 rounded-full" src={userInfo.picture ? userInfo.picture : "/images/default-profile-icon.png"} alt="Profile" />
            <h3 className="text-xl">{userInfo.name}</h3>
          </div>
          {userInfo.activeTab && (
            <div>
              <h3>Active Tab</h3>
              <p><strong>URL:</strong> {userInfo.activeTab.url}</p>
              <p><strong>Title:</strong> {userInfo.activeTab.title}</p>
            </div>
          )}
          <p className="mt-4">
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};