from fastapi import APIRouter, Depends

from app.models.users import ListUsersResponse, UserResponse
from app.database.models import users, UserInDB
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
    return ListUsersResponse(ok=True, users=users, count=len(users))


@router.get("/me")
async def read_user_me(active_user=Depends(manager)) -> UserResponse:
    user = next((user for user in users if user.username == active_user.username), None)
    return UserResponse(ok=True, user=user)


@router.get("/{user_id}")
async def read_user(user_id: str) -> UserResponse:
    user = next((user for user in users if user.id == user_id), None)
    return UserResponse(ok=True, user=user)


@router.post("/")
async def create_user(user: UserInDB) -> UserResponse:
    return UserResponse(ok=True, user=users[0])


@router.put("/{user_id}")
async def update_user(user_id: str, user: UserInDB) -> UserResponse:
    return UserResponse(ok=True, user=users[0])


@router.delete("/{user_id}")
async def delete_user(user_id: str) -> None:
    return
