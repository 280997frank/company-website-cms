import Layout from "@/components/Templates/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Grid,
  Text,
  Box,
} from "@chakra-ui/react";
import Switch from "@/components/Atoms/Switch";
import { Form, Formik, Field } from "formik";
import { BsChevronRight } from "react-icons/bs";
import React, { FC, useCallback, useEffect, useState } from "react";
import FormInput from "@/components/Molecules/FormInput";

import { object } from "yup";
import { requiredString, requiredFile } from "@/constants/validationSchema";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useUploadFileViaAPI } from "@/hooks/upload";
import {
  useAddLocation,
  useLocationById,
  useEditLocation,
} from "@/hooks/contactUs";
import MediaUpload from "@/components/Molecules/MediaUpload";

interface TPropsIntial {
  email: string;
  cityName: string;
  address: string;
  phoneNumber: string;
  image: string | File;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  wechat: string;
  whatsapp: string;
  urlMap: string;
  intercom: string;
  facebookActive: boolean;
  whatsappActive: boolean;
  wechatActive: boolean;
  linkedinActive: boolean;
  youtubeActive: boolean;
  instagramActive: boolean;
  intercomActive: boolean;
}
const intitualvalues: TPropsIntial = {
  email: "",
  cityName: "",
  address: "",
  phoneNumber: "",
  image: "",
  facebook: "",
  instagram: "",
  youtube: "",
  linkedin: "",
  wechat: "",
  whatsapp: "",
  urlMap: "",
  intercom: "",
  facebookActive: false,
  whatsappActive: false,
  wechatActive: false,
  linkedinActive: false,
  youtubeActive: false,
  instagramActive: false,
  intercomActive: false,
};
const validationSchema = object({
  email: requiredString,
  cityName: requiredString,
  address: requiredString,
  phoneNumber: requiredString,
  facebook: requiredString,
  instagram: requiredString,
  youtube: requiredString,
  linkedin: requiredString,
  wechat: requiredString,
  whatsapp: requiredString,
  urlMap: requiredString,
  image: requiredFile,
});
const ContactUsDetail: FC = () => {
  const router = useRouter();
  const Toast = useToast();
  const { slug } = router.query;
  const [newInitialValues, setInitialValues] =
    useState<TPropsIntial>(intitualvalues);
  const { fetchAddLocation } = useAddLocation();
  const { fetchEditLocation } = useEditLocation();
  const { fetchUploadFile } = useUploadFileViaAPI();
  const {
    fetchLocationById,
    data: dataDetail,
    newData: newDataDetail,
  } = useLocationById();

  useEffect(() => {
    if (slug && slug !== "new") {
      fetchLocationById({ variables: { id: slug as string } });
    }
  }, [slug, fetchLocationById]);

  useEffect(() => {
    if (dataDetail) {
      setInitialValues({
        email: dataDetail.getLocationById.email,
        cityName: dataDetail.getLocationById.cityName,
        address: dataDetail.getLocationById.address,
        phoneNumber: dataDetail.getLocationById.phoneNumber,
        image: dataDetail.getLocationById.image,
        facebook: dataDetail.getLocationById.facebook,
        instagram: dataDetail.getLocationById.instagram,
        youtube: dataDetail.getLocationById.youtube,
        linkedin: dataDetail.getLocationById.linkedin,
        wechat: dataDetail.getLocationById.wechat,
        whatsapp: dataDetail.getLocationById.whatsapp,
        urlMap: dataDetail.getLocationById.urlMap,
        intercom: "",
        intercomActive: false,
        facebookActive: dataDetail.getLocationById.facebookActive,
        whatsappActive: dataDetail.getLocationById.whatsappActive,
        wechatActive: dataDetail.getLocationById.wechatActive,
        linkedinActive: dataDetail.getLocationById.linkedinActive,
        youtubeActive: dataDetail.getLocationById.youtubeActive,
        instagramActive: dataDetail.getLocationById.instagramActive,
      });
    }
  }, [dataDetail]);

  const submitForm = useCallback(
    async (values: TPropsIntial) => {
      try {
        const { image } = values;
        let newImageUrl = image;
        if (image instanceof File) {
          const uploadResult = await fetchUploadFile({
            file: image,
          });
          newImageUrl = uploadResult.content.url;
        }
        const properValues = {
          email: values.email,
          cityName: values.cityName,
          address: values.address,
          phoneNumber: values.phoneNumber,
          image: newImageUrl,
          facebook: values.facebook,
          instagram: values.instagram,
          youtube: values.youtube,
          linkedin: values.linkedin,
          wechat: values.wechat,
          whatsapp: values.whatsapp,
          urlMap: values.urlMap,
          intercom: "",
          intercomActive: false,
          facebookActive: values.facebookActive || false,
          whatsappActive: values.whatsappActive || false,
          wechatActive: values.wechatActive || false,
          linkedinActive: values.linkedinActive || false,
          youtubeActive: values.youtubeActive || false,
          instagramActive: values.instagramActive || false,
        };
        // then save accordingly (add or update)
        if (slug === "new") {
          const req = await fetchAddLocation({
            variables: {
              input: properValues,
            },
          });
          return req;
        } else {
          return fetchEditLocation({
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
    [Toast, fetchAddLocation, fetchEditLocation, fetchUploadFile, slug]
  );

  return (
    <Layout title="Contact Us">
      <Box p="6">
        <Formik
          enableReinitialize
          initialValues={newInitialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await submitForm(values);
          }}
        >
          {({ resetForm, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <Stack direction="row" align="flex-start" padding={"10"}>
                  <Stack direction="column" align="flex-start" w="50%">
                    <Heading
                      as="h1"
                      size="xl"
                      marginBottom="8"
                      color="#FF558A"
                      textTransform="uppercase"
                    >
                      Contact Us
                    </Heading>
                    <Breadcrumb
                      spacing="5px"
                      color="White"
                      separator={<BsChevronRight color="white" />}
                    >
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href="/contact-us"
                          textDecoration="underline"
                        >
                          CONTACT US
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbItem>
                        <Text>
                          {slug === "new"
                            ? "New Client Name"
                            : newDataDetail?.cityName}
                        </Text>
                      </BreadcrumbItem>
                    </Breadcrumb>
                  </Stack>
                  <Stack direction="column" align="flex-end" w="50%">
                    <ButtonGroup variant="outline" spacing="6">
                      <Button
                        colorScheme="#FF558A"
                        outline={"none"}
                        _focus={{
                          outline: "none",
                        }}
                        bgColor="#FF558A"
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
                        borderColor="#FF558A"
                        colorScheme="#FF558A"
                        onClick={() => resetForm()}
                        isLoading={isSubmitting}
                      >
                        DISCARD CHANGES
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  align="flex-start"
                  padding={"10"}
                  spacing={10}
                >
                  <Stack direction="column" align="flex-start" w="50%">
                    <FormInput
                      id="cityName"
                      name="cityName"
                      label="CITY NAME"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                    />
                    <br />
                    <FormInput
                      id="address"
                      name="address"
                      label="ADDRESS"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                    />
                    <br />
                    <FormInput
                      id="phoneNumber"
                      name="phoneNumber"
                      label="PHONE NUMBER"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                    />
                    <br />
                    <FormInput
                      id="email"
                      name="email"
                      label="EMAIL"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                    />
                    <br />
                    <FormInput
                      id="urlMap"
                      name="urlMap"
                      label="MAP"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                    />
                  </Stack>
                  <Stack direction="column" align="flex-start" w="50%">
                    <MediaUpload
                      name="image"
                      type="image"
                      accept="image/*"
                      label="LOCATION IMAGE"
                      tooltip="Location Image Url"
                      id="image"
                    />
                  </Stack>
                </Stack>
                <Stack
                  padding="10"
                  spacing={10}
                  border="1px solid #fff"
                  margin="10"
                >
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <FormInput
                      id="facebook"
                      name="facebook"
                      label="FACEBOOK"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                      rightElement={
                        <Field name="facebookActive">
                          {({ field }: any) => {
                            return (
                              <Switch
                                {...field}
                                isChecked={field.value}
                                id="facebookActive"
                                onChange={(val): any => {
                                  setFieldValue(field.name, val);
                                }}
                              />
                            );
                          }}
                        </Field>
                      }
                    />
                    <FormInput
                      id="instagram"
                      name="instagram"
                      label="INSTAGRAM"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                      rightElement={
                        <Field name="instagramActive">
                          {({ field }: any) => {
                            return (
                              <Switch
                                {...field}
                                isChecked={field.value}
                                id="instagramActive"
                                onChange={(val): any => {
                                  setFieldValue(field.name, val);
                                }}
                              />
                            );
                          }}
                        </Field>
                      }
                    />
                    <FormInput
                      id="youtube"
                      name="youtube"
                      label="YOUTUBE"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                      rightElement={
                        <Field name="youtubeActive">
                          {({ field }: any) => {
                            return (
                              <Switch
                                {...field}
                                isChecked={field.value}
                                id="youtubeActive"
                                onChange={(val): any => {
                                  setFieldValue(field.name, val);
                                }}
                              />
                            );
                          }}
                        </Field>
                      }
                    />
                    <FormInput
                      id="linkedin"
                      name="linkedin"
                      label="LINKEDIN"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                      rightElement={
                        <Field name="linkedinActive">
                          {({ field }: any) => {
                            return (
                              <Switch
                                {...field}
                                isChecked={field.value}
                                id="linkedinActive"
                                onChange={(val): any => {
                                  setFieldValue(field.name, val);
                                }}
                              />
                            );
                          }}
                        </Field>
                      }
                    />
                    <FormInput
                      id="wechat"
                      name="wechat"
                      label="WECHAT"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                      rightElement={
                        <Field name="wechatActive">
                          {({ field }: any) => {
                            return (
                              <Switch
                                {...field}
                                isChecked={field.value}
                                id="wechatActive"
                                onChange={(val): any => {
                                  setFieldValue(field.name, val);
                                }}
                              />
                            );
                          }}
                        </Field>
                      }
                    />
                    <FormInput
                      id="whatsapp"
                      name="whatsapp"
                      label="WHATSAPP"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                      rightElement={
                        <Field name="whatsappActive">
                          {({ field }: any) => {
                            return (
                              <Switch
                                {...field}
                                isChecked={field.value}
                                id="whatsappActive"
                                onChange={(val): any => {
                                  setFieldValue(field.name, val);
                                }}
                              />
                            );
                          }}
                        </Field>
                      }
                    />
                  </Grid>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Layout>
  );
};

export default ContactUsDetail;
