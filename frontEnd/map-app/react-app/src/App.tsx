import "./App.scss";
import MapDisplay from "./components/MapDisplay.tsx";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./pages/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Contact from "./pages/Contact.tsx";
import LoginModal from "./pages/LoginModal.tsx";

const loggedIn = false;
export const LoginContext = React.createContext(loggedIn);

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path="contact" element={<Contact></Contact>}></Route>
        </Routes>
      </BrowserRouter>
      <LoginContext.Provider value={loggedIn}>
        <MapDisplay />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
