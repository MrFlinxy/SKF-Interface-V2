interface JsmeSetValue {
  inputFile?: File | undefined;
  smiles?: string | undefined;
  basisSet: string;
  cpu: string;
  dftMethod: string;
  name: string;
  type: string;
  ram: string;
  charge: string;
  multiplicity: string;
}

export type { JsmeSetValue };
