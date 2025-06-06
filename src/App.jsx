import { useState, useEffect } from "react";
import "./App.scss";
import dayjs from "dayjs";
import data from "./data.json";
import { client } from "./lib/sanity";

function App() {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "rating"]{
            name,
            location,
            description,
            durability,
            absorbency,
            texture,
            size,
            effectiveness,
            appearance,
            notes,
            date,
            "imageUrl": image.asset->url
          }`
      )
      .then((data) => setRatings(data));
  }, []);

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
      {ratings.map((rating, index) => (
        <div key={index}>
          <h2>{rating.name}</h2>
          <p>{rating.description}</p>
          <img src={rating.imageUrl} alt={rating.name} width={200} />
          <ul>
            <li>Durability: {rating.durability}</li>
            <li>Absorbency: {rating.absorbency}</li>
            <li>Texture: {rating.texture}</li>
            <li>Size: {rating.size}</li>
            <li>Effectiveness: {rating.effectiveness}</li>
            <li>Appearance: {rating.appearance}</li>
          </ul>
          <p>
            <strong>Notes:</strong> {rating.notes}
          </p>
          <p>
            <strong>Date:</strong> {rating.date}
          </p>
          <a href={rating.location} target="_blank" rel="noopener noreferrer">
            View Location
          </a>
        </div>
      ))}
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
