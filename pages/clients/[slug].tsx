import Layout from "@/components/Templates/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { BsChevronRight } from "react-icons/bs";
import React, { FC, useCallback, useEffect, useState } from "react";
import FormInput from "@/components/Molecules/FormInput";

import { object } from "yup";
import { requiredFile, requiredString } from "@/constants/validationSchema";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useUploadFileViaAPI } from "@/hooks/upload";
import { useAddClient, useClientById, useEditClient } from "@/hooks/clients";
import MediaUpload from "@/components/Molecules/MediaUpload";

interface TPropsIntial {
  name: string;
  logoUrl: string | File;
}
const intitualvalues: TPropsIntial = {
  name: "",
  logoUrl: "",
};
const validationSchema = object({
  name: requiredString,
  logoUrl: requiredFile,
});
const ClientDetail: FC = () => {
  const router = useRouter();
  const Toast = useToast();
  const { slug } = router.query;
  const [newInitialValues, setInitialValues] =
    useState<TPropsIntial>(intitualvalues);
  const { fetchAddClient } = useAddClient();
  const { fetchEditClient } = useEditClient();
  const { fetchUploadFile } = useUploadFileViaAPI();
  const {
    fetchClientById,
    data: dataDetail,
    newData: newDataDetail,
    // loading: isLoadingDetail,
  } = useClientById();

  useEffect(() => {
    if (slug && slug !== "new") {
      fetchClientById({ variables: { id: slug as string } });
    }
  }, [slug, fetchClientById]);

  useEffect(() => {
    if (dataDetail) {
      setInitialValues({
        name: dataDetail.getClientById.name,
        logoUrl: dataDetail.getClientById.logoUrl,
      });
    }
  }, [dataDetail]);

  console.log("dataDetail", dataDetail);
  console.log("newInitialValues", newInitialValues);

  const submitForm = useCallback(
    async (values: TPropsIntial) => {
      try {
        let newLogoUrl = values.logoUrl;
        console.log("values", values);
        // Upload files first
        if (values.logoUrl instanceof File) {
          console.log("logoUrl", values.logoUrl);
          const uploadResult = await fetchUploadFile({
            file: values.logoUrl,
          });
          newLogoUrl = uploadResult.content.url;
          console.log("newLogoUrl", newLogoUrl);
        }
        console.log("properValues 0", values);
        const properValues = {
          name: values.name,
          logoUrl: newLogoUrl as string,
        };
        console.log("properValues", properValues);
        // then save accordingly (add or update)
        if (slug === "new") {
          console.log("properValues 1", properValues);
          const req = await fetchAddClient({
            variables: {
              input: properValues,
            },
          });
          // router.push("/clients");
          return req;
        } else {
          return fetchEditClient({
            variables: {
              input: {
                id: slug as string,
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
    [Toast, fetchAddClient, fetchEditClient, fetchUploadFile, slug]
  );
  return (
    <Layout title="Client">
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
              <Stack
                direction="row"
                align="flex-start"
                minHeight="100vh"
                padding={"10"}
              >
                <Stack direction="column" align="flex-start" w="50%">
                  <Heading
                    as="h1"
                    size="xl"
                    marginBottom="8"
                    color="#FFBB84"
                    textTransform="uppercase"
                  >
                    Clients
                  </Heading>
                  <Breadcrumb
                    spacing="5px"
                    color="White"
                    marginBottom="8 !important"
                    separator={<BsChevronRight color="white" />}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/clients"
                        textDecoration="underline"
                      >
                        CLIENTS
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <Text>
                        {slug === "new"
                          ? "New Client Name"
                          : newDataDetail?.name}
                      </Text>
                    </BreadcrumbItem>
                  </Breadcrumb>
                  <FormInput
                    id="name"
                    name="name"
                    label="NAME"
                    placeholder="Regular Text input value goes here"
                    tooltip="Hello"
                  />
                  <br />
                  {/* <FormInput
                    id="logoUrl"
                    name="logoUrl"
                    label="logoUrl"
                    placeholder="Regular Text input value goes here"
                    tooltip="logoUrl"
                  /> */}
                  <MediaUpload
                    id="logoUrl"
                    name="logoUrl"
                    type="image"
                    accept="image/*"
                    label="LOGO"
                    tooltip="Logo Url"
                  />
                </Stack>
                <Stack direction="column" align="flex-end" w="50%">
                  <ButtonGroup variant="outline" spacing="6">
                    <Button
                      colorScheme="#FFBB84"
                      outline={"none"}
                      _focus={{
                        outline: "none",
                      }}
                      bgColor="#FFBB84"
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
                      borderColor="#FFBB84"
                      colorScheme="#FFBB84"
                      onClick={() => resetForm()}
                      disabled={isSubmitting}
                    >
                      DISCARD CHANGES
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default ClientDetail;
