 # Nistula Technical Assessment

An AI-powered guest messaging automation backend built using FastAPI and PostgreSQL. The system processes guest messages received from platforms like Airbnb, WhatsApp, and Booking.com through a webhook API, classifies the intent of the message, generates AI-powered draft replies using Claude AI, and applies confidence-based escalation logic for automated handling.

## Features

* FastAPI backend with REST API endpoints
* AI-powered guest message automation
* Supports multiple booking platforms:

  * Airbnb
  * WhatsApp
  * Booking.com
* Intelligent query classification:

  * Pricing
  * Availability
  * Complaints
  * Special Requests
* Automated draft reply generation using Claude AI
* Confidence scoring and escalation workflow
* PostgreSQL database integration
* Live deployment on Render
* Interactive Swagger API documentation

---

# Live API

**Swagger Docs:**
https://nistula-technical-assessment-5eg6.onrender.com/docs

---

# Tech Stack

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy
* Claude AI API
* Render Deployment

---

# Project Structure

```bash
app/
│
├── main.py
├── services.py
├── classifier.py
├── claude_client.py
├── db.py
├── db_models.py
├── models.py
│
schema.sql
requirements.txt
thinking.md
README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd nistula-technical-assessment
```

---

## 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```


---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file and configure:

```env
CLAUDE_API_KEY=your_claude_api_key
DATABASE_URL=your_postgresql_database_url
```

---

# Run Application

```bash
uvicorn app.main:app --reload --port 8000
```

Server runs on:

```bash
http://127.0.0.1:8000
```

Swagger docs:

```bash
http://127.0.0.1:8000/docs
```

---

# API Endpoint

## POST `/webhook/message`

Processes incoming guest messages and returns:

* Query classification
* AI-generated draft reply
* Confidence score
* Recommended action

---

# Sample Request

```json
{
  "source": "airbnb",
  "guest_name": "Rahul Sharma",
  "message": "Is the villa available from April 20 to 24?",
  "timestamp": "2026-05-13T10:00:00Z",
  "booking_ref": "NIS-2026-1001",
  "property_id": "villa-b1"
}
```

---

# Sample Response

```json
{
  "status": "success",
  "data": {
    "message_id": "589b5d06-c33a-4e13-8173-2844509956ab",
    "query_type": "pre_sales_pricing",
    "drafted_reply": "Hello! Thank you for your inquiry about Villa B1.\n\nOur room rate is **INR 18,000 per night** for up to 4 guests. If you have additional guests (up to 6 maximum), there's an extra charge of INR 2,000 per night per person.\n\nThe villa features 3 bedrooms, a private pool, and can accommodate up to 6 guests total.\n\nPlease let me know your travel dates and number of guests, and I'll be happy to provide you with the exact pricing and check availability for your stay.\n\nBest regards,\nVilla Concierge Team",
    "confidence_score": 0.95,
    "action": "auto_send"
  }
}
```

---

# Confidence Scoring Logic

Location: `app/services.py`

## Heuristic Rules

| Rule                               | Score |
| ---------------------------------- | ----- |
| Base score                         | 0.75  |
| Pricing / Availability query       | +0.15 |
| Reply length > 80 chars            | +0.05 |
| Reply contains "sorry" or "unable" | -0.25 |

---

# Action Logic

| Confidence Score | Action       |
| ---------------- | ------------ |
| > 0.85           | auto_send    |
| 0.60 - 0.85      | agent_review |
| < 0.60           | escalate     |

Complaints are automatically escalated for safety.

---

# Database

Guest interactions are stored in PostgreSQL for:

* Tracking
* Auditing
* Analytics
* Future escalation workflows

Database schema available in:

```bash
schema.sql
```

---

# Additional Files

| File               | Purpose                  |
| ------------------ | ------------------------ |
| `schema.sql`       | PostgreSQL schema        |
| `thinking.md`      | Technical design answers |
| `services.py`      | Core processing logic    |
| `classifier.py`    | Query classification     |
| `claude_client.py` | Claude AI integration    |

---

# Deployment

The backend is deployed on Render with live API endpoints.

Deployment includes:

* FastAPI backend
* PostgreSQL integration
* Swagger documentation
* Production-ready webhook API

---

# Author

Ayush Raj
