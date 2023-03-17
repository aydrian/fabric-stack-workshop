from pydantic import BaseModel

fakeUser = {
    "id": "FAKE_ID",
    "username": "craig",
    "full_name": "Craig Cockroach",
    "password_hash": "$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
    "is_admin": True,
}


class User(BaseModel):
    id: str
    username: str
    full_name: str
    is_admin: bool = False


class UserInDB(User):
    password_hash: str
