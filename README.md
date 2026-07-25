# AI Guest Messaging Automation

An AI-powered full-stack guest messaging automation platform built with **FastAPI**, **React**, **PostgreSQL**, and **Claude AI**. The system processes guest messages received from booking platforms such as Airbnb, Booking.com, and WhatsApp, intelligently classifies customer intent, generates contextual AI-powered replies, applies confidence-based automation logic, and provides a modern dashboard for monitoring guest interactions.

---

## Overview

Managing guest communication across multiple booking platforms can become repetitive and time-consuming. This project automates that workflow by combining Large Language Models with backend business logic to generate intelligent responses while maintaining human oversight for uncertain cases.

The application receives guest messages, classifies the query, generates a contextual draft response using Claude AI, calculates a confidence score, determines the recommended action (Auto Send, Agent Review, or Escalate), stores the interaction in PostgreSQL, and visualizes processed messages through a modern React dashboard.

---

# Live Demo

### Frontend



---

### Backend API



---

### Swagger Documentation



---


# Features

### AI Message Processing

- AI-powered guest reply generation using Claude AI
- Intelligent guest query classification
- Confidence-based response evaluation
- Automatic recommendation engine
- Human-in-the-loop escalation workflow

---

### Multi Platform Support

Supports guest messages from

- Airbnb
- Booking.com
- WhatsApp

---

### Intelligent Query Classification

Automatically classifies messages into categories including:

- Pricing
- Availability
- Booking Information
- Complaints
- Special Requests
- General Questions

---

### Confidence-Based Automation

The system determines whether a response should be:

🟢 Auto Send

🟡 Agent Review

🔴 Escalate

---

### Professional Frontend

- Modern React UI
- Responsive design
- Loading indicators
- Error handling
- AI confidence badges
- Copy-to-clipboard support
- Toast notifications
- Dashboard analytics
- Recent message history

---

### Dashboard Analytics

Displays

- Total processed messages
- Average confidence score
- Number of escalations
- Auto-sent responses
- Recent guest interactions

---

### Database Integration

All guest interactions are stored in PostgreSQL for

- Analytics
- Audit logging
- Historical tracking
- Future reporting

---

# 🏗 System Architecture

```
                    Guest Message

                           │

                           ▼

              FastAPI Webhook Endpoint

                           │

                           ▼

                 Query Classification

                           │

                           ▼

                 Claude AI Generation

                           │

                           ▼

            Confidence Score Calculation

                           │

                           ▼

        Auto Send / Agent Review / Escalate

                           │

                           ▼

               PostgreSQL Database

                           │

                           ▼

              React Dashboard UI
```

---

# ⚙ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic

---

## Database

- PostgreSQL

---

## AI

- Claude AI API (Anthropic)

---

## Deployment

- Render *(Backend)*
- Vercel *(Frontend)*

---

## Development Tools

- Git
- GitHub
- VS Code
- Swagger UI

---

# 📂 Project Structure

```
AI_Messaging_Automation/

│
├── app/
│   ├── main.py
│   ├── db.py
│   ├── models.py
│   ├── db_models.py
│   ├── services.py
│   ├── classifier.py
│   ├── claude_client.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── MessageForm.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── schema.sql
├── requirements.txt
├── thinking.md
└── README.md
```

---

# 🛠 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI_Messaging_Automation.git

cd AI_Messaging_Automation
```

---

# Backend Setup

## Create Virtual Environment

Mac/Linux

```bash
python3 -m venv .venv

source .venv/bin/activate
```

Windows

```bash
python -m venv .venv

.venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file

```env
CLAUDE_API_KEY=your_claude_api_key

DATABASE_URL=your_postgresql_database_url
```

---

## Run Backend

```bash
uvicorn app.main:app --reload --port 8000
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate into frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run React

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Endpoint

## POST

```
/webhook/message
```

Processes guest messages and returns

- Query classification
- AI draft reply
- Confidence score
- Recommended action

---

## Sample Request

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

## Sample Response

```json
{
  "status": "success",
  "data": {
    "message_id": "589b5d06-c33a-4e13-8173-2844509956ab",
    "query_type": "availability",
    "drafted_reply": "Hello Rahul,\n\nYes, Villa B1 is available...",
    "confidence_score": 0.95,
    "action": "auto_send"
  }
}
```

---

# Confidence Scoring Logic

| Score | Recommended Action |
|---------|-------------------|
| ≥ 0.90 | 🟢 Auto Send |
| 0.60 – 0.89 | 🟡 Agent Review |
| < 0.60 | 🔴 Escalate |

Additional business rules:

- Complaints are automatically escalated.
- Low-confidence AI responses require human review.
- High-confidence responses can be automatically sent.

---

# Current Features

- AI-powered guest messaging
- Claude AI integration
- PostgreSQL persistence
- FastAPI REST APIs
- React frontend
- Analytics dashboard
- Confidence scoring
- Human review workflow
- Loading states
- Toast notifications
- Copy AI reply
- Responsive UI

---

# Learning Outcomes

This project demonstrates practical experience with:

- FastAPI backend development
- REST API design
- SQLAlchemy ORM
- PostgreSQL integration
- React component architecture
- API consumption with Axios
- State management using React Hooks
- Prompt engineering
- Claude AI integration
- Confidence-based business logic
- Production UI design
- Full-stack application development

---

# Author

**Antrika Kashyap**

GitHub

> https://github.com/antrika02

LinkedIn

> https://www.linkedin.com/in/antrika-kashyap-070502250/

---
