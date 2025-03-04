import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const resultServices = {
  viewFileContent: () => instance.get(`${endpoint.RESULT}/view_file_content`),
  getUserResultFile: (
    email: string | null | undefined,
    resultName: string,
    params?: string,
  ) =>
    instance.post(`${endpoint.RESULT}/get_user_result_file?${params}`, {
      email: email,
      resultName: resultName,
    }),
  getUserListDirectory: (payload: string | null | undefined, params?: string) =>
    instance.post(`${endpoint.RESULT}/get_user_list_dir?${params}`, {
      email: payload,
    }),
  downloadResultFile: (
    email: string | null | undefined,
    jobName: string,
    fileName: string | unknown,
  ) =>
    instance.post(`${endpoint.RESULT}/download_result_file`, {
      email: email,
      jobName: jobName,
      fileName: fileName,
    }),
};

export default resultServices;
