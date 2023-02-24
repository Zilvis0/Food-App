import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import "./styles.css";

export default function Search(props) {
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } =
    props;
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess, setApiCalledSuccess]);

  const { theme } = useContext(ThemeContext);

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="seach"
        placeholder="Search Recipes"
        id="search"
        value={inputValue}
        onChange={handleInputValue}
      />
      <button style={theme ? { backgroundColor: "#12343b" } : {}} type="submit">
        Search
      </button>
    </form>
  );
}
