import sys
from pathlib import Path
from flask_restx import Resource, Namespace, fields
from flask import request
from openbabel import pybel as pb
from .job import submit_sbatch

upload_file_ns = Namespace(
    "upload_file", description="A namespace for upload file handling"
)

smiles_xyz_model = upload_file_ns.model(
    "smiles_xyz",
    {
        "smiles": fields.String(),
        "smilesname": fields.String(),
    },
)


@upload_file_ns.route("/xyz")
class UploadXYZFile(Resource):
    def post(self):
        data = request.get_json()
        fname: str = data.get("fname")
        email: str = data.get("email")
        email_head: str = email[:6] + "***"
        cpus_per_task: int = data.get("cpus_per_task")
        job_software: str = data.get("job_software")
        jobname: str = data.get("jobname")

        user_data_path: str = f"../client/public/{email}/{jobname}"

        Path(user_data_path).mkdir(parents=True, exist_ok=True)

        with open(
            f"{user_data_path}/{fname[:-4]}.xyz",
            "w",
        ) as f:
            f.write(data["filecontent"])

        # create input file from xyz


@upload_file_ns.route("/smiles")
class UploadSmiles(Resource):
    @upload_file_ns.expect(smiles_xyz_model)
    def post(self):
        data = request.get_json()
        email: str = data.get("email")
        email_head: str = email[:6] + "***"
        cpus_per_task: int = data.get("cpus_per_task")
        job_software: str = data.get("job_software")
        jobname: str = data.get("jobname")

        user_data_path: str = f"../client/public/{email}/{jobname}"

        Path(user_data_path).mkdir(parents=True, exist_ok=True)

        smilesFile = pb.readstring("smi", data.get("smiles"))

        smilesFile.make3D()
        ff = pb._forcefields["mmff94"]

        success = ff.Setup(smilesFile.OBMol)

        if not success:
            ff = pb._forcefields["uff"]
            success = ff.Setup(smilesFile.OBMol)
            if not success:
                sys.exit("Cannot set up forcefield")

        ff.ConjugateGradients(100, 1.0e-3)
        ff.FastRotorSearch(True)
        ff.WeightedRotorSearch(100, 25)
        ff.ConjugateGradients(250, 1.0e-4)
        ff.GetCoordinates(smilesFile.OBMol)

        smilesFile.write("xyz", f"{user_data_path}/{jobname}.xyz", overwrite=True)

        # create input file from xyz
