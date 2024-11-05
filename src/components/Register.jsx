// import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const registerData = { username: email, password: password };

    fetch("http://localhost:3000/register", {
      // Specify the backend's URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    })
      .then(async (res) => {
        const message = await res.text();
        if (res.ok) {
          navigate("/home"); // Redirect on success
        } else {
          setError(message); // Set error message if registration fails
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error registering user. Please try again.");
      });
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <span className="fw-bold fs-1 mb-4 d-block">REGISTER</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "400px" }}>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <button type="submit" className="btn btn-primary w-100">
              Sign up
            </button>
          </div>
          <div className="col-6">
            <Link to="/" className="btn btn-secondary w-100 text-center">
              Cancel
            </Link>
          </div>
        </div>
      </form>
      <div className="text-center">
        <p>or sign up with:</p>
        <button type="button" className="btn btn-link btn-floating">
          <i className="fab fa-google"></i>
        </button>
      </div>
    </div>
  );
};

export default Register;
