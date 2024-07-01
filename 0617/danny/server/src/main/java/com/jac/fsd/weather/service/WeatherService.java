package com.jac.fsd.weather.service;

import com.jac.fsd.weather.adapter.NominatimGeoCodeAdapter;
import com.jac.fsd.weather.adapter.OpenWeatherAdapter;
import com.jac.fsd.weather.dto.CurrentWeatherDto;
import com.jac.fsd.weather.dto.ForecastDto;
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
        // put order in id field
        GeoCodeDto[] geoCodeDtos = nominatimGeoCodeAdapter.getGeoCode(query);
        for (int i = 0; i < geoCodeDtos.length; i++) {
            geoCodeDtos[i].setId((long) i);
        }
        return geoCodeDtos;
    }

    public GeoCodeDto getReverseGeoCode(double lat, double lon) {
        return nominatimGeoCodeAdapter.getReverseGeoCode(lat, lon);
    }

    public ForecastDto getForecast(Double lat, Double lon) {
        return openWeatherAdapter.getForecast(lat, lon);
    }
}
