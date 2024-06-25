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
    const currentTemp = dataCurrent.main.temp - 273.15;
    const tempMin = dataCurrent.main.temp_min - 273.15;
    const tempMax = dataCurrent.main.temp_max - 273.15;

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
    const currentTemp = data.main.temp - 273.15;
    const tempMin = data.main.temp_min - 273.15;
    const tempMax = data.main.temp_max - 273.15;

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
