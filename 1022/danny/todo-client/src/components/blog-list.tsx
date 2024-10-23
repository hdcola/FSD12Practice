import { useRequest } from 'alova/client';
import { formattingDate, getTodos, deleteTodo } from '../api/todo';

export const BlogList = () => {
  const { data, loading, error } = useRequest(getTodos());

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Task</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Is Done</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo, index) => (
              <tr
                key={todo.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="border px-4 py-2">{todo.id}</td>
                <td className="border px-4 py-2">{todo.task}</td>
                <td className="border px-4 py-2">
                  {formattingDate(new Date(todo.dueDate))}
                </td>
                <td className="border px-4 py-2">
                  {todo.isDone ? 'Yes' : 'No'}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <a
                    href={`/todos/${todo.id}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="text-red-500 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(todo.id);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
