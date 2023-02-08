import { Switch as ChakraSwitch } from "@chakra-ui/react";

interface SwitchProps {
  isChecked: boolean;
  onChange?: (value: boolean, rowId?: string) => Promise<void>;
  rowId?: string;
}

export default function Switch({ isChecked, onChange, rowId }: SwitchProps) {
  return (
    <ChakraSwitch
      colorScheme="gray !important"
      display="flex"
      alignItems="center"
      isChecked={isChecked}
      onChange={(e) => onChange?.(e.target.checked, rowId)}
      sx={{
        "& > span": {
          borderRadius: 0,
          bgColor: isChecked ? "white" : "transparent",
          border: "1px solid white",
        },
        "span span": {
          bgColor: isChecked ? "black" : "white",
        },
      }}
    />
  );
}
