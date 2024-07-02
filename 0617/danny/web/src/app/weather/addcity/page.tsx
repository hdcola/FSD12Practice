"use client";
import { CurrentWeatherDataSummary } from "../../ui/CurrentWeather";
import CitiesContext from "../../lib/CiitesContext";
import { useContext } from "react";

export default function Page() {
  const { cities } = useContext(CitiesContext);
  const city = cities.find((c) => c.display_order === 0);
  if (city === undefined) {
    return <div>Loading....</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CurrentWeatherDataSummary weatherData={city.currentweather} />
    </main>
  );
}
