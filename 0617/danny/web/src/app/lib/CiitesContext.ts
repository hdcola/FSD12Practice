import { createContext } from 'react';
import { CityData } from './types/CityData';

const CitiesContext = createContext<CityData[]>([]);

export default CitiesContext;