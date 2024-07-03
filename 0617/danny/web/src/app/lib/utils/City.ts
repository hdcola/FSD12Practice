import { CityData } from "../types/CityData";

const citiesApiUrl = "http://localhost:8080/api/cities";
const directGeoCodeApiUrl = "http://localhost:8080/api/direct";

async function fetchCityData(): Promise<CityData[]> {

    try {
        const response = await fetch(citiesApiUrl);
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

async function searchCitiesByName(name: string): Promise<CityData[]> {
    const url = `${directGeoCodeApiUrl}?q=${name}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch city data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }

    return [];
};

async function addCity(city: CityData): Promise<CityData | null> {
    try {
        const response = await fetch(citiesApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(city),
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }

    return null;
}

export { fetchCityData, searchCitiesByName, addCity };