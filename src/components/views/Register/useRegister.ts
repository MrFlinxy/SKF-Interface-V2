import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/context/ToasterContext";
import { AxiosError } from "axios";

const registerSchema = yup.object().shape({
  name: yup.string().required("Nama lengkap wajib diisi"),
  npm: yup.string().required("NPM wajib diisi"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup
    .string()
    .min(8, "Minimal 8 karakter")
    .max(64, "Maksimal 64 karakter")
    .required("Kata sandi wajib diisi"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Kata sandi tidak cocok")
    .required("Konfirmasi kata sandi wajib diisi"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
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
        name: "",
        npm: "",
        password: "",
        passwordConfirmation: "",
      });
      setToaster({
        type: "success",
        message: "Berhasil mendaftarkan akun",
      });
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};
export default useRegister;
