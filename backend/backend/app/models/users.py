from typing import Optional
from pydantic import BaseModel

from app.models.common import BaseResponse, ListResponse
from app.database.models import User


class UserResponse(BaseResponse):
    user: User


class ListUsersResponse(ListResponse):
    users: list[User]


class UserUpdate(BaseModel):
    username: Optional[str]
    full_name: Optional[str]
    password: Optional[str]
    is_admin: Optional[bool]
    password_hash: Optional[str]
