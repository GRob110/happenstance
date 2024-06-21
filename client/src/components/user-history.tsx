import React from 'react';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Tab } from '../models/tab';

export const UserHistory: React.FC = () => {
  const [user] = useAuthState(auth);
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const [userData] = useDocumentData(userDocRef);
  const history: Tab[] = userData?.history || [];

  return (
    <div>
      <h3>User History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <p>
                <strong>URL:</strong> {item.url}
              </p>
              <p>
                <strong>Title:</strong> {item.title}
              </p>
              <p>
                <strong>Timestamp:</strong>{' '}
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};
