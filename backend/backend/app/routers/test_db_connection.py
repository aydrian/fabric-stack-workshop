from fastapi import APIRouter, Depends
from psycopg import Connection
from app.database import get_db

router = APIRouter()


@router.get("/test-db-connection")
async def test_db(db: Connection = Depends(get_db)) -> list:
    res = db.execute("SELECT now()").fetchall()
    return res
