import React from "react";
import Menu from "../assets/Menu.png";
import Logo from "../assets/NinjaHead.png";
import Hiking from "../assets/hiking.jpg";
import { useState } from "react";
function HomePage() {
  const [modalActive, setModal] = useState(false);
  const [loginActive, setLogin] = useState(false);

  console.log(modalActive);
  console.log(loginActive);

  const toggleModal = () => {
    setModal(!modalActive);
    console.log(modalActive);
  };

  const toggleLogin = () => {
    setLogin(!loginActive);
    console.log(loginActive);
  };

  return (
    <React.Fragment>
      <div className="header">
        <nav className="navbar fixed-top navbar-expand-lg">
          <div className="container">
            <img className="navbar-logo" src={Logo} alt="" />
            <a className="navbar-brand" href="#">
              Lowkey Spots
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarOpen"
            >
              <img className="navbar-toggle-image" src={Menu} alt="" />
            </button>

            <div className="collapse navbar-collapse" id="navbarOpen">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-button"
                    href="#"
                    onClick={toggleModal}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="header_title">
          <h1>
            Discover
            <span className="highlight"> hidden </span>
            routes <br />
            Map your
            <span className="highlight"> secrets </span>
          </h1>
          <h5>A social platform for adventures</h5>
          <button className="btn-text btn-scroll-to">Learn more &darr;</button>
          <img src={Hiking} className="header-img" alt="" />
        </div>
      </div>

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
              <label htmlFor="usernameUser" className="form-label"></label>
              <input
                type="username"
                className="form-control"
                id="usernameUser"
                placeholder="Username"
                required
              />
              <label htmlFor="passwordUser" className="form-label"></label>
              <input
                type="password"
                className="form-control"
                id="passwordUser"
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
              <label htmlFor="usernameUser" className="form-label"></label>
              <input
                type="username"
                className="form-control"
                id="usernameUser"
                placeholder="Username"
                required
              />
              <label htmlFor="passwordUser" className="form-label"></label>
              <input
                type="password"
                className="form-control"
                id="passwordUser"
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

      <div
        onClick={toggleModal}
        className={modalActive ? "overlay" : "overlay hidden"}
      ></div>
    </React.Fragment>
  );
}
export default HomePage;
