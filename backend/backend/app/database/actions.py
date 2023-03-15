from typing import Callable, Iterator, Optional
from psycopg import Connection

from app.database import get_db
from app.database.models import UserInDB, fakeUser
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
        db: The currently active database session
        session_provider: Optional method to retrieve a session if db is None (provided by our LoginManager)
    Returns:
        The user object or none
    """

    # if db is None and conn_provider is None:
    #     raise ValueError("db and conn_provider cannot both be None.")

    # if db is None:
    #     db = next(conn_provider())

    user = UserInDB(**fakeUser)
