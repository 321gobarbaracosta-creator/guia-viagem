import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initializeOfflineMode } from "./lib/offline-storage.js";

// Inicializar modo offline (service worker, etc.)
initializeOfflineMode().then((sw) => {
  if (sw) {
    console.log("[PWA] Service Worker initialized successfully");
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
