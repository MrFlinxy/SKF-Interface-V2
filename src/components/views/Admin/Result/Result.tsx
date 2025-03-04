import DataTable from "@/components/ui/DataTable";
import { COLUMN_USER_LIST_DIRECTORY } from "./Result.constant";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useResult from "./useResult";
import { useRouter } from "next/router";

const Result = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    dataResult,
    isLoadingResult,
    isRefetchingResult,
    setURL,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useResult();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (result: Record<string, unknown>, columnKey: Key) => {
      const cellValue = result[columnKey as keyof typeof result];

      switch (columnKey) {
        case "name":
          return (
            <div className="">
              <a
                href={`/admin/result/${cellValue}`}
                className="hover:text-primary-600"
              >{`${cellValue}`}</a>
            </div>
          );
        case "date":
          return (
            <div className="flex flex-col items-center justify-center">{`${cellValue}`}</div>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <div>
      <section aria-label="Result Table">
        {Object.keys(query).length > 0 && (
          <DataTable
            renderCell={renderCell}
            columns={COLUMN_USER_LIST_DIRECTORY}
            currentPage={Number(currentPage)}
            data={dataResult?.data || []}
            emptyContent={
              currentSearch
                ? `Tidak ada hasil folder untuk pencarian "${currentSearch}"`
                : "Belum ada hasil perhitungan"
            }
            isLoading={isLoadingResult || isRefetchingResult}
            limit={String(currentLimit)}
            onChangeLimit={handleChangeLimit}
            onChangePage={handleChangePage}
            onChangeSearch={handleSearch}
            onClearSearch={handleClearSearch}
            showSearchBox={true}
            showSelectLimit={true}
            totalPages={dataResult?.pagination?.totalPages || 0}
          />
        )}
      </section>
    </div>
  );
};
export default Result;
