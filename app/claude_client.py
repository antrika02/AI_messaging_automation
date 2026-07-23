
import requests

from app.config import settings

MOCK_CONTEXT = """
Property: Villa B1, Assagao, North Goa
Bedrooms: 3 | Max guests: 6 | Private pool: Yes
Check-in: 2pm | Check-out: 11am
Base rate: INR 18,000 per night (up to 4 guests)
Extra guest: INR 2,000 per night per person
WiFi password: Nistula@2024
Caretaker: Available 8am to 10pm
Chef on call: Yes, pre-booking required
Availability April 20-24: Available
Cancellation: Free up to 7 days before check-in
"""

def get_claude_reply(message_text:str):

    prompt = f"""
You are a professional villa concierge assistant.

Use the context below as authoritative property details.

Property context:
{MOCK_CONTEXT}

Guest message:
{message_text}

Write a polite, helpful reply that addresses the guest’s question or concern directly. Keep it concise and actionable.

"""
    

    headers = {
        "x-api-key": settings.CLAUDE_API_KEY,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"

    }
    
    payload = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 300,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    try:

        print("Calling Claude API...")
        print("CLAUDE KEY:", settings.CLAUDE_API_KEY[:20])
        print("CLAUDE URL:", settings.CLAUDE_API_URL)

        response = requests.post(
            settings.CLAUDE_API_URL,
            json=payload,
            headers=headers,
            timeout=30
        )

        print("Status Code:", response.status_code)
        print("Raw Response:", response.text)

        response.raise_for_status()

        data = response.json()

        return data["content"][0]["text"]

    except Exception as e:

        print("Claude API Error:", str(e))

        return (
            "Thanks for your message. "
            "Our team is reviewing it and will get back to you shortly."
        )