import os
from dotenv import load_dotenv

loaded = load_dotenv()

print("=" * 60)
print("Dotenv Loaded:", loaded)
print("Claude Key:", repr(os.getenv("CLAUDE_API_KEY")))
print("Claude URL:", repr(os.getenv("CLAUDE_API_URL")))
print("Database URL:", repr(os.getenv("DATABASE_URL")))
print("=" * 60)

class Settings:
    CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY", "")
    CLAUDE_API_URL = os.getenv(
        "CLAUDE_API_URL",
        "https://api.anthropic.com/v1/messages",
    )
    DATABASE_URL = os.getenv("DATABASE_URL", "")

settings = Settings()