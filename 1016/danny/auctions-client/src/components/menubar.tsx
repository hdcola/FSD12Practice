import { NavLink } from 'react-router-dom';

export const Menubar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex gap-4 items-center">
        <div className="text-white text-lg font-semibold">Auction House</div>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-300 hover:text-white ${
                  isActive ? 'border-b-2 border-white' : ''
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auctions/new"
              className={({ isActive }) =>
                `text-gray-300 hover:text-white ${
                  isActive ? 'border-b-2 border-white' : ''
                }`
              }
            >
              Add Auction
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
