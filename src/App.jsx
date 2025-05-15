import { useState } from "react";
import "./App.scss";
import dayjs from "dayjs";
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
      <p>
        ({(total / attributes.length).toFixed(2)})
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i < Math.round(total / attributes.length) ? "★" : "☆"}
          </span>
        ))}
      </p>
    );
  };

  const StarRatings = ({ item }) => {
    return (
      <div>
        {attributes.map((attr) => (
          <div key={attr} className="sublist">
            <div>{attr.charAt(0).toUpperCase() + attr.slice(1)}: </div>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < item[attr] ? "★" : "☆"}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <>
      <h3>Latest</h3>
      {/* ☆✩⭑⭒⭐︎ */}
      <div className="list">
        {data.map((item, i) => (
          <div key={i} className="card">
            <p>
              <a href={item.location}>{item.name}</a>
            </p>
            <p>{dayjs(item.date).format("MMMM D, YYYY")}</p>
            <OverallStars item={item} />
            <hr></hr>
            <StarRatings item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
