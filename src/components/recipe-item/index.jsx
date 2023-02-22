import React from "react";
import "./styles.css";

export default function RecipeItem(props) {
  const { id, image, title, addToFavorites } = props;

  console.log(props, "recipeitemprop");
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe"></img>
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFavorites}>
        Add to favorites
      </button>
    </div>
  );
}
