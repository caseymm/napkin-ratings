import { useState } from "react";
import "./App.scss";
import data from "./data.json";

function App() {
  const attributes = [
    "durability",
    "absorbency",
    "texture",
    "size",
    "effectiveness",
    "appearance",
  ];

  const OverallStars = ({ item }) => {
    let total = 0;
    attributes.forEach((attr) => {
      total += item[attr];
    });
    return (
      <div>
        ({(total / attributes.length).toFixed(2)})
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i < Math.round(total / attributes.length) ? "★" : "✩"}
          </span>
        ))}
      </div>
    );
  };

  const StarRatings = ({ item }) => {
    return (
      <div>
        {attributes.map((attr) => (
          <p key={attr} className="sublist">
            {attr.charAt(0).toUpperCase() + attr.slice(1)}:{" "}
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < item[attr] ? "★" : "✩"}</span>
            ))}
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
      <h3>Latest</h3>
      {/* ★☆ */}
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            <p>{item.name}</p>
            <p>{item.date}</p>
            <OverallStars item={item} />
            <StarRatings item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
