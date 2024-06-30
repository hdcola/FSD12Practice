"use client";
import { useState, useEffect } from "react";
import { CurrentWeatherData } from "../types/CurrentWeatherData";
import { fetchCurrentWeatherData } from "../utils/CurrentWeather";

const weatherApiUrl = "http://localhost:8080/api/weather";

const CurrentWeather = ({ lat, lon }: { lat: number; lon: number }) => {
  const [weatherData, setWeatherData] = useState<CurrentWeatherData | null>(
    null
  );

  useEffect(() => {
    fetchCurrentWeatherData({ lat, lon }).then(
      (data: CurrentWeatherData | null) => {
        if (data !== null) {
          setWeatherData(data);
        }
      }
    );
  }, [lat, lon]);

  return (
    <div className="flex flex-row gap-1">
      <CurrentWeatherSummary weatherData={weatherData} />
      <CurrentVisibility weatherData={weatherData} />
    </div>
  );
};

const CurrentWeatherSummary = ({
  weatherData,
}: {
  weatherData: null | CurrentWeatherData;
}) => {
  if (weatherData === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="card bg-primary text-primary-content w-100">
        <div className="card-body">
          <h1 className="card-title">{weatherData.name}</h1>
          <p>{weatherData.main.temp}</p>
          <p>{weatherData.weather[0].description}</p>
          <p>
            H:{weatherData.main.temp_max} L:{weatherData.main.temp_min}
          </p>
        </div>
      </div>
    );
  }
};

const CurrentVisibility = ({
  weatherData,
}: {
  weatherData: null | CurrentWeatherData;
}) => {
  if (weatherData === null) {
    return <div>Loading...</div>;
  } else {
    const visibility = weatherData.visibility;
    const visibilityDisplay =
      visibility >= 1000
        ? `${(visibility / 1000).toFixed(1)} km`
        : `${visibility} m`;

    let visibilityLevelDescription;

    if (visibility < 1000) {
      visibilityLevelDescription = "Very Poor";
    } else if (visibility >= 1000 && visibility < 3000) {
      visibilityLevelDescription = "Poor";
    } else if (visibility >= 3000 && visibility < 5000) {
      visibilityLevelDescription = "Moderate";
    } else if (visibility >= 5000 && visibility < 10000) {
      visibilityLevelDescription = "Good";
    } else {
      visibilityLevelDescription = "Excellent";
    }
    return (
      <div className="card bg-primary text-primary-content w-100">
        <div className="card-body">
          <h1 className="card-title">Visibility</h1>
          <p>{visibilityDisplay}</p>
          <p>{visibilityLevelDescription}</p>
        </div>
      </div>
    );
  }
};

export default CurrentWeather;
export { CurrentWeatherSummary };
