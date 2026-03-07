package com.brandvoice.tweetgenerator;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * BrandVoice AI - Tweet Generator Application
 * 
 * Main entry point for the Spring Boot application.
 * 
 * This application provides an AI-powered tweet generation service
 * that analyzes brand inputs and generates on-brand Twitter content.
 * 
 * Features:
 * - Brand voice analysis using OpenAI's LLM
 * - Generation of 10 tailored tweets per request
 * - REST API for frontend integration
 * - Input validation and error handling
 * 
 * @author BrandVoice AI Team
 * @version 1.0.0
 */
@SpringBootApplication
@Slf4j
public class TweetGeneratorApplication {
    
    /**
     * Application entry point
     * 
     * @param args command line arguments
     */
    public static void main(String[] args) {
        log.info("Starting BrandVoice AI - Tweet Generator Application");
        
        SpringApplication.run(TweetGeneratorApplication.class, args);
        
        log.info("BrandVoice AI Application started successfully");
        log.info("API Documentation:");
        log.info("  POST /api/v1/tweets/generateTweets - Generate tweets");
        log.info("  GET  /api/v1/tweets/health - Health check");
    }
}
