from psycopg_pool import ConnectionPool
from psycopg.rows import dict_row
from app.config import settings

pool = ConnectionPool(
    settings.DATABASE_URL, open=False, kwargs={"row_factory": dict_row}
)


def get_db():
    with pool.connection() as conn:
        yield conn
