import datetime
from io import BytesIO
import math
import os
from typing import Iterable
from flask_restx import Resource, Namespace, fields
from flask import request, jsonify, send_file
from pathlib import Path

result_ns = Namespace("result", description="A namespace for result")

GetResultContent_model = result_ns.model(
    "GetResultContent",
    {
        "email": fields.String(),
        "name": fields.String(),
        "filename": fields.String(),
    },
)

GetUserListDir_model = result_ns.model(
    "GetUserListDir",
    {
        "email": fields.String(),
    },
)

GetUserResultFile_model = result_ns.model(
    "GetUserResultFile",
    {
        "email": fields.String(),
    },
)

DownloadResultFile_model = result_ns.model(
    "DownloadResultFile",
    {
        "email": fields.String(),
        "jobName": fields.String(),
        "fileName": fields.String(),
    },
)


def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])


@result_ns.route("/get_result_content")
class GetResultContent(Resource):
    @result_ns.expect(GetResultContent_model)
    def post(self):
        data: dict = request.get_json()
        user_filename_path: str = (
            f"./user_file/{data.get("email")}{(data.get("name") in os.listdir(f"./user_file/{data.get("email")}")) * f'/{data.get("name")}'}"
        )
        listdir_user_file: list[str] = os.listdir(user_filename_path)

        if data.get("filename") in os.listdir(user_filename_path) and data.get(
            "name"
        ) in os.listdir(f"./user_file/{data.get("email")}"):
            with open(
                f"./user_file/{data.get("email")}/{data.get("name")}/{data.get("filename")}"
            ) as f:
                content: list[str] = f.readlines()
                return jsonify(content)

        return jsonify(listdir_user_file)


@result_ns.route("/get_all_user_result_content")
class GetAllUserResultContent(Resource):
    def get(self):
        dict_all_user_files: dict = {}

        for email in os.listdir(f"./user_file"):
            dict_all_user_files[email] = {}

            for name in os.listdir(f"./user_file/{email}"):
                dict_all_user_files[email][name] = os.listdir(
                    f"./user_file/{email}/{name}"
                )

        return jsonify(dict_all_user_files)


@result_ns.route("/view_file_content")
class ViewFileContent(Resource):
    def get(self):
        # data: dict = request.get_json()

        # email: str = data.get("email")
        # jobname: str = data.get("jobname")
        # fname: str = data.get("fname")

        with open("./namespaces/Apigenin_Gas.out", "r") as f:
            data: list = f.readlines()
            return jsonify(data[-11:-1])


@result_ns.route("/get_user_list_dir")
@result_ns.doc(
    params={
        "limit": "Jumlah data yang ditampilkan",
        "page": "Nomor halaman",
        "search": "Teks pencarian",
    }
)
class GetUserListDir(Resource):
    @result_ns.expect(GetUserListDir_model)
    def post(self):
        data: dict = request.get_json()

        email: str = data.get("email")
        limit: int = int(request.args.get("limit"))
        page: int = int(request.args.get("page"))
        search: str = request.args.get("search")

        path: str = os.path.join(Path(__file__).parents[1], "user_file", str(email))

        user_path: str = os.path.join(
            Path(__file__).parents[1], "user_file", str(email)
        )
        user_folder: list[str] = os.listdir(user_path)

        user_folder.sort(key=lambda s: os.path.getmtime(os.path.join(user_path, s)))
        user_folder.reverse()

        user_folder_time: list[str] = [
            f"{datetime.datetime.fromtimestamp(os.path.getmtime(os.path.join(user_path, i))).strftime('%H:%M:%S')}"
            for i in user_folder
        ]

        user_data: list[list[str, str]] = [
            {"id": i, "name": user_folder[i], "date": user_folder_time[i]}
            for i in range(len(user_folder))
        ]

        if search != None:
            filtered_user_folder = filter(
                lambda item: search in item["name"], user_data
            )
            list_filtered: list[str] = list(filtered_user_folder)

            return jsonify(
                {
                    "data": list_filtered[(limit * (page - 1)) : (limit * (page))],
                    "pagination": {
                        "total": len(list_filtered),
                        "totalPages": int(len(list_filtered) // limit + 1),
                        "current": f"{page}",
                    },
                }
            )

        return jsonify(
            {
                "data": user_data[(limit * (page - 1)) : (limit * (page))],
                "pagination": {
                    "total": len(user_data),
                    "totalPages": int(len(user_data) // limit + 1),
                    "current": f"{page}",
                },
            }
        )


@result_ns.route("/get_user_result_file")
@result_ns.doc(
    params={
        "search": "Teks pencarian",
    }
)
class GetUserResultFile(Resource):
    @result_ns.expect(GetUserResultFile_model)
    def post(self):
        data: dict = request.get_json()
        email: str = data.get("email")
        resultName: str = data.get("resultName")
        search: str = request.args.get("search")
        user_path: str = os.path.join(
            Path(__file__).parents[1], "user_file", str(email), resultName
        )

        user_folder: list[str] = os.listdir(user_path)

        user_folder.sort(key=lambda s: os.path.getmtime(os.path.join(user_path, s)))
        user_folder.reverse()

        user_folder_size: list[str] = [
            f"{convert_size(os.path.getsize(os.path.join(user_path, i)))}"
            for i in user_folder
        ]

        user_folder_time: list[str] = [
            f"{datetime.datetime.fromtimestamp(os.path.getmtime(os.path.join(user_path, i))).strftime('%H:%M:%S')}"
            for i in user_folder
        ]

        user_data: list[list[str, str]] = [
            {
                "id": i,
                "name": user_folder[i],
                "size": user_folder_size[i],
                "date": user_folder_time[i],
            }
            for i in range(len(user_folder))
        ]

        if search != None:
            filtered_user_folder = filter(
                lambda item: search in item["name"], user_data
            )
            list_filtered: list[str] = list(filtered_user_folder)

            return jsonify(
                {
                    "data": list_filtered,
                    "pagination": {
                        "total": len(list_filtered),
                        "totalPages": 1,
                        "current": f"1",
                    },
                }
            )

        return jsonify(
            {
                "data": user_data,
                "pagination": {
                    "total": len(user_data),
                    "totalPages": 1,
                    "current": f"1",
                },
            }
        )


@result_ns.route("/download_result_file")
class DownloadResultFile(Resource):
    @result_ns.expect(DownloadResultFile_model)
    def post(self):
        data: dict = request.get_json()

        email: str = data.get("email")
        jobName: str = data.get("jobName")
        fileName: str = data.get("fileName")
        file_path: str = os.path.join(
            Path(__file__).parents[1], "user_file", str(email), jobName, fileName
        )

        return send_file(file_path, as_attachment=False)
