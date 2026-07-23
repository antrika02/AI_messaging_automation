from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime
from uuid import UUID


class webhookInput(BaseModel):
    source: Literal["whatsapp", "booking_com", "airbnb", "instagram", "direct"]
    guest_name: str
    message: str
    timestamp: datetime
    booking_ref: Optional[str] = None
    property_id: Optional[str] = None


class UnifiedMessage(BaseModel):
    message_id: UUID
    source: str
    guest_name: str
    message_text: str
    timestamp: datetime
    booking_ref: Optional[str]
    property_id: Optional[str]
    query_type: str

class webhookOutput(BaseModel):
    message_id: UUID
    query_type: str
    drafted_reply: str
    confidence_score: float
    action: Literal["auto_send","agent_review", "escalate"]
