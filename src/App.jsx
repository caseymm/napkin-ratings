import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import data from "./data.json";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>Latest</h3>
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            {item.name}: {item.date}
            <ul>
              <li>Durability: {item.durability}</li>
              <li>Absorbency: {item.absorbency}</li>
              <li>Texture: {item.texture}</li>
              <li>Size: {item.size}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
