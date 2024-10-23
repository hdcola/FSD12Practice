import useAuthStore from '../store/useAuthStore';
import { BlogList } from '../components/blog-list';

export const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <BlogList />
      ) : (
        <p>Please login to see the home page</p>
      )}
    </div>
  );
};
