from typing import Optional
from uuid import uuid4, UUID
from app.models.users import UserUpdate
from app.database.models import UserInDB

"""
Mock User Data
Password is "password1234" for each user.
"""
users: list[UserInDB] = [
    UserInDB(
        id=UUID("6586ea3c-fb97-4d7f-a3d5-1f5874a70f90"),
        username="craig",
        full_name="Craig Cockroach",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=True,
    ),
    UserInDB(
        id=UUID("93028a33-8944-4b64-a169-82c1c2a743ca"),
        username="spiderman",
        full_name="Peter Parker",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id=UUID("b2e64909-6152-4de8-b8b5-661e76e37f15"),
        username="antman",
        full_name="Scott Lang",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id=UUID("5c1523f3-408f-4449-9abd-290a62192b5d"),
        username="wiccan",
        full_name="Billy Kaplan",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id=UUID("6486a77c-c8b0-4c1f-a808-0b53bf28181a"),
        username="hulkling",
        full_name="Teddy Altman",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
]


def get_users() -> list[UserInDB]:
    return users


def get_user_by_id(user_id: str) -> Optional[UserInDB]:
    user_id = UUID(user_id)
    user = next((user for user in users if user.id == user_id), None)
    return user


def get_user_by_username(username: str) -> Optional[UserInDB]:
    user = next((user for user in users if user.username == username), None)
    return user


def create_user(newUser: UserInDB) -> UserInDB:
    newUser.id = uuid4()
    users.append(newUser)
    return newUser


def update_user(user_id: str, user_updates: UserUpdate) -> UserInDB:
    user_id = UUID(user_id)
    (index, user) = next(
        ((i, item) for i, item in enumerate(users) if item.id == user_id),
        (None, None),
    )
    if index is None:
        raise Exception("User not found.")
    for key, value in user_updates.dict(exclude_none=True).items():
        setattr(user, key, value)
    users[index] = user
    return user


def delete_user(user_id: str):
    user_id = UUID(user_id)
    index = next((i for i, item in enumerate(users) if item.id == user_id), None)
    if index is None:
        raise Exception("User not found.")
    del users[index]
    return
