import Item from "./Item";

export default function ItemList({ food, isLoding }) {
  return (
    <div>
      {isLoding ? (
        <p>Loading..</p>
      ) : (
        food.extendedIngredients.map((item) => <Item item={item} />)
      )}
    </div>
  );
}
