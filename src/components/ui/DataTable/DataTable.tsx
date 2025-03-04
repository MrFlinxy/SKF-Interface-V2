import { LIMIT_LISTS } from "@/constants/list.constants";
import cn from "@/utils/cn";
import {
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
  columns: Record<string, unknown>[];
  currentPage: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  limit: string;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showSearchBox?: boolean;
  showSelectLimit?: boolean;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    currentPage,
    data,
    emptyContent,
    isLoading,
    limit,
    onChangePage,
    onChangeSearch,
    onChangeLimit,
    onClearSearch,
    renderCell,
    showSearchBox,
    showSelectLimit,
    totalPages,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        {showSearchBox && (
          <Input
            isClearable
            className="w-full sm:max-w-[24%]"
            placeholder="Cari berdasarkan nama"
            startContent={<CiSearch />}
            onChange={onChangeSearch}
            onClear={onClearSearch}
          />
        )}
      </div>
    );
  }, [onChangeSearch, onClearSearch]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showSelectLimit && (
          <Select
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[limit]}
            selectionMode="single"
            onChange={onChangeLimit}
            startContent={<p className="text-small">Show:</p>}
            disallowEmptySelection
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="warning"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, currentPage, totalPages, onChangeLimit, onChangePage]);

  return (
    <Table
      aria-label="Queue Table"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      topContent={TopContent}
      topContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns} aria-label="Column Result Table">
        {(column) => (
          <TableColumn key={column.uid as Key} className="text-center">
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        aria-label="Queue Table"
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="warning" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default DataTable;
