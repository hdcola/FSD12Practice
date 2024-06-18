package com.jac.fsd.weather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GeoCodeDto {
    private Double lat;
    private Double lon;
    private String name;
    @JsonProperty("display_name")
    private String displayName;
    @JsonProperty("class")
    private String placeClass;
    private String type;
}
