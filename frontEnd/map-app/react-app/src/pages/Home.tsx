import React from "react";
import MarkerImage from "../assets/hiking.jpg";
import Modal from "./LoginModal.tsx";
import Navbar from "./Navbar.tsx";

import { useState } from "react";
function HomePage() {
  const [modalActive, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modalActive);
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

      <section className="features">
        <h2>Features</h2>
        <div className="feature-info">
          <p className="info-one">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
          </p>
          <img src="" alt="" />
          <p></p>
        </div>
      </section>

      <Modal modalActive={modalActive} toggleModal={toggleModal}></Modal>
    </React.Fragment>
  );
}
export default HomePage;
