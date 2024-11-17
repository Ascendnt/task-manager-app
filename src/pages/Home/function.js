// // function.js
// export async function addTask(text) {
//     try {
//         const response = await fetch("http://localhost:3000/home", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: 'include',
//             body: JSON.stringify({ task_list: text }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error adding task:', error);
//         throw error;
//     }
// }

// export async function editTask(id, newText) {
//     try {
//         const response = await fetch(`http://localhost:3000/home/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: 'include',
//             body: JSON.stringify({ task_list: newText }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error editing task:', error);
//         throw error;
//     }
// }

// export async function deleteTask(id) {
//     try {
//         const response = await fetch(`http://localhost:3000/home/${id}`, {
//             method: "DELETE",
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return true;
//     } catch (error) {
//         console.error('Error deleting task:', error);
//         throw error;
//     }
// }

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