from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.config import settings

Base = declarative_base()


try:
    engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
except Exception:  # pragma: no cover
    engine = None

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db():
    if engine is None:
        raise RuntimeError("Database engine not configured. Check DATABASE_URL and DB driver installation.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


