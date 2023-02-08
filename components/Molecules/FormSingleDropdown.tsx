import { AsyncPaginate } from "react-select-async-paginate";
import { useField } from "formik";
import { Box } from "@chakra-ui/react";

import type { FC } from "react";
import type { LoadOptions } from "react-select-async-paginate";
import type { GroupBase } from "react-select";
import SelectContainer from "@/components/Atoms/SelectContainer";

import type { InputContainerProps } from "@/components/Atoms/InputContainer";

export interface IOption {
  label: string;
  value: string;
}

interface SingleDropdownProps extends Omit<InputContainerProps, "children"> {
  isDisabled: boolean;
  loadOptions: LoadOptions<IOption, GroupBase<IOption>, { page: number }>;
}

const SingleDropdown: FC<SingleDropdownProps> = ({
  name,
  id,
  label,
  tooltip = "",
  description,
  isDisabled = false,
  isReadOnly = false,
  loadOptions,
}) => {
  const [{ value }, , { setValue }] = useField(name);
  return (
    <SelectContainer
      id={id}
      name={name}
      label={label}
      tooltip={tooltip}
      description={description}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <Box w="100%" border="none" pos="relative">
        <Box
          _after={{
            content: '""',
            width: "100%",
            height: "1px",

            backgroundColor: "white",
            position: "absolute",
          }}
          __css={{
            borderWidth: "0",
            borderColor: "white",
          }}
          color="red"
        >
          <AsyncPaginate
            styles={{
              control: () => ({
                display: "flex",
                flexDirection: "row",
              }),
              placeholder: (provided: any) => ({
                ...provided,
                color: "#A0AFC0",
              }),
              loadingIndicator: (provided: any) => ({
                ...provided,
                color: "white",
              }),
              option: (provided: any) => ({
                ...provided,
                color: "#333",
              }),
              indicatorSeparator: () => ({}),
              singleValue: (provided: any, { isDisabled }) => ({
                ...provided,
                color: isDisabled ? "#40464C" : "white",
                border: "none",
              }),
            }}
            debounceTimeout={400}
            value={value}
            placeholder="Selected Location"
            name={name}
            isDisabled={isDisabled}
            onChange={(e: any) => setValue(e)}
            loadOptions={loadOptions}
            additional={{
              page: 1,
            }}
          />
        </Box>
      </Box>
    </SelectContainer>
  );
};

export default SingleDropdown;
