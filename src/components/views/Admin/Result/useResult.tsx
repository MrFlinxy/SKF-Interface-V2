import { useSession } from "next-auth/react";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import resultServices from "@/services/result.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import useDebounce from "@/hooks/useDebounce";

const useResult = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const { data: session, status } = useSession();

  const setURL = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: "",
      },
    });
  };

  const getResult = async () => {
    if (status === "authenticated") {
      let params = `limit=${currentLimit}&page=${currentPage}`;
      if (currentSearch) {
        params += `&search=${currentSearch}`;
      }

      const res = await resultServices.getUserListDirectory(
        session.user?.email,
        params,
      );
      const { data } = res;

      return data;
    }
  };

  const {
    data: dataResult,
    isLoading: isLoadingResult,
    isRefetching: isRefetchingResult,
    // refetch: refetchResult,
  } = useQuery({
    queryKey: ["Result", currentPage, currentLimit, currentSearch],
    queryFn: () => getResult(),
    enabled:
      router.isReady &&
      !!currentPage &&
      !!currentLimit &&
      status === "authenticated",
  });

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    dataResult,
    isLoadingResult,
    isRefetchingResult,

    setURL,
    currentPage,
    currentLimit,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  };
};

export default useResult;
