import uuid

from app.classifier import classify_message
from app.claude_client import get_claude_reply
from app.db import SessionLocal
from app.db_models import Message
from app.models import webhookInput


def calculate_confidence(query_type: str, reply: str) -> float:
    """
    Simple confidence heuristic.
    """

    score = 0.75

    
    if query_type in [
        "pre_sales_availability",
        "pre_sales_pricing",
        "post_sales_checkin",
         "special_request"
    ]:
        score += 0.15

  
    if len(reply) > 80:
        score += 0.05

   
    if "sorry" in reply.lower() or "unable" in reply.lower():
        score -= 0.25

    return round(min(max(score, 0), 1), 2)


def process_message(payload: webhookInput):

    
    unified = {
        "message_id": uuid.uuid4(),
        "source": payload.source,
        "guest_name": payload.guest_name,
        "message_text": payload.message,
        "timestamp": payload.timestamp,
        "booking_ref": payload.booking_ref,
        "property_id": payload.property_id,
    }

   
    unified["query_type"] = classify_message(
        unified["message_text"]
    )

    try:

        print("\n" + "=" * 60)
        print("Claude API Called")
        print("Guest:", unified["guest_name"])
        print("Source:", unified["source"])
        print("Query Type:", unified["query_type"])

      
        reply = get_claude_reply(
            unified["message_text"]
        )

        print("AI Reply Generated")

        
        confidence = calculate_confidence(
            unified["query_type"],
            reply
        )

        if unified["query_type"] == "complaint":
            action = "escalate"

        elif confidence > 0.85:
            action = "auto_send"

        elif confidence >= 0.60:
            action = "agent_review"

        else:
            action = "escalate"

        print("Confidence Score:", confidence)
        print("Action:", action)

       
        try:
            db = SessionLocal()

            msg = Message(
                id=unified["message_id"],
                guest_name=unified["guest_name"],
                source=unified["source"],
                message_text=unified["message_text"],
                query_type=unified["query_type"],
                ai_reply=reply,
                confidence_score=confidence,
                action=action,
            )

            db.add(msg)
            db.commit()

            print("Message stored in PostgreSQL")

        except Exception as e:
            print("Database Error:", e)

        finally:
            db.close()

        print("=" * 60 + "\n")
 # Final API response
        return {
            "status": "success",
            "data": {
                "message_id": str(unified["message_id"]),
                "query_type": unified["query_type"],
                "drafted_reply": reply,
                "confidence_score": confidence,
                "action": action,
            }
        }

    except Exception as e:

        print("LLM/API Error:", e)

        fallback = (
            "Thanks for your message. "
            "Our support team is reviewing your request "
            "and will get back to you shortly."
        )

        return {
            "status": "error",
            "data": {
                "message_id": str(uuid.uuid4()),
                "query_type": unified["query_type"],
                "drafted_reply": fallback,
                "confidence_score": 0.25,
                "action": "escalate",
            }
        }