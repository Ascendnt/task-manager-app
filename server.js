import express from "express";
import bodyParser from "body-parser";
import cors from "cors";




const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());


// Middleware
app.use(bodyParser.json());

//sample users

const users = [
    { username: "rawr@email.com", password: "1234" }
];

// Routes

app.post("/home", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ message: "Login successful!", status: "success" });
    } else {
        res.status(401).json({ message: "Invalid username or password", status: "fail" });
    }
});


// app.post("/register", async (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(user => user.username === username && user.password === password);

//     if (user) {
//         res.json({ message: "Login successful!", status: "success" });
//     } else {
//         res.status(401).json({ message: "Invalid username or password", status: "fail" });
//     }
// });

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
