from fastapi import APIRouter, Depends, Response, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException
from psycopg import Connection

from app.database import get_db
from app.database.actions import create_user, get_user_by_username
from app.models.common import BaseResponse
from app.models.auth import AuthResponse, UserRegister
from app.security import verify_password, manager

router = APIRouter(prefix="/auth")


@router.post("/login", response_model=AuthResponse)
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Connection = Depends(get_db),
) -> AuthResponse:
    """
    Logs in the user provided by form_data.username and form_data.password
    """
    user = get_user_by_username(form_data.username, db)

    if user is None:
        raise InvalidCredentialsException

    if not verify_password(form_data.password, user.password_hash):
        raise InvalidCredentialsException

    token = manager.create_access_token(data={"sub": user.username})
    manager.set_cookie(response, token)
    return AuthResponse(
        ok=True,
        access_token=token,
        token_type="bearer",
        user=user,
    )


@router.get("/logout", response_model=BaseResponse)
def logout(response: Response) -> BaseResponse:
    response.delete_cookie(manager.cookie_name)
    return BaseResponse(ok=True)


@router.post("/register", response_model=AuthResponse)
def register(
    response: Response,
    newUser: UserRegister,
    db: Connection = Depends(get_db),
) -> AuthResponse:
    if get_user_by_username(newUser.username, db) is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists"
        )

    user = create_user(newUser, db)

    token = manager.create_access_token(data={"sub": user.username})
    manager.set_cookie(response, token)
    return AuthResponse(
        ok=True,
        access_token=token,
        token_type="bearer",
        user=user,
    )
