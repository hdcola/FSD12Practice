package one.hdcola.server.exception;

import lombok.extern.log4j.Log4j2;
import one.hdcola.server.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDto> handleRuntimeException(RuntimeException e){
        log.error("runtime exception",e);
        return new ResponseEntity<>(
                new ErrorDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),"internal server error"),
                HttpStatus.INTERNAL_SERVER_ERROR );
    }

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<ErrorDto> handleCommonException(CommonException e){
        log.error("common exception",e);
        return new ResponseEntity<>(
                new ErrorDto(e.getStatus().value(),e.getMessage()),
                e.getStatus());
    }
}
