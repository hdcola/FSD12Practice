"use client";
import SideNav from "../ui/sidenav";
import { useEffect, useState } from "react";
import { fetchCityData } from "../lib/utils/City";
import { CityData } from "../lib/types/CityData";
import CitiesContext from "../lib/CiitesContext";
import { fetchCurrentWeatherData } from "../lib/utils/CurrentWeather";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<CityData[]>([]);

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      const data = await fetchCityData();
      if (data !== null) {
        const fetchCities = data;
        setCities(fetchCities);
        // Fetch weather data for each city
        for (let i = 0; i < fetchCities.length; i++) {
          await new Promise((r) => setTimeout(r, 1000));
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
    <CitiesContext.Provider value={cities}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </CitiesContext.Provider>
  );
}
