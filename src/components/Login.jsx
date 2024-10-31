import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const loginData = { username: email, password: password };

    fetch("http://localhost:3000/home", {
      // Specify the backend's URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.text())
      .then((data) => {
        navigate("/home");
        console.log(data); // Display response from backend
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "400px" }}
        action="/"
        method="POST">
        {/* <!-- Email input --> */}
        <div className="form-floating mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="inputEmail">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
          Sign in
        </button>
      </form>

      {/* <!-- Register buttons --> */}
      <div className="text-center">
        <p>
          Don&apos;t have account yet? <Link to="/register">Register</Link>
        </p>

        <p>or sign up with:</p>

        <button type="button" className="btn btn-link btn-floating">
          <i className="fab fa-google"></i>
        </button>
      </div>
    </div>
  );
};

export default Login;
