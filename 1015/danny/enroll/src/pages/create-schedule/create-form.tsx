import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { auth, db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormProps {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  maxStudents: number;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigator = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    date: yup.date().required('Date is required'),
    startTime: yup
      .string()
      .required('Start Time is required')
      .matches(/^\d{2}:\d{2}$/, 'Start Time must be in HH:MM format'),
    endTime: yup
      .string()
      .required('End Time is required')
      .matches(/^\d{2}:\d{2}$/, 'End Time must be in HH:MM format'),
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

  const schedulesRef = collection(db, 'schedules');

  const onCreateSchedule = async (data: CreateFormProps) => {
    await addDoc(schedulesRef, {
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
      <h1 className="text-2xl font-semibold text-center">Create Schedule</h1>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Title</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter the title"
          {...register('title')}
        />
        {error.errors.title && (
          <span className="text-red-500 mt-1">
            {error.errors.title.message}
          </span>
        )}
      </label>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Date</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          {...register('date')}
        />
        {error.errors.date && (
          <span className="text-red-500 mt-1">{error.errors.date.message}</span>
        )}
      </label>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">Start Time</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="time"
          placeholder="HH:MM"
          {...register('startTime')}
        />
        {error.errors.startTime && (
          <span className="text-red-500 mt-1">
            {error.errors.startTime.message}
          </span>
        )}
      </label>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">End Time</span>
        <input
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="time"
          placeholder="HH:MM"
          {...register('endTime')}
        />
        {error.errors.endTime && (
          <span className="text-red-500 mt-1">
            {error.errors.endTime.message}
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
