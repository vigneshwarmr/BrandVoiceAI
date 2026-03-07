package com.brandvoice.tweetgenerator.controller;

import com.brandvoice.tweetgenerator.model.BrandInput;
import com.brandvoice.tweetgenerator.model.TweetResponse;
import com.brandvoice.tweetgenerator.service.TweetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * TweetController
 * 
 * REST API Controller for tweet generation endpoints.
 * Handles HTTP requests and delegates business logic to TweetService.
 * 
 * Base Path: /api/v1/tweets
 * 
 * Endpoints:
 * - POST /generateTweets - Generate tweets based on brand input
 * - GET /health - Health check endpoint
 */
@RestController
@RequestMapping("/api/v1/tweets")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // CORS is handled by CorsConfig, this is extra safety
public class TweetController {
    
    private final TweetService tweetService;
    
    /**
     * Generate tweets based on brand input
     * 
     * POST /api/v1/tweets/generateTweets
     * 
     * Request Body:
     * {
     *   "brandName": "TechFlow",
     *   "industry": "Tech",
     *   "campaignObjective": "Engagement",
     *   "productDescription": "AI-powered workflow automation tool"
     * }
     * 
     * Response:
     * {
     *   "brandVoiceSummary": ["Tone: Bold and innovative", ...],
     *   "tweets": ["Tweet 1...", "Tweet 2...", ...],
     *   "metadata": {...}
     * }
     * 
     * @param input the brand input data
     * @return ResponseEntity with TweetResponse
     */
    @PostMapping("/generateTweets")
    public ResponseEntity<TweetResponse> generateTweets(
            @Valid @RequestBody BrandInput input) {
        
        log.info("Received tweet generation request for brand: {}", 
            input.getBrandName() != null ? input.getBrandName() : "N/A");
        
        try {
            // Call service to generate tweets
            TweetResponse response = tweetService.generateTweets(input);
            
            log.info("Successfully generated {} tweets", response.getTweetCount());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error generating tweets", e);
            throw e; // Will be handled by exception handler
        }
    }
    
    /**
     * Alternative endpoint for generating tweets (root path)
     * 
     * POST /generateTweets
     * 
     * This endpoint is provided for simpler frontend integration
     * 
     * @param input the brand input data
     * @return ResponseEntity with TweetResponse
     */
    @PostMapping("/generate")
    public ResponseEntity<TweetResponse> generateTweetsAlternative(
            @Valid @RequestBody BrandInput input) {
        return generateTweets(input);
    }
    
    /**
     * Health check endpoint
     * 
     * GET /api/v1/tweets/health
     * 
     * @return ResponseEntity with health status
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", Instant.now().toString());
        response.put("service", "BrandVoice AI Tweet Generator");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Exception handler for validation errors
     * 
     * Handles @Valid annotation validation failures
     * Returns a map of field errors
     * 
     * @param ex the validation exception
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Validation failed");
        response.put("details", errors);
        response.put("timestamp", Instant.now().toString());
        
        log.warn("Validation failed: {}", errors);
        
        return ResponseEntity.badRequest().body(response);
    }
    
    /**
     * Exception handler for runtime errors
     * 
     * @param ex the runtime exception
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Internal server error");
        response.put("message", ex.getMessage());
        response.put("timestamp", Instant.now().toString());
        
        log.error("Runtime error: {}", ex.getMessage(), ex);
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    
    /**
     * Exception handler for illegal state errors (e.g., missing API key)
     * 
     * @param ex the illegal state exception
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public ResponseEntity<Map<String, Object>> handleIllegalStateException(IllegalStateException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Service unavailable");
        response.put("message", ex.getMessage());
        response.put("timestamp", Instant.now().toString());
        
        log.error("Service unavailable: {}", ex.getMessage());
        
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
}
