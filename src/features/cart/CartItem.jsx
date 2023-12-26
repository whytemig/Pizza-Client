import { useSelector } from "react-redux";
import { formatCurrency } from "../../utilities/helpers.js";
import DeletePizza from "./DeletePizza.jsx";
import UpdateQuantity from "./UpdateQuantity.jsx";
import { getCurrentQuantity } from "./cartSlice.js";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeletePizza pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
