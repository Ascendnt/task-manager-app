// Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTask, editTask, deleteTask } from "./function";
import Add from "./Add";
import Edit from "./Edit";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/home", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data); // Ensure data is an array
        } else if (response.status === 401) {
          console.error("Unauthorized access. Redirecting to login.");
          navigate("/");
        } else {
          console.error(`Error fetching tasks: ${response.status}`);
        }
      } catch (error) {
        console.error("Network error:", error);
        setTasks([]); // Default to an empty array
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (text) => {
    const newTask = await addTask(text);
    setTasks((prevTasks = []) => [...prevTasks, newTask]); // Default to empty array
  };

  const handleEditTask = async (id, newText) => {
    const updatedTask = await editTask(id, newText);
    setTasks((prevTasks = []) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prevTasks = []) => prevTasks.filter((task) => task.id !== id));
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

export default Home;
