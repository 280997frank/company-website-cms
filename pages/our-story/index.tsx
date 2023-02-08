// import ButtonCTA from "@/components/Atoms/Button";
import HeaderNav from "@/components/Molecules/HeaderNav";
import TabNav from "@/components/Molecules/TabNav";
import MainForm from "@/components/Organisms/about-us/MainForm";
import Layout from "@/components/Templates/Layout";
import { MainSchemaValidation } from "@/constants/about";
import { useGetAbout, useUpSertAbout } from "@/hooks/about";
import { useUploadFileViaAPI } from "@/hooks/upload";
import { IAboutMain } from "@/types/about";
import { Box } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import _ from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";

const AboutUs: FC = () => {
  const mainRef = useRef<FormikProps<IAboutMain>>(null);

  const [mainState, setMainState] = useState<IAboutMain>({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const { fetchData, data: aboutData } = useGetAbout();
  const { submitMainForm, loading: mainLoading } = useUpSertAbout();
  const { fetchUploadFile, loading: uploadLoading } = useUploadFileViaAPI();

  const handleMainSubmit = async (values: IAboutMain) => {
    let value = values;
    if (
      values.videoUrl instanceof window.File &&
      values.imageUrl instanceof window.File
    ) {
      const reqImageUrl = await fetchUploadFile({ file: values.imageUrl });
      const reqVideoUrl = await fetchUploadFile({ file: values.videoUrl });
      if (reqImageUrl && reqVideoUrl) {
        value = {
          ...value,
          imageUrl: reqImageUrl.content.url,
          videoUrl: reqVideoUrl.content.url,
        };
      }
    } else if (values.videoUrl instanceof window.File) {
      const reqVideoUrl = await fetchUploadFile({ file: values.imageUrl });
      if (reqVideoUrl) {
        value = { ...value, videoUrl: reqVideoUrl.content.url };
      }
    } else if (values.imageUrl instanceof window.File) {
      const reqImageUrl = await fetchUploadFile({ file: values.imageUrl });
      if (reqImageUrl) {
        value = { ...value, imageUrl: reqImageUrl.content.url };
      }
    }

    await submitMainForm({
      variables: {
        input: {
          ...value,
          imageUrl: value.imageUrl,
          videoUrl: value.videoUrl,
        },
      },
    });
  };

  const submitForm = () => {
    if (mainRef && mainRef.current) {
      mainRef.current.submitForm();
    }
  };

  const resetForm = () => {
    if (mainRef && mainRef.current) {
      mainRef.current.resetForm();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (aboutData && aboutData.getAbout) {
      setMainState({
        title: aboutData.getAbout.title,
        description: aboutData.getAbout.description,
        imageUrl: aboutData.getAbout.imageUrl,
        videoUrl: aboutData.getAbout.videoUrl,
      });
    }
  }, [aboutData]);

  return (
    <Layout title="About Us">
      <Box padding="20px" gap="10px">
        <HeaderNav
          title="Our Story"
          submit={submitForm}
          reset={resetForm}
          isLoading={mainLoading || uploadLoading}
        />
        <TabNav
          data={[
            {
              label: "Main",
              url: "/our-story",
              brandColorActive: "brand.aboutUs",
              fontColorAtive: "#81029",
            },
            { label: "Our Team", url: "/our-story/our-team" },
            { label: "Our Process", url: "/our-story/our-process" },
          ]}
        />
        <Box mt="5vh">
          <Formik
            enableReinitialize
            initialValues={mainState}
            validationSchema={MainSchemaValidation}
            innerRef={mainRef}
            onSubmit={handleMainSubmit}
            component={MainForm}
          />
        </Box>
        {/* content */}
      </Box>
    </Layout>
  );
};

export default AboutUs;
