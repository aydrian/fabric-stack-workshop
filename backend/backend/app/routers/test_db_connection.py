from fastapi import APIRouter, Depends
from psycopg import Connection
from app.database import get_db

router = APIRouter()


@router.get("/test-db-connection")
async def test_db(db: Connection = Depends(get_db)) -> list:
    with db.cursor() as cur:
        cur.execute("SELECT now()")
        res = cur.fetchall()
        db.commit()
        return res
