import useAuthStore from '../store/useAuthStore';

export const Menu = () => {
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="text-white hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="/todos/new" className="text-white hover:text-gray-400">
            New Todo
          </a>
        </li>
      </ul>
      <ul className="flex space-x-4">
        {isAuthenticated ? (
          <li>
            <a
              href="/logout"
              className="text-white hover:text-gray-400"
              onClick={logout}
            >
              Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <a href="/login" className="text-white hover:text-gray-400">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="text-white hover:text-gray-400">
                Register
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
