from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import Base, engine
import app.db_models

Base.metadata.create_all(bind=engine)

from app.models import webhookInput
from app.services import process_message
app = FastAPI(title="Nistula Guest Messaging System")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-messaging-automation.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Nistula Guest Messaging System"
    }

@app.post("/webhook/message")
def webhook_handler(payload: webhookInput):
    result = process_message(payload)
    return result

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "webhook-system"
    }