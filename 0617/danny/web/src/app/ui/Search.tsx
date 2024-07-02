"use client";
import { useState, ChangeEvent, use, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchCitiesByName } from "../lib/utils/City";
import { CityData } from "../lib/types/CityData";
import { CitiesContext, SearchContext } from "../lib/CiitesContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { fetchCurrentWeatherData } from "../lib/utils/CurrentWeather";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { searchedCity, updateSearchedCity } = useContext(SearchContext);
  const { cities, updateCities } = useContext(CitiesContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchedCity !== null) {
      setInputValue(searchedCity.name);
    }
    if (pathname !== "/weather/addcity") {
      setInputValue("");
      updateSearchedCity(null);
    }
  }, [searchedCity, pathname, updateSearchedCity]);

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
    // setInputValue(suggestion.name);
    setShowSuggestions(false);
    performSearch(suggestion);
    router.push("/weather/addcity");
  };

  const performSearch = (query: CityData) => {
    updateSearchedCity(query);
  };

  const fetchSuggestions = useDebouncedCallback((query: string) => {
    searchCitiesByName(query)
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      });
  }, 300);

  const handleAddCity = (city: CityData) => {
    console.log("Adding city:", city);
    city.display_order = cities.length + 1;
    const newCities = [...cities, city];
    updateCities(newCities);
    updateSearchedCity(null);
    setInputValue("");
    const weatherData = fetchCurrentWeatherData({
      lat: city.lat,
      lon: city.lon,
    }).then((data) => {
      if (data !== null) {
        city.currentweather = data;
        updateCities(newCities);
      }
    });
  };

  return (
    <div className="absolute top-2 right-5 flex gap-2">
      {searchedCity !== null && (
        <button
          onClick={() => handleAddCity(searchedCity)}
          className="btn btn-xs "
        >
          Add
        </button>
      )}

      <label className="input input-bordered input-xs flex items-center gap-2 max-w-xs">
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
        <ul className="absolute w-200 border border-gray-300 bg-white max-h-36 overflow-y-auto m-0 mt-6 p-0 list-none">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200 text-xs"
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
