package com.jac.fsd.weather.adapter;

import com.jac.fsd.weather.dto.GeoCodeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class NominatimGeoCodeAdapter {
    private final String apiUrl = "https://nominatim.openstreetmap.org/";

    private RestTemplate restTemplate;

    @Autowired
    public NominatimGeoCodeAdapter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public GeoCodeDto[] getGeoCode(String query) {
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = apiUrl + "search?q=" + encodedQuery + "&format=json";
        return restTemplate.getForObject(url, GeoCodeDto[].class);
    }

    public GeoCodeDto getReverseGeoCode(double lat, double lon) {
        String url = apiUrl + "reverse?lat=" + lat + "&lon=" + lon + "&format=json&zoom=13";
        return restTemplate.getForObject(url, GeoCodeDto.class);
    }

}
