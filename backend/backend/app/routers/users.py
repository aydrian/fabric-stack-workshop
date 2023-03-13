from fastapi import APIRouter
from pydantic import BaseModel


class UserInfoBase(BaseModel):
    username: str
    full_name: str
    is_admin: bool | None = False


class UserCreate(UserInfoBase):
    password: str


class UserInfo(UserInfoBase):
    id: int


router = APIRouter(
    prefix="/users", tags=["users"], responses={404: {"description": "Not found"}}
)


@router.get("/")
async def read_users():
    return []


@router.get("/me")
async def read_user_me():
    return {}


@router.get("/{user_id}")
async def read_user(user_id: str):
    return {}


@router.post("/")
async def create_user(user: UserCreate):
    return {}


@router.put("/{user_id}")
async def update_user(user_id: str, user: UserCreate):
    return {}


@router.delete("/{user_id}")
async def delete_user(user_id: str):
    return {}
