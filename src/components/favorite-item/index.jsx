import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./styles.css";

export default function FavoriteItem(props) {
  const { id, image, title, removeFromFavorites } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="recipe"></img>
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        onClick={removeFromFavorites}
      >
        Remove from favorites
      </button>
    </div>
  );
}
