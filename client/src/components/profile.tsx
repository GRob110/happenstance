import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserData } from '../services/user-service';

export const Profile: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const { data } = await getUserData(user!.sub!, accessToken);
        setUserInfo(data);
      } catch (error) {
        console.log('Error fetching user information:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [getAccessTokenSilently, user]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h3>User Information</h3>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <img src={userInfo.picture} alt="Profile" />
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};
