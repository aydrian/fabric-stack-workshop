from pydantic import BaseModel


class BaseResponse(BaseModel):
    ok: bool = True


class ListResponse(BaseResponse):
    count: int
