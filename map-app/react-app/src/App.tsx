import "./App.scss";
import MapDisplay from "./components/MapDisplay.tsx";
import HomePage from "./components/HomePage.tsx";
import React, { useState } from "react";

const loggedIn = false;
export const LoginContext = React.createContext(loggedIn);

function App() {
  return (
    <div className="app">
      <HomePage></HomePage>
      <LoginContext.Provider value={loggedIn}>
        <MapDisplay />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
