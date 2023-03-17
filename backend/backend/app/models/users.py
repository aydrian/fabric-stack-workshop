from pydantic import BaseModel

from .common import BaseResponse, ListResponse
from ..database.models import User


class UserResponse(BaseResponse):
    user: User


class ListUsersResponse(ListResponse):
    users: list[User]
