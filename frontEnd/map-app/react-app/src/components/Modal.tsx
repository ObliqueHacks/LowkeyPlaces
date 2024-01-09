import React from "react";

export const Modal = ({
  loginActive,
  modalActive,
  toggleModal,
  toggleLogin,
}: {
  loginActive: boolean;
  modalActive: boolean;
  toggleModal: () => void;
  toggleLogin: () => void;
}) => {
  return (
    <div className={modalActive ? "modal-box" : "modal-box inactive"}>
      <div
        className={loginActive ? "modal-container active" : "modal-container"}
      >
        <div className="signup-section">
          <button onClick={toggleModal} className="close-modal-btn">
            &times;
          </button>
          <h3 onClick={toggleLogin}>Signup</h3>
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
            <label htmlFor="emailUser" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailUser"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="usernameUserSignup" className="form-label"></label>
            <input
              type="username"
              className="form-control"
              id="usernameUserSignup"
              placeholder="Username"
              required
            />
            <label htmlFor="passwordUserSignup" className="form-label"></label>
            <input
              type="password"
              className="form-control"
              id="passwordUserSignup"
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
              required
            />

            <button type="submit" className="modal-btn">
              Signup
            </button>
          </form>
        </div>
        <div className="login-section">
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
        </div>
      </div>
    </div>
  );
};
export default Modal;
