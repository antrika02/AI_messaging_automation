
CREATE TABLE IF NOT EXISTS guest_profiles (
    guest_profile_id UUID PRIMARY KEY,
    guest_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS reservations (
    reservation_id UUID PRIMARY KEY,
    booking_ref TEXT UNIQUE,
    property_id TEXT,
    checkin_date DATE,
    checkout_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
    conversation_id UUID PRIMARY KEY,
    guest_profile_id UUID NOT NULL REFERENCES guest_profiles(guest_profile_id),
    reservation_id UUID REFERENCES reservations(reservation_id),
    property_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS messages (
    message_id UUID PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES conversations(conversation_id),

    source TEXT NOT NULL, -- whatsapp, booking_com, airbnb, instagram, direct
    guest_name TEXT NOT NULL,
    message_text TEXT NOT NULL,
    message_timestamp TIMESTAMPTZ,

    booking_ref TEXT,
    property_id TEXT,

   
    query_type TEXT NOT NULL,

    
    ai_drafted BOOLEAN NOT NULL DEFAULT FALSE,
    ai_reply_text TEXT,

    agent_edited BOOLEAN NOT NULL DEFAULT FALSE,
    agent_final_reply_text TEXT,

    auto_sent BOOLEAN NOT NULL DEFAULT FALSE,

    -- Confidence score and auditing
    ai_confidence_score DOUBLE PRECISION,
    drafted_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_message_timestamp ON messages(message_timestamp);


