import pyrebase
from dotenv import load_dotenv
from os import environ

load_dotenv(".env")

config = {
    "apiKey": environ.get("FIREBASE_APIKEY"),
    "authDomain": environ.get("FIREBASE_AUTHDOMAIN"),
    "projectId": environ.get("FIREBASE_PROJECTID"),
    "storageBucket": environ.get("FIREBASE_STORAGEBUCKET"),
    "messagingSenderId": environ.get("FIREBASE_MESSAGEINGSENDERID"),
    "appId": environ.get("FIREBASE_APPID"),
    "measurementId": environ.get("FIREBASE_MEASUREMENTID"),
    "databaseURL": environ.get("FIREBASE_DATABASEURL"),
}

firebase: pyrebase.pyrebase.Firebase = pyrebase.initialize_app(config)
firebase_auth: pyrebase.pyrebase.Auth = firebase.auth()
firebase_db: pyrebase.pyrebase.Database = firebase.database()
