import db from "../db/db.js";

db.connect();


// CREATE
export const createTask = async (req, res) => {


    try {
        const { task_list } = req.body;
        const result = await db.query(
            "INSERT INTO tasks (task_list) VALUES ($1) RETURNING *",
            [task_list]
        );
        res.status(201).json(result.rows[0]); // Return the newly created task
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating task");
    }
};

// READ
export const readTasks = async (req, res) => {

    try {
        const result = await db.query("SELECT * FROM tasks LIMIT 20");
        res.status(200).json(result.rows); // Return all tasks
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving tasks");
    }
};

// UPDATE
export const updateTask = async (req, res) => {

    try {
        const { id } = req.params; // Get task id from URL
        const { task_list } = req.body;
        const result = await db.query(
            "UPDATE tasks SET task_list = $1 WHERE id = $2 RETURNING *",
            [task_list, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Return the updated task
        } else {
            res.status(404).send("Task not found"); // Task not found
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating task");
    }
};

// DELETE
export const deleteTask = async (req, res) => {

    try {
        const { id } = req.params; // Get task id
        const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]); // Delete task
        if (result.rowCount > 0) {
            res.status(200).send("Task deleted successfully");
        } else {
            res.status(404).send("Task not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
};
