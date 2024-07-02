package com.jac.fsd.weather.controller;

import com.jac.fsd.weather.dto.CurrentWeatherDto;
import com.jac.fsd.weather.dto.ForecastDto;
import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.service.WeatherService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Log4j2
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/weather")
    public ResponseEntity<CurrentWeatherDto> getWeather(@RequestParam Double lat, @RequestParam Double lon) {
        log.info("weather request for lat: {} lon: {}", lat, lon);
//        return new ResponseEntity<>(CurrentWeatherDto.mockCurrentWeatherDto(), HttpStatus.OK);
        return new ResponseEntity<>(weatherService.getWeather(lat, lon), HttpStatus.OK);
    }

    @GetMapping("/direct")
    public ResponseEntity<GeoCodeDto[]> getGeoCode(@RequestParam String q) {
        return new ResponseEntity<>(weatherService.getGeoCode(q), HttpStatus.OK);
    }

    @GetMapping("/reverse")
    public ResponseEntity<GeoCodeDto> getReverseGeoCode(@RequestParam Double lat, @RequestParam Double lon) {
        return new ResponseEntity<>(weatherService.getReverseGeoCode(lat, lon), HttpStatus.OK);
    }

    @GetMapping("/forecast")
    public ResponseEntity<ForecastDto> getForecast(@RequestParam Double lat, @RequestParam Double lon) {
        return new ResponseEntity<>(weatherService.getForecast(lat, lon), HttpStatus.OK);
    }
}
