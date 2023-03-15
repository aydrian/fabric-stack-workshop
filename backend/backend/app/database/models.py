from pydantic import BaseModel

fakeUser = {
    "id": "FAKE_ID",
    "username": "craig",
    "full_name": "Craig Cockroach",
    "password_hash": "password-hash",
}


class User(BaseModel):
    id: str
    username: str
    full_name: str


class UserInDB(User):
    password_hash: str
