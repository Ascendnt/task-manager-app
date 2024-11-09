// Tasks.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTask, editTask, deleteTask } from "./utils/function";
import Add from "./Add";
import Edit from "./Edit";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/home", {
          credentials: "include",
        });

        if (response.status === 401) {
          // Redirect to "/" if unauthorized
          navigate("/");
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (text) => {
    const newTask = await addTask(text); // Add the task
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update state with the new task
  };

  const handleEditTask = async (id, newText) => {
    const updatedTask = await editTask(id, newText); // Edit the task
    setTasks(
      (prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ) // Update state with the edited task
    );
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id); // Delete the task
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update state by removing the deleted task
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">Task Manager</span>
          <form className="d-flex">
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleLogout}>
              Log Out
            </button>
          </form>
        </div>
      </nav>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container" style={{ maxWidth: "600px" }}>
          <h1 className="text-center mb-4">Task Manager</h1>
          <Add onAddTask={handleAddTask} />
          <Edit
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
