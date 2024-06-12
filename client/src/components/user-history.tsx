import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserData } from '../services/user-service';

export const UserHistory: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await getUserData(user!.sub!, accessToken);
        if (response.data) {
          setHistory(response.data.history || []);
        }
      } catch (error) {
        console.log('Error fetching user history:', error);
      }
    };

    if (user) {
      fetchUserHistory();
    }
  }, [getAccessTokenSilently, user]);

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
