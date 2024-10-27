// import React from "react";

export const Login = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <form
        className="w-100"
        style={{ maxWidth: "400px" }}
        action="/"
        method="POST">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We&apos;ll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Sign in with Google Button */}
      {/* <div className="mt-3 w-100" style={{ maxWidth: "400px" }}>
        <div className="card">
          <div className="card-body text-center">
            <a
              className="btn btn-block btn-light w-100"
              href="/auth/google"
              role="button">
              <i className="fab fa-google"></i> Sign In with Google
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
