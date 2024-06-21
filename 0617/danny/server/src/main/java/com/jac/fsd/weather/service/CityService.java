package com.jac.fsd.weather.service;

import com.jac.fsd.weather.entity.City;

import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.exception.WeatherException;
import com.jac.fsd.weather.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<GeoCodeDto> getAllCities() {
        List<City> cities =  cityRepository.findAll(Sort.by("displayOrder"));
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

    public List<GeoCodeDto> updateCity(List<GeoCodeDto> cities) {
        long order = 1;
        for (GeoCodeDto city : cities) {
            Optional<City> optionalCity = cityRepository.findById(city.getId());
            if (optionalCity.isPresent()) {
                City updatedCity = optionalCity.get();
                updatedCity.setDisplayOrder(order++);
                cityRepository.save(updatedCity);
            }
        }
        return getAllCities();
    }

    public void deleteCity(Long id) {
        if (cityRepository.existsById(id)){
            cityRepository.deleteById(id);
        }else{
            throw new WeatherException(HttpStatus.NOT_FOUND, "City not found");
        }

    }
}
