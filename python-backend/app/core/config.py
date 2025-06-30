from pydantic import Field, EmailStr
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_version: str = "0.1.0"
    # SMTP (optional) or third-party
    smtp_host: str = Field(default="smtp.gmail.com", env="SMTP_HOST")
    smtp_port: int = Field(env="SMTP_PORT")
    smtp_user: str = Field(env="SMTP_USER")
    smtp_pass: str = Field(env="SMTP_PASS")
    sendgrid_api_key: str | None = Field(default=None, env="SENDGRID_API_KEY")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()