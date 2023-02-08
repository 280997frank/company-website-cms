import React, {
  /* createElement, */
  useCallback,
  useState,
  FC,
} from "react";
import {
  Box,
  Flex,
  Spinner,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { GoTriangleUp } from "react-icons/go";

import TableRow from "@/components/Atoms/TableRow";
import InfoIcon from "@/components/Atoms/InfoIcon";
import DebouncedSearch from "@/components/Atoms/DebouncedSearch";
import AddNewButton from "@/components/Atoms/AddNewButton";

import type { PossibleCellType } from "@/components/Atoms/TableCell";

type SortType = "asc" | "desc";

interface TableProps<TableData extends Record<string, any>> {
  caption: string;
  columnHeaders: { name: string; label: string; type?: PossibleCellType }[];
  data: TableData[];
  loading: boolean;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  onRemove: (value: string) => Promise<void>;
  onDropdownChange?: (value: string, rowId?: string) => Promise<void>;
  onSwitchChange?: (value: boolean, rowId?: string) => Promise<void>;
  onSort?: (fieldName: string, direction: SortType) => Promise<void>;
  onRowSwitch?: (rowId: string, targetRowIndex: number) => Promise<void>;
  search?: (str: string) => Promise<void>;
  columnsRender?: {
    [name: string]: FC<
      {
        name: string;
        label: string;
      } & TableData
    >;
  };
  useNumber?: boolean;
  tooltip?: string;
  brandColor?: string;
  addNewButton?: {
    bgColor: string;
    url: string;
    onClick?: () => void;
  };
}

const Table = <TableData extends Record<string, any>>({
  caption,
  data,
  columnHeaders,
  loading,
  dropdownOptions,
  onRemove,
  onDropdownChange,
  onSwitchChange,
  onSort,
  onRowSwitch,
  useNumber = true,
  tooltip,
  search,
  addNewButton,
  brandColor,
}: // columnsRender = {},
TableProps<TableData>) => {
  const [sortStatus, setSortStatus] = useState<SortType[]>(
    columnHeaders.map(() => "asc")
  );

  const renderRow = useCallback(() => {
    return data.map((row, rowIndex) => {
      const currentRow = new Map(Object.entries<any>(row));
      return (
        <TableRow
          key={currentRow.get("id")}
          useNumber={useNumber}
          rowIndex={rowIndex}
          columnHeaders={columnHeaders}
          data={currentRow}
          dropdownOptions={dropdownOptions}
          onDropdownChange={onDropdownChange}
          onSwitchChange={onSwitchChange}
          onRemove={onRemove}
          onRowSwitch={onRowSwitch}
          rowId={currentRow.get("id")}
          brandColor={brandColor}
        />
      );
    });
  }, [
    columnHeaders,
    data,
    dropdownOptions,
    onDropdownChange,
    onRemove,
    onSwitchChange,
    onRowSwitch,
    useNumber,
    brandColor,
  ]);

  return (
    <ChakraTable color="white" border="1px solid white" variant="unstyled">
      <TableCaption
        fontSize="2xl"
        fontWeight="bold"
        textAlign="left"
        px={0}
        color="inherit"
        sx={{ captionSide: "top" }}
      >
        <Flex justifyContent="space-between">
          <Box>
            {caption}
            {tooltip && (
              <Tooltip
                label={tooltip}
                aria-label="A tooltip"
                bgColor="white"
                color="#081029"
                fontSize="md"
                fontWeight="500"
              >
                <InfoIcon display="inline" ml={2} />
              </Tooltip>
            )}
          </Box>
          {search && <DebouncedSearch search={search} />}
          {addNewButton && <AddNewButton {...addNewButton} />}
        </Flex>
      </TableCaption>
      <Thead>
        <Tr borderBottom="1px solid white">
          {useNumber && (
            <Th fontSize="md" color="inherit">
              NO.
            </Th>
          )}
          {columnHeaders.map(({ name, label }, index) => {
            return (
              <Th key={label} fontSize="md" color="inherit">
                {label}
                <IconButton
                  variant="unstyled"
                  aria-label="Sort column"
                  icon={<GoTriangleUp />}
                  onClick={() => {
                    setSortStatus((prevState) => {
                      const newState = [...prevState];
                      newState[index] =
                        newState[index] === "asc" ? "desc" : "asc";

                      return newState;
                    });
                    onSort?.(name, sortStatus[index]);
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                  sx={{
                    "& > svg": {
                      display: "inline",
                      transition: "transform 0.5s",
                      transform:
                        sortStatus[index] === "desc"
                          ? "rotate(180deg)"
                          : "none",
                    },
                  }}
                />
              </Th>
            );
          })}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody position="relative">
        {loading && (
          <Tr>
            <Td colSpan={columnHeaders.length}>
              <Flex align="center" justify="center" width="100%" minH="30vh">
                <Spinner />
              </Flex>
            </Td>
          </Tr>
        )}
        {!loading && data.length > 0 && renderRow()}
        {!loading && data.length === 0 && (
          <Tr>
            <Td colSpan={columnHeaders.length}>
              <Flex align="center" justify="center" width="100%" minH="10vh">
                No matching records found
              </Flex>
            </Td>
          </Tr>
        )}
      </Tbody>
    </ChakraTable>
  );
};
export default Table;
