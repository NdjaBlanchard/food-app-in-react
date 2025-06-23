import { useState } from "react";
import { useEffect } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoding, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "df550c7a333c44efb2c291a65520cab6";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetail}>
          <span>
            <strong>⌚{food.readyInutes} Minutes</strong>
          </span>
          <span>
            👥<strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegeterian" : "🍖 Non-vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐶 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          <span>
            ${" "}
            <strong>
              {Math.round(food.pricePerServing) / 100} Per serving
            </strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} isLoding={isLoding} />
        <h2>Instructions</h2>
        <div className={styles.recipeInstruction}>
          <ol>
            {isLoding ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li key={step.step}>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
