package com.jac.fsd.weather.repository;

import com.jac.fsd.weather.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CityRepository extends JpaRepository<City, Long> {
}
