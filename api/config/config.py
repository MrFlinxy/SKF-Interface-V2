from dotenv import load_dotenv, find_dotenv
from os import environ, pardir, path

load_dotenv(find_dotenv())

BASE_DIR = path.abspath(path.join(path.dirname(__file__), pardir, "database"))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(environ.get("SQLALCHEMY_TRACK_MODIFICATIONS"))


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(BASE_DIR, "dev.db")
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(BASE_DIR, "DATABASE.db")
    DEBUG = False


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(BASE_DIR, "test.db")
    SQLALCHEMY_ECHO = False
    TESTING = True
