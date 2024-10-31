// src/components/Edit.js

const Edit = ({ tasks, onEditTask, onDeleteTask }) => {
  const handleEdit = (id) => {
    const newText = prompt(
      "Edit Task:",
      tasks.find((task) => task.id === id)?.text
    );
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
            {tasks.map((task) => (
              <tr key={task.id}>
                <th scope="row">{task.id}</th>
                <td>{task.text}</td>
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
