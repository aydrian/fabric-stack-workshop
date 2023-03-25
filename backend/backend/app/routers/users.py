from fastapi import APIRouter, Depends, HTTPException, status
from psycopg import Connection

from app.database import get_db
import app.database.actions as DBActions
from app.models.users import ListUsersResponse, UserResponse, UserUpdate
from app.security import manager


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
async def read_users(
    active_user=Depends(manager),
    db: Connection = Depends(get_db),
) -> ListUsersResponse:
    if not active_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    users = DBActions.get_users(db)
    return ListUsersResponse(ok=True, users=users, count=len(users))


@router.get("/me")
async def read_user_me(active_user=Depends(manager)) -> UserResponse:
    return UserResponse(ok=True, user=active_user)


@router.get("/{user_id}")
async def read_user(
    user_id: str,
    active_user=Depends(manager),
    db: Connection = Depends(get_db),
) -> UserResponse:
    if not active_user.is_admin or active_user.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    user = DBActions.get_user_by_id(user_id, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")
    return UserResponse(ok=True, user=user)


@router.put("/{user_id}")
async def update_user(
    user_id: str,
    user: UserUpdate,
    active_user=Depends(manager),
    db: Connection = Depends(get_db),
) -> UserResponse:
    if not (active_user.is_admin or active_user.id == user_id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    upd_user = DBActions.update_user(user_id, user, db)
    return UserResponse(ok=True, user=upd_user)


@router.delete("/{user_id}")
async def delete_user(
    user_id: str,
    active_user=Depends(manager),
    db: Connection = Depends(get_db),
) -> None:
    if not active_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    return DBActions.delete_user(user_id, db)
