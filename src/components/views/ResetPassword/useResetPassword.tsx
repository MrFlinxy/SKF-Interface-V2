import { ToasterContext } from "@/context/ToasterContext";
import authServices from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { IResetPassword } from "@/types/Auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
});

const useResetPassword = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const resetPasswordService = async (payload: IResetPassword) => {
    const result = await authServices.resetPassword(payload);
    return result;
  };

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } =
    useMutation({
      mutationFn: resetPasswordService,
      onError(error: unknown) {
        if (error instanceof AxiosError) {
          setToaster({
            type: "error",
            message: error?.response?.data.name,
          });
        }
      },
      onSuccess: () => {
        reset({
          email: "",
        });
        setToaster({
          type: "success",
          message: "Silahkan cek email anda",
        });
        router.push("/auth/login");
      },
    });

  const handleResetPassword = (data: IResetPassword) =>
    mutateResetPassword(data);

  return {
    control,
    handleSubmit,
    handleResetPassword,
    isPendingResetPassword,
    errors,
  };
};
export default useResetPassword;
