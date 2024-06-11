import React from "react";

export const LoginButton: React.FC = () => {
  const loginUrl = import.meta.env.VITE_APP_LOGIN_URL;

  // TODO put this in handle function
  return (
    <button onClick={() => chrome.tabs.create({ url: loginUrl })}>
      Log In
    </button>
  );
};