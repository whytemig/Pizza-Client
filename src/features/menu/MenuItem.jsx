import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button.jsx";
import { addItem } from "../cart/cartSlice.js";
import { useDispatch } from "react-redux";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleCart() {
    let newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2 text-white">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize ">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center  justify-between">
          {!soldOut ? (
            <p className="text-sm ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase font-medium text-stone-500">Sold out</p>
          )}

          {!soldOut && (
            <Button type="small" onClick={handleCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
