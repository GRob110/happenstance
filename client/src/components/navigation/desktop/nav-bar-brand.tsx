import React from "react";
import { NavLink } from "react-router-dom";

window.console.log('nav-bar-brand.tsx');

export const NavBarBrand: React.FC = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="../../../../images/happenstance-icon-128.png"
          alt="Happenstance logo"
          width="128"
          height="128"
        />
      </NavLink>
    </div>
  );
};
