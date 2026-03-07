package com.brandvoice.tweetgenerator.service;

import com.brandvoice.tweetgenerator.model.BrandInput;
import com.brandvoice.tweetgenerator.model.TweetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TweetService {

    private final GroqService groqService;

    public TweetResponse generateTweets(BrandInput input) {

        String prompt = buildPrompt(input);

        String aiResponse = groqService.generateTweets(prompt);

       List<String> tweets = Arrays.stream(aiResponse.split("\n"))
        .map(String::trim)
        .filter(tweet -> !tweet.isEmpty())
        .toList();
        return TweetResponse.builder()
        .brandVoiceSummary(List.of(
                "Tone: " + input.getTone(),
                "Audience: " + input.getTargetAudience()
        ))
        .tweets(tweets)
        .build();
    }

    private String buildPrompt(BrandInput input) {

        return "You are a professional social media strategist.\n\n" +
    
                "Generate EXACTLY 10 engaging tweets for this brand.\n\n" +
    
                "Brand Name: " + input.getBrandName() + "\n" +
                "Industry: " + input.getIndustry() + "\n" +
                "Campaign Objective: " + input.getCampaignObjective() + "\n" +
                "Product Description: " + input.getProductDescription() + "\n\n" +
    
                "Rules:\n" +
                "- Each tweet must be under 280 characters\n" +
                "- Include hashtags\n" +
                "- Make them engaging and natural\n" +
                "- Do NOT include explanations\n" +
                "- Do NOT include numbering like 'Tweet 1'\n" +
                "- Return ONLY the tweets\n" +
                "- Each tweet must be on a NEW LINE\n\n" +
    
                "Output format example:\n" +
                "Tweet text here #hashtag\n" +
                "Another tweet here #hashtag\n" +
                "Another tweet here #hashtag\n\n" +
    
                "Tweets:";
    }
}