import "./App.scss";
import MapDisplay from "./components/MapDisplay.tsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./pages/homepage/Navbar.tsx";
import Home from "./pages/homepage/page.tsx";
import Dashboard from "./pages/dashboard/page.tsx";
import Friends from "./pages/friends/page.tsx";

import React, { useState } from "react";

const showMap = false;
export const MapContext = React.createContext(showMap);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" index element={<Home></Home>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/friends" element={<Friends></Friends>}></Route>
      </Routes>
      <MapContext.Provider value={showMap}>
        <MapDisplay />
      </MapContext.Provider>
    </div>
  );
}

export default App;
