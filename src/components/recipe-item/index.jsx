import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./styles.css";

export default function RecipeItem(props) {
  const { id, image, title, addToFavorites } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe"></img>
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        onClick={addToFavorites}
      >
        Add to favorites
      </button>
    </div>
  );
}
