import * as yup from "yup";
import { ToasterContext } from "@/context/ToasterContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IOrca } from "@/types/Orca";
import submitServices from "@/services/submit.service";
import { useMutation } from "@tanstack/react-query";
import UserToken from "@/components/commons/UserToken";

const orcaSchema = yup.object().shape({
  basisSet: yup.string().required("Basis Set wajib diisi"),
  cpu: yup.string().required("Jumlah CPU wajib diisi"),
  ram: yup.string().required("Jumlah RAM wajib diisi"),
  charge: yup.string().required("Jumlah Muatan wajib diisi"),
  multiplicity: yup.string().required("Jumlah multiplisitas wajib diisi"),
  dftMethod: yup.string().required("Metode DFT wajib diisi"),
  name: yup.string().required("Nama perhitungan wajib diisi"),
  type: yup.string().required("Tipe perhitungan wajib diisi"),
  inputFile: yup.mixed<File>(),
  smiles: yup.string(),
});

const useOrca = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const UserSession = UserToken();
  const UserEmail = UserSession?.user?.email;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(orcaSchema),
  });

  const orcaService = async (payload: IOrca) => {
    payload["email"] = UserEmail;
    const data = await submitServices.orca(payload);
    return data;
  };

  const { mutate: mutateOrca, isPending: isPendingOrca } = useMutation({
    mutationFn: orcaService,
    onError(error) {
      console.log(error);
      setToaster({
        type: "error",
        message: "ERROR",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil",
      });
      router.reload();
    },
  });

  const handleOrcaSubmit = (data: IOrca) => {
    mutateOrca(data);
  };

  return {
    control,
    handleOrcaSubmit,
    handleSubmit,
    isPendingOrca,
    errors,
    setValue,
    reset,
  };
};

export default useOrca;
