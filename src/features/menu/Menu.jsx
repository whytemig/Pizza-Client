import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //Use the useLoaderData hook to fetch the data from the loader element.
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2 ">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
// getting the from the API function and exporting it to the loader element in the Route.
export const loader = async () => await getMenu();

export default Menu;
