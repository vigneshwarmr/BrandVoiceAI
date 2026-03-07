package com.brandvoice.tweetgenerator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * TweetResponse Model
 * 
 * Represents the response from the tweet generation API.
 * Contains the brand voice analysis summary and the generated tweets.
 * 
 * This is the output DTO (Data Transfer Object) sent back to the frontend.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor



public class TweetResponse {
    
    /**
     * Brand Voice Summary
     * AI-generated analysis of the brand's voice characteristics
     * Contains 3-4 bullet points describing:
     * - Brand Tone (e.g., witty, bold, premium)
     * - Target Audience (e.g., Gen Z, professionals)
     * - Content Themes (e.g., product features, trends)
     * - Communication Style (e.g., conversational, formal)
     */
    private List<String> brandVoiceSummary;
    
    /**
     * Generated Tweets
     * List of 10 AI-generated tweets based on the brand voice analysis
     * Each tweet is:
     * - Within Twitter's character limit (280 characters)
     * - On-brand and aligned with campaign objective
     * - May include emojis and hashtags where appropriate
     */
    private List<String> tweets;
    
    /**
     * Response Metadata (optional)
     * Additional information about the generation
     */
    private ResponseMetadata metadata;
    
    /**
     * Static factory method to create a simple response
     * 
     * @param summary the brand voice summary
     * @param tweets the generated tweets
     * @return a new TweetResponse instance
     */
    public static TweetResponse of(List<String> summary, List<String> tweets) {
        return TweetResponse.builder()
            .brandVoiceSummary(summary)
            .tweets(tweets)
            .build();
    }
    
    /**
     * Gets the number of generated tweets
     * 
     * @return count of tweets
     */
    public int getTweetCount() {
        return tweets != null ? tweets.size() : 0;
    }
    
    /**
     * Checks if the response contains valid data
     * 
     * @return true if both summary and tweets are present
     */
    public boolean isValid() {
        return brandVoiceSummary != null && !brandVoiceSummary.isEmpty()
            && tweets != null && !tweets.isEmpty();
    }
    
    /**
     * Inner class for response metadata
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseMetadata {
        
        /**
         * Processing time in milliseconds
         */
        private long processingTimeMs;
        
        /**
         * AI model used for generation
         */
        private String modelUsed;
        
        /**
         * Timestamp of the response
         */
        private String timestamp;
    }
}
