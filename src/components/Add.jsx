// src/components/Add.js
import { useState } from "react";

const Add = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
