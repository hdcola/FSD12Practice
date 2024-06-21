package com.jac.fsd.weather.controller;

import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @PostMapping
    public GeoCodeDto addCity(@RequestBody GeoCodeDto city) {
        return cityService.addCity(city);
    }

    @GetMapping
    public List<GeoCodeDto> getAllCities() {
        return cityService.getAllCities();
    }

    @PatchMapping
    public List<GeoCodeDto> updateCity(@RequestBody List<GeoCodeDto> cities) {
        return cityService.updateCity(cities);
    }

    @DeleteMapping
    public void deleteCity(@RequestParam Long id) {
        cityService.deleteCity(id);
    }
}
