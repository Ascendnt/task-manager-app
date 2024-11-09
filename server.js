import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import flash from "connect-flash";

const app = express();
const port = 3000;
const saltRounds = 10;

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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



// Middleware
app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));

// Use the passport library after the express-session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {
            const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.email); // Save only necessary user info
});

passport.deserializeUser(async (email, done) => {
    try {
        const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (rows.length === 0) {
            return done(null, false); // No user found
        }
        done(null, rows[0]); // Pass the user object to req.user
    } catch (err) {
        done(err, null);
    }
});




// passport.serializeUser((user, done) => {
//     done(null, user.email);
// });

// passport.deserializeUser(async (email, done) => {
//     try {
//         const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [email]);
//         const user = rows[0];

//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });




// Routes
app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        // Check if email already exists
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send("Email already exists. Try using a different email!");
        } else {
            // Proceed with registration if email is unique
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    // Store hash in your password DB.
                    const result = await db.query(
                        "INSERT INTO users (email, password) VALUES ($1, $2)",
                        [email, hash]
                    );
                    console.log(result);

                    // Send success response to client
                    return res.status(201).send("User registered successfully");
                }

            });
        }

    } catch (err) {
        console.error(err);
        // Send error response to client
        return res.status(500).send("Error registering user");
    }
});

app.post("/", async (req, res) => {
    const email = req.body.username;
    const loginPassword = req.body.password;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storeHashedPassword = user.password;

            bcrypt.compare(loginPassword, storeHashedPassword, (err, result) => {
                if (err) {
                    console.log("Error!", err);

                } else {
                    if (result) {
                        return res.status(201).send("Logged in successfully!");
                    } else {
                        return res.status(400).send("Email or password is incorrect!");
                    }

                }
            });
        } else {
            // If the email does not exist in the database
            return res.status(400).send("An error occurred. Please try again.");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error logging in");
    }


});

// AUTHENTICATION
app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ tasks: [] }); // Example JSON response
    } else {
        res.status(401).json({ error: "Unauthorized" }); // Return JSON error
    }
});


// app.post('/',
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/',
//         failureFlash: true, // Optional
//     })
// );

// function ensureAuthenticated(req, res, next) {
//     console.log("Is Authenticated:", req.isAuthenticated());
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     console.log("Redirecting to /");
//     res.status(401).json({ redirect: '/' }); // Inform client to redirect
// }



// app.get('/home', ensureAuthenticated, async (req, res) => {
//     try {
//         const result = await db.query("SELECT * FROM tasks");
//         res.status(200).json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error retrieving tasks");
//     }
// });


// app.post('/',
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/',
//         failureFlash: true
//     })
// );

// app.get('/home', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.status(200).json({ tasks: [] }); // Example JSON response
//     } else {
//         res.status(401).json({ error: "Unauthorized" }); // Return JSON error
//     }
// });

// app.post('/',
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/',
//         failureFlash: true
//     })
// );
// app.get('/home', (req, res) => {
//     if (req.authenticate()) {
//         res.status(200).json({ tasks: [] }); // Example JSON response
//     } else {
//         res.status(401).json({ error: "Unauthorized" }); // Return JSON error
//     }
// });
// app.get('/', (req, res) => {
//     res.send('Login page');
// });
// app.get("/home", (req, res) => {
//     if (req.authenticate()) {
//         res.status(200).json({ tasks: [] }); // Example JSON response
//     } else {
//         res.status(401).json({ error: "Unauthorized" }); // Return JSON error
//     }
// });
// passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/"
// })



// CREATE
app.post("/home", async (req, res) => {
    const { task_list } = req.body;

    try {
        const result = await db.query("INSERT INTO tasks (task_list) VALUES ($1) RETURNING *", [task_list]);
        res.status(201).json(result.rows[0]);  // Return the newly created task
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating task");
    }
});

// READ
app.get("/home", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        res.status(200).json(result.rows);  // Return all tasks
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving tasks");
    }
});

// UPDATE
app.put("/home/:id", async (req, res) => {
    const { id } = req.params;  // Get task id from URL
    const { task_list } = req.body;

    try {
        const result = await db.query("UPDATE tasks SET task_list = $1 WHERE id = $2 RETURNING *", [task_list, id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);  // Return the updated task
        } else {
            res.status(404).send("Task not found");  // Task not found
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating task");
    }
});

// DELETE

app.delete("/home/:id", async (req, res) => {
    const { id } = req.params;  // Get task id from URL

    try {
        const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
        if (result.rowCount > 0) {
            res.status(200).send("Task deleted successfully");
        } else {
            res.status(404).send("Task not found");  // Task not found
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
