import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  //SEARCH COMPONENT FOR FINDING THE PREVIOUS ORDER BY INPUTING THE ORDER ID PROVIVED BY THE API.
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`order/${search}`);

    setSearch("");
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        className="rounded-full px-4 py-2 text-sm bg-slate-300 placeholder:text-stone-600 w-28 sm:w-64  outline-none transition-all duration-300 sm:focus:w-72 "
        type="text"
        placeholder="Order Number...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
