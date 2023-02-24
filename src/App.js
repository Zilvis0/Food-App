import React, { createContext, useState } from "react";
import Homepage from "./pages/homepage";
import "./App.css";
import ThemeButton from "./components/theme-button";

//create context
//provide context
//consume context

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <Homepage />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
