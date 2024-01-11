import React from "react";

export const Login = ({ toggleLogin }: { toggleLogin: () => void }) => {
  return (
    <section className="login-section">
      <h3 onClick={toggleLogin}>Login</h3>
      <div className="social-buttons">
        <button>
          <i className="bx bxl-google"></i>Use Google
        </button>
      </div>

      <div className="separator">
        <div className="line"></div>
        <p>Or</p>
        <div className="line"></div>
      </div>
      <form>
        <label htmlFor="usernameUserLogin" className="form-label"></label>
        <input
          type="username"
          className="form-control"
          id="usernameUserLogin"
          placeholder="Username"
          required
        />
        <label htmlFor="passwordUserLogin" className="form-label"></label>
        <input
          type="password"
          className="form-control"
          id="passwordUserLogin"
          aria-describedby="passwordHelpBlock"
          placeholder="Password"
          required
        />
        <button type="submit" className="modal-btn">
          Login
        </button>
      </form>
    </section>
  );
};
export default Login;
