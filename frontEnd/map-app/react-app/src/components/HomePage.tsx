import React from "react";
import MarkerImage from "../assets/hiking.jpg";
import Modal from "./Modal.tsx";
import Navbar from "./Navbar.tsx";

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
        <Navbar toggleModal={toggleModal}></Navbar>
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
          <img src={MarkerImage} className="header-img" alt="" />
        </div>
      </div>

      <Modal
        loginActive={loginActive}
        modalActive={modalActive}
        toggleLogin={toggleLogin}
        toggleModal={toggleModal}
      ></Modal>

      
      <div
        onClick={toggleModal}
        className={modalActive ? "overlay" : "overlay hidden"}
      ></div>
    </React.Fragment>
  );
}
export default HomePage;
