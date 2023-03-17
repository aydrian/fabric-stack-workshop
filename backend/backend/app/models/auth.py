from pydantic import BaseModel

from .common import BaseResponse
from .users import AuthUser


class AuthResponse(BaseResponse):
    access_token: str
    token_type: str = "bearer"
    user: AuthUser


class UserRegister(BaseModel):
    username: str
    password: str
    full_name: str
