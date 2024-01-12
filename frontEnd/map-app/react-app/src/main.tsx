import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { AuthProvider } from "./context/AuthProvider.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import all of Bootstrap's JS
// import * as bootstrap from "bootstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
