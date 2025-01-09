from flask import Flask, request
from flask_socketio import SocketIO, emit
import datetime

try:
    import pyslurm  # type: ignore
except ImportError:
    pass


def get_slurm_data_dict() -> dict:
    try:
        jobs_dict = pyslurm.Jobs.load()

        data = dict()

        for job in jobs_dict:
            job_dict = pyslurm.Job.load(job).to_dict()
            data[job_dict["id"]] = {
                "name": job_dict["name"],
                "run_time": job_dict["run_time"],
                "cpus": job_dict["cpus"],
                "submit_time": job_dict["submit_time"],
                "end_time": job_dict["end_time"],
                "state": job_dict["state"],
                "comment": job_dict["comment"],
            }

        return data
    except:
        return {
            1347: {
                "name": "testing nama",
                "state": "RUNNING",
                "run_time": 2743,
                "cpus": 2,
                "submit_time": 1735999987,
                "suspend_tine": None,
                "end_time": 1767535987,
                "comment": "orca601",
            },
            1348: {
                "name": "testing nama",
                "state": "RUNNING",
                "run_time": 2195,
                "cpus": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "end_time": 1767536535,
                "comment": "gaussian16",
            },
            1349: {
                "name": "testing nama",
                "state": "PENDING",
                "run_time": 2195,
                "cpus": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "end_time": 1767536535,
                "comment": "orca601",
            },
            1350: {
                "name": "testing nama",
                "state": "COMPLETED",
                "run_time": 2195,
                "cpus": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "end_time": 1767536535,
                "comment": "orca601",
            },
            1351: {
                "name": "testing nama",
                "state": "CANCELLED",
                "run_time": 2195,
                "cpus": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "end_time": 1767536535,
                "comment": "orca601",
            },
            1352: {
                "name": "testing nama",
                "state": "FAILED",
                "run_time": 2195,
                "cpus": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "end_time": 1767536535,
                "comment": "orca601",
            },
        }


def emit_in_interval(sio: SocketIO) -> None:
    while True:
        sio.sleep(1)
        emit(
            "custom_event_def",
            get_slurm_data_dict(),
            broadcast=True,
        )


def socket_create(app: Flask):
    update = False
    sio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

    @sio.on("connect")
    def connect():
        print("Client connected - Flask")

    @sio.on("disconnect")
    def disconnect():
        print("Client disconnected  - Flask")

    @sio.on("data")
    def handle_data(data):
        emit("data", {"socketId": request.sid, "data": data}, broadcast=True)

    @sio.event
    def custom_event_def():
        thread = sio.start_background_task(emit_in_interval(sio))
