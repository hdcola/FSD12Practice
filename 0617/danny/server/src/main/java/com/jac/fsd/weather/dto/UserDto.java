package com.jac.fsd.weather.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private String token;
    private List<GeoCodeDto> cities;
}
