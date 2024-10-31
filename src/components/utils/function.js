// src/utils/taskFunctions.js

// Add a new task
export const addTask = (text, idCounter) => ({ id: idCounter, text });

// Edit an existing task
export const editTask = (tasks, id, newText) =>
    tasks.map(task => (task.id === id ? { ...task, text: newText } : task));

// Delete a task
export const deleteTask = (tasks, id) =>
    tasks.filter(task => task.id !== id);
