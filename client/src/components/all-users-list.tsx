import React from 'react';
import { saveUserData } from '../services/user-service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const AllUsersList: React.FC = () => {
  const [user] = useAuthState(auth);
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const [userData] = useDocumentData(userDocRef);
  const usersCollectionRef = collection(db, 'users');
  const [allUsers] = useCollectionData(usersCollectionRef);

  const handleAddFriend = async (friendUserId: string) => {
    try {
      const updatedUser = {
        userId: userData?.userId,
        name: userData?.name,
        email: userData?.email,
        friends: [...(userData?.friends || []), friendUserId],
        history: userData?.history,
        activeTab: userData?.activeTab,
      };
      await saveUserData(user!.uid, updatedUser);
    } catch (error) {
      console.error('Error adding friend', error);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {allUsers?.map((u) => (
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
