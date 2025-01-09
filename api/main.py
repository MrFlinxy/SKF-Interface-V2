from datetime import timedelta
from flask import Flask
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from extensions.sql_alchemy import db
from models.models import (
    User,
    UserHistory,
    UserPreference,
    SoftwareConfiguration,
    RoleConfiguration,
    SubmittedJob,
    ReferenceStructure,
    JobTemplate,
    StudentGrade,
    JobResultSummary,
)
from namespaces.auth import auth_ns
from namespaces.job import job_ns
from namespaces.result import result_ns
from namespaces.role import role_ns
from namespaces.user import user_ns
from namespaces.upload_file import upload_file_ns
from flask_cors import CORS


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.config["JWT_COOKIE_DOMAIN"] = ".lvh.me"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
    CORS(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()

    migrate = Migrate(app, db)
    JWTManager(app)
    api = Api(app, doc="/docs")
    api.add_namespace(auth_ns)
    api.add_namespace(job_ns)
    api.add_namespace(result_ns)
    api.add_namespace(role_ns)
    api.add_namespace(user_ns)
    api.add_namespace(upload_file_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "UserHistory": UserHistory,
            "UserPreference": UserPreference,
            "SoftwareConfiguration": SoftwareConfiguration,
            "RoleConfiguration": RoleConfiguration,
            "SubmittedJob": SubmittedJob,
            "ReferenceStructure": ReferenceStructure,
            "JobTemplate": JobTemplate,
            "StudentGrade": StudentGrade,
            "JobResultSummary": JobResultSummary,
        }

    return app
