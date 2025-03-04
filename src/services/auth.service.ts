import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin, IRegister, IResetPassword } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/signup`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/signin`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/user_info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUserDataWithEmail: (token: string) =>
    instance.get(`${endpoint.USER}/user_by_email`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  resetPassword: (email: IResetPassword) =>
    instance.post(`${endpoint.AUTH}/reset_password`, email),
};

export default authServices;
