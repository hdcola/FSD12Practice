import { CityData } from "../types/CityData";

const weatherApiUrl = "http://localhost:8080/api/cities";

async function fetchCityData(): Promise<CityData[]> {

    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch city data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
    return [];
}

export { fetchCityData };