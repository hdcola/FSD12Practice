package com.jac.fsd.weather.controller;

import com.jac.fsd.weather.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;


    @GetMapping("")
    public String getWeather(@RequestParam Double lat, @RequestParam Double lon) {

        return weatherService.getWeather(lat, lon);
    }

}
