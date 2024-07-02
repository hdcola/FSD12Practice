export async function fetchCoordinates(city) {
  try {
    const res = await fetch(
      `http://100.89.152.5:8080/api/coordinates?city=${city}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return {
      lat: data.lat,
      lon: data.lon,
    };
  } catch (error) {
    console.error("Failed to fetch coordinates:", error);
    return null;
  }
}

export async function fetchWeather(lat, lon) {
  try {
    // Fetch current weather data
    const resCurrent = await fetch(
      `http://100.89.152.5:8080/api/weather?lat=${lat}&lon=${lon}`
    );
    if (!resCurrent.ok) {
      throw new Error("Network response was not ok");
    }
    const dataCurrent = await resCurrent.json();

    // Fetch hourly forecast data
    const resForecast = await fetch(
      `http://100.89.152.5:8080/api/forecast?lat=${lat}&lon=${lon}`
    );
    if (!resForecast.ok) {
      throw new Error("Network response was not ok");
    }
    const dataForecast = await resForecast.json();

    // Convert temperature from Kelvin to Celsius
    const currentTemp = dataCurrent.main.temp;
    const tempMin = dataCurrent.main.temp_min;
    const tempMax = dataCurrent.main.temp_max;

    return {
      location: dataCurrent.name,
      currentTemp: currentTemp.toFixed(0),
      weatherCondition: dataCurrent.weather[0].description,
      tempMin: tempMin.toFixed(0),
      tempMax: tempMax.toFixed(0),
      hourlyForecast: dataForecast.list,
    };
  } catch (error) {
    console.error("API fetch failed, falling back to local JSON:", error);

    // Fetch from local JSON file as fallback
    const res = await fetch("weather.json");
    const data = await res.json();

    // Convert temperature from Kelvin to Celsius
    const currentTemp = data.main.temp;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;

    return {
      location: data.name,
      currentTemp: currentTemp.toFixed(0),
      weatherCondition: data.weather[0].description,
      tempMin: tempMin.toFixed(0),
      tempMax: tempMax.toFixed(0),
      hourlyForecast: [], // Empty array as fallback
    };
  }
}
