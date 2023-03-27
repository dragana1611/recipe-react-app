import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import MyImg from "./not_found.jpg";
import "./App.css";

function App() {
  const APP_ID = "5a6ff845";
  const APP_KEY = "58c276c6cb733693b3f131349bc05d57";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("chicken");

  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value.trim());
  };

  const getSearch = (e) => {
    e.preventDefault();
    try {
      setQuery(search);
      setSearch("");
    } catch (error) {
      setError(true);
    }
  };

  let content;

  content = (
    <div className="recipes">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );

  if (recipes.length === 0) {
    content = (
      <div className="not-found">
        <p>please try again 😞</p>
        <img src={MyImg} alt="not faound" />
      </div>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className="App">
      <h2>let's cook</h2>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className={`${error ? "error" : "search-bar"}`}
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="chicken"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {content}
    </div>
  );
}

export default App;
