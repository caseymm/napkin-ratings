import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "maplibre-gl/dist/maplibre-gl.css";
import "./index.scss";
import App from "./App.jsx";
import Map from "./map.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1>Napkin Ratings</h1>
    <App />
    {/* <Map /> */}
  </StrictMode>
);
