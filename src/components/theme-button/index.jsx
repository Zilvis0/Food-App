import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./styles.css";

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={theme ? { backgroundColor: "#12343b" } : {}}
      onClick={() => setTheme(!theme)}
      className="themeButton"
    >
      ThemeButton
    </button>
  );
}
