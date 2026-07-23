from sqlalchemy import Column, String, DateTime, Float, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.db import Base

class Guest(Base):
    __tablename__ = "guest"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    guest_name = Column(String)
    source = Column(String)
    message_text = Column(Text)
    query_type = Column(String)

    ai_reply = Column(Text)
    confidence_score = Column(Float)
    action = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)
