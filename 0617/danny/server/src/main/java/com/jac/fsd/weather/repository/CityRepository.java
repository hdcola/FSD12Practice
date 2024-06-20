package com.jac.fsd.weather.repository;

import com.jac.fsd.weather.dto.ForecastDto;
import com.jac.fsd.weather.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
}
