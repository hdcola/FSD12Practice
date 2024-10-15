import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { auth, db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormProps {
  name: string;
  datetime: string;
  maxStudents: number;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigator = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    datetime: yup
      .string()
      .required('Date and time is required')
      .matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        'Date and time must be in the format YYYY-MM-DDTHH:MM'
      ),
    maxStudents: yup
      .number()
      .required('Max Students is required')
      .positive('Max Students must be positive')
      .integer(),
  });

  const {
    register,
    handleSubmit,
    formState: error,
  } = useForm<CreateFormProps>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, 'schedules');

  const onCreateSchedule = async (data: CreateFormProps) => {
    await addDoc(postRef, {
      ...data,
      teacherID: user?.uid,
      enrolledStudents: [],
    });
    navigator('/');
  };

  const onSubmit = (data: CreateFormProps) => {
    onCreateSchedule(data);
  };

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Name</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter the title"
          {...register('name')}
        />
        {error.errors.name && (
          <span className="text-red-500 mt-1">{error.errors.name.message}</span>
        )}
      </label>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Date</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="datetime-local"
          {...register('datetime')}
        />
        {error.errors.datetime && (
          <span className="text-red-500 mt-1">
            {error.errors.datetime.message}
          </span>
        )}
      </label>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Max Students</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          {...register('maxStudents')}
        />
        {error.errors.maxStudents && (
          <span className="text-red-500 mt-1">
            {error.errors.maxStudents.message}
          </span>
        )}
      </label>
      <button
        className="bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
