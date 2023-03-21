from uuid import uuid4
from app.models.users import UserUpdate
from app.database.models import UserInDB

"""
Mock User Data
Password is "password1234" for each user.
"""
users: list[UserInDB] = [
    UserInDB(
        id="6586ea3c-fb97-4d7f-a3d5-1f5874a70f90",
        username="craig",
        full_name="Craig Cockroach",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=True,
    ),
    UserInDB(
        id="93028a33-8944-4b64-a169-82c1c2a743ca",
        username="spiderman",
        full_name="Peter Parker",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id="b2e64909-6152-4de8-b8b5-661e76e37f15",
        username="antman",
        full_name="Scott Lang",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id="5c1523f3-408f-4449-9abd-290a62192b5d",
        username="wiccan",
        full_name="Billy Kaplan",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id="6486a77c-c8b0-4c1f-a808-0b53bf28181a",
        username="hulkling",
        full_name="Teddy Altman",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
]


def get_users() -> list[UserInDB]:
    return users


def get_user_by_id(user_id: str) -> UserInDB:
    user = next((user for user in users if user.id == user_id), None)
    if user is None:
        raise Exception("User not found.")
    return user


def get_user_by_username(username: str) -> UserInDB:
    user = next((user for user in users if user.username == username), None)
    if user is None:
        raise Exception("User not found.")
    return user


def create_user(newUser: UserInDB) -> UserInDB:
    newUser.id = str(uuid4())
    users.append(newUser)
    return newUser


def update_user(user_id: str, user_updates: UserUpdate) -> UserInDB:
    (index, user) = next(
        ((i, item) for i, item in enumerate(users) if item.id == user_id),
        (None, None),
    )
    if index is None:
        raise Exception(detail="User not found.")
    for key, value in user_updates.dict(exclude_none=True).items():
        setattr(user, key, value)
    users[index] = user
    return user


def delete_user(user_id: str):
    index = next((i for i, item in enumerate(users) if item.id == user_id), None)
    if index is None:
        raise Exception(detail="User not found.")
    del users[index]
    return
