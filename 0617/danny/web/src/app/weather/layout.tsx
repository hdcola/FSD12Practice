"use client";
import SideNav from "../ui/sidenav";
import { useEffect, useState } from "react";
import { fetchCityData } from "../lib/utils/City";
import { CityData } from "../lib/types/CityData";
import { CitiesContext, SearchContext } from "../lib/CiitesContext";
import { fetchCurrentWeatherData } from "../lib/utils/CurrentWeather";
import Search from "../ui/Search";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<CityData[]>([]);
  const [searchedCity, setSearchedCity] = useState<CityData | null>(null);

  const updateSearchedCity = (city: CityData | null) => {
    setSearchedCity(city);
  };

  const updateCities = (cities: CityData[]) => {
    setCities(cities);
  };

  useEffect(() => {
    const current: CityData = {
      id: 0,
      lat: 45.509194531492966,
      lon: -73.59832566263219,
      name: "Montreal",
      display_name: "Montreal",
      display_order: 0,
      currentweather: null,
    };

    const fetchCities: CityData[] = [current];

    async function fetchDataAndUpdateState() {
      const data = await fetchCityData();
      if (data !== null) {
        fetchCities.push(...data);
        setCities(fetchCities);
        // Fetch weather data for each city
        for (let i = 0; i < fetchCities.length; i++) {
          const weatherData = await fetchCurrentWeatherData({
            lat: fetchCities[i].lat,
            lon: fetchCities[i].lon,
          });
          if (weatherData !== null) {
            fetchCities[i].currentweather = weatherData;
            setCities(fetchCities);
          }
        }
      }
    }

    fetchDataAndUpdateState();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, updateCities }}>
      <SearchContext.Provider value={{ searchedCity, updateSearchedCity }}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <Search />
            {children}
          </div>
        </div>
      </SearchContext.Provider>
    </CitiesContext.Provider>
  );
}
