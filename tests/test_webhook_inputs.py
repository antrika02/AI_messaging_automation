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


def main():
    for p in payloads:
        r = requests.post(ENDPOINT, json=p, timeout=60)
        r.raise_for_status()
        data = r.json()

        assert set(data.keys()) == {
            "message_id",
            "query_type",
            "drafted_reply",
            "confidence_score",
            "action",
        }
        assert isinstance(data["message_id"], str)
        assert data["query_type"] in {
            "pre_sales_availability",
            "pre_sales_pricing",
            "post_sales_checkin",
            "special_request",
            "complaint",
            "general_enquiry",
        }
        assert isinstance(data["drafted_reply"], str) and data["drafted_reply"]
        assert isinstance(data["confidence_score"], (int, float))
        assert 0 <= float(data["confidence_score"]) <= 1
        assert data["action"] in {"auto_send", "agent_review", "escalate"}

        print("OK:", p["guest_name"], "->", data["action"], data["query_type"], data["confidence_score"])


if __name__ == "__main__":
    main()

