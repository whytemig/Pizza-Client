import { useSelector } from "react-redux";

function Username() {
  const name = useSelector((state) => state.user.userName);

  if (!name) return null;
  return <div className="text-sm font-semibold hidden sm:block">{name}</div>;
}

export default Username;
