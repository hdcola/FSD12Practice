import { CurrentWeatherData } from "../types/CurrentWeatherData";


const weatherApiUrl = "http://localhost:8080/api/weather";


async function fetchCurrentWeatherData(
    { lat, lon }: { lat: number; lon: number }
): Promise<CurrentWeatherData | null> {
    const url = `${weatherApiUrl}?lat=${lat}&lon=${lon}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export { fetchCurrentWeatherData };