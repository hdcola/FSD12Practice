package com.jac.fsd.weather.controller;

import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<GeoCodeDto> addCity(@RequestBody GeoCodeDto city) {
        return new ResponseEntity<>(cityService.addCity(city), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GeoCodeDto>> getAllCities() {
        return new ResponseEntity<>(cityService.getAllCities(), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<List<GeoCodeDto>> updateCity(@RequestBody List<GeoCodeDto> cities) {
        return new ResponseEntity<>(cityService.updateCity(cities), HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCity(@RequestParam Long id) {
        cityService.deleteCity(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
