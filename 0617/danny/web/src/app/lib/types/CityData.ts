import { CurrentWeatherData } from "./CurrentWeatherData";

export interface CityData {
    id: number;
    lat: number;
    lon: number;
    name: string;
    display_name: string;
    display_order: number;
    currentweather: CurrentWeatherData | null | undefined;
}