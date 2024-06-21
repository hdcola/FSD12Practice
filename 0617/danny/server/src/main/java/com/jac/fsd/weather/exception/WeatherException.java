package com.jac.fsd.weather.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class WeatherException extends RuntimeException{
    private final HttpStatus status;

    public WeatherException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

}
