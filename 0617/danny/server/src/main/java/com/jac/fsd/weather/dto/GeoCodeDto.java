package com.jac.fsd.weather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jac.fsd.weather.entity.City;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GeoCodeDto {
    private Long id;
    private Double lat;
    private Double lon;
    private String name;
    @JsonProperty("display_name")
    private String displayName = null;
    private Long displayOrder = null;

    public GeoCodeDto(City city) {
        this.id = city.getId();
        this.lat = city.getLat();
        this.lon = city.getLon();
        this.name = city.getName();
        this.displayName = city.getDisplayName();
        this.displayOrder = city.getDisplayOrder();
    }
}
