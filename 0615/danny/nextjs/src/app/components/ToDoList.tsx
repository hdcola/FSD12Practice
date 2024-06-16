"use client";
import { ToDo } from "../lib/types";
import { fetchToDos, setToDoCompleted } from "../lib/data";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function ToDoList() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const fetchedTodos = await fetchToDos(undefined);
      setTodos(fetchedTodos);
    };

    getTodos();
  }, [refresh]);

  const handleSetToDoCompleted = async (todo: ToDo, completed: boolean) => {
    await setToDoCompleted(todo, completed);
    setRefresh(!refresh);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => handleSetToDoCompleted(todo, e.target.checked)}
          />
          <span className={clsx("pl-1", { "line-through": todo.completed })}>
            {todo.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
