import React, { ReactNode } from "react";
import NextLink from "next/link";
import { Td, Icon } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

import Switch from "@/components/Atoms/Switch";
import Dropdown from "@/components/Atoms/Dropdown";
import { isNil } from "lodash";

interface TableCellProps {
  value: string | number | boolean;
  index: number;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  isBeingDragged: boolean;
  onDropdownChange?: (value: string, rowId?: string) => Promise<void>;
  onSwitchChange?: (value: boolean, rowId?: string) => Promise<void>;
  type?: PossibleCellType;
  rowId?: string;
}

export type PossibleCellType = "dropdown" | "switch" | "link";

export default function TableCell({
  value,
  index,
  type,
  dropdownOptions,
  isBeingDragged,
  onDropdownChange,
  onSwitchChange,
  rowId,
}: TableCellProps) {
  let data: string | number | ReactNode;
  let draggable = null;
  let detaiPage = `${window.location.pathname}/${!isNil(rowId) ? rowId : ""}`;

  switch (type) {
    case "dropdown":
      data = (
        <Dropdown
          data={dropdownOptions}
          initialValue={
            typeof value !== "string" ? JSON.stringify(value) : value
          }
          rowId={rowId}
          onChange={onDropdownChange}
        />
      );
      break;
    case "switch":
      data = (
        <Switch isChecked={!!value} rowId={rowId} onChange={onSwitchChange} />
      );
      break;
    case "link":
      data = (
        <NextLink passHref href={detaiPage}>
          {value}
        </NextLink>
      );
      break;
    default:
      data = value;
  }

  if (index === 0) {
    draggable = (
      <Icon
        as={GiHamburgerMenu}
        h="1rem"
        mr={4}
        cursor={isBeingDragged ? "grabbing" : "grab"}
        className="handle"
      />
    );
  }

  return (
    <Td>
      {draggable}
      {data}
    </Td>
  );
}
