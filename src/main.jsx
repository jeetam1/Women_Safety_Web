import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Imports the fixed Tailwind v4 configurations flawlessly

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);