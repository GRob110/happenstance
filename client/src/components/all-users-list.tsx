import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getAllUsers,
  getUserData,
  saveUserData,
} from '../services/user-service';

export const AllUsersList: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!isAuthenticated || !user || !user.sub) {
        console.log('User not authenticated');
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();
        const { data: userData, error: userError } = await getUserData(
          user.sub,
          accessToken,
        );
        const { data: usersData, error: usersError } =
          await getAllUsers(accessToken);

        if (userData) {
          setUserData(userData);
          console.log('Fetched user data: ', userData);
        } else if (userError) {
          console.error(userError);
        }

        if (Array.isArray(usersData)) {
          setAllUsers(usersData);
          console.log('Fetched all users: ', usersData);
        } else if (usersError) {
          console.error(usersError);
        }
      } catch (error: any) {
        console.log('error in fetch all users: ', error);
      }
    };

    if (isAuthenticated && user && user.sub) {
      fetchAllUsers();
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  const handleAddFriend = async (friendUserId: string) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const updatedUser = {
        ...userData,
        friends: [...(userData.friends || []), friendUserId],
      };
      await saveUserData(user!.sub!, updatedUser, accessToken);
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error adding friend', error);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {allUsers.map((u) => (
          <li key={u.userId}>
            {u.name} ({u.email}){' '}
            {userData &&
              userData.friends &&
              !userData.friends.includes(u.userId) && (
                <button onClick={() => handleAddFriend(u.userId)}>
                  Add Friend
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
