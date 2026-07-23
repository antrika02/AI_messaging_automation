import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY", "")
    CLAUDE_API_URL = os.getenv("CLAUDE_API_URL", "https://api.anthropic.com/v1/messages")
    DATABASE_URL = os.getenv("DATABASE_URL", "")

settings = Settings()

