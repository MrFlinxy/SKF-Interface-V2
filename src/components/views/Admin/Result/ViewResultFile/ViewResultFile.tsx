import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import useViewResultFile from "./useViewResultFile";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_RESULT_FILE } from "./ViewResultFile.constant";
import Link from "next/link";
import { Button } from "@heroui/react";

const ViewResultFile = (props: any) => {
  const { name } = props;
  const { push, isReady, query } = useRouter();
  const {
    dataResultFile,
    isLoadingResultFile,
    isRefetchingResultFile,
    setURL,
    currentSearch,
    handleClearSearch,
    handleDownloadFile,
    handleSearch,
  } = useViewResultFile(name);

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (resultFile: Record<string, unknown>, columnKey: Key) => {
      const cellValue = resultFile[columnKey as keyof typeof resultFile];

      const nameFile = String(resultFile["name"]);

      switch (columnKey) {
        case "name":
          return (
            <div className="">
              <a
                className="cursor-pointer hover:text-primary-600"
                onClick={(e) => {
                  e.preventDefault;
                  handleDownloadFile(name, nameFile);
                }}
              >{`${cellValue}`}</a>
            </div>
          );
        case "size":
          return (
            <div className="flex flex-col items-center justify-center">{`${cellValue}`}</div>
          );
        case "date":
          return (
            <div className="flex flex-col items-center justify-center">{`${cellValue}`}</div>
          );
        case "actions":
          return (
            <div className="flex flex-col items-center justify-center">
              <Button
                color="warning"
                className="font-semibold text-slate-950"
                onPress={() => {
                  handleDownloadFile(name, nameFile);
                }}
              >
                Download
              </Button>
            </div>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [handleDownloadFile, name],
    // push
  );

  return (
    <div>
      <div>
        <div className="font-semibold text-accent-500">
          <Link href="/admin/result">Back</Link>
        </div>
      </div>
      <section aria-label="Result File Table">
        {Object.keys(query).length > 0 && (
          <DataTable
            renderCell={renderCell}
            columns={COLUMN_LISTS_RESULT_FILE}
            currentPage={1}
            data={dataResultFile?.data || []}
            emptyContent={
              currentSearch
                ? `Tidak ada hasil untuk pencarian "${currentSearch}"`
                : "Folder Kosong"
            }
            isLoading={isLoadingResultFile || isRefetchingResultFile}
            limit={"999999"}
            onChangeLimit={() => {}}
            onChangePage={() => {}}
            onChangeSearch={handleSearch}
            onClearSearch={handleClearSearch}
            showSearchBox
            totalPages={0}
          />
        )}
      </section>
    </div>
  );
};
export default ViewResultFile;
