from pydantic import BaseModel

from app.models.common import BaseResponse
from app.database.models import User


class AuthResponse(BaseResponse):
    access_token: str
    token_type: str = "bearer"
    user: User


class UserRegister(BaseModel):
    username: str
    password: str
    full_name: str
