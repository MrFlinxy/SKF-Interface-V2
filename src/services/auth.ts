import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRegister } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/signup`, payload),
};

export default authServices;