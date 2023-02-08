import { ChangeEvent, useRef } from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";
import { useField } from "formik";
import s from "shortid";
import { useErrorFocus } from "@/hooks/hook";

import type { InputContainerProps } from "@/components/Atoms/InputContainer";
import InputContainer from "@/components/Atoms/InputContainer";

interface SelectProps extends Omit<InputContainerProps, "children"> {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: {
    label: string;
    value: string | number;
  }[];
  isMultiple?: boolean;
  placeholder?: string;
}

const Select = ({
  name,
  id,
  data,
  label,
  tooltip = "",
  placeholder = "",
  description,
  isDisabled = false,
  isReadOnly = false,
  isMultiple = false,
  onChange = () => {},
  ...props
}: SelectProps) => {
  const [{ value }, , { setValue }] = useField(name);
  const selectRef = useRef(null);
  useErrorFocus(selectRef, name);

  return (
    <InputContainer
      id={id}
      name={name}
      label={label}
      tooltip={tooltip}
      description={description}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <ChakraSelect
        border="none"
        borderBottom="1px solid white"
        borderRadius="0"
        fontWeight="500"
        fontSize="xl"
        color="white"
        name={name}
        multiple={isMultiple}
        value={value ? value : ""}
        placeholder={placeholder}
        ref={selectRef}
        onClick={(e) => {
          const selected = e.currentTarget.value;
          if (isMultiple) {
            if (value.includes(selected)) {
              setValue(value.filter((val: string) => val !== selected));
            }
          }
        }}
        onChange={(e) => {
          const selected = e.currentTarget.value;
          if (isMultiple) {
            if (value.includes(selected)) {
              setValue(value.filter((val: string) => val !== value));
            } else {
              setValue([...value, selected]);
            }
          } else {
            setValue(selected);
            if (onChange) {
              onChange(e);
            }
          }
        }}
        {...props}
      >
        {data.map(({ label, value }) => (
          <option
            key={s.generate()}
            value={value}
            style={{
              background: "transparent",
              color: "black",
              fontWeight: "500",
              fontSize: "xl",
            }}
          >
            {label}
          </option>
        ))}
      </ChakraSelect>
    </InputContainer>
  );
};

export default Select;
