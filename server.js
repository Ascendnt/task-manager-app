import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";



const app = express();
const port = 3000;
const saltRounds = 10;

// connect to database
const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "task-manager",
    password: "admin",
    port: 5432,
});
db.connect();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS for all origins
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    })
);


// Use the passport library after the express-session
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send("Email already exists. Try using a different email!");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    // Store hash in your password DB.
                    const result = await db.query(
                        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                        [email, hash]
                    );
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        console.log(err)
                        res.status(201).send("User registered successfully");

                    })
                }

            });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error registering user");
    }
});


app.post("/", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
}));

app.get("/", (req, res) => {
    res.status(401).json({ message: "Email or password is incorrect!" });
});


// app.get("/home", (req, res) => {
//     if (req.isAuthenticated()) {
//         return res.status(201).json({ message: "Logged in successfully!" });
//     } else {
//         return res.status(401).json({ message: "Email or password is incorrect!" });
//     }
// });


passport.use(
    new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        async (username, password, cb) => {
            try {
                const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    const storeHashedPassword = user.password;


                    bcrypt.compare(password, storeHashedPassword, (err, result) => {
                        if (err) {
                            return cb(err)


                        } else {
                            if (result) {
                                return cb(null, user)
                            } else {
                                return cb(null, false)
                            }

                        }
                    });
                } else {
                    // If the email does not exist in the database
                    return cb("User not found")
                }
            } catch (err) {
                return cb(err);
            }
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});


// CREATE
app.post("/home", async (req, res) => {
    const { task_list } = req.body;

    try {
        const result = await db.query("INSERT INTO tasks (task_list) VALUES ($1) RETURNING *", [task_list]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating task");
    }
});

// READ
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send("Not authorized");  //
}
app.get("/home", isAuthenticated, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        console.log(result.rows); // Check what is returned here
        res.status(200).json(result.rows); // Always return an array
    } catch (err) {
        console.error(err);
        res.status(500).json("Error retrieving tasks");
    }
});



// UPDATE
app.put("/home/:id", async (req, res) => {
    const { id } = req.params;
    const { task_list } = req.body;

    try {
        const result = await db.query("UPDATE tasks SET task_list = $1 WHERE id = $2 RETURNING *", [task_list, id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send("Task not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating task");
    }
});

// DELETE
app.delete("/home/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
        if (result.rowCount > 0) {
            res.status(200).json("Task deleted successfully");
        } else {
            res.status(404).send("Task not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



