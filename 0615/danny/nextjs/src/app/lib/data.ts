import { ToDo } from './types';

export async function fetchToDos(completed: boolean | undefined): Promise<ToDo[]> {
    let path = '/todos';
    if (completed !== undefined) {
        path += `?completed=${completed}`;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    const data: ToDo[] = await response.json();
    return data;
}

export async function updateToDo(todo: ToDo): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
}


export async function setToDoCompleted(todo: ToDo, completed: boolean): Promise<void> {
    const updatedTodo = { ...todo, completed };
    await updateToDo(updatedTodo);
}