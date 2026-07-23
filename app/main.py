from fastapi import FastAPI
from app.models import webhookInput
from app.services import process_message

app = FastAPI(title="Nistula Guest Messaging System")

@app.post("/webhook/message")
def webhook_handler(payload: webhookInput):
    result =  process_message(payload)
    return result


@app.get("/health")
def health():
   return{
    "status": "ok",
    "service": "webhook-system"
}
