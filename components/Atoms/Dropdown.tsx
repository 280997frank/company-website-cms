import React from "react";
import { Select, useToast } from "@chakra-ui/react";

interface DropdownProps {
  data: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string, rowId?: string) => Promise<void>;
  initialValue: string;
  placeholder?: string;
  rowId?: string;
}

export default function Dropdown({
  data,
  onChange,
  initialValue,
  placeholder = "Select option",
  rowId,
}: DropdownProps) {
  const toast = useToast();

  return (
    <Select
      variant="flushed"
      placeholder={placeholder}
      defaultValue={initialValue}
      fontSize="xl"
      fontFamily="Barlow"
      onChange={async (e) => {
        try {
          await onChange?.(e.target.value, rowId);
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
      sx={{
        "& > option": {
          color: "black",
        },
      }}
    >
      {data.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
