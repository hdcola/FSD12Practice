import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import NavItem from './nav-item';

export const NavBar = () => {
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
          <NavItem to="/" label="Home" />
        </li>
        {user && (
          <li>
            <NavItem to="/create-schedule" label="Create Schedule" />
          </li>
        )}
        <li>
          <NavItem to="/contact" label="Contact" />
        </li>
        <li>
          <NavItem to="/about" label="About" />
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
            <NavItem to="/login" label="Login" />
          )}
        </li>
      </ul>
    </div>
  );
};
