import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";

window.console.log('nav-bar.tsx');

export const NavBar: React.FC = () => {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarBrand />
        <NavBarButtons />
      </nav>
    </div>
  );
};
