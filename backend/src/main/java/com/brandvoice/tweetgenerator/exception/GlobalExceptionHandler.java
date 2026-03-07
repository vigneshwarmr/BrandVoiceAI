package com.brandvoice.tweetgenerator.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * Global Exception Handler
 * 
 * Centralized exception handling for the entire application.
 * Provides consistent error responses across all controllers.
 * 
 * This class catches exceptions that aren't handled by specific
 * controller exception handlers and returns standardized error responses.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    /**
     * Generic exception handler
     * 
     * Catches any uncaught exceptions and returns a generic error response
     * 
     * @param ex the exception
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        log.error("Unhandled exception occurred", ex);
        
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Internal server error");
        response.put("message", "An unexpected error occurred. Please try again later.");
        response.put("timestamp", Instant.now().toString());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    
    /**
     * Illegal argument exception handler
     * 
     * @param ex the illegal argument exception
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.warn("Invalid argument: {}", ex.getMessage());
        
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Bad request");
        response.put("message", ex.getMessage());
        response.put("timestamp", Instant.now().toString());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
