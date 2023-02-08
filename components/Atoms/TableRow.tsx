import { IconButton, Td, Tr, useToast } from "@chakra-ui/react";
import { IoMdTrash } from "react-icons/io";

import TableCell from "@/components/Atoms/TableCell";

import { useSortable } from "@/hooks/draggable";

import type { PossibleCellType } from "@/components/Atoms/TableCell";
// import { useState } from "react";

interface TableRowProps {
  rowIndex: number;
  columnHeaders: { name: string; label: string; type?: PossibleCellType }[];
  data: Map<string, any>;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  onDropdownChange?: (value: string, rowId?: string) => Promise<void>;
  onSwitchChange?: (value: boolean, rowId?: string) => Promise<void>;
  onRemove: (value: string) => Promise<void>;
  onRowSwitch?: (rowId: string, targetRowIndex: number) => Promise<void>;
  useNumber: boolean;
  rowId?: string;
  brandColor?: string;
}

export default function TableRow({
  rowIndex,
  columnHeaders,
  data,
  dropdownOptions,
  onDropdownChange,
  onSwitchChange,
  onRemove,
  useNumber,
  rowId = "",
  onRowSwitch,
  brandColor = "rgba(220, 220, 220, 0.5)",
}: TableRowProps) {
  const toast = useToast();
  const { isDragging, ref, handlerId } = useSortable<HTMLTableRowElement>({
    accept: "TableRow",
    onDrop: onRowSwitch,
    itemId: rowId,
    itemIndex: rowIndex,
  });

  // const colorHover = [
  //   "rgba(25, 92, 235, 0.5)",
  //   "rgba(235, 25, 151, 0.5)",
  //   "rgba(235, 189, 25, 0.5)",
  //   "rgba(235, 25, 25, 0.5)",
  //   "rgba(180, 25, 235, 0.5)",
  //   "rgba(25, 222, 235, 0.5)",
  // ];

  // const [randomColor, setRandomColor] = useState(colorHover[0]);

  // _hover={{ bgColor: randomColor }}
  // onMouseEnter={() => {
  //   const randomValue = Math.floor(Math.random() * 6);
  //   setRandomColor(colorHover[randomValue]);
  // }}
  return (
    <Tr
      _hover={{ bgColor: brandColor, transition: ".8s" }}
      fontSize="xl"
      fontFamily="Barlow"
      ref={ref}
      data-handler-id={handlerId}
      opacity={isDragging ? 0 : 1}
    >
      {useNumber && <Td>{`${rowIndex + 1}`.padStart(2, "0")}</Td>}
      {columnHeaders.map(({ name, /* label, */ type }, index) => {
        /* if (columnsRender?.[name]) {
              const props = {
                name,
                label,
                ...row,
              };

              return (
                <Td key={name}>{createElement(columnsRender[name], props)}</Td>
              );
            } */
        // return cellData(currentRow.get(name), index, type);
        return (
          <TableCell
            key={name}
            value={data.get(name)}
            index={index}
            type={type}
            dropdownOptions={dropdownOptions}
            isBeingDragged={isDragging}
            onDropdownChange={onDropdownChange}
            onSwitchChange={onSwitchChange}
            rowId={rowId}
          />
        );
      })}
      <Td>
        <IconButton
          aria-label="Remove item"
          icon={<IoMdTrash />}
          variant="ghost"
          bgColor="transparent"
          size="sm"
          type="button"
          fontSize="1.4rem"
          onClick={async () => {
            try {
              await onRemove(data.get("id"));
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: error.message,
                  position: "bottom",
                  isClosable: true,
                  status: "error",
                });
              }
            }
          }}
        />
      </Td>
    </Tr>
  );
}
