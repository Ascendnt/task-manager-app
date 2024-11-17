import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const loginData = { username: email, password: password };

    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/home");
      } else {
        navigate("/");
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <span className="fw-bold fs-1 mb-4 d-block">LOGIN</span>
      </div>
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
        {error && <p style={{ color: "red" }}>{error}</p>}

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

        {/* <p>or sign up with:</p>

        <button type="button" className="btn btn-link btn-floating">
          <i className="fab fa-google"></i>
        </button> */}
      </div>
    </div>
  );
};

export default Login;
