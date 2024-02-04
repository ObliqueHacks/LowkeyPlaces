import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/homepage/Navbar.tsx";
import Home from "./pages/homepage/page.tsx";
import Dashboard from "./pages/dashboard/page.tsx";
import Friends from "./pages/friends/page.tsx";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" index element={<Home></Home>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/friends" element={<Friends></Friends>} />
      </Routes>
    </div>
  );
}

export default App;
