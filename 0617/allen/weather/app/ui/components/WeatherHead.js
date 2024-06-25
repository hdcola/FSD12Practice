import React from 'react';
import Temperature from './Temperature';
import WeatherCondition from './WeatherCondition';

const Weather = ({ location, currentTemp, weatherCondition, tempMin, tempMax }) => {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="sm:text-6xl text-3xl">{location}</div>
      <Temperature value={currentTemp} size="sm:text-8xl text-5xl ml-6" />
      <WeatherCondition condition={weatherCondition} />
      <div className="flex flex-row mx-5 h-1">
        <div className="flex flex-row h-1">
          <div className="h-fit">Highest</div>
          <Temperature value={tempMax} size="ml-2 h-fit" />
        </div>
        <div className="flex flex-row h-min h-1">
          <div className="ml-2 h-fit">Lowest</div>
          <Temperature value={tempMin} size="ml-2 h-fit" />
        </div>
      </div>
    </main>
  );
};

export default Weather;

