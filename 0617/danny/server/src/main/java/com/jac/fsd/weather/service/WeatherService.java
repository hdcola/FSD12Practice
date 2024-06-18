package com.jac.fsd.weather.service;

import com.jac.fsd.weather.adapter.OpenWeatherAdapter;
import com.jac.fsd.weather.dto.CurrentWeatherDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {
    private final OpenWeatherAdapter openWeatherAdapter;

    @Autowired
    public WeatherService(OpenWeatherAdapter openWeatherAdapter) {
        this.openWeatherAdapter = openWeatherAdapter;
    }

    public CurrentWeatherDto getWeather(Double lat, Double lon) {
        return openWeatherAdapter.getWeather(lat, lon);
    }

}
