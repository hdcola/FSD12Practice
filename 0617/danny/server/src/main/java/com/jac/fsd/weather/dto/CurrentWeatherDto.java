package com.jac.fsd.weather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CurrentWeatherDto {
    private Coord coord;
    private Weather[] weather;
    private String base;
    private Main main;
    private int visibility;
    private Wind wind;
    private Rain rain;
    private Clouds clouds;
    private long dt;
    private Sys sys;
    private int timezone;
    private int id;
    private String name;
    private int cod;

    @Data
    public static class Coord {
        private double lon;
        private double lat;
    }

    @Data
    public static class Weather {
        private int id;
        private String main;
        private String description;
        private String icon;
    }

    @Data
    public static class Main {
        private double temp;
        @JsonProperty("feels_like")
        private double feelsLike;
        @JsonProperty("temp_min")
        private double tempMin;
        @JsonProperty("temp_max")
        private double tempMax;
        private int pressure;
        private int humidity;
        @JsonProperty("sea_level")
        private int seaLevel;
        @JsonProperty("grnd_level")
        private int groundLevel;
    }

    @Data
    public static class Wind {
        private double speed;
        private int deg;
        private double gust;
    }

    @Data
    public static class Rain {
        @JsonProperty("1h")
        private double rain1h;
    }

    @Data
    public static class Clouds {
        private int all;
    }

    @Data
    public static class Sys {
        private int type;
        private int id;
        private String country;
        private long sunrise;
        private long sunset;
    }

    public static CurrentWeatherDto mockCurrentWeatherDto() {
        CurrentWeatherDto currentWeatherDto = new CurrentWeatherDto();
        currentWeatherDto.setCoord(new Coord());
        currentWeatherDto.setWeather(new Weather[]{new Weather()});
        currentWeatherDto.setBase("base");
        currentWeatherDto.setMain(new Main());
        currentWeatherDto.setVisibility(1000);
        currentWeatherDto.setWind(new Wind());
        currentWeatherDto.setRain(new Rain());
        currentWeatherDto.setClouds(new Clouds());
        currentWeatherDto.setDt(1000);
        currentWeatherDto.setSys(new Sys());
        currentWeatherDto.setTimezone(1000);
        currentWeatherDto.setId(1000);
        currentWeatherDto.setName("name");
        currentWeatherDto.setCod(1000);
        return currentWeatherDto;
    }
}