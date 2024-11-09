// src/components/Edit.js

const Edit = ({ tasks, onEditTask, onDeleteTask }) => {
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    const newText = prompt("Edit Task:", taskToEdit?.task_list); // Ensure you access the correct property
    if (newText && newText.trim()) {
      onEditTask(id, newText.trim());
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
            {tasks.map((task, index) => (
              <tr key={task.id}>
                {/* Use the unique id as the key */}
                <th scope="row">{index + 1}</th>
                <td>{task.task_list}</td>
                {/* Ensure you're accessing the correct property */}
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(task.id)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => onDeleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Edit;
