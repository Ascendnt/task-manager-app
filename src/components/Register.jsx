// import React from 'react'

const Register = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <form>
        {/* <!-- Email input --> */}
        <div className="form-floating mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            placeholder="Email address"
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-floating mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            placeholder="Password"
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
          Sign up
        </button>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>or sign up with:</p>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
