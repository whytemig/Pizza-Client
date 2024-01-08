import { useSelector } from "react-redux";
import CreateUser from "../features/users/CreateUser";
import Button from "./Button";

function Home() {
  const name = useSelector((state) => state.user.userName);

  return (
    <div className="my-10 sm:my-16 text-center px-4">
      <h1 className=" text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-red-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {name === "" ? (
        <CreateUser />
      ) : (
        //CUSTOM COMPONENT FOR THE BUTTON.
        <Button to="/menu" type="primary">
          Continue your Order, {name}
        </Button>
      )}
    </div>
  );
}

export default Home;
