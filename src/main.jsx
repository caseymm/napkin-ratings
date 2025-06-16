import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "maplibre-gl/dist/maplibre-gl.css";
import "./index.scss";

import App from "./App.jsx";
import Map from "./map.jsx";
import AdminPanel from "./Admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-list">
              <h1>Napkin Ratings</h1>
              <App />
            </div>
          }
        />
        <Route path="/map" element={<Map />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
