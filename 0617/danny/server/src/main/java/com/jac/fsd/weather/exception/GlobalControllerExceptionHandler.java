package com.jac.fsd.weather.exception;

import com.jac.fsd.weather.dto.ErrorDto;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

@ControllerAdvice
@Log4j2
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDto> handleRuntimeException(RuntimeException e){
        log.error("runtime exception",e);
        return new ResponseEntity<>(
                new ErrorDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),"internal server error"),
                HttpStatus.INTERNAL_SERVER_ERROR );
    }

    @ExceptionHandler(WeatherException.class)
    public ResponseEntity<ErrorDto> handleWeatherException(WeatherException e){
        log.error("weather exception",e);
        return new ResponseEntity<>(
                new ErrorDto(e.getStatus().value(),e.getMessage()),
                e.getStatus());
    }

    @ExceptionHandler(HttpClientErrorException.TooManyRequests.class)
    public ResponseEntity<ErrorDto> handleTooManyRequests(HttpClientErrorException.TooManyRequests e){
        log.error("too many requests",e);
        return new ResponseEntity<>(
                new ErrorDto(HttpStatus.TOO_MANY_REQUESTS.value(),"too many requests"),
                HttpStatus.TOO_MANY_REQUESTS);
    }
}
