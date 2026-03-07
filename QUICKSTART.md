# BrandVoice AI - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Java 17+ installed
- Maven 3.8+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

---

## Step 1: Configure API Key

Edit `backend/src/main/resources/application.properties`:

```properties
openai.api.key=sk-your-actual-api-key-here
```

---

## Step 2: Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080`

Test it: `curl http://localhost:8080/api/v1/tweets/health`

---

## Step 3: Start Frontend

### Option A: VS Code Live Server (Recommended)
1. Install "Live Server" extension
2. Right-click `frontend/index.html` → "Open with Live Server"
3. Opens at `http://127.0.0.1:5500`

### Option B: Python
```bash
cd frontend
python3 -m http.server 3000
```
Open: `http://localhost:3000`

### Option C: Direct Open
Simply open `frontend/index.html` in your browser.

---

## Step 4: Generate Tweets!

1. Fill in the form on the webpage
2. Click "Generate Tweets"
3. Get your AI-generated tweets!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure backend is running on port 8080 |
| API key error | Check your OpenAI key in application.properties |
| Port 8080 in use | Change `server.port` in application.properties |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/tweets/generateTweets` | POST | Generate tweets |
| `/api/v1/tweets/health` | GET | Health check |

---

**That's it! Happy tweeting! 🚀**
