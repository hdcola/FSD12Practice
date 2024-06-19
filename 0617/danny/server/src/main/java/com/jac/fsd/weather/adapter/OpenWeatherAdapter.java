package com.jac.fsd.weather.adapter;

import com.jac.fsd.weather.dto.CurrentWeatherDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class OpenWeatherAdapter {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    @Autowired
    public OpenWeatherAdapter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public CurrentWeatherDto getWeather(Double lat, Double lon) {
        String url = apiUrl + "weather" + "?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        return restTemplate.getForObject(url, CurrentWeatherDto.class);
    }

    public String getForecast(Double lat, Double lon) {
        String url = apiUrl + "forecast" + "?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }
}
