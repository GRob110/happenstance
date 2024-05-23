import React from "react";
import { NavBar } from "./navigation/nav-bar";

window.console.log('page-layout.tsx');

interface Props {
  children: JSX.Element;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <div className="page-layout__content">{children}</div>
    </div>
  );
};
