import db from "../db/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

// const registerHandler = async (req, res) => {

// }
const registerHandler = async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    const register = await db.connect();


    try {
        // Check if email already exists
        const checkResult = await register.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).send("Email already exists. Try using a different email!");
        } else {
            // Proceed with registration if email is unique
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    // Store hash in your password DB.
                    const result = await register.query(
                        "INSERT INTO users (email, password) VALUES ($1, $2)",
                        [email, hash]
                    );
                    return res.status(201).send(result);
                    // console.log(result);
                    // // Send success response to client
                    // return res.status(201).send("User registered successfully");
                }
            });
        }
    } catch (err) {
        console.error(err);
        // Send error response to client
        return res.status(500).send("Error registering user");
    }
};

// Export the register handler function
export default registerHandler;

// app.post("/register", async (req, res) => {

// });

// export default registerHandler;