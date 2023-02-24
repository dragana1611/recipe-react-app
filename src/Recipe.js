import React from "react";
import style from "./recipe.module.css";


const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ol className={style.ol}>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p className={style.cal}>{`${Math.round(calories)}cal`}</p>
      <img className={style.image} src={image} alt={title} />
    </div>
  );
};

export default Recipe;
