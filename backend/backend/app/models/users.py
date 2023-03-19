from app.models.common import BaseResponse, ListResponse
from app.database.models import User


class UserResponse(BaseResponse):
    user: User


class ListUsersResponse(ListResponse):
    users: list[User]
