from flask import Flask, request
from flask_socketio import SocketIO, emit
import datetime

try:
    import pyslurm  # type: ignore
except ImportError:
    pass


def get_slurm_data_dict() -> list:
    try:
        jobs_dict = pyslurm.Jobs.load()

        data = []

        for job in jobs_dict:
            job_dict = pyslurm.Job.load(job).to_dict()
            data.append(
                {
                    "id": job_dict["id"],
                    "user": job_dict["name"],
                    "run_time": job_dict["run_time"],
                    "cpu": job_dict["cpus"],
                    "submit_time": job_dict["submit_time"],
                    "time": job_dict["end_time"],
                    "state": job_dict["state"],
                    "software": job_dict["comment"],
                }
            )

        return data
    except:
        return [
            {
                "id": 1347,
                "user": "testing nama",
                "state": "RUNNING",
                "run_time": 2743,
                "cpu": 2,
                "submit_time": 1735999987,
                "suspend_tine": None,
                "time": f"{datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")}",
                "software": "orca601",
            },
            {
                "id": 1348,
                "user": "testing nama",
                "state": "RUNNING",
                "run_time": 2195,
                "cpu": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "time": 1767536535,
                "software": "gaussian16",
            },
            {
                "id": 1349,
                "user": "testing nama",
                "state": "PENDING",
                "run_time": 2195,
                "cpu": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "time": 1767536535,
                "software": "orca601",
            },
            {
                "id": 1350,
                "user": "testing nama",
                "state": "COMPLETED",
                "run_time": 2195,
                "cpu": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "time": 1767536535,
                "software": "orca601",
            },
            {
                "id": 1351,
                "user": "testing nama",
                "state": "CANCELLED",
                "run_time": 2195,
                "cpu": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "time": 1767536535,
                "software": "orca601",
            },
            {
                "id": 1352,
                "user": "testing nama",
                "state": "FAILED",
                "run_time": 2195,
                "cpu": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "time": 1767536535,
                "software": "orca601",
            },
            {
                "id": 1353,
                "user": "testing nama",
                "state": "FAILED",
                "run_time": 123,
                "cpu": 2,
                "submit_time": 1736000532,
                "suspend_tine": None,
                "time": 1767536535,
                "software": "orca601",
            },
        ]


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
