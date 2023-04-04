import app.database.mock_data as MockData
from typing import Callable, Iterator, Optional
from psycopg import Connection

from app.models.auth import UserRegister
from app.models.users import UserUpdate
from app.database import get_db
from app.database.models import User, UserInDB
from app.security import manager, hash_password


@manager.user_loader(conn_provider=get_db)
def get_user_by_username(
    username,
    db: Optional[Connection] = None,
    conn_provider: Callable[[], Iterator[Connection]] = None,
) -> Optional[UserInDB]:
    """
    Queries the database for a user with the given name
    Args:
        name: The name of the user
        db: The currently active database connection
        conn_provider: Optional method to retrieve a connection if db is None (provided by our LoginManager)
    Returns:
        The user object or none
    """
    if db is None and conn_provider is None:
        raise ValueError("db and conn_provider cannot both be None.")

    if db is None:
        db = next(conn_provider())

    user = MockData.get_user_by_username(username)
    return user


def get_users(db: Connection) -> list[User]:
    return MockData.get_users()


def get_user_by_id(user_id: str, db: Connection) -> User:
    return MockData.get_user_by_id(user_id)


def create_user(newUser: UserRegister, db: Connection) -> User:
    password_hash = hash_password(newUser.password)
    user = MockData.create_user(
        UserInDB(
            username=newUser.username,
            full_name=newUser.full_name,
            password_hash=password_hash,
        )
    )
    return user


def update_user(user_id: str, user: UserUpdate, db: Connection) -> User:
    if user.password is not None:
        user.password_hash = hash_password(user.password)
        user.password = None
    user = MockData.update_user(user_id, user)
    return user


def delete_user(user_id: str, db: Connection):
    return MockData.delete_user(user_id)
