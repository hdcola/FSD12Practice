import { todoAlova } from ".";

export interface Todo {
  id: number;
  ownerId: number;
  task: string;
  dueDate: Date;
  isDone: boolean;
}

export interface NewTodo {
  task: string;
  dueDate: Date;
}

export const formattingDate = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


export const createTodo = (todo: Todo) => {
  const headers = getHeaders();
  return todoAlova.Post("/todos", todo, headers);
};

export const updateTodo = async (todo: Todo) => {
  return todoAlova.Put(`/todos/${todo.id}`, todo, getHeaders());
};

export const deleteTodo = (id: number) => {
  return todoAlova.Delete("/todos/" + id, "", getHeaders());
}

export const getTodos = () => {
  const headers = getHeaders();
  return todoAlova.Get<Todo[]>("/todos", headers);
}

export const getTodo = async (id: number) => {
  return todoAlova.Get<Todo>(`/api/todos/${id}`);
}

const getHeaders = () => {
  const authStorage = localStorage.getItem("auth-storage");
  const authjson = authStorage ? JSON.parse(authStorage) : { token: null };
  const token = authjson.state.token;
  if (!token) {
    throw new Error("Not authenticated");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
}
