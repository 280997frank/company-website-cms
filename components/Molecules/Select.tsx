import React, { useEffect, useState } from "react";
import { useField } from "formik";
import CreatableSelect from "react-select/creatable";
import InputContainer from "../Atoms/InputContainer";
import type { InputContainerProps } from "@/components/Atoms/InputContainer";
import { ELabsOrderType, ELabsSortType } from "@/types/labs";
import { useCreateCategory, useListCategory } from "@/hooks/labs";

interface FormInputProps extends Omit<InputContainerProps, "children"> {
  placeholder?: string;
}

export default function CustomSelect({
  name,
  id,
  label,
  tooltip = "",
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
}: FormInputProps) {
  const [{ value }, , { setValue }] = useField(name);
  const [options, setOptions] = useState([{ value: "", label: "" }]);
  const [currentPage /*setCurrentPage*/] = useState(1);
  const [valueSearch /*setValueSearch*/] = useState("");

  //CATEGORY
  const { fetchListCategory, data } = useListCategory({
    input: {
      page: currentPage,
      limit: 25,
      search: {
        keyword: valueSearch,
      },
      // filter: {
      //   category: "",
      //   isActive: true,
      // },
      order: {
        orderBy: ELabsOrderType.CREATED_AT,
        sortBy: ELabsSortType.ASC,
      },
    },
  });

  const { mutationAddCategory } = useCreateCategory();

  useEffect(() => {
    fetchListCategory();
  }, [fetchListCategory]);

  useEffect(() => {
    if (data.length) {
      const temp = data.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
      setOptions(temp);
    }
  }, [data]);

  const handleChange = (newValue: any) => {
    // const filtered = options.filter<any>(({ label }) => label === newValue);
    // console.log(filtered, "filtered");
    console.log(newValue, "newValue");
  };

  const handleCreate = async (newValue: any) => {
    await mutationAddCategory({
      variables: {
        input: {
          title: newValue,
        },
      },
    });
    await fetchListCategory();
    handleChange(newValue);
  };

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
      {data.length && (
        <CreatableSelect
          styles={{
            control: () => ({
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              border: "1px solid #fff",
              marginTop: "10px",
            }),
            input: (provided: any) => ({
              ...provided,
              color: "white",
            }),
            placeholder: (provided: any) => ({
              ...provided,
              color: "#A0AFC0",
            }),
            loadingIndicator: (provided: any) => ({
              ...provided,
              color: "white",
            }),
            option: (provided) => ({
              ...provided,
              color: "#333",
            }),
            indicatorSeparator: () => ({}),
            singleValue: (provided: any) => ({
              ...provided,
              color: "white",
              border: "none",
            }),
          }}
          options={options}
          defaultValue={value}
          placeholder={placeholder}
          onChange={(e: any) => setValue(e)}
          onCreateOption={(e: any) => handleCreate(e)}
          onInputChange={(e: any) => handleChange(e)}
        />
      )}
    </InputContainer>
  );
}
