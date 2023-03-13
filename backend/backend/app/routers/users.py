from fastapi import APIRouter, Depends

from ..database.models.users import fakeUser, User, UserInDB
from ..dependencies import oauth2_scheme


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(oauth2_scheme)],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
async def read_users() -> list[User]:
    return [fakeUser]


@router.get("/me")
async def read_user_me() -> User:
    return fakeUser


@router.get("/{user_id}")
async def read_user(user_id: str) -> User:
    return fakeUser


@router.post("/")
async def create_user(user: UserInDB) -> User:
    return fakeUser


@router.put("/{user_id}")
async def update_user(user_id: str, user: UserInDB) -> User:
    return fakeUser


@router.delete("/{user_id}")
async def delete_user(user_id: str) -> None:
    return
