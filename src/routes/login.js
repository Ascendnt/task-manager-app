import db from "../db/db.js";
import bcrypt from "bcrypt";


const loginHandler = async (req, res) => {
    const email = req.body.username;
    const loginPassword = req.body.password;
    const login = await db.connect();

    try {
        const result = await login.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storeHashedPassword = user.password;

            bcrypt.compare(loginPassword, storeHashedPassword, (err, result) => {
                if (err) {
                    console.log("Error!", err);
                    return res.status(500).send("Error comparing password");
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
            return res.status(400).send("Email or password is incorrect!");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error logging in");
    }
};

// Export the login handler function
export default loginHandler;
