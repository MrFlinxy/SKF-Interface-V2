import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_QUEUE } from "./Queue.constant";
import GetQueueList from "./useQueue";

const Queue = () => {
  const { push } = useRouter();
  const renderCell = useCallback(
    (queue: Record<string, unknown>, columnKey: Key) => {
      const cellValue = queue[columnKey as keyof typeof queue];

      switch (columnKey) {
        case "nama":
          return <div>{`${cellValue}`}</div>;
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-queue-button"
                  onPress={() => push(`/admin/queue/${queue.id}`)}
                  className=""
                >
                  Detail Queue
                </DropdownItem>
                <DropdownItem
                  key="cancel-queue-button"
                  className="text-accent-500"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  const dataQueue = GetQueueList();

  return (
    <section>
      {Array.isArray(dataQueue) ? (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LISTS_QUEUE}
          data={dataQueue}
          emptyContent="Tidak ada perhitungan yang dikirimkan"
          currentPage={1}
          limit="99999"
          onChangeLimit={() => {}}
          onChangePage={() => {}}
          onChangeSearch={() => {}}
          onClearSearch={() => {}}
          totalPages={1}
        ></DataTable>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      )}
    </section>
  );
};
export default Queue;
