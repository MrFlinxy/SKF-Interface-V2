interface IOrca {
  basisSet: string;
  cpu: string;
  dftMethod: string;
  email?: string | null;
  inputFile?: File;
  name: string;
  type: string;
  smiles?: string;
}

export type { IOrca };
