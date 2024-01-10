import React from "react";
import MarkerImage from "../assets/hiking.jpg";
import Modal from "./LoginModal.tsx";
import Navbar from "./Navbar.tsx";

import { useState } from "react";
function HomePage() {
  const [modalActive, setModal] = useState(false);

  console.log(modalActive);

  const toggleModal = () => {
    setModal(!modalActive);
    console.log(modalActive);
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

      <Modal modalActive={modalActive} toggleModal={toggleModal}></Modal>
    </React.Fragment>
  );
}
export default HomePage;
