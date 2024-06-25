"use client";

import React, { useEffect, useState } from "react";
import Weather from "./ui/components/WeatherHead";
import { fetchWeather } from "./lib/fetchWeather";
import Sidebar from "./ui/components/sidebar";
import HourlyForecast from "./ui/components/HourlyForecast";

const Page = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

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

  if (!weatherData) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <Weather
        className="bg-gray-900"
        location={weatherData.location}
        currentTemp={weatherData.currentTemp}
        weatherCondition={weatherData.weatherCondition}
        tempMin={weatherData.tempMin}
        tempMax={weatherData.tempMax}
      />

      <div className="bg-gray-900 text-white p-4 md:p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4">今天天气很好</div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Hourly Forecast */}
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <div className="flex space-x-4 min-w-max">
                  <HourlyForecast forecast={weatherData.hourlyForecast || []} />
                </div>
              </div>

              {/* Daily Forecast */}
              <div className="bg-gray-800 rounded-lg p-4">
                {/* Add your daily forecast content here */}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Map */}
              <div className="bg-gray-800 rounded-lg p-4 h-64 md:h-80">
                {/* Add map component here */}
              </div>

              {/* Air Quality */}
              <div className="bg-gray-800 rounded-lg p-4">
                {/* Add air quality content here */}
              </div>

              {/* Other Weather Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                {/* UV Index */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add UV index content */}
                </div>
                {/* Sunrise/Sunset */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add sunrise/sunset content */}
                </div>
                {/* Wind */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add wind information content */}
                </div>
                {/* Precipitation */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add precipitation content */}
                </div>
                {/* Feel-like Temperature */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add feel-like temperature content */}
                </div>
                {/* Humidity */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add humidity content */}
                </div>
                {/* Visibility */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add visibility content */}
                </div>
                {/* Pressure */}
                <div className="bg-gray-800 rounded-lg p-4">
                  {/* Add pressure content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
