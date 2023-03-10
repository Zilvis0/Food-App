import React, { useContext, useEffect, useReducer, useState } from "react";
import { ThemeContext } from "../../App";
import FavoriteItem from "../../components/favorite-item";
import RecipeItem from "../../components/recipe-item";
import Search from "../../components/search";
import "./styles.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

export default function Homepage() {
  //loading state

  const [loadingState, setLoadingState] = useState(false);

  //save results from API

  const [recipes, setRecipes] = useState([]);

  //favorites data sate

  const [favorites, setFavorites] = useState([]);

  //state for api successfull or not

  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  //useReducer functionality

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const { theme } = useContext(ThemeContext);

  const getDataFromSearchComponent = (getData) => {
    //keep loading state as true before we are calling the API
    setLoadingState(true);
    //calling API
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=452ec9fc3f584dacad534f2a661b2157&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
    }
    getRecipes();
  };

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );

    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      //save the favoriters in local storage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
      window.scrollTo({ top: "0", behavior: "smooth" });
    } else {
      alert("Item already in favorites!");
    }
  };

  const removeFromFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad || []);
  }, []);

  // filter favorites

  const filteredFavoriteItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  return (
    <div className="Homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />

      {/*show favorite items*/}

      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>

        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
            name="searchfavorites"
            placeholder="Search favorites"
            value={filteredState.filteredValue}
          />
        </div>
        <div className="favorites">
          {!filteredFavoriteItems.length && (
            <div className="no-items">No Favorites are found</div>
          )}
          {filteredFavoriteItems && filteredFavoriteItems.length > 0
            ? filteredFavoriteItems.map((item) => (
                <FavoriteItem
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  key={item.id}
                />
              ))
            : null}
        </div>
      </div>

      {/*show favorite items*/}

      {/*show loading state*/}
      {loadingState && (
        <div className="loading">Loading recipes! Please wait...</div>
      )}
      {/*show loading state*/}

      {/*map through recipes*/}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                title={item.title}
                image={item.image}
                key={item.id}
              />
            ))
          : null}
      </div>
      {/*map through recipes*/}

      {!loadingState && !recipes.length && (
        <div className="no-items">No Recipes are found</div>
      )}
    </div>
  );
}
