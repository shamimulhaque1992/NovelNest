import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-full"
    />
  );
};

export default SearchBar;
