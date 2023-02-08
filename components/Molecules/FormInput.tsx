import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";

import InputContainer from "@/components/Atoms/InputContainer";

import type { ReactNode } from "react";
import type { InputContainerProps } from "@/components/Atoms/InputContainer";

interface FormInputProps extends Omit<InputContainerProps, "children"> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  type?: string;
  placeholder?: string;
}

export default function FormInput({
  name,
  id,
  label,
  leftElement = null,
  tooltip = "",
  type = "text",
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  rightElement = null,
}: FormInputProps) {
  const [{ value }, , { setValue }] = useField(name);

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
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          justifyContent="flex-start"
        >
          {leftElement}
        </InputLeftElement>
        <Input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          value={value ?? ""}
          placeholder={placeholder}
          border="none"
          borderBottom="1px solid white"
          borderRadius="none"
          fontWeight="500"
          fontSize="xl"
          color="white"
          pl={leftElement ? 8 : 0}
        />
        <InputRightElement>{rightElement}</InputRightElement>
      </InputGroup>
    </InputContainer>
  );
}
