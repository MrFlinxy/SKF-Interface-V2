try:
    import pyslurm  # type: ignore
except ImportError:
    pass

from datetime import datetime
from dotenv import load_dotenv, find_dotenv
from flask_restx import Resource, Namespace, fields
from flask import request
from openbabel import pybel as pb
from os import environ, path
from pathlib import Path
from shutil import rmtree
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

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
    cpus_per_task: int,
    job_dir: str,
    jobname: str,
):
    if job_software == "orca601":
        job: pyslurm.JobSubmitDescription = pyslurm.JobSubmitDescription(
            script=f"#!/bin/bash\n\n{environ.get("ORCA_601_PATH")} {job_dir}/{jobname}.inp > {job_dir}/{jobname}.out --oversubscribe",
            name=email[:4] + "***",
            nodes=1,
            ntasks=1,
            cpus_per_task=cpus_per_task,
            comment=f"{job_software}|{email}",
        )

    elif job_software == "gaussian09":
        job: pyslurm.JobSubmitDescription = pyslurm.JobSubmitDescription(
            script=f"#!/bin/bash\n\n{environ.get("GAUSSIAN09_PATH")} < {job_dir}/{jobname}.gjf > {job_dir}/{jobname}.out",
            environment={
                "GAUSS_EXEDIR": f"{environ.get("GAUSSIAN09_EXEDIR")}",
                "GAUSS_SCRDIR": f"{environ.get("GAUSSIAN09_SCRDIR")}",
            },
            name=email[:4] + "***",
            nodes=1,
            ntasks=1,
            cpus_per_task=cpus_per_task,
            comment=f"{job_software}|{email}",
        )

    elif job_software == "gaussian16":
        job: pyslurm.JobSubmitDescription = pyslurm.JobSubmitDescription(
            script=f"#!/bin/bash\n\n{environ.get("GAUSSIAN16_PATH")} < {job_dir}/{jobname}.gjf > {job_dir}/{jobname}.out",
            environment={
                "GAUSS_EXEDIR": f"{environ.get("GAUSSIAN16_EXEDIR")}",
                "GAUSS_SCRDIR": f"{environ.get("GAUSSIAN16_SCRDIR")}",
            },
            name=email[:4] + "***",
            nodes=1,
            ntasks=1,
            cpus_per_task=cpus_per_task,
            comment=f"{job_software}|{email}",
        )

    job_id: int = job.submit()

    job_class: pyslurm.job = pyslurm.job()
    get_exit_code: int = job_class.wait_finished(jobid=job_id)

    if get_exit_code == 0:
        pass


def isValidCoord(line: list) -> bool:
    atom, coord1, coord2, coord3 = line
    try:
        atom = str(atom)
        coord1 = float(coord1)
        coord2 = float(coord2)
        coord3 = float(coord3)
        return True
    except:
        return False


def xyz_coords(xyz_content: str) -> str:
    lines: list = xyz_content.split("\n")
    coords: list = []

    for line in lines:
        splited_line: list = line.split()

        if len(splited_line) == 4 and isValidCoord(splited_line):
            coords.append(line.strip())

    coords: str = "\n".join(coords)
    return coords


def orca_input(
    job_type: str,
    dft_method: str,
    basis_set: str,
    memory: int,
    cpu: int,
    charge: int,
    multiplicity: int,
    xyz_coord: str,
) -> str:
    return f"""###   Server Kimia Fisik | ORCA 6.0.1
#
#   Created at {datetime.now().strftime("%d %B %Y %H:%M:%S")}
#
! {job_type} {dft_method} {basis_set}

%maxcore {memory}

%output
    print[p_mos] 1
    print[p_basis] 2
end

%pal
    nprocs {cpu}
end

* xyz {charge} {multiplicity}
{xyz_coord}
*
"""


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


