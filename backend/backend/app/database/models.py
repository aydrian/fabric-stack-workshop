from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    id: Optional[str]
    username: str
    full_name: str
    is_admin: bool = False


class UserInDB(User):
    password_hash: str
