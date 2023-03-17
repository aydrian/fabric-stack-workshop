from fastapi import APIRouter, Depends

from app.models.users import ListUsersResponse, UserResponse
from app.database.models import fakeUser, User, UserInDB
from app.security import manager


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
async def read_users() -> ListUsersResponse:
    return ListUsersResponse(ok=True, users=[fakeUser], count=1)


@router.get("/me")
async def read_user_me(active_user=Depends(manager)) -> UserResponse:
    return UserResponse(ok=True, user=fakeUser)


@router.get("/{user_id}")
async def read_user(user_id: str) -> UserResponse:
    return UserResponse(ok=True, user=fakeUser)


@router.post("/")
async def create_user(user: UserInDB) -> UserResponse:
    return UserResponse(ok=True, user=fakeUser)


@router.put("/{user_id}")
async def update_user(user_id: str, user: UserInDB) -> UserResponse:
    return UserResponse(ok=True, user=fakeUser)


@router.delete("/{user_id}")
async def delete_user(user_id: str) -> None:
    return
