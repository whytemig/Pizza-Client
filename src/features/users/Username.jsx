import { useSelector } from "react-redux";

function Username() {
  //COME BACK AND REPLACE THE STATIC NAME WITH USER'S NAME FROM THE REDUX.
  const name = useSelector((state) => state.user.userName);

  if (!name) return null;
  return <div className="text-sm font-semibold hidden sm:block">{name}</div>;
}

export default Username;
