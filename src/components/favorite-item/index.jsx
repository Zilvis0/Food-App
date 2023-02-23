import React from "react";
import "./styles.css";

export default function FavoriteItem(props) {
  const { id, image, title, removeFromFavorites } = props;

  console.log(props, "recipeitemprop");
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="recipe"></img>
      </div>
      <p>{title}</p>
      <button type="button" onClick={removeFromFavorites}>
        Remove from favorites
      </button>
    </div>
  );
}
