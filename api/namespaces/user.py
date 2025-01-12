from flask import request
from flask_restx import Api, Resource, fields, Namespace
from flask_jwt_extended import jwt_required
from models.models import User
import jwt

user_ns = Namespace("user", description="A namespace for user")

user_model = user_ns.model(
    "User",
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "npm": fields.Integer(),
        "email": fields.String(),
        "role": fields.Integer(),
        "lab": fields.Integer(),
        "isAdmin": fields.Boolean(),
        "isDisabled": fields.Boolean(),
        "dateCreated": fields.Date(),
    },
)

userHistory_model = user_ns.model(
    "UserHistory",
    {
        "id": fields.Integer(),
        "userID": fields.Integer(),
        "name": fields.String(),
        "npm": fields.Integer(),
        "dateHistory": fields.Date(),
        "description": fields.String(),
    },
)


@user_ns.route("/users")
class UsersResource(Resource):
    @user_ns.marshal_list_with(user_model)
    # @jwt_required()
    def get(self) -> dict:
        users = User.query.all()
        return users, 201

    @user_ns.marshal_with(user_model)
    @user_ns.expect(user_model)
    # @jwt_required()
    def post(self):
        data = request.get_json()

        new_user = User(
            name=data.get("name"),
        )

        new_user.create()

        return new_user, 201


@user_ns.route("/user/<int:id>")
class UserResource(Resource):
    @user_ns.marshal_with(user_model)
    def get(self, id):
        user = User.query.get_or_404(id)
        return user, 201

    @user_ns.marshal_with(user_model)
    # @jwt_required()
    def put(self, id):
        user_to_update = User.query.get_or_404(id)
        data = request.get_json()

        user_to_update.update(
            data.get("name"),
            data.get("npm"),
            data.get("role"),
            data.get("lab"),
            data.get("isAdmin"),
            data.get("isDisabled"),
        )

        return user_to_update, 201

    @user_ns.marshal_with(user_model)
    # @jwt_required()
    def delete(self, id):
        user_to_delete = User.query.get_or_404(id)

        user_to_delete.delete()

        return user_to_delete, 201


@user_ns.route("/user_by_email/")
class UserResource(Resource):
    @user_ns.marshal_with(user_model)
    def get(self):
        authorization_header = request.headers.get("Authorization")
        bearer, _, token = authorization_header.partition(" ")

        decoded_token = jwt.decode(token, options={"verify_signature": False})
        email = decoded_token["email"]
        user = User.query.filter_by(email=email).first()
        user_data = user.read()
        return user_data
