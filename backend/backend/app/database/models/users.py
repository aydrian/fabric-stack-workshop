from pydantic import BaseModel


class User(BaseModel):
    id: str
    username: str
    full_name: str


class UserInDB(User):
    password_hash: str


fakeUser = {
    "id": "FAKE_ID",
    "username": "craig",
    "full_name": "Craig Cockroach",
    "password_hash": "password-hash",
}


def get_user_by_login(username: str) -> UserInDB:
    return UserInDB(**fakeUser)
