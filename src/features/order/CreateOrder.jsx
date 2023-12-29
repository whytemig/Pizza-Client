import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, totalCartPrice } from "../cart/cartSlice";
import { store } from "../../reduxstore/store.js";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../users/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const name = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);
  const totalCartPriceVal = useSelector(totalCartPrice);
  const {
    status: addressStatus,
    position,
    address,
    error,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isLoading = addressStatus === "loading";

  const priorityPrice = withPriority ? totalCartPriceVal * 0.02 : 0;

  let totalPrice = totalCartPriceVal + priorityPrice;

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const formError = useActionData();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={name}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="text-xs mt-2 text-white bg-red-700 p-2 rounded-md">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoading}
              defaultValue={address}
              required
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-white bg-red-700 p-2 rounded-md">
                {formError.phone}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 sm:top-[3px] sm:right-[3px]">
              <Button
                disabled={isLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-red-600 focus:outline-none focus:ring-transparent  focus:ring-offset-2 outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium ">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoading} type="primary">
            {isSubmitting
              ? "Placing Order"
              : `Order Now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  let data = Object.fromEntries(formData);

  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const error = {};

  if (!isValidPhone(order.phone)) {
    error.phone = "Invalid PhoneNumber";
  }

  if (Object.keys(error).length > 0) {
    return error;
  }

  //if everything iS OK, create new order and redirect
  const createData = await createOrder(order);
  let { id } = createData;

  store.dispatch(clearCart());

  return redirect(`/order/${id}`);
};

export default CreateOrder;
