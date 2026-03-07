package com.brandvoice.tweetgenerator.service;

import com.brandvoice.tweetgenerator.config.GroqConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GroqService {

    private final GroqConfig groqConfig;

    public GroqService(GroqConfig groqConfig) {
        this.groqConfig = groqConfig;
    }

    public String generateTweets(String prompt) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqConfig.getApiKey());

        Map<String, Object> body = new HashMap<>();
        body.put("model", groqConfig.getModel());
        body.put("max_tokens", 500);
        body.put("temperature", 0.7);

        List<Map<String, String>> messages = new ArrayList<>();

        Map<String, String> msg = new HashMap<>();
        msg.put("role", "user");
        msg.put("content", prompt);

        messages.add(msg);
        body.put("messages", messages);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(
                        groqConfig.getApiUrl(),
                        request,
                        String.class
                );

        return extractTweets(response.getBody());
    }

    /**
     * Extract tweet text from Groq JSON response
     */
    private String extractTweets(String responseJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            return "Error parsing AI response";
        }
    }
}