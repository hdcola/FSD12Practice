package com.jac.fsd.weather.service;

import com.jac.fsd.weather.adapter.NominatimGeoCodeAdapter;
import com.jac.fsd.weather.adapter.OpenWeatherAdapter;
import com.jac.fsd.weather.dto.CurrentWeatherDto;
import com.jac.fsd.weather.dto.GeoCodeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {
    private final OpenWeatherAdapter openWeatherAdapter;
    private final NominatimGeoCodeAdapter nominatimGeoCodeAdapter;

    @Autowired
    public WeatherService(OpenWeatherAdapter openWeatherAdapter, NominatimGeoCodeAdapter nominatimGeoCodeAdapter) {
        this.openWeatherAdapter = openWeatherAdapter;
        this.nominatimGeoCodeAdapter = nominatimGeoCodeAdapter;
    }

    public CurrentWeatherDto getWeather(Double lat, Double lon) {
        return openWeatherAdapter.getWeather(lat, lon);
    }

    public GeoCodeDto[] getGeoCode(String query) {
        return nominatimGeoCodeAdapter.getGeoCode(query);
    }
}
