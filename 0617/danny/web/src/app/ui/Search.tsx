"use client";
import { useState, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchCitiesByName } from "../lib/utils/City";
import { CityData } from "../lib/types/CityData";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: CityData) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
    performSearch(suggestion);
  };

  const performSearch = (query: CityData) => {
    console.log("Searching for:", query);
    // 在这里添加你的搜索逻辑
  };

  const fetchSuggestions = useDebouncedCallback((query: string) => {
    console.log("Fetching suggestions for:", query);
    searchCitiesByName(query)
      .then((data) => {
        console.log("Fetched data:", data);
        setSuggestions(data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      });
  }, 300);

  return (
    <div className="search-component">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>

      {showSuggestions && (
        <ul className="absolute w-3/6 border border-gray-300 bg-white max-h-36 overflow-y-auto m-0 p-0 list-none">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
