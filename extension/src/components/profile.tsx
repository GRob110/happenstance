import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getUserData } from "../services/user-service";

export const Profile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const userData = await getUserData(user.uid);
        setUserInfo(userData);
      }
    };
    fetchUserInfo();
  }, [user]);

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
