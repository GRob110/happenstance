import React from 'react';
import { saveFriend } from '../services/user-service';
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

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {allUsers?.filter(u => u.userId !== user?.uid).map((u) => (
          <li key={u.userId}>
            {u.name} ({u.email}){' '}
            {userData &&
              userData.friends &&
              !userData.friends.includes(u.userId) && (
                <button onClick={() => saveFriend(user!.uid, u.userId)}>
                  Add Friend
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
