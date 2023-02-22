import React, { useState } from "react";
import "./styles.css";

export default function Search(props) {
  const { getDataFromSearchComponent } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="seach"
        placeholder="Search Recipes"
        id="search"
        value={inputValue}
        onChange={handleInputValue}
      />
      <button type="submit">Search</button>
    </form>
  );
}
