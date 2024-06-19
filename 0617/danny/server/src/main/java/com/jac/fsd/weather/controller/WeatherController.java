package com.jac.fsd.weather.controller;

import com.jac.fsd.weather.dto.CurrentWeatherDto;
import com.jac.fsd.weather.dto.ForecastDto;
import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/weather")
    public CurrentWeatherDto getWeather(@RequestParam Double lat, @RequestParam Double lon) {
        return weatherService.getWeather(lat, lon);
    }

    @GetMapping("/direct")
    public GeoCodeDto[] getGeoCode(@RequestParam String q) {
        return weatherService.getGeoCode(q);
    }

    @GetMapping("/reverse")
    public GeoCodeDto getReverseGeoCode(@RequestParam Double lat, @RequestParam Double lon) {
        return weatherService.getReverseGeoCode(lat, lon);
    }

    @GetMapping("/forecast")
    public ForecastDto getForecast(@RequestParam Double lat, @RequestParam Double lon) {
        return weatherService.getForecast(lat, lon);
    }
}
