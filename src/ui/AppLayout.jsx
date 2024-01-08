import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import { Loader } from "./Loader";

export const AppLayout = () => {
  const navigation = useNavigation();
  //FROM THE DOC & GOOGLING-- navigate.state = loading, idle, subitting
  // THIS STATE IS UNIVERSAL FOR THE ENTIRE APP.
  // SO IT WORKS THROUGHOUT THE APP.
  const isLoader = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen bg-orange-400">
      {isLoader && <Loader />}
      <Header />

      <div className="overflow-scroll ">
        <main className=" max-w-3xl  mx-auto">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
};
