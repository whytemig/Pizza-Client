import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { totalCartQuantity, totalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  // state mutation is recommended within the redux slice.
  const totalCartQuan = useSelector(totalCartQuantity);
  const totalPrice = useSelector(totalCartPrice);

  return (
    <>
      {!totalCartQuan ? null : (
        <div className="bg-stone-800 text-stone-200 uppercase p-4 px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
          <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
            <span>{totalCartQuan} pizzas</span>
            <span>${formatCurrency(totalPrice)}</span>
          </p>
          <Link to="/cart">Open cart &rarr;</Link>
        </div>
      )}
    </>
  );
}

export default CartOverview;
