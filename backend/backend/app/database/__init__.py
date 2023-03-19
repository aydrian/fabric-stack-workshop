import psycopg
from psycopg.rows import dict_row
from app.config import settings


def get_db():
    db = psycopg.connect(settings.DATABASE_URL, row_factory=dict_row)
    try:
        yield db
    finally:
        db.close()
