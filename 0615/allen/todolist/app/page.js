"use client";

import { nunito } from "./ui/fonts";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editErrorMsg, setEditErrorMsg] = useState("");
  const editInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
      ) {
        if (editId !== null) {
          editTask(editId);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editId, editText]);

  const clearErrorMessages = () => {
    setErrorMsg("");
    setEditErrorMsg("");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://100.89.152.5:8080/api/todos?completed="
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    clearErrorMessages();
    if (newTask.trim()) {
      try {
        const response = await fetch("http://100.89.152.5:8080/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newTask, completed: false }),
        });

        if (response.ok) {
          const newTaskFromAPI = await response.json();
          setTasks([...tasks, newTaskFromAPI]);
          setNewTask("");
          setErrorMsg("");
        } else {
          const errorData = await response.json();
          setErrorMsg(errorData.msg);
        }
      } catch (error) {
        console.error("Error adding task:", error);
        setErrorMsg("An unexpected error occurred");
      }
    } else {
      setErrorMsg("Opps! you forgot to add the content!");
    }
  };

  const toggleTask = async (id) => {
    clearErrorMessages();
    const taskToToggle = tasks.find((task) => task.id === id);
    if (taskToToggle) {
      try {
        const response = await fetch(
          `http://100.89.152.5:8080/api/todos/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...taskToToggle,
              completed: !taskToToggle.completed,
            }),
          }
        );
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      } catch (error) {
        console.error("Error toggling task:", error);
      }
    }
  };

  const removeTask = async (id) => {
    clearErrorMessages();
    try {
      const response = await fetch(`http://100.89.152.5:8080/api/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        setErrorMsg("Something went wrong! please try again!");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (id) => {
    clearErrorMessages();
    if (editId === id) {
      if (!editText.trim()) {
        setEditErrorMsg("Content cannot be empty");
        return;
      }

      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        try {
          const response = await fetch(
            `http://100.89.152.5:8080/api/todos/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...taskToEdit, name: editText }),
            }
          );
          if (response.ok) {
            const updatedTask = await response.json();
            setTasks(
              tasks.map((task) => (task.id === id ? updatedTask : task))
            );
            setEditId(null); // Exit edit mode
            setEditErrorMsg(""); // Clear error message
          } else {
            const errorData = await response.json();
            setEditErrorMsg(errorData.msg);
          }
        } catch (error) {
          console.error("Error editing task:", error);
          setEditErrorMsg("An unexpected error occurred");
        }
      }
    } else {
      setEditId(id);
      setEditText(tasks.find((task) => task.id === id).name);
      setEditErrorMsg(""); // Clear error message when entering edit mode
    }
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      editTask(id);
    }
  };

  return (
    <div className={`${nunito.className}`}>
      <h1 className="flex items-center justify-center h-32 text-xl text-gray-1000 font-black md:text-3xl md:leading-normal cursor-default">
        To-do List
      </h1>

      <div className="mx-auto px-4 h-16 sm:flex-col md:flex ">
        <div>
          <input
            type="text"
            className="flex-1 p-2 w-64 border border-gray-300 rounded mr-2"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
          />
        </div>
        <div>
          <button
            onClick={addTask}
            className="rounded-md w-64 h-10 bg-sky-500 hover:bg-sky-700 text-slate-100 font-black"
          >
            Add New list
          </button>
        </div>
      </div>
      {errorMsg && (
        <div className="mt-2 text-red-500 text-sm max-w-md">{errorMsg}</div>
      )}

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <ul className="p-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center mb-2 border-b pb-2"
            >
              <div className="flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="mr-2"
                  onChange={() => toggleTask(task.id)}
                />
                {editId === task.id ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, task.id)}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  <span className={task.completed ? "line-through" : ""}>
                    No.{task.id}--{task.name}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 g-5">
                <button onClick={() => editTask(task.id)}>
                  <img src="/editing.png" alt="Edit" className="w-5 h-5" />
                </button>
                <button onClick={() => removeTask(task.id)}>
                  <img src="/trash.png" alt="Delete" className="w-6 h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editErrorMsg && (
          <div className="mt-2 text-red-500 text-sm max-w-md mx-auto">
            {editErrorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
