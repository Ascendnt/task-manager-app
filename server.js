import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 3000;

// connect to database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "task-manager",
    password: "admin",
    port: 5432,
});
db.connect();

// Enable CORS for all origins
app.use(cors());


// Middleware
app.use(bodyParser.json());

// Routes
app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        // Check if email already exists
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send("Email already exists. Try using a different email!");
        }

        // Proceed with registration if email is unique
        const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, password]
        );
        console.log(result);

        // Send success response to client
        return res.status(201).send("User registered successfully");
    } catch (err) {
        console.error(err);
        // Send error response to client
        return res.status(500).send("Error registering user");
    }
});

app.post("/", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedPassword = user.password;

            if (password === storedPassword) {
                return res.status(201).send("Logged in successfully!");
            } else {
                return res.status(400).send("Email or password is incorrect!");
            }
        } else {
            // If the email does not exist in the database
            return res.status(400).send("An error occurred. Please try again.");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error logging in");
    }
});



//   app.post("/register", async (req, res) => {});

// app.get("/", (req, res) => {
//     res.render(renderToString(<Login />));
// });

// app.get("/login", (req, res) => {
//     res.render("login.ejs");
// });

// app.get("/register", (req, res) => {
//     res.render("register.ejs");
// });



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
