import React, { useState } from "react";
import { search } from "../lib/search";

const Sidebar = ({ onCityClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cities, setCities] = useState([]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = async (event) => {
    const input = event.target.value;
    setQuery(input);

    if (input.trim() !== "") {
      const searchResults = await search(input);
      if (searchResults) {
        setResults(searchResults);
      } else {
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleAddCity = (city) => {
    setCities([...cities, city.display_name]);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex justify-between items-center p-4">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            className="input input-bordered"
          />
          {results.length > 0 && (
            <ul className="dropdown">
              {results.map((result) => (
                <li key={result.id} onClick={() => handleAddCity(result)}>
                  {result.display_name}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => handleAddCity({ display_name: query })}
            className="btn btn-primary mt-2"
          >
            Add City
          </button>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Render the list of cities */}
          {cities.map((city, index) => (
            <li key={index}>
              <a onClick={() => onCityClick(city)}>{city}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
