import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { MapProvider } from "./context/MapProvider.tsx";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

// Import all of Bootstrap's JS
// import * as bootstrap from "bootstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MapProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MapProvider>
    </AuthProvider>
  </React.StrictMode>
);
