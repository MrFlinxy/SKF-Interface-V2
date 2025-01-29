import Link from "next/link";
import Jsme from "@/components/commons/Jsme";
import { useEffect, useState } from "react";
import MolViz from "@/components/commons/MolViz";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFIle";
import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import useOrca from "./useOrca";
import cn from "@/utils/cn";

const Orca = () => {
  const [smiles, setSmiles] = useState("");
  const [formValue, setFormValue] = useState(smiles);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [widthSize, setWidthSize] = useState(640);

  const {
    control,
    handleOrcaSubmit,
    handleSubmit,
    isPendingOrca,
    errors,
    setValue,
    reset,
  } = useOrca();
  const variant = "underlined";
  const placement = "inside";

  const handleWindowResize = () => {
    if (window.innerWidth <= 380) {
      setWidthSize(380);
    } else if (window.innerWidth > 380 && window.innerWidth <= 640) {
      setWidthSize(380);
    } else if (window.innerWidth > 640 && window.innerWidth <= 768) {
      setWidthSize(640);
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setWidthSize(768);
    } else if (window.innerWidth > 1024) {
      setWidthSize(768);
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="">
      <div>
        <Link href="/admin/submit" className="font-semibold text-accent-500">
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
        <div className="">
          <div className={`h-[500px] w-[${widthSize}px]`}>
            {uploadedFile &&
            (uploadedFile.name.substring(
              uploadedFile.name.lastIndexOf(".") + 1,
            ) == "xyz" ||
              uploadedFile.name.substring(
                uploadedFile.name.lastIndexOf(".") + 1,
              ) == "sdf") ? (
              <div className="">
                {
                  <MolViz
                    fileUrl={URL.createObjectURL(uploadedFile)}
                    fileName={uploadedFile.name}
                    key={uploadedFile.name}
                    widthSize={widthSize}
                  />
                }
              </div>
            ) : (
              <div>
                <div id="jsme_parent">
                  <Jsme
                    formValue={formValue}
                    smiles={smiles}
                    menuScale={1}
                    molecularAreaScale={1}
                    height="460px"
                    width={`${widthSize}px`}
                    setSmiles={setSmiles}
                    setFormValue={setFormValue}
                    setValue={setValue}
                  />
                </div>
                <div></div>
              </div>
            )}
          </div>
        </div>
        <div>
          <InputFile
            name="input"
            filetype=".inp,.sdf,.xyz"
            isDropable
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
        <Card>
          <CardBody>
            <form
              className={cn(
                "flex w-80 flex-col",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleOrcaSubmit)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Nama Perhitungan"
                    variant={variant}
                    labelPlacement={placement}
                    placeholder="Nama Perhitungan"
                    autoComplete="off"
                    isInvalid={false}
                    errorMessage={"Yep"}
                  />
                )}
              />
              <Controller
                name="basisSet"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Basis Set"
                    variant={variant}
                    labelPlacement={placement}
                    placeholder="Def2-TZVP"
                    autoComplete="off"
                    isInvalid={false}
                    errorMessage={"Yep"}
                  />
                )}
              />
              <Controller
                name="dftMethod"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Metode DFT"
                    variant={variant}
                    labelPlacement={placement}
                    placeholder="B3LYP"
                    autoComplete="off"
                    isInvalid={false}
                    errorMessage={"Yep"}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Tipe Perhitungan"
                    variant={variant}
                    labelPlacement={placement}
                    placeholder="Opt Freq"
                    autoComplete="off"
                    isInvalid={false}
                    errorMessage={"Yep"}
                  />
                )}
              />
              <Controller
                name="cpu"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Jumlah CPU"
                    variant={variant}
                    labelPlacement={placement}
                    placeholder="32"
                    autoComplete="off"
                    isInvalid={false}
                    errorMessage={"Yep"}
                  />
                )}
              />

              <Button
                size="lg"
                type="submit"
                className="bg-primary-500 font-semibold text-text-50 hover:text-text-900"
              >
                {isPendingOrca ? (
                  <Spinner color="white" size="md" />
                ) : (
                  "Jalankan Komputasi"
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default Orca;
