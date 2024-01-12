import React from "react";
import { useState } from "react";
import Register from "../components/Register.tsx";
import Login from "../components/Login.tsx";

export const Modal = ({
  modalActive,
  toggleModal,
}: {
  modalActive: boolean;
  toggleModal: () => void;
}) => {
  const [loginActive, setLogin] = useState(true);

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
          <Login toggleLogin={toggleLogin}></Login>
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
