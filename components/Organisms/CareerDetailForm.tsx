import FormInput from "@/components/Molecules/FormInput";
import { requiredFile, requiredString } from "@/constants/validationSchema";
import {
  useAddDesignation,
  useDesignationById,
  useEditDesignation,
} from "@/hooks/careers";
import { useUploadFileViaAPI } from "@/hooks/upload";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { object } from "yup";
import MediaUpload from "../Molecules/MediaUpload";
import RichTextInput from "../Molecules/RichTextInput";

interface TPropsIntial {
  name: string;
  description: string;
  imageUrl: string | File;
}
const intitualvalues: TPropsIntial = {
  name: "",
  description: "",
  imageUrl: "",
};
const validationSchema = object({
  name: requiredString,
  description: requiredString,
  imageUrl: requiredFile,
});
const CareerDetailForm: FC = () => {
  const router = useRouter();
  const Toast = useToast();
  const { category } = router.query;
  const [newInitialValues, setInitialValues] =
    useState<TPropsIntial>(intitualvalues);

  const { fetchAddDesignation } = useAddDesignation();
  const { fetchEditDesignation } = useEditDesignation();
  const { fetchUploadFile } = useUploadFileViaAPI();
  const {
    fetchDesignationById,
    data: dataDetail,
    newData: newDataDetail,
    // loading: isLoadingDetail,
  } = useDesignationById();

  useEffect(() => {
    if (category && category !== "new") {
      fetchDesignationById({ variables: { id: category as string } });
    }
  }, [category, fetchDesignationById]);

  useEffect(() => {
    if (dataDetail) {
      setInitialValues({
        name: dataDetail.getDesignationById.name,
        description: dataDetail.getDesignationById.description,
        imageUrl: dataDetail.getDesignationById.imageUrl,
      });
    }
  }, [dataDetail]);
  const submitForm = useCallback(
    async (values: TPropsIntial) => {
      try {
        let newImageUrl = values.imageUrl;
        console.log("values", values);
        // Upload files first
        if (values.imageUrl instanceof File) {
          console.log("logoUrl", values.imageUrl);
          const uploadResult = await fetchUploadFile({
            file: values.imageUrl,
          });
          newImageUrl = uploadResult.content.url;
          console.log("newImageUrl", newImageUrl);
        }
        console.log("properValues 0", values);
        const properValues = {
          name: values.name,
          description: values.description,
          imageUrl: newImageUrl as string,
        };
        console.log("properValues", properValues);
        // then save accordingly (add or update)
        if (category === "new") {
          console.log("properValues 1", properValues);
          const req = await fetchAddDesignation({
            variables: {
              input: properValues,
            },
          });
          // router.push("/clients");
          return req;
        } else {
          return fetchEditDesignation({
            variables: {
              input: {
                id: category as string,
                ...properValues,
              },
            },
          });
        }
      } catch (error: any) {
        Toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      }
    },
    [
      Toast,
      fetchEditDesignation,
      fetchAddDesignation,
      fetchUploadFile,
      category,
    ]
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
                  <Breadcrumb
                    spacing="5px"
                    color="White"
                    marginBottom="8 !important"
                    separator={<BsChevronRight color="white" />}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/join-us"
                        textDecoration="underline"
                      >
                        JOIN US
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <Text>
                        {category === "new"
                          ? "New Category Name"
                          : newDataDetail?.name}
                      </Text>
                    </BreadcrumbItem>
                  </Breadcrumb>
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
                      isLoading={isSubmitting}
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
                      disabled={isSubmitting}
                    >
                      DISCARD CHANGES
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Stack>
              <Stack direction="row" align="flex-start" width="100%">
                <Stack direction="column" align="flex-start" width="50%">
                  <FormInput
                    id="name"
                    name="name"
                    label="CATEGORY NAME"
                    placeholder="Regular Text input value goes here"
                    tooltip="name"
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
                <Stack direction="column" align="flex-start" width="50%">
                  <MediaUpload
                    id="imageUrl"
                    name="imageUrl"
                    label="THUMBNAIL"
                    placeholder="UPLOAD IMAGE"
                    tooltip="Thumbnail"
                    type="image"
                    accept="image/*"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CareerDetailForm;
