import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavItemProps = {
  to: string;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  const location = useLocation();

  return (
    <li>
      <Link
        className={`text-white p-1 ${
          location.pathname === to
            ? 'border-b-2 border-white'
            : 'hover:border-b-2 hover:border-white'
        }`}
        to={to}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
