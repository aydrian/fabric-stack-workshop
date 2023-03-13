from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..dependencies import oauth2_scheme

router = APIRouter(tags=["auth"])


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return {}


@router.post("/logout")
async def logout(body: dict):
    return {}
