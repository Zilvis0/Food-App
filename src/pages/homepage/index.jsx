import React, { useEffect, useState } from "react";
import FavoriteItem from "../../components/favorite-item";
import RecipeItem from "../../components/recipe-item";
import Search from "../../components/search";
import "./styles.css";

export default function Homepage() {
  //loading state

  const [loadingState, setLoadingState] = useState(false);

  //save results from API

  const [recipes, setRecipes] = useState([]);

  //favorites data sate

  const [favorites, setFavorites] = useState([]);

  const getDataFromSearchComponent = (getData) => {
    //keep loading state as true before we are calling the API
    setLoadingState(true);
    console.log(getData, "getData");
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
      }

      console.log(result);
    }
    getRecipes();
  };

  console.log(loadingState, recipes, "loadingState, recipes");

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    console.log(index);
    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      //save the favoriters in local storage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      alert("Item already in favorites!");
    }
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  return (
    <div className="Homepage">
      <Search getDataFromSearchComponent={getDataFromSearchComponent} />

      {/*show favorite items*/}

      <div className="favorites-wrapper">
        <h1 className="favorites-title">Favorites</h1>
        <div className="favorites">
          {favorites && favorites.length > 0
            ? favorites.map((item) => (
                <FavoriteItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
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
              />
            ))
          : null}
      </div>
      {/*map through recipes*/}
    </div>
  );
}
