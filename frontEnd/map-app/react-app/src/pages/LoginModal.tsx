import React from "react";
import { useState } from "react";
import Register from "../components/Register.tsx";

export const Modal = ({
  modalActive,
  toggleModal,
}: {
  modalActive: boolean;
  toggleModal: () => void;
}) => {
  const [loginActive, setLogin] = useState(false);

  const toggleLogin = () => {
    setLogin(!loginActive);
    console.log(loginActive);
  };

  return (
    <React.Fragment>
      <div className={modalActive ? "modal-box" : "modal-box inactive"}>
        <div
          className={loginActive ? "modal-container active" : "modal-container"}
        >
          <Register
            toggleModal={toggleModal}
            toggleLogin={toggleLogin}
          ></Register>
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
        </div>
      </div>
      <div
        onClick={toggleModal}
        className={modalActive ? "overlay" : "overlay hidden"}
      ></div>
    </React.Fragment>
  );
};
export default Modal;
