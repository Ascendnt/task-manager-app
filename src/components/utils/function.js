export async function addTask(text) {
    const response = await fetch("http://localhost:3000/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_list: text }),
    });
    return await response.json();
}

export async function editTask(id, newText) {
    const response = await fetch(`http://localhost:3000/home/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_list: newText }),
    });
    return await response.json();
}

export async function deleteTask(id) {
    await fetch(`http://localhost:3000/home/${id}`, {
        method: "DELETE",
    });
}
