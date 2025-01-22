import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_QUEUE } from "./Queue.constant";
import getQueueList from "./useQueue";

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

  // const dataQueue = getQueueList();
  const theData = [
    {
      id: 1,
      user: "mdima***",
      software: "Orca 6.0.1",
      state: "COMPLETED",
      cpu: 2,
      time: 2195,
    },
    {
      id: 2,
      user: "mdima***",
      software: "Gaussian 16",
      state: "RUNNING",
      cpu: 24,
      time: 1317,
    },
    {
      id: 3,
      user: "mdima***",
      software: "Orca 6.0.1",
      state: "PENDING",
      cpu: 32,
      time: null,
    },
  ];

  const dataQueue = getQueueList();

  return (
    <section>
      {Array.isArray(dataQueue) ? (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LISTS_QUEUE}
          data={dataQueue}
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
