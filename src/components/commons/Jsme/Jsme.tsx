import { UseFormSetValue } from "react-hook-form";
import { JsmeClass } from "./jsme_src";
import { JsmeSetValue } from "@/types/Jsme";

interface PropTypes {
  formValue: string;
  height: string;
  menuScale: number;
  molecularAreaScale: number;
  setFormValue: (e: string) => void;
  setSmiles: (e: string) => void;
  setValue: UseFormSetValue<JsmeSetValue>;
  smiles: string;
  width: string;
}

const Jsme = (props: PropTypes) => {
  const {
    formValue,
    height,
    menuScale,
    molecularAreaScale,
    setFormValue,
    setSmiles,
    setValue,
    width,
  } = props;

  const smilesChangeHandler = (e: string) => {
    setValue("smiles", e);
    setSmiles(e);
  };

  const smilesCustomChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormValue(e.target?.value);
    setValue("smiles", e.target?.value);
  };

  return (
    <>
      <div className="font-semibold">
        <JsmeClass
          height={height}
          width={width}
          smiles={formValue}
          options="newlook,fullScreenIcon"
          onChange={smilesChangeHandler}
          MolecularAreaScale={molecularAreaScale}
          MenuScale={menuScale}
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="">
        <label htmlFor="customSmiles">Custom SMILES: </label>
        <input
          type="text"
          name="customSmiles"
          value={formValue}
          onChange={smilesCustomChangeHandler}
          className="rounded-lg border-1 bg-slate-50 px-2 py-1 dark:bg-black"
        />
      </form>
    </>
  );
};

export default Jsme;
