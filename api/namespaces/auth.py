from flask_restx import Resource, Namespace, fields
from flask import request, jsonify, make_response
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
)
from werkzeug.security import generate_password_hash, check_password_hash
from models.models import User
from flask_cors import cross_origin

authorization = {
    "token": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
    }
}
auth_ns = Namespace(
    "auth", description="A namespace for authentication", authorizations=authorization
)

signUp_model = auth_ns.model(
    "SignUp",
    {
        "name": fields.String(),
        "npm": fields.Integer(),
        "email": fields.String(),
        "password": fields.String(),
        "passwordConfirmation": fields.String(),
    },
)

signIn_model = auth_ns.model(
    "SignIn",
    {
        "email": fields.String(),
        "password": fields.String(),
    },
)


@auth_ns.route("/signup")
class SignUp(Resource):
    @auth_ns.marshal_with(signUp_model)
    @auth_ns.expect(signUp_model)
    @cross_origin()
    def post(self):
        if request.method == "POST":
            print("JHDSFJKLASHDFKLADHSFKLDHSFLAKLFHALDSFH")
        data = request.get_json()

        data_email = data.get("email")
        db_email = User.query.filter_by(email=data_email).first()

        if db_email is not None:
            return jsonify({"message": "Email already registered"})

        if data.get("password") != data.get("passwordConfirmation"):
            return jsonify({"message": "Password did not match"})

        new_user = User(
            name=data.get("name"),
            npm=data.get("npm"),
            email=data.get("email"),
            password=generate_password_hash(data.get("password")),
        )

        new_user.create()

        res = jsonify({"message": "User created successfully"})
        res.headers["Content-Type"] = "application/json"
        res.headers.add("Access-Control-Allow-Origin", "*")

        return res


@auth_ns.route("/signin")
class SignIn(Resource):
    @auth_ns.expect(signIn_model)
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        db_user = User.query.filter_by(email=email).first()

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.email)
            refresh_token = create_refresh_token(identity=db_user.email)

            return jsonify(
                {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }
            )


@auth_ns.route("/refresh_token")
class RefreshToken(Resource):
    @jwt_required(refresh=True)
    @auth_ns.doc(security="token")
    def post(self):
        current_user = get_jwt_identity()

        new_access_token = create_access_token(identity=current_user)

        return make_response(
            jsonify(
                {
                    "access_token": new_access_token,
                }
            ),
            200,
        )


@auth_ns.route("/upload")
class UploadFile(Resource):
    def post(self):
        data = request.get_json()

        with open("../client/public/mdimasn131@gmail.com/testing.xyz", "w") as f:
            f.write(data["filecontent"])