@job_ns.route("/orca")
class SubmitORCA(Resource):
    def post(self):
        formData: dict = request.form.to_dict()
        jobname: str = secure_filename(formData.get("name"))

        if len(request.files) > 0 and "smiles" not in formData.keys():
            inputFile: FileStorage = request.files["inputFile"]
            fname: str = secure_filename(inputFile.filename)
            jobDirectory: str = f"../public/user_file/{formData.get("email")}/{jobname}"

            if inputFile.filename.endswith(".sdf"):
                sdf_read: str = inputFile.read().decode("utf-8")
                sdf_text: str = pb.readstring(format="sdf", string=sdf_read)
                inputXYZ: str = sdf_text.write(format="xyz")
                coords: str = xyz_coords(inputXYZ)
                inputContent: str = orca_input(
                    job_type=formData["type"],
                    dft_method=formData["dftMethod"],
                    basis_set=formData["basisSet"],
                    memory=formData["ram"],
                    cpu=formData["cpu"],
                    charge=formData["charge"],
                    multiplicity=formData["multiplicity"],
                    xyz_coord=coords,
                )

                if inputFile:
                    if path.exists(jobDirectory):
                        rmtree(jobDirectory)
                    Path(jobDirectory).mkdir(parents=True, exist_ok=True)
                    with open(
                        f"{jobDirectory}/{jobname}.inp",
                        "w",
                        encoding="utf-8",
                    ) as f:
                        f.write(inputContent)

            elif inputFile.filename.endswith(".xyz"):
                inputXYZ: str = inputFile.read().decode("utf-8")
                coords: str = xyz_coords(inputXYZ)
                inputContent: str = orca_input(
                    job_type=formData["type"],
                    dft_method=formData["dftMethod"],
                    basis_set=formData["basisSet"],
                    memory=formData["ram"],
                    cpu=formData["cpu"],
                    charge=formData["charge"],
                    multiplicity=formData["multiplicity"],
                    xyz_coord=coords,
                )

                if inputFile:
                    if path.exists(jobDirectory):
                        rmtree(jobDirectory)
                    Path(jobDirectory).mkdir(parents=True, exist_ok=True)
                    with open(
                        f"{jobDirectory}/{jobname}.inp",
                        "w",
                        encoding="utf-8",
                    ) as f:
                        f.write(inputContent)

            elif inputFile.filename.endswith(".inp"):
                inputFileContent: str = inputFile.read().decode("utf-8")
                cleanedContent: str = inputFileContent.replace("\r", "")

                if inputFile:
                    if path.exists(jobDirectory):
                        rmtree(jobDirectory)
                    Path(jobDirectory).mkdir(parents=True, exist_ok=True)
                    with open(
                        f"{jobDirectory}/{fname}",
                        "w",
                        encoding="utf-8",
                    ) as f:
                        f.write(cleanedContent)

            try:
                submit_sbatch(
                    job_software="orca601",
                    email=formData.get("email"),
                    cpus_per_task=int(formData.get("cpu")),
                    job_dir=jobDirectory,
                    jobname=jobname,
                )
            except Exception as e:
                print(e)

        elif len(request.files) == 0 and "smiles" in formData.keys():
            jobDirectory: str = f"../public/user_file/{formData.get("email")}/{jobname}"

            try:
                mol: pb.Molecule = pb.readstring("smiles", formData["smiles"])

                mol.make3D()

                ff = pb._forcefields["mmff94"]
                success = ff.Setup

                if not success:
                    ff = pb._forcefields["uff"]
                    success = ff.Setup(mol.OBMol)

                    if not success:
                        raise "Cannot set up forcefield"

                ff.ConjugateGradients(100, 1.0e-3)
                ff.FastRotorSearch(True)
                ff.WeightedRotorSearch(100, 25)
                ff.ConjugateGradients(250, 1.0e-4)
                ff.GetCoordinates(mol.OBMol)

                inputXYZ: str = mol.write("xyz")
                coords: str = xyz_coords(inputXYZ)
                inputContent: str = orca_input(
                    job_type=formData["type"],
                    dft_method=formData["dftMethod"],
                    basis_set=formData["basisSet"],
                    memory=formData["ram"],
                    cpu=formData["cpu"],
                    charge=formData["charge"],
                    multiplicity=formData["multiplicity"],
                    xyz_coord=coords,
                )

                if "smiles" in formData.keys():
                    if path.exists(jobDirectory):
                        rmtree(jobDirectory)
                    Path(jobDirectory).mkdir(parents=True, exist_ok=True)
                    with open(
                        f"{jobDirectory}/{jobname}.inp",
                        "w",
                        encoding="utf-8",
                    ) as f:
                        f.write(inputContent)

            except Exception as e:
                print(e)
        else:
            pass
