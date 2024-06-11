import React from "react";

export const LogoutButton: React.FC = () => {
  const logoutUrl = import.meta.env.VITE_AUTH0_LOGIN_URL;

  // TODO put this in handle function
  chrome.storage.local.remove(['authToken']);
  chrome.storage.local.remove(['userId']);

  return (
    <button onClick={() => chrome.tabs.create({ url: logoutUrl })}>
      Log Out
    </button>
  );
};