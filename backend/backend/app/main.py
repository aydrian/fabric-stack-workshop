from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import pool
from app.routers import auth, users, test_db_connection

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(test_db_connection.router)


@app.on_event("startup")
def open_pool():
    pool.open()


@app.on_event("shutdown")
def close_pool():
    pool.close()


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
