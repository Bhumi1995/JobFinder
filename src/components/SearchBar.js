"use client";

import { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      onSearch("");
    }
  }, [searchTerm, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      onSearch("");
      return;
    }

    setIsSearching(true);
    try {
      onSearch(searchTerm);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 h-5 w-5 text-black-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for jobs..."
          className="pl-10 pr-20 py-3 w-full border border-white-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isSearching}
        />
        <button
          type="submit"
          className="absolute right-1 bg-white hover:bg-blue-700 text-black py-2 px-4 rounded-full disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
