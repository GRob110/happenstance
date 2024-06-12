import React from "react";
import { NavLink } from "react-router-dom";

interface MobileNavBarBrandProps {
  handleClick: () => void;
}

export const MobileNavBarBrand: React.FC<MobileNavBarBrandProps> = ({
  handleClick,
}) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img
          className="mobile-nav-bar__logo"
          src="../../../../images/happenstance-icon-128.png"
          alt="Happenstance logo"
          width="82"
          height="82"
        />
      </NavLink>
    </div>
  );
};
