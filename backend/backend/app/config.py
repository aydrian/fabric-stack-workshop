from pydantic import BaseSettings, PostgresDsn, Field


class Settings(BaseSettings):
    DATABASE_URL: PostgresDsn = Field(env="DATABASE_URL")
    SECRET_KEY: str = Field(env="SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(env="ACCESS_TOKEN_EXPIRE_MINUTES")
    token_url: str = "/auth/login"

    class Config:
        env_file = ".env"


settings = Settings()
