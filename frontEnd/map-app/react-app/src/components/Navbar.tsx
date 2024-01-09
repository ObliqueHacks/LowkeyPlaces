import React from "react";
import Menu from "../assets/Menu.png";
import Logo from "../assets/NinjaHead.png";

export const Navbar = ({ toggleModal }: { toggleModal: () => void }) => {
  return (
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
  );
};
export default Navbar;
