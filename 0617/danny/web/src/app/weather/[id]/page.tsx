"use client";
import { CurrentWeatherDataSummary } from "@/app/ui/CurrentWeather";
import { useContext } from "react";
import CitiesContext from "@/app/lib/CiitesContext";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  // convert id to number
  const cityId = parseInt(id, 10);
  // get city data from context
  const { cities } = useContext(CitiesContext);
  const city = cities.find((c) => c.display_order === cityId);
  if (city === undefined) {
    return <div>City not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CurrentWeatherDataSummary weatherData={city.currentweather} />
    </main>
  );
}
