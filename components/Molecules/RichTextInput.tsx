import { chakra } from "@chakra-ui/react";
import { useField } from "formik";
import dynamic from "next/dynamic";

import InputContainer from "@/components/Atoms/InputContainer";

import type { InputContainerProps } from "@/components/Atoms/InputContainer";

import "react-quill/dist/quill.snow.css";

interface RichTextInputProps extends Omit<InputContainerProps, "children"> {
  placeholder?: string;
  editorHeight?: string;
}

const ReactQuill = chakra(
  dynamic(() => import("react-quill"), {
    ssr: false,
  })
);

export default function RichTextInput({
  name,
  id,
  label,
  tooltip = "",
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  editorHeight = "10rem",
}: RichTextInputProps) {
  const [, { value }, { setValue }] = useField(name);

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
      <ReactQuill
        mt="0.5rem"
        theme="snow"
        value={value || placeholder}
        onChange={(val) => setValue(val)}
        sx={{
          ".ql-snow .ql-editor": {
            color: "white",
            minHeight: editorHeight,
          },
        }}
      />
    </InputContainer>
  );
}
