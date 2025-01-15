import Link from "next/link";
import Jsme from "@/components/commons/Jsme";
import { useState } from "react";
import MolViz from "@/components/commons/MolViz";
import InputFile from "@/components/ui/InputFIle";

const Orca = () => {
  const [smiles, setSmiles] = useState("");
  const [formValue, setFormValue] = useState(smiles);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <div>
      <div>
        <Link href="/admin/submit" className="font-semibold text-accent-500">
          Back
        </Link>
      </div>
      <div>Orca</div>
      <div className="flex flex-col lg:flex-row">
        <div className="h-[500px] w-[768px]">
          {uploadedFile &&
          (uploadedFile.name.substring(
            uploadedFile.name.lastIndexOf(".") + 1,
          ) == "xyz" ||
            uploadedFile.name.substring(
              uploadedFile.name.lastIndexOf(".") + 1,
            ) == "sdf") ? (
            <div className="flex">
              {
                <MolViz
                  fileUrl={URL.createObjectURL(uploadedFile)}
                  fileName={uploadedFile.name}
                  key={uploadedFile.name}
                />
              }
            </div>
          ) : (
            <div>
              <Jsme
                formValue={formValue}
                smiles={smiles}
                height="500px"
                width="768px"
                setSmiles={setSmiles}
                setFormValue={setFormValue}
              />
              <div>Parent smiles: {smiles}</div>
            </div>
          )}
        </div>

        <div>
          <div>Kirim File Input Orca / XYZ / SDF</div>
          <InputFile
            name="input"
            isDropable
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        </div>
      </div>
    </div>
  );
};
export default Orca;
