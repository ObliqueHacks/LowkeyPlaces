import "./App.scss";
import MapDisplay from "./components/MapDisplay.tsx";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./pages/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Contact from "./pages/Contact.tsx";
import LoginModal from "./pages/LoginModal.tsx";

const showMap = false;
export const MapContext = React.createContext(showMap);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home></Home>}></Route>
      </Routes>
      <MapContext.Provider value={showMap}>
        <MapDisplay />
      </MapContext.Provider>
    </div>
  );
}

export default App;
