interface IOrca {
  basisSet: string;
  cpu: string;
  dftMethod: string;
  inputFile?: File;
  name: string;
  type: string;
  smiles?: string;
}

export type { IOrca };
