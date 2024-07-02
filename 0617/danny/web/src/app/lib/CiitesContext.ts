import { createContext } from 'react';
import { CityData } from './types/CityData';

interface SearchContextType {
    searchedCity: CityData | null;
    updateSearchedCity: (city: CityData | null) => void;
}

interface CitiesContextType {
    cities: CityData[];
    updateCities: (cities: CityData[]) => void;
}

const CitiesContext = createContext<CitiesContextType>(
    { cities: [], updateCities: () => { } }
);
const SearchContext = createContext<SearchContextType>({
    searchedCity: null,
    updateSearchedCity: () => { }
});

export default CitiesContext;
export { CitiesContext, SearchContext };