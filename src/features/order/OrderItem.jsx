import { formatCurrency } from "../../utilities/helpers";

// isLoadingIngredients, ingredients;

function OrderItem({ item, ingredients, isLoading }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between gap-4 text-sm ">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoading ? "loading...." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
