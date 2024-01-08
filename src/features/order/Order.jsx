// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers.js";
import { getOrder } from "../../services/apiRestaurant.js";
import OrderItem from "./OrderItem.jsx";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder.jsx";

function Order() {
  const order = useLoaderData();

  //this hook was pretty difficult to understand and how to use it.
  //fetch data not associated with UI routes
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-6 px-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold tracking-wide text-white">
              Priority
            </span>
          )}
          <span className="bg-blue-500 rounded-full py-1 px-3 text-sm uppercase font-semibold tracking-wide text-white">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-orange-100 py-5 px-6">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item, index) => (
          <OrderItem
            key={index}
            item={item}
            isLoading={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((topping) => topping.id === item.pizzaId)
                .ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-orange-100 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order;
};

export default Order;
