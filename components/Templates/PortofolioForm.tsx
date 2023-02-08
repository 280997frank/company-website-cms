import {
  INITIAL_PORTO_DETAIL,
  PORTOFOLIO_COLORS,
  PORTOFOLIO_ROUTES,
  PORTOFOLIO_TITLES,
  validationSchemaPortoDetail,
} from "@/constants/portofolio";
import { useUploadFileViaAPI } from "@/hooks/upload";
import {
  IReqPortofolioDetail,
  TPortofolioDetailFormProps,
} from "@/types/portofolio";
import { Box, Grid, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumb from "../Atoms/Breadcrumb";
import FormInput from "../Molecules/FormInput";
import HeaderNav from "../Molecules/HeaderNav";
import MediaUpload from "../Molecules/MediaUpload";
import MediaUploadGallery from "../Molecules/MediaUploadGallery";
import RichTextInput from "../Molecules/RichTextInput";

const PortofolioForm: TPortofolioDetailFormProps = (props) => {
  const { type, data, defaultSquence, onSubmit } = props;
  const router = useRouter();
  const toast = useToast();
  let [values, setValues] =
    useState<IReqPortofolioDetail>(INITIAL_PORTO_DETAIL);
  const { fetchUploadFile } = useUploadFileViaAPI();

  const handlOnSubmit = async (values: IReqPortofolioDetail) => {
    try {
      const { banner, thumbnails, heroVideoUrl } = values;
      let bannerUrl = banner;
      let heroVideo = heroVideoUrl;
      const thumbnailsUrls: string[] = [];
      if (banner instanceof File) {
        const res = await fetchUploadFile({
          file: banner,
        });
        bannerUrl = res.content.url;
      }

      if (thumbnails.length > 0) {
        await Promise.all(
          thumbnails.map(async (item) => {
            if (typeof item !== "string") {
              const { url } = item;
              if (url instanceof File) {
                const res = await fetchUploadFile({
                  file: url,
                });
                thumbnailsUrls.push(res.content.url);
              }
            } else {
              thumbnailsUrls.push(item);
            }
          })
        );
      }

      if (heroVideoUrl instanceof File) {
        const res = await fetchUploadFile({
          file: heroVideoUrl,
        });
        bannerUrl = res.content.url;
      }

      const newObj: IReqPortofolioDetail = {
        ...values,
        banner: bannerUrl,
        thumbnails: thumbnailsUrls,
        heroVideoUrl: heroVideo,
      };

      await onSubmit(newObj);
    } catch (error: any) {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (router.query.id === "new") {
      setValues({
        ...INITIAL_PORTO_DETAIL,
        sequence: defaultSquence + 1,
      });
    } else {
      if (data) {
        setValues(data);
      }
    }
  }, [router, data, defaultSquence]);

  return (
    <Box p={6}>
      <Formik
        enableReinitialize
        initialValues={values}
        validationSchema={validationSchemaPortoDetail}
        onSubmit={async (values) => {
          await handlOnSubmit(values);
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
            <Breadcrumb
              list={[
                {
                  label: PORTOFOLIO_TITLES[type],
                  link: `/${PORTOFOLIO_ROUTES[type]}`,
                },
                {
                  label: data?.title ?? "New Project",
                },
              ]}
            />
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box>
                <MediaUpload
                  name="banner"
                  type="image"
                  accept="image/*"
                  label="THUMBNAIL"
                  id="banner"
                />
              </Box>
              <Box>
                <MediaUpload
                  name="heroVideoUrl"
                  type="video"
                  accept="video/mp4"
                  label="HERO VIDEO"
                  id="heroVideoUrl"
                />
              </Box>
            </Grid>
            <br />
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box>
                <FormInput
                  id="title"
                  name="title"
                  label="TITLE"
                  placeholder="Regular Text input value goes here"
                  tooltip="title"
                />
                <br />
                <FormInput
                  id="subTitle"
                  name="subTitle"
                  label="SUBTITLE"
                  placeholder="Regular Text input value goes here"
                  tooltip="subtile"
                />
                <br />
                <FormInput
                  id="category"
                  name="category"
                  label="CATEGORY"
                  placeholder="Regular Text input value goes here"
                  tooltip="category"
                />
                <br />
                <FormInput
                  id="clientName"
                  name="clientName"
                  label="CLIENT"
                  placeholder="Regular Text input value goes here"
                  tooltip="client"
                />
                <br />
                <FormInput
                  id="projectYear"
                  name="projectYear"
                  label="YEAR OF WORK"
                  placeholder="Regular Text input value goes here"
                  tooltip="Year of Work"
                />
                <br />
              </Box>
              <Box>
                <RichTextInput
                  id="description"
                  name="description"
                  label="Description"
                  editorHeight="22rem"
                />
              </Box>
            </Grid>
            <br />
            <MediaUploadGallery
              label="PROJECT IMAGES"
              addNewButton={{
                url: "",
                bgColor: PORTOFOLIO_COLORS[type],
              }}
              name="thumbnails"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PortofolioForm;
