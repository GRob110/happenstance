import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";

export const Profile: React.FC = () => {
  const [user] = useAuthState(auth);
  const userDocRef = user ? doc(db, "users", user.uid) : null;
  const [userInfo] = useDocumentData(userDocRef);

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