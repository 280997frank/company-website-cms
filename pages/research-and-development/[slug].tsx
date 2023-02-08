import FormInput from "@/components/Molecules/FormInput";
import MediaUpload from "@/components/Molecules/MediaUpload";
import RichTextInput from "@/components/Molecules/RichTextInput";
import CustomSelect from "@/components/Molecules/Select";
import Layout from "@/components/Templates/Layout";
import {
  requiredDescriptionInProfile,
  requiredFile,
  requiredString,
  requireObjectSelect,
} from "@/constants/validationSchema";
import { useAddPostLab, useEditPostLab, usePostById } from "@/hooks/labs";
import { useUploadFileViaAPI } from "@/hooks/upload";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { object } from "yup";

interface TPropsIntial {
  title: string;
  synopsis: string;
  content: string;
  thumbnail: string | File;
  category: {
    value: string;
    label: string;
  };
}
const intitualvalues: TPropsIntial = {
  title: "",
  synopsis: "",
  content: "",
  thumbnail: "",
  category: {
    value: "",
    label: "",
  },
};
const validationSchema = object({
  title: requiredString,
  thumbnail: requiredFile,
  category: requireObjectSelect,
  content: requiredDescriptionInProfile,
  synopsis: requiredDescriptionInProfile,
});

const LabDetail: FC = () => {
  const [newInitialValues, setInitialValues] =
    useState<TPropsIntial>(intitualvalues);

  const router = useRouter();
  const Toast = useToast();
  const { slug } = router.query;

  const { fetchPostById, data: detailPost } = usePostById();
  const { fetchEditPost } = useEditPostLab();
  const { fetchAddPost } = useAddPostLab();
  const { fetchUploadFile } = useUploadFileViaAPI();

  useEffect(() => {
    if (slug && slug !== "new") {
      fetchPostById({ variables: { id: slug as string } });
    }
  }, [slug, fetchPostById]);

  useEffect(() => {
    if (detailPost) {
      setInitialValues({
        title: detailPost.getRndPostById.title,
        thumbnail: detailPost.getRndPostById.thumbnail,
        synopsis: detailPost.getRndPostById.synopsis,
        content: detailPost.getRndPostById.content,
        category: {
          value: detailPost.getRndPostById.RndCategory.id,
          label: detailPost.getRndPostById.RndCategory.title,
        },
      });
    }
  }, [detailPost]);

  const submitForm = useCallback(
    async (values: TPropsIntial) => {
      console.log(values, "values");
      try {
        let newLogoUrl = values.thumbnail;
        // Upload files first
        if (values.thumbnail instanceof File) {
          const uploadResult = await fetchUploadFile({
            file: values.thumbnail,
          });
          newLogoUrl = uploadResult.content.url;
        }
        const properValues = {
          title: values.title,
          synopsis: values.synopsis,
          content: values.content,
          thumbnail: newLogoUrl as string,
          categoryId: values.category.value,
        };
        console.log("properValues", properValues);
        // then save accordingly (add or update)
        if (slug === "new") {
          const req = await fetchAddPost({
            variables: {
              input: properValues,
            },
          });
          // router.push("/clients");
          return req;
        } else {
          return fetchEditPost({
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
    [Toast, fetchUploadFile, fetchAddPost, fetchEditPost, slug]
  );

  return (
    <Layout title="lab detail">
      <VStack align="flex-start" minHeight="100vh" padding={"10"} w="100%">
        <Formik
          enableReinitialize
          initialValues={newInitialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {({ isSubmitting, resetForm }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  align="flex-start"
                  // padding={"10"}
                  width="100%"
                >
                  <Stack direction="column" align="flex-start" w="50%">
                    <Heading
                      as="h1"
                      size="xl"
                      marginBottom="8"
                      color="#ED8041"
                      height="20px"
                      textTransform="uppercase"
                    >
                      RESEARCH & DEVELOPMENT
                    </Heading>
                    <Breadcrumb
                      spacing="5px"
                      color="White"
                      marginBottom="8 !important"
                      separator={<BsChevronRight color="white" />}
                    >
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/labs" textDecoration="underline">
                          RESEARCH & DEVELOPMENT
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbItem>
                        <Text>
                          {slug === "new"
                            ? "New Blog Post Title"
                            : "Blog Post Title"}
                        </Text>
                      </BreadcrumbItem>
                    </Breadcrumb>
                    {/* <FormInput
                      id="name"
                      name="name"
                      label="NAME"
                      placeholder="Regular Text input value goes here"
                      tooltip="Hello"
                    />
                    <br /> */}
                  </Stack>
                  <Stack direction="column" align="flex-end" w="50%">
                    <ButtonGroup variant="outline" spacing="6">
                      <Button
                        colorScheme="#ED8041"
                        outline={"none"}
                        _focus={{
                          outline: "none",
                        }}
                        bgColor="#ED8041"
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
                        borderColor="#ED8041"
                        colorScheme="#ED8041"
                        onClick={() => resetForm()}
                        isLoading={isSubmitting}
                      >
                        DISCARD CHANGES
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Stack>
                <HStack
                  direction="column"
                  justifyContent="space-between"
                  alignItems="baseline"
                  w="100%"
                >
                  <VStack w="50%" display="block">
                    <Box mb="2rem">
                      <FormInput
                        id="title"
                        name="title"
                        label="TITLE"
                        placeholder="Regular Text input value goes here"
                        tooltip="Hello"
                      />
                    </Box>
                    <Box pb="2rem">
                      <CustomSelect
                        name="category"
                        id="category"
                        label="CATEGORY"
                      />
                    </Box>
                    <Box>
                      <MediaUpload
                        id="thumbnail"
                        name="thumbnail"
                        type="image"
                        accept="image/*"
                        label="THUBMNAIL"
                        tooltip="Logo Url"
                      />
                    </Box>
                  </VStack>

                  <VStack w="48%" pt="5" display="flex" pl="1rem">
                    <Box w="100%" pb="1rem">
                      <RichTextInput
                        id="synopsis"
                        name="synopsis"
                        label="SYNOPSIS"
                        placeholder="Regular Text input value goes here"
                        tooltip="Hello"
                      />
                    </Box>
                    <Box w="100%" pt="2">
                      <RichTextInput
                        id="content"
                        name="content"
                        label="BLOG POST"
                        placeholder="Regular Text input value goes here"
                        tooltip="Hello"
                      />
                    </Box>
                  </VStack>
                </HStack>
              </Form>
            );
          }}
        </Formik>
      </VStack>
    </Layout>
  );
};

export default LabDetail;
