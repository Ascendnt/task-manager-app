import pg from "pg";

const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "task-manager",
    password: "admin",
    port: 5432,
});


export default db;



