import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import { AppLayout } from "./ui/AppLayout";
import CreateOrder, {
  action as createAction,
} from "./features/order/CreateOrder";
import Error from "./ui/Error";
import { action as updateAction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  //FROM VERSION6 THIS IS HOW TO CREATE CHILDREN IN ROUTE.....BUT I STILL PREFER V5.
  //UNDERSTANDNG THE LOADER AND ACTIONS WAS TRICKY TO UNDERSTAND.
  {
    element: <AppLayout />,
    errorElement: <Error />,
    //THE CHILDREN FOR  THE APPLAYOUT
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        //function to provide data to the route element before it renders.
        loader: menuLoader,
        //ErrorElement for all routes
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        errorElement: <Error />,
        action: createAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
        action: updateAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
