from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class User(BaseModel):
    id: Optional[UUID]
    username: str
    full_name: str
    is_admin: bool = False


class UserInDB(User):
    password_hash: str
