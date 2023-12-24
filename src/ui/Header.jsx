import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/users/Username";

const Header = () => {
  return (
    <header className="bg-red-500 uppercase px-4 py-3 border-b-4 border-stone-200 sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">
        Readi Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
