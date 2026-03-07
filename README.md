# BrandVoice AI - Tweet Generator

A complete full-stack AI-powered tweet generation application with a dark, masculine SaaS design.

![BrandVoice AI](https://img.shields.io/badge/BrandVoice-AI-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![Java](https://img.shields.io/badge/Java-17-orange)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT-purple)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

BrandVoice AI is a professional SaaS tool that generates **10 on-brand tweets** based on your brand inputs. The application uses OpenAI's GPT models to:

1. **Analyze your brand voice** - Identifies tone, audience, and content themes
2. **Generate tailored tweets** - Creates 10 unique tweets matching your brand identity
3. **Provide actionable content** - Ready-to-post tweets with appropriate emojis and hashtags

### Design Philosophy

The UI follows a **masculine, professional SaaS aesthetic**:
- Dark theme with charcoal, deep blue, and steel gray
- Sharp edges and bold typography
- Minimalistic, developer-dashboard style
- Subtle animations and glassmorphism effects
- Clean, modern interface

---

## Features

### Core Features

- **Brand Input Form** - Collect brand name, industry, campaign objective, and product description
- **AI Brand Voice Analysis** - Automatically infers brand tone, target audience, and content themes
- **10 Tweet Generation** - Creates varied tweet styles (conversational, promotional, educational, engaging)
- **Copy Functionality** - One-click copy for individual tweets or all tweets
- **Regenerate Option** - Regenerate individual tweets if needed
- **Responsive Design** - Works on desktop, tablet, and mobile

### UI Features

- Dark gradient background with animated orbs
- Glassmorphism card design
- Smooth hover animations
- Loading states and toast notifications
- Mobile-friendly navigation

---

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Font Awesome** - Icons
- **Google Fonts** - Inter & Poppins typography

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Web framework
- **OpenAI Java Client** - GPT API integration
- **Lombok** - Boilerplate reduction
- **Maven** - Build tool

### AI Integration
- **OpenAI GPT-3.5 Turbo** or **GPT-4** - Language model
- **Custom Prompt Engineering** - Optimized for brand voice analysis

---

## Project Structure

```
brandvoice-ai/
├── frontend/                          # Frontend files
│   ├── index.html                     # Main HTML page
│   ├── style.css                      # Stylesheet (dark theme)
│   └── script.js                      # JavaScript functionality
│
├── backend/                           # Spring Boot backend
│   ├── pom.xml                        # Maven dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/brandvoice/tweetgenerator/
│       │   │   ├── TweetGeneratorApplication.java    # Main class
│       │   │   ├── config/
│       │   │   │   ├── OpenAIConfig.java             # OpenAI configuration
│       │   │   │   └── CorsConfig.java               # CORS configuration
│       │   │   ├── controller/
│       │   │   │   └── TweetController.java          # REST API controller
│       │   │   ├── service/
│       │   │   │   └── TweetService.java             # Business logic
│       │   │   ├── model/
│       │   │   │   ├── BrandInput.java               # Input DTO
│       │   │   │   └── TweetResponse.java            # Output DTO
│       │   │   └── exception/
│       │   │       └── GlobalExceptionHandler.java   # Error handling
│       │   └── resources/
│       │       └── application.properties            # Configuration
│       └── test/                      # Test files
│
└── README.md                          # This file
```

---

## Prerequisites

Before you begin, ensure you have:

### Required
- **Java 17** or higher - [Download](https://adoptium.net/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **OpenAI API Key** - [Get one](https://platform.openai.com/api-keys)
- **Modern web browser** - Chrome, Firefox, Safari, Edge

### Optional (for development)
- **IntelliJ IDEA** or **Eclipse** - Java IDE
- **VS Code** - For frontend editing
- **Git** - Version control

---

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd brandvoice-ai/backend
   ```

2. **Configure OpenAI API Key**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   openai.api.key=YOUR_ACTUAL_OPENAI_API_KEY_HERE
   ```
   
   Or set as environment variable:
   ```bash
   export OPENAI_API_KEY=your_api_key_here
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   
   Or run the JAR:
   ```bash
   java -jar target/tweet-generator-1.0.0.jar
   ```

5. **Verify the backend is running**
   
   Open browser or use curl:
   ```bash
   curl http://localhost:8080/api/v1/tweets/health
   ```
   
   Expected response:
   ```json
   {
     "status": "UP",
     "timestamp": "2024-01-15T10:30:00Z",
     "service": "BrandVoice AI Tweet Generator"
   }
   ```

### Frontend Setup

The frontend is static HTML/CSS/JS and can be served in multiple ways:

#### Option 1: Direct File Open (Simplest)
1. Navigate to `brandvoice-ai/frontend/`
2. Open `index.html` in your browser
3. Update the API URL in `script.js` if needed:
   ```javascript
   const CONFIG = {
       API_BASE_URL: 'http://localhost:8080'
   };
   ```

#### Option 2: VS Code Live Server (Recommended)
1. Install VS Code extension "Live Server"
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Server will start at `http://127.0.0.1:5500`

#### Option 3: Python Simple HTTP Server
```bash
cd brandvoice-ai/frontend
python3 -m http.server 3000
# Access at http://localhost:3000
```

#### Option 4: Node.js http-server
```bash
npm install -g http-server
cd brandvoice-ai/frontend
http-server -p 3000
# Access at http://localhost:3000
```

---

## Configuration

### Backend Configuration (`application.properties`)

```properties
# Server
server.port=8080

# OpenAI
openai.api.key=your_api_key_here
openai.model=gpt-3.5-turbo
openai.max-tokens=2000
openai.temperature=0.7

# CORS (for frontend)
cors.allowed-origins=http://localhost:3000,http://localhost:8080

# Logging
logging.level.com.brandvoice=DEBUG
```

### Frontend Configuration (`script.js`)

```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:8080',  // Change if backend runs elsewhere
    MAX_DESCRIPTION_LENGTH: 500
};
```

---

## API Documentation

### Endpoints

#### 1. Generate Tweets

```
POST /api/v1/tweets/generateTweets
```

**Request Body:**
```json
{
  "brandName": "TechFlow",
  "industry": "Tech",
  "campaignObjective": "Engagement",
  "productDescription": "AI-powered workflow automation tool for modern teams"
}
```

**Response:**
```json
{
  "brandVoiceSummary": [
    "Tone: Bold and innovative",
    "Audience: Tech-savvy professionals",
    "Themes: Productivity and automation",
    "Style: Conversational with technical depth"
  ],
  "tweets": [
    "Just launched our latest automation feature! Save 5 hours every week with TechFlow. Ready to supercharge your workflow? 🚀",
    "... 9 more tweets"
  ],
  "metadata": {
    "processingTimeMs": 2450,
    "modelUsed": "gpt-3.5-turbo",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### 2. Health Check

```
GET /api/v1/tweets/health
```

**Response:**
```json
{
  "status": "UP",
  "timestamp": "2024-01-15T10:30:00Z",
  "service": "BrandVoice AI Tweet Generator"
}
```

### Error Responses

**Validation Error (400):**
```json
{
  "error": "Validation failed",
  "details": {
    "industry": "Industry is required",
    "productDescription": "Product description must be at least 10 characters"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Server Error (500):**
```json
{
  "error": "Internal server error",
  "message": "Failed to generate tweets: API error",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Usage

### Step 1: Enter Brand Information

1. Open the frontend in your browser
2. Fill in the form:
   - **Brand Name** (optional): Your company name
   - **Industry**: Select from dropdown (Tech, Fashion, Fitness, etc.)
   - **Campaign Objective**: Choose your goal
   - **Product Description**: Describe your product/service

### Step 2: Generate Tweets

1. Click "Generate Tweets" button
2. Wait for AI analysis (2-5 seconds)
3. View your brand voice summary
4. Browse the 10 generated tweets

### Step 3: Use Your Tweets

- **Copy individual tweet**: Click "Copy Tweet" on any card
- **Copy all tweets**: Click "Copy All Tweets" button
- **Regenerate**: Click "Regenerate" to get a new version of a specific tweet
- **Start over**: Click "Generate New" to create a new batch

---

## Screenshots

### Input Form
Dark, professional form with glassmorphism card design

### Results Dashboard
Brand voice summary and tweet cards with copy/regenerate actions

---

## Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem:** Frontend shows CORS errors in console

**Solution:** 
- Ensure backend is running
- Check `cors.allowed-origins` in `application.properties`
- Add your frontend URL to the allowed origins

#### 2. OpenAI API Key Error

**Problem:** "OpenAI API key is not configured"

**Solution:**
- Verify your API key in `application.properties`
- Ensure key starts with `sk-`
- Check key hasn't expired at [OpenAI Dashboard](https://platform.openai.com/api-keys)

#### 3. Frontend Can't Connect to Backend

**Problem:** "Failed to generate tweets"

**Solution:**
- Verify backend is running on port 8080
- Check `API_BASE_URL` in `script.js`
- Ensure no firewall blocking the connection

#### 4. Maven Build Fails

**Problem:** Build errors

**Solution:**
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

### Debug Mode

Enable debug logging in `application.properties`:
```properties
logging.level.com.brandvoice=DEBUG
logging.level.org.springframework.web=DEBUG
```

---

## Development

### Running Tests

```bash
cd backend
mvn test
```

### Building for Production

```bash
cd backend
mvn clean package -DskipTests
```

### Docker Support (Optional)

Create a `Dockerfile` in backend directory:

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/tweet-generator-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Build and run:
```bash
docker build -t brandvoice-ai .
docker run -p 8080:8080 -e OPENAI_API_KEY=your_key brandvoice-ai
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@brandvoice.ai

---

## Acknowledgments

- OpenAI for the GPT API
- Spring Boot team for the excellent framework
- Font Awesome for icons
- Google Fonts for typography

---

**Built with passion by developers, for developers.** ⚡
