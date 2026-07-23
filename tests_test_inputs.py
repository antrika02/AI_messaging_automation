import json
import uuid
from datetime import datetime, timezone

import requests

ENDPOINT = "http://127.0.0.1:8000/webhook/message"

payloads = [
    {
        "source": "whatsapp",
        "guest_name": "Rahul Sharma",
        "message": "Is the villa available from April 20 to 24? What is the rate for 2 adults?",
        "timestamp": "2026-05-05T10:30:00Z",
        "booking_ref": "NIS-2024-0891",
        "property_id": "villa-b1",
    },
    {
        "source": "booking_com",
        "guest_name": "Ananya Singh",
        "message": "Hi, what is the price for 2 adults for 3 nights? Also do you have a pool?",
        "timestamp": "2026-05-05T12:00:00Z",
        "booking_ref": "NIS-2024-0902",
        "property_id": "villa-b1",
    },
    {
        "source": "airbnb",
        "guest_name": "Vikram Mehta",
        "message": "There is no hot water and we have guests arriving for breakfast in 4 hours. I am not happy. I want a refund for tonight.",
        "timestamp": "2026-05-05T02:10:00Z",
        "booking_ref": "NIS-2024-0911",
        "property_id": "villa-b1",
    },
]


def run():
    for p in payloads:
        r = requests.post(ENDPOINT, json=p, timeout=60)
        r.raise_for_status()
        data = r.json()

        assert "message_id" in data
        assert "query_type" in data
        assert "drafted_reply" in data
        assert "confidence_score" in data
        assert "action" in data

        print("OK:", p["guest_name"], "->", data["action"], data["query_type"], data["confidence_score"])


if __name__ == "__main__":
    run()

