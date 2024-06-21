package com.jac.fsd.weather.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class CityJDBCRepository {

    JdbcTemplate jdbcTemplate;

    @Autowired
    public CityJDBCRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void deleteCity(Long id) {
        String sql="delete from city where id=?";
        jdbcTemplate.update(sql, id);
    }
}
