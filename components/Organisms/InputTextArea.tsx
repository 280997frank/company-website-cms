import React from "react";
import { ReactQuillProps } from "react-quill";
import TextArea from "@/components/Molecules/Textarea";
import InputContainer from "@/components/Atoms/InputContainer";

interface IInputTextArea extends ReactQuillProps {
  label: string;
  name: string;
  tooltip: string;
}

const InputTextArea = ({ label, name, tooltip, ...rest }: IInputTextArea) => {
  return (
    <InputContainer tooltip={tooltip} id={name} name={name} label={label}>
      <TextArea name={name} style={{ color: "white" }} {...rest} />
    </InputContainer>
  );
};

export default InputTextArea;
