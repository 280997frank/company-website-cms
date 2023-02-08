import { chakra } from "@chakra-ui/react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IReactQuill extends ReactQuillProps {
  name: string;
}

const ReactQuill = chakra(dynamic(() => import("react-quill"), { ssr: false }));

const TextArea = ({ style, name, ...rest }: IReactQuill) => {
  const [{ value }, , { setValue }] = useField(name);
  return (
    <ReactQuill
      style={{ ...style, marginTop: "6px" }}
      theme="snow"
      value={value}
      onChange={(e) => setValue(e)}
      {...rest}
    />
  );
};

export default TextArea;
