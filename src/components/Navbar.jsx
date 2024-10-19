import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiWish } from "react-icons/si";
import SearchBar from "./SearchBar";
import { GlobalContext } from "@/providers/GlobalProvider";

const Navbar = () => {
  const { search, setSearch, genre, setGenre, page, setPage } =
    useContext(GlobalContext);
  const genres = [
    "Children",
    "Fiction",
    "Adventure",
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Historical",
    "Horror",
    "Biography",
  ];
  return (
    <nav className="container">
      <div className="w-11/12 mx-auto px-8 py-4 flex justify-between items-center">
        <div className="w-5/12 flex justify-start items-center space-x-2">
          <Link to="/" className="text-xl font-bold text-gray-800">
            NovelNest
          </Link>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-4 sm:mt-0 p-2 rounded hidden md:block cursor-pointer"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g.toLowerCase()}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="w-5/12 flex items-center justify-between hidden md:block">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <NavLink to="/wishlist">
          <div className="relative">
            <SiWish className="text-4xl"></SiWish>
          </div>
        </NavLink>
      </div>
      <div className="w-11/12 mx-auto px-8 flex flex-col justify-center items-center space-y-5 block md:hidden">
        <SearchBar search={search} setSearch={setSearch} />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mt-4 sm:mt-0 p-2 rounded"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g.toLowerCase()}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
