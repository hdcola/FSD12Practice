import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();

  const signUserOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-500 p-4 flex justify-between">
      <ul className="flex space-x-4">
        <li>
          <Link
            className={`text-white p-1 ${
              location.pathname === '/'
                ? 'border-b-2 border-white'
                : 'hover:border-b-2 hover:border-white'
            }`}
            to="/"
          >
            Home
          </Link>
        </li>
        {user && (
          <li>
            <Link
              className={`text-white p-1 ${
                location.pathname === '/create-schedule'
                  ? 'border-b-2 border-white'
                  : 'hover:border-b-2 hover:border-white'
              }`}
              to="/create-schedule"
            >
              Create Schedule
            </Link>
          </li>
        )}
        <li>
          <Link
            className={`text-white p-1 ${
              location.pathname === '/contact'
                ? 'border-b-2 border-white'
                : 'hover:border-b-2 hover:border-white'
            }`}
            to="/contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={`text-white p-1 ${
              location.pathname === '/about'
                ? 'border-b-2 border-white'
                : 'hover:border-b-2 hover:border-white'
            }`}
            to="/about"
          >
            About
          </Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li className="ml-auto">
          {user ? (
            <div className="flex gap-1">
              <img
                className="w-8 h-8 rounded-full"
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt="user photo"
              />
              <span className="text-white">{user?.displayName}</span>
              <span className="text-white">|</span>
              <button
                className="text-white hover:border-b-2 hover:border-white p-1"
                onClick={signUserOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className="text-white hover:border-b-2 hover:border-white p-1"
              to="/login"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
