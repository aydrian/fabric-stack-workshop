from pydantic import BaseModel

from .common import BaseResponse, ListResponse
from ..database.models import User


class UserResponse(BaseResponse):
    user: User


class ListUsersResponse(ListResponse):
    users: list[User]


class AuthUser(BaseModel):
    id: str
    username: str
    full_name: str
    is_admin: bool = False
