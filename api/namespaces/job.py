try:
    import pyslurm  # type: ignore
except ImportError:
    pass

from dotenv import load_dotenv, find_dotenv
from flask_restx import Resource, Namespace, fields
from flask import request
from openbabel import pybel as pb
from os import environ, path
from pathlib import Path

load_dotenv(find_dotenv())

job_ns = Namespace("job", description="A namespace for job")

SubmitSBATCH_model = job_ns.model(
    "SubmitSBATCH",
    {
        "email": fields.String(),
        "ntasks": fields.Integer(),
        "email": fields.String(),
        "password": fields.String(),
    },
)


def out_xyz_sdf(user_data_path: str, jobname: str) -> None:
    out_file = next(
        pb.readfile(
            format="out",
            filename=f"{user_data_path}/{jobname}.out",
        )
    )

    out_file.write("sdf", f"{user_data_path}/{jobname}.sdf", overwrite=True)
    out_file.write("xyz", f"{user_data_path}/{jobname}_final.xyz", overwrite=True)


def submit_sbatch(
    job_software: str,
    email: str,
    email_head: str,
    cpus_per_task: int,
    user_data_path: str,
    jobname: str,
):
    job_dir: str = f"{user_data_path}/{jobname}/{jobname}"

    if job_software == "orca601":
        job: pyslurm.JobSubmitDescription = pyslurm.JobSubmitDescription(
            script=f"#!/bin/bash\n\n{environ.get("ORCA_601_PATH")} {job_dir}.inp > {job_dir}.out --oversubscribe",
            name=email_head,
            nodes=1,
            ntasks=1,
            cpus_per_task=cpus_per_task,
            comment="orca601",
        )

    elif job_software == "gaussian09":
        job: pyslurm.JobSubmitDescription = pyslurm.JobSubmitDescription(
            script=f"#!/bin/bash\n\n{environ.get("GAUSSIAN09_PATH")} < {job_dir}.gjf > {job_dir}.out",
            environment={
                "GAUSS_EXEDIR": f"{environ.get("GAUSSIAN09_EXEDIR")}",
                "GAUSS_SCRDIR": f"{environ.get("GAUSSIAN09_SCRDIR")}",
            },
            name=email_head,
            nodes=1,
            ntasks=1,
            cpus_per_task=cpus_per_task,
            comment="gaussian09",
        )

    elif job_software == "gaussian16":
        job: pyslurm.JobSubmitDescription = pyslurm.JobSubmitDescription(
            script=f"#!/bin/bash\n\n{environ.get("GAUSSIAN16_PATH")} < {job_dir}.gjf > {job_dir}.out",
            environment={
                "GAUSS_EXEDIR": f"{environ.get("GAUSSIAN16_EXEDIR")}",
                "GAUSS_SCRDIR": f"{environ.get("GAUSSIAN16_SCRDIR")}",
            },
            name=email_head,
            nodes=1,
            ntasks=1,
            cpus_per_task=cpus_per_task,
            comment="gaussian16",
        )

    job_id: int = job.submit()

    job_class: pyslurm.job = pyslurm.job()
    get_exit_code: int = job_class.wait_finished(jobid=job_id)

    if get_exit_code == 0:
        pass


@job_ns.route("/submit_sbatch")
class SubmitSBATCH(Resource):
    def post(self):
        data = request.get_json()
        email: str = data.get("email")
        email_head: str = email[:6] + "***"
        cpus_per_task: int = data.get("cpus_per_task")
        job_software: str = data.get("job_software")
        jobname: str = data.get("jobname")

        user_data_path: str = f"../client/public/{email}/{jobname}"

        Path(user_data_path).mkdir(parents=True, exist_ok=True)
