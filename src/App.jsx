import { useState, useEffect } from "react";
import "./App.scss";
import dayjs from "dayjs";

function App({ data }) {
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
          <div className="card-border">
            <div key={i} className="card">
              <div
                className="card-header"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <div className="text-block">
                  <p>
                    <a href={item.location}>{item.name}</a>
                  </p>
                  <p>{dayjs(item.date).format("MMMM D, YYYY")}</p>
                  <OverallStars item={item} />
                </div>
              </div>

              <StarRatings item={item} />
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
