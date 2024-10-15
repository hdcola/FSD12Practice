import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigator = useNavigate();

  const signInt = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigator('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 flex justify-center items-center flex-col gap-2">
      <h1> Sign In With Google To Continue</h1>
      <button
        onClick={signInt}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In With Google
      </button>
    </div>
  );
};
