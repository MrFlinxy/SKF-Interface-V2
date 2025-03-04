import resultServices from "@/services/result.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import useDebounce from "@/hooks/useDebounce";

const useViewResultFile = (props: string) => {
  const router = useRouter();
  const debounce = useDebounce();
  const currentSearch = router.query.search;
  const { data: session, status } = useSession();

  const setURL = () => {
    router.replace({
      pathname: `${props}`,
      query: {
        search: "",
      },
    });
  };

  const getResultFile = async () => {
    if (status === "authenticated") {
      let params = `&search=`;
      if (currentSearch) {
        params += `${currentSearch}`;
      }

      const res = await resultServices.getUserResultFile(
        session.user?.email,
        props,
        params,
      );

      const { data } = res;

      return data;
    }
  };

  const {
    data: dataResultFile,
    isLoading: isLoadingResultFile,
    isRefetching: isRefetchingResultFile,
    // refetch: refetchResultFile,
  } = useQuery({
    queryKey: ["ResultFile", currentSearch],
    queryFn: () => getResultFile(),
    enabled: router.isReady && status === "authenticated",
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
        },
      });
    }, 666);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
      },
    });
  };

  const downloadString = (text: string, fileType: string, fileName: string) => {
    const blob = new Blob([text], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1500);
  };

  const handleDownloadFile = async (name: string, cellValue: string) => {
    if (status === "authenticated") {
      const res = await resultServices.downloadResultFile(
        session.user?.email,
        name,
        cellValue,
      );

      const { data } = res;
      downloadString(data, "text", cellValue);

      // return data;
    }
  };

  return {
    dataResultFile,
    isLoadingResultFile,
    isRefetchingResultFile,
    setURL,
    currentSearch,
    handleClearSearch,
    handleDownloadFile,
    handleSearch,
  };
};
export default useViewResultFile;
