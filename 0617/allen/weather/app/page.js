"use client";

import React, { useEffect, useState } from "react";
import Weather from "./ui/WeatherHead";
import { fetchWeather, fetchCoordinates } from "./lib/fetchWeather";
import Sidebar from "./ui/sidebar";
import HourlyForecast from "./ui/HourlyForecast";

const Page = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [cities, setCities] = useState(["City 1", "City 2"]); // Initialize with default cities

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            setLocation({
              lat: latitude,
              lng: longitude,
            });
          },
          (error) => {
            console.error("Error obtaining location", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        const data = await fetchWeather(location.lat, location.lng);
        setWeatherData(data);
      };

      fetchData();
    }
  }, [location]);

  const addCity = (city) => {
    setCities((prevCities) => [...prevCities, city]);
  };

  const handleCityClick = async (city) => {
    const coordinates = await fetchCoordinates(city);
    if (coordinates) {
      setLocation(coordinates);
    }
  };

  if (!weatherData) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <>
      <Sidebar
        cities={cities}
        addCity={addCity}
        onCityClick={handleCityClick}
      />
      <Weather
        className="bg-gray-900"
        location={weatherData.location}
        currentTemp={weatherData.currentTemp}
        weatherCondition={weatherData.weatherCondition}
        tempMin={weatherData.tempMin}
        tempMax={weatherData.tempMax}
      />

      <div className="bg-gray-900 text-white p-4 md:p-6 min-h-screen ">
        <div className="max-w-7xl mx-auto gap-5">
          <div className="bg-gray-800 rounded-lg p-4">
            <HourlyForecast forecast={weatherData.hourlyForecast || []} />
          </div>
          <div className="bg-gray-800 rounded-lg p-4">地图</div>
          <div className="bg-gray-800 rounded-lg p-4">每日天气预报</div>
          <div className="bg-gray-800 rounded-lg p-4">空气质量</div>
          <div className="bg-gray-800 rounded-lg p-4">紫外线指数</div>
          <div className="bg-gray-800 rounded-lg p-4">日出</div>
          <div className="bg-gray-800 rounded-lg p-4">风</div>
          <div className="bg-gray-800 rounded-lg p-4">降水强度</div>
          <div className="bg-gray-800 rounded-lg p-4">体感温度</div>
          <div className="bg-gray-800 rounded-lg p-4">湿度</div>
          <div className="bg-gray-800 rounded-lg p-4">能见度</div>
          <div className="bg-gray-800 rounded-lg p-4">气压</div>
        </div>
      </div>
    </>
  );
};

export default Page;
