import { useState } from "react";

const Edit = ({ tasks = [], onEditTask, onDeleteTask }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSave = (id) => {
    if (editText.trim()) {
      onEditTask(id, editText.trim());
      setEditId(null);
      setEditText(""); // Reset edit text after saving
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText(""); // Reset edit text after canceling
  };

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleSave(id);
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {editId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, task.id)}
                        className="form-control"
                        autoFocus // Automatically focus the input when editing
                      />
                    ) : (
                      <span className="task-text">{task.task_list}</span>
                    )}
                  </td>
                  <td>
                    {editId === task.id ? (
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleSave(task.id)}
                          disabled={!editText.trim()} // Disable if empty
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary ms-2"
                          onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleEditClick(task.id, task.task_list)
                          }>
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => onDeleteTask(task.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Edit;
