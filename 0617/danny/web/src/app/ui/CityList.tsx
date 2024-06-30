"use client";

import { useContext } from "react";
import CitiesContext from "../lib/CiitesContext";
import { CurrentTemperatureInCityCard } from "./CurrentWeather";

export default function CityList() {
  const cities = useContext(CitiesContext);

  if (cities.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      {cities.map((city) => (
        <div
          key={city.id}
          className="flex h-[48px] w-full gap-2 bg-gray-50  hover:bg-sky-100"
        >
          <h1>{city.name}</h1>
          <p>{city.display_order}</p>
          <CurrentTemperatureInCityCard weatherData={city.currentweather} />
        </div>
      ))}
    </div>
  );
}
