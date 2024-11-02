// Home.jsx
import { useState } from "react";
import { addTask, editTask, deleteTask } from "./utils/function";
import Add from "./Add";
import Edit from "./Edit";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const handleAddTask = (text) => {
    const newTask = addTask(text, taskIdCounter);
    setTasks([...tasks, newTask]);
    setTaskIdCounter((prev) => prev + 1);
  };

  const handleEditTask = (id, newText) => {
    setTasks(editTask(tasks, id, newText));
  };

  const handleDeleteTask = (id) => {
    setTasks(deleteTask(tasks, id));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">Task Manager</span>
          <form className="d-flex">
            <button className="btn btn-danger" type="submit">
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
