"use client";

import { useState, useEffect } from "react";
import { CityData } from "../lib/types/CityData";
import { fetchCityData } from "../lib/utils/City";

export default function CityList() {
  const [cityData, setCityData] = useState<CityData[] | null>(null);

  useEffect(() => {
    fetchCityData().then((data: CityData[] | null) => {
      if (data !== null) {
        setCityData(data);
      }
    });
  }, []);

  if (cityData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      {cityData.map((city) => (
        <div
          key={city.id}
          className="flex h-[48px] w-full gap-2 bg-gray-50  hover:bg-sky-100"
        >
          <h1>{city.name}</h1>
          <p>{city.display_order}</p>
        </div>
      ))}
    </div>
  );
}
