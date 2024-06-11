import React from "react";

export const LogoutButton: React.FC = () => {
  const logoutUrl = import.meta.env.VITE_APP_LOGIN_URL;

  const handleLogout = () => {
    chrome.tabs.create({ url: logoutUrl });
    chrome.storage.local.remove(['authToken']);
    chrome.storage.local.remove(['userId']);
  }

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};