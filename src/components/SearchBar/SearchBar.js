import React from "react";

import { BsSearch } from "react-icons/bs";

function SearchBar(props) {
  const { search, setSearch } = props;
  //TODO: implement debounce
  function updateSearchText(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="container mx-auto w-1/2">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <BsSearch />
        </div>
        <input
          type="search"
          value={search}
          onChange={updateSearchText}
          id="search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search Products by type color gender price..."
          required
        />
      </div>
    </div>
  );
}

export default SearchBar;
