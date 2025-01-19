import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IOrca } from "@/types/Orca";
import { IGaussian } from "@/types/Gaussian";

const formdataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const submitServices = {
  orca: (payload: IOrca) => {
    instance.post(`${endpoint.JOB}/orca`, payload, formdataHeader);
  },
  gaussian: (payload: IGaussian) =>
    instance.post(`${endpoint.JOB}/gaussian`, payload),
};

export default submitServices;
