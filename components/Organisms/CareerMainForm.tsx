import FormInput from "@/components/Molecules/FormInput";
import { requiredString } from "@/constants/validationSchema";
import { useGetMainCareers, useSaveMainCareers } from "@/hooks/careers";
import {
  Button,
  ButtonGroup,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import { object } from "yup";
import RichTextInput from "../Molecules/RichTextInput";

interface TPropsIntial {
  id: string;
  title: string;
  description: string;
}
const intitualvalues: TPropsIntial = {
  id: "",
  title: "",
  description: "",
};
const validationSchema = object({
  title: requiredString,
  description: requiredString,
});
const CareerMainForm: FC = () => {
  const Toast = useToast();
  const [newInitialValues, setInitialValues] =
    useState<TPropsIntial>(intitualvalues);
  const {
    fetchGetMainCareers,
    data: dataMainCareers,
    loading: isLoadingMainCareers,
  } = useGetMainCareers();

  useEffect(() => {
    fetchGetMainCareers();
  }, [fetchGetMainCareers]);

  useEffect(() => {
    if (dataMainCareers) {
      setInitialValues({
        id: dataMainCareers.getCareer.id,
        title: dataMainCareers.getCareer.title,
        description: dataMainCareers.getCareer.description,
      });
    }
  }, [dataMainCareers]);
  const { fetchSaveMainCareers } = useSaveMainCareers();
  // console.log("data", dataMainCareers);
  const submitForm = useCallback(
    async (values: TPropsIntial) => {
      try {
        const properValues = {
          id: values.id,
          title: values.title,
          description: values.description,
          description2: "empty",
        };
        const req = await fetchSaveMainCareers({
          variables: {
            input: properValues,
          },
        });
        return req;
      } catch (error: any) {
        Toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      }
    },
    [Toast, fetchSaveMainCareers]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={newInitialValues}
      validationSchema={validationSchema}
      onSubmit={submitForm}
      // onSubmit={(values) => {
      //   console.log("values", values);
      // }}
    >
      {({ isSubmitting, resetForm }) => {
        return (
          <Form>
            <Stack direction="column" align="flex-start" h="100%" w="100%">
              <Stack direction="row" align="flex-start" width="100%">
                <Stack direction="column" align="flex-start" w="50%">
                  <Heading
                    as="h1"
                    size="xl"
                    marginBottom="8"
                    color="#F7FF7C"
                    textTransform="uppercase"
                  >
                    JOIN US
                  </Heading>
                </Stack>
                <Stack direction="column" align="flex-end" w="50%">
                  <ButtonGroup variant="outline" spacing="6">
                    <Button
                      colorScheme="#F7FF7C"
                      outline={"none"}
                      _focus={{
                        outline: "none",
                      }}
                      bgColor="#F7FF7C"
                      borderRadius="none"
                      type="submit"
                      isLoading={isSubmitting || isLoadingMainCareers}
                    >
                      SAVE CHANGES
                    </Button>
                    <Button
                      color="white"
                      outline={"none"}
                      _focus={{
                        outline: "none",
                      }}
                      bgColor="transparent"
                      borderRadius="none"
                      borderColor="#F7FF7C"
                      colorScheme="#F7FF7C"
                      onClick={() => resetForm()}
                    >
                      DISCARD CHANGES
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Stack>
              <Stack direction="column" align="flex-start" width="100%">
                <FormInput
                  id="title"
                  name="title"
                  label="TITLE"
                  placeholder="Regular Text input value goes here"
                  tooltip="TITLE"
                />
                <br />
                <RichTextInput
                  id="description"
                  name="description"
                  label="DESCRIPTION"
                  placeholder="Regular Text input value goes here"
                  tooltip="description"
                />
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CareerMainForm;
