from app.db import Base, engine
from app import db_models

def init_database():
    print("Creating PostgreSQL tables...")
    Base.metadata.create_all(bind=engine)
    print("Database setup complete")

if __name__ == "__main__":
    init_database()