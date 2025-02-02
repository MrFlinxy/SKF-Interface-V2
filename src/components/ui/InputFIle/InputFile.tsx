import { JsmeSetValue } from "@/types/Jsme";
import cn from "@/utils/cn";
import { Button } from "@nextui-org/react";
import { ChangeEvent, useCallback, useEffect, useId, useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CiFileOn, CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
  className?: string;
  filetype: string;
  isDropable?: boolean;
  name: string;
  uploadedFile?: File | null;
  setUploadedFile: (e: File | undefined) => void;
  setValue: UseFormSetValue<JsmeSetValue>;
}

const InputFile = (props: PropTypes) => {
  const {
    className,
    filetype,
    isDropable,
    name,
    uploadedFile,
    setUploadedFile,
    setValue,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      if (isDropable) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDropable],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setUploadedFile(e.dataTransfer?.files?.[0] || undefined);
    },
    [setUploadedFile],
  );

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, [handleDragOver, handleDrop]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      setValue("inputFile", files[0]);
      setValue("smiles", undefined);
    }
  };

  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file-${dropzoneId}`}
      className={cn(
        "flex min-h-24 w-[350px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-primary-200",
        className,
      )}
    >
      <input
        type="file"
        name={name}
        className="hidden"
        accept={filetype}
        id={`dropzone-file-${dropzoneId}`}
        onChange={handleOnChange}
        onClick={(e) => {
          e.currentTarget.value = "";
          e.target.dispatchEvent(new Event("change", { bubbles: true }));
        }}
      />
      {uploadedFile ? (
        <div className="flex flex-col items-center justify-center p-5 lg:h-full">
          <CiFileOn className="mb-2 h-10 w-10" />
          <div className="text-center text-sm font-semibold">
            {uploadedFile.name}
          </div>
          <div className="flex items-center justify-center p-2">
            <Button
              onPress={() => {
                setUploadedFile(undefined);
                setValue("inputFile", undefined);
              }}
              className="bg-accent-400 font-semibold"
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5 lg:h-[500px]">
          <CiSaveUp2 className="mb-2 h-10 w-10" />
          <p className="text-center text-sm font-semibold">
            {isDropable
              ? `Geser atau klik untuk menunggah file\n(${filetype})`
              : `Klik untuk mengunggah file\n(${filetype})`}
          </p>
        </div>
      )}
    </label>
  );
};
export default InputFile;
