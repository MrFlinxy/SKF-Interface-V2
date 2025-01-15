from flask_restx import Resource, Namespace, fields
from flask import request, jsonify, make_response
from models.models import User
from flask_cors import cross_origin
from .firebase.auth import firebase_auth, firebase_db
import jwt

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

refreshToken_model = auth_ns.model(
    "RefreshToken",
    {
        "refreshToken": fields.String(),
    },
)


@auth_ns.route("/signup")
class SignUp(Resource):
    @auth_ns.marshal_with(signUp_model)
    @auth_ns.expect(signUp_model)
    def post(self):
        data: dict = request.get_json()

        data_email: str = data.get("email")
        db_email = User.query.filter_by(email=data_email).first()

        if db_email is not None:
            return (
                {"name": "Email sudah digunakan"},
                403,
            )

        if data.get("password") != data.get("passwordConfirmation"):
            return (
                {"name": "Password tidak cocok"},
                403,
            )

        new_user: User = User(
            name=data.get("name"),
            npm=data.get("npm"),
            email=data.get("email"),
        )

        try:
            try:
                user: dict = firebase_auth.create_user_with_email_and_password(
                    data.get("email"), data.get("password")
                )

                firebase_auth.send_email_verification(user["idToken"])

                user_data = {
                    "admin": False,
                    "email": data.get("email"),
                    "verified": False,
                }

                firebase_db.child("user_data").child(
                    f"{data.get("email").replace(".", ",")}"
                ).set(user_data)
            except Exception as err:

                return (
                    {"name": f"{err}"},
                    403,
                )

            new_user.create()

            res: dict = jsonify({"message": "User created successfully"})
            res.headers["Content-Type"] = "application/json"
            res.headers.add("Access-Control-Allow-Origin", "*")

            return res, 200
        except Exception as err:
            return (
                {"name": f"{err}"},
                403,
            )


@auth_ns.route("/signin")
class SignIn(Resource):
    @auth_ns.expect(signIn_model)
    def post(self):
        data: dict = request.get_json()

        email: str = data.get("email")
        password: str = data.get("password")

        db_user = User.query.filter_by(email=email).first()

        if db_user:
            try:
                user: dict = firebase_auth.sign_in_with_email_and_password(
                    email, password
                )

                if (
                    firebase_auth.get_account_info(user["idToken"])["users"][0][
                        "emailVerified"
                    ]
                    == False
                ):
                    return {"error": "Email belum diverifikasi"}, 403

            except Exception as err:
                return (
                    {"name": f"{err}"},
                    403,
                )

            refresh_token: str = user["refreshToken"]
            user_token: str = user["idToken"]

            return jsonify(
                {
                    "idToken": user_token,
                    "refreshToken": refresh_token,
                    "userId": user["localId"],
                }
            )

        else:
            return (
                {"name": "Akun tidak ditemukan"},
                403,
            )


@auth_ns.route("/user_info")
class UserInfo(Resource):
    @auth_ns.doc(security="token")
    def get(self):
        authorization_header = request.headers.get("Authorization")
        bearer, _, token = authorization_header.partition(" ")
        if bearer != "Bearer":
            raise ValueError("Invalid Token")

        return jsonify(jwt.decode(token, options={"verify_signature": False}))


@auth_ns.route("/refresh_token")
class RefreshToken(Resource):
    @auth_ns.expect(refreshToken_model)
    @auth_ns.doc(security="token")
    def post(self):
        refresh_token = request.get_json()
        new_user = firebase_auth.refresh(refresh_token.get("refreshToken"))

        return make_response(
            jsonify(new_user),
            200,
        )


# @auth_ns.route("/upload")
# class UploadFile(Resource):
#     def post(self):
#         data = request.get_json()

#         with open("../client/public/mdimasn131@gmail.com/testing.xyz", "w") as f:
#             f.write(data["filecontent"])
