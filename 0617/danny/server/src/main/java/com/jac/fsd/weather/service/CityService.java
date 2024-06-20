package com.jac.fsd.weather.service;

import com.jac.fsd.weather.entity.City;

import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<GeoCodeDto> getAllCities() {
        List<City> cities =  cityRepository.findAll();
        return cities.stream().map(GeoCodeDto::new).toList();
    }

    public GeoCodeDto addCity(GeoCodeDto city) {
        City newCity = new City();
        newCity.setDisplayName(city.getDisplayName());
        newCity.setName(city.getName());
        newCity.setLat(city.getLat());
        newCity.setLon(city.getLon());
        newCity.setDisplayOrder(city.getDisplayOrder());
        City savedCity = cityRepository.save(newCity);
        return new GeoCodeDto(savedCity);
    }
}
