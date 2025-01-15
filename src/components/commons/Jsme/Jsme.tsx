import { JsmeClass } from "./jsme_src";

interface PropTypes {
  formValue: string;
  height: string;
  setFormValue: (e: any) => void;
  setSmiles: (e: any) => void;
  smiles: string;
  width: string;
}

const Jsme = (props: PropTypes) => {
  const { formValue, height, setFormValue, setSmiles, smiles, width } = props;

  const smilesChangeHandler = (e: any) => {
    setSmiles(e);
  };

  const smilesCustomChangeHandler = (e: any) => {
    setFormValue(e.target?.value);
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
        />
      </div>
      <form>
        <label htmlFor="customSmiles">Custom SMILES: </label>
        <input
          type="text"
          name="customSmiles"
          value={formValue}
          onChange={smilesCustomChangeHandler}
          className="w-96 rounded-lg border-1 bg-slate-50 dark:bg-black"
        />
      </form>
    </>
  );
};

export default Jsme;
