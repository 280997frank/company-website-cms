import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";

import InfoIcon from "@/components/Atoms/InfoIcon";

import type { ReactNode, LegacyRef } from "react";
import type { Identifier } from "dnd-core";

export interface InputContainerProps {
  children: ReactNode;
  id: string;
  name: string;
  label: string;
  tooltip?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInput?: boolean;
  leftElement?: ReactNode;
  nodeRef?: LegacyRef<HTMLDivElement>;
  handlerId?: Identifier | null;
}

const SelectContainer = ({
  children,
  id,
  name,
  label,
  tooltip,
  description,
  isDisabled,
  isReadOnly,
  leftElement,
  nodeRef,
  handlerId,
}: InputContainerProps) => {
  const [, meta] = useField(name);

  return (
    <FormControl
      data-handler-id={handlerId}
      ref={nodeRef}
      id={id}
      isInvalid={Boolean(meta.error && meta.touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <FormLabel
        color="white"
        fontFamily="'Mark Pro', sans-serif"
        fontWeight="bold"
        fontSize="2xl"
        display="flex"
        gap={2}
        lineHeight="1"
        mb={0}
      >
        {leftElement}
        {label}
        {tooltip && (
          <Tooltip
            label={tooltip}
            aria-label="A tooltip"
            bgColor="white"
            color="#081029"
            fontSize="md"
            fontWeight="500"
          >
            <InfoIcon />
          </Tooltip>
        )}
      </FormLabel>
      {children}
      {description && <FormHelperText>{description}</FormHelperText>}
      <ErrorMessage name={`${name}.value`}>
        {(msg) => (
          <Text color="#E53E3E" fontSize="14px" mt="8px">
            {msg}
          </Text>
        )}
      </ErrorMessage>
    </FormControl>
  );
};

export default SelectContainer;
