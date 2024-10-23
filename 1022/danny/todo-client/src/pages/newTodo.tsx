import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import type { NewTodo } from '../api/todo';
import { createTodo } from '../api/todo';

const todoSchema = yup.object().shape({
  task: yup.string().required().min(1).max(100),
  dueDate: yup.date().required(),
});

export const NewTodoForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTodo>({
    resolver: yupResolver(todoSchema),
  });

  const onSubmit = async (data: NewTodo) => {
    try {
      await createTodo(data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-700"
          >
            Task
          </label>
          <input
            type="text"
            id="task"
            {...register('task')}
            className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              errors.task ? 'border-red-500' : ''
            }`}
          />
          {errors.task && (
            <div className="text-red-500">{errors.task.message}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            {...register('dueDate')}
            className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              errors.dueDate ? 'border-red-500' : ''
            }`}
          />
          {errors.dueDate && (
            <div className="text-red-500">{errors.dueDate.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
