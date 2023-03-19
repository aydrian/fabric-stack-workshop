from typing import Callable, Iterator, Optional
from psycopg import Connection

from app.models.auth import UserRegister
from app.database import get_db
from app.database.mock_data import users
from app.database.models import User, UserInDB
from app.security import manager


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

    user = next((user for user in users if user.username == username), None)
    return user


def get_users(db: Connection = None):
    return users


def get_user_by_id(user_id: str, db: Connection):
    return next((user for user in users if user.id == user_id), None)


def create_user(newUser: UserRegister, db: Connection) -> User:
    user = User(
        id="61cb7fca-24a4-47e3-8eff-35acbbb22642",
        username=newUser.username,
        full_name=newUser.full_name,
        is_admin=False,
    )
    return user


def update_user(user_id: str, user: UserInDB, db: Connection) -> User:
    return next((user for user in users if user.id == user_id), None)


def delete_user(user_id: str, db: Connection):
    return
