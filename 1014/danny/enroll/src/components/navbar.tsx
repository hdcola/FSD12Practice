import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const Navbar = () => {
  const [user] = useAuthState(auth);

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
          <Link className="text-white hover:text-gray-200" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-gray-200" to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-gray-200" to="/about">
            About
          </Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li className="ml-auto">
          {user ? (
            <div className="flex gap-1">
              {/* <img
                className="w-8 h-8 rounded-full"
                src={user?.photoURL || 'https://via.placeholder.com/150'}
                alt="user photo"
              /> */}
              <span className="text-white">{user?.displayName}</span>
              <span className="text-white">|</span>
              <button
                className="text-white hover:text-gray-200"
                onClick={signUserOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link className="text-white hover:text-gray-200" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
