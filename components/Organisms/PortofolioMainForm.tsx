import {
  INITIAL_PORTOFOLIO_MAIN,
  PORTOFOLIO_COLORS,
  PORTOFOLIO_TITLES,
  VALIDATION_PORTOFOLIO_MAIN,
} from "@/constants/portofolio";
import { IPortofolio, TPortofolioMainProps } from "@/types/portofolio";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormInput from "../Molecules/FormInput";
import HeaderNav from "../Molecules/HeaderNav";
import RichTextInput from "../Molecules/RichTextInput";

const PortofolioMainForm: TPortofolioMainProps = ({ type, data, onSubmit }) => {
  const [values, setValues] = useState<IPortofolio>(INITIAL_PORTOFOLIO_MAIN);

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={VALIDATION_PORTOFOLIO_MAIN}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {({ resetForm, submitForm, isSubmitting }) => (
        <Form>
          <HeaderNav
            title={PORTOFOLIO_TITLES[type]}
            brandColor={PORTOFOLIO_COLORS[type]}
            isLoading={isSubmitting}
            submit={submitForm}
            reset={resetForm}
          />
          <FormInput
            id="title"
            name="title"
            label="TITLE"
            placeholder="Regular Text input value goes here"
            tooltip="title"
          />
          <br />
          <RichTextInput
            id="descriptionOne"
            name="descriptionOne"
            label="Description"
          />
        </Form>
      )}
    </Formik>
  );
};

export default PortofolioMainForm;
