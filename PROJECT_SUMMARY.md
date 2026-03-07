# BrandVoice AI - Project Summary

## Live Demo

**Frontend UI:** https://pkbyb73kq4kn4.ok.kimi.link

---

## Complete Project Structure

```
brandvoice-ai/
├── frontend/                          # Frontend (HTML/CSS/JS)
│   ├── index.html                     # Main page with form & results
│   ├── style.css                      # Dark masculine theme styles
│   └── script.js                      # Form handling & API calls
│
├── backend/                           # Spring Boot Backend
│   ├── pom.xml                        # Maven dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/brandvoice/tweetgenerator/
│       │   │   ├── TweetGeneratorApplication.java    # Main Spring Boot class
│       │   │   ├── config/
│       │   │   │   ├── OpenAIConfig.java             # OpenAI API configuration
│       │   │   │   └── CorsConfig.java               # CORS for frontend access
│       │   │   ├── controller/
│       │   │   │   └── TweetController.java          # REST API endpoints
│       │   │   ├── service/
│       │   │   │   └── TweetService.java             # Business logic & AI prompts
│       │   │   ├── model/
│       │   │   │   ├── BrandInput.java               # Input DTO with validation
│       │   │   │   └── TweetResponse.java            # Output DTO
│       │   │   └── exception/
│       │   │       └── GlobalExceptionHandler.java   # Centralized error handling
│       │   └── resources/
│       │       └── application.properties            # App configuration
│       └── test/                      # Unit tests (add your own)
│
├── README.md                          # Full documentation
├── QUICKSTART.md                      # 5-minute setup guide
├── .gitignore                         # Git ignore rules
└── PROJECT_SUMMARY.md                 # This file
```

---

## Key Features Implemented

### Frontend
- Dark masculine SaaS design with glassmorphism
- Animated gradient orbs background
- Form validation with character counting
- Loading states and toast notifications
- Responsive mobile design
- Copy to clipboard functionality
- Individual tweet regeneration

### Backend
- Spring Boot 3.2.0 with Java 17
- OpenAI GPT integration
- Input validation with Jakarta Validation
- CORS configuration for frontend
- Comprehensive error handling
- RESTful API design
- Structured JSON responses

### AI Integration
- Brand voice analysis (tone, audience, themes)
- 10 tweet generation per request
- Campaign objective-aware content
- Emoji and hashtag optimization
- Character limit compliance (280 chars)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/tweets/generateTweets` | Generate tweets |
| GET | `/api/v1/tweets/health` | Health check |

---

## How to Run

### 1. Backend
```bash
cd backend
# Edit src/main/resources/application.properties - add your OpenAI key
mvn spring-boot:run
```

### 2. Frontend
```bash
cd frontend
# Open index.html in browser or use Live Server
```

---

## Configuration

### Backend (`application.properties`)
```properties
openai.api.key=YOUR_OPENAI_API_KEY
server.port=8080
cors.allowed-origins=http://localhost:3000
```

### Frontend (`script.js`)
```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:8080'
};
```

---

## Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Java 17, Spring Boot 3.2.0 |
| AI | OpenAI GPT-3.5 Turbo / GPT-4 |
| Build | Maven |
| Icons | Font Awesome 6 |
| Fonts | Inter, Poppins (Google Fonts) |

---

## Design Highlights

- **Colors**: Black (#0a0a0f), Charcoal (#12121a), Deep Blue (#3b82f6), Steel Gray (#64748b)
- **Typography**: Inter (body), Poppins (headings)
- **Effects**: Glassmorphism, gradient orbs, smooth animations
- **Layout**: Clean dashboard style, card-based design

---

## Next Steps

1. Add your OpenAI API key to `backend/src/main/resources/application.properties`
2. Start the backend with `mvn spring-boot:run`
3. Open the frontend in your browser
4. Start generating tweets!

---

**Built for developers who appreciate clean, professional design.** ⚡
