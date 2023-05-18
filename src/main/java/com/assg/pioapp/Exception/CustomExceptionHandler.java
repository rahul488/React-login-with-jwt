package com.assg.pioapp.Exception;

import com.assg.pioapp.DTO.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponseDto> handleCustomerNotFoundException(CustomerNotFoundException ex) {
        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setMessage(ex.getMessage());
        errorResponseDto.setStatus(HttpStatus.FORBIDDEN);
        errorResponseDto.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(errorResponseDto, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponseDto> handleTodoNotFoundException(TodoNotFoundException ex) {
        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setMessage(ex.getMessage());
        errorResponseDto.setStatus(HttpStatus.FORBIDDEN);
        errorResponseDto.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(errorResponseDto, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponseDto> handleException(Exception ex) {
        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setMessage("Some thing went wrong");
        errorResponseDto.setStatus(HttpStatus.NOT_ACCEPTABLE);
        errorResponseDto.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(errorResponseDto, HttpStatus.NOT_ACCEPTABLE);
    }

}
