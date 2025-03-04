import InputFile from "@/components/ui/InputFIle";
import { useEffect, useState } from "react";
import useOrcaNEBTS from "./useOrcaNEBTS";
import MolViz from "@/components/commons/MolViz";
import { Button } from "@heroui/react";
import { GoArrowRight } from "react-icons/go";

const OrcaNEBTS = () => {
  const [widthSize, setWidthSize] = useState<number>(640);
  const [uploadedFileReactant, setUploadedFileReactant] = useState<
    File | undefined
  >();
  const [uploadedFileProduct, setUploadedFileProduct] = useState<
    File | undefined
  >();

  const {
    // control,
    // handleOrcaSubmit,
    // handleSubmit,
    // isPendingOrca,
    // errors,
    setValue,
  } = useOrcaNEBTS();

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
      <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
        <div className="flex flex-row gap-3">
          <div className="">
            <div className="text-center text-2xl">Reaktan</div>
            <div>
              {uploadedFileReactant ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div>
                    <MolViz
                      fileUrl={URL.createObjectURL(uploadedFileReactant)}
                      fileName={uploadedFileReactant.name}
                      key={uploadedFileReactant.name}
                      widthSize={widthSize / 4}
                      isNEBTS={true}
                    />
                  </div>
                  <div>
                    <Button
                      onPress={() => {
                        setUploadedFileReactant(undefined);
                        setValue("inputFileReactant", undefined);
                      }}
                      className="bg-accent-400 font-semibold"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <InputFile
                    name="input"
                    filetype=".xyz"
                    isDropable
                    uploadedFile={uploadedFileReactant}
                    setUploadedFile={setUploadedFileReactant}
                    setValue={setValue}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <GoArrowRight size={64} />
            </div>
          </div>
          <div className="">
            <div className="text-center text-2xl">Produk</div>
            <div>
              {uploadedFileProduct ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div>
                    <MolViz
                      fileUrl={URL.createObjectURL(uploadedFileProduct)}
                      fileName={uploadedFileProduct.name}
                      key={uploadedFileProduct.name}
                      widthSize={widthSize / 4}
                      isNEBTS={true}
                    />
                  </div>
                  <div>
                    <Button
                      onPress={() => {
                        setUploadedFileProduct(undefined);
                        setValue("inputFileProduct", undefined);
                      }}
                      className="bg-accent-400 font-semibold"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <InputFile
                    name="input"
                    filetype=".xyz"
                    isDropable
                    uploadedFile={uploadedFileProduct}
                    setUploadedFile={setUploadedFileProduct}
                    setValue={setValue}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrcaNEBTS;
