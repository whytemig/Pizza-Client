import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  //custome component for when the cart is empty.
  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className="flex flex-col items-center justify-center  h-[80vh]">
        <p className="font-extrabold">
          Your cart is still empty. Start adding some pizzas
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
