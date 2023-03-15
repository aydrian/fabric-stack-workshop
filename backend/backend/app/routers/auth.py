from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from psycopg import Connection

from app.database import get_db
from app.database.actions import get_user_by_username
from app.models.auth import Token
from app.security import verify_password, manager

router = APIRouter(prefix="/auth")


@router.post("/login", response_model=Token)
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db=None,  #: Connection = Depends(get_db),
) -> Token:
    """
    Logs in the user provided by form_data.username and form_data.password
    """
    user = get_user_by_username(form_data.username, db)
    if not user:
        raise InvalidCredentialsException

    if not verify_password(form_data.password, user.password_hash):
        raise InvalidCredentialsException

    token = manager.create_access_token(data={"sub": user.username})
    manager.set_cookie(response, token)
    return Token(access_token=token, token_type="bearer")
