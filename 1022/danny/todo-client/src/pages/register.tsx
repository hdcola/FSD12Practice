import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { registerFormData, userRegister } from '../api/user';
import { ApiError } from '../error/ApiError';

const registerSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(50),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required(),
});

export const Register = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<registerFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onLoign = async (data: registerFormData) => {
    try {
      const response = await userRegister(data);
      console.log(response);
      const { token } = response;
      login(token);
      navigate('/');
    } catch (error) {
      if (error instanceof ApiError) {
        // put error handling here
        error.errors.forEach((e) => {
          setError(
            e.field as
              | 'email'
              | 'password'
              | 'password2'
              | `root.${string}`
              | 'root',
            {
              type: 'manual',
              message: e.message,
            }
          );
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Register
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onLoign)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              {...register('email')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register('password2')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password2 && (
              <div className="text-red-500">{errors.password2.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
