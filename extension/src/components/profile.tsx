import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/user.service';
import { getAccessToken, getUserId } from '../services/storage.service';

export const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
        try {
            const accessToken = await getAccessToken();
            const userId = await getUserId();
            const userData = await getUserData(userId, accessToken);
            setUserInfo(userData.data);
        } catch (error) {
            console.log('Error fetching user information:', error);
        }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userInfo ? (
        <div>
          <h3>User Information</h3>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};
