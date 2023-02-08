// import ButtonCTA from "@/components/Atoms/Button";
import HeaderNav from "@/components/Molecules/HeaderNav";
import TabNav from "@/components/Molecules/TabNav";
import OurProcessForm from "@/components/Organisms/about-us/OurProcessForm";
import Layout from "@/components/Templates/Layout";
import { OurProcessSchemaValidation } from "@/constants/about";
// import { OurTeamMemberSchemaValidation } from "@/constants/about";
import {
  useAddOurProcess,
  useGetOurProcessById,
  useUpdateOurProcess,
} from "@/hooks/about";
import { useUploadFileViaAPI } from "@/hooks/upload";
import { IOurProcess } from "@/types/about";
import { Box } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";

const OurProcess: FC = () => {
  const route = useRouter();
  const {
    query: { id },
  } = route;
  const ourProcessFormRef = useRef<FormikProps<IOurProcess>>(null);
  const [initData, setInitData] = useState<IOurProcess>({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    sequence: 0,
  });

  const { submitOurProcess, loading: addLoading } = useAddOurProcess();
  const {
    fetchOurProcessById,
    data: ourProcessData,
    loading: getLoading,
  } = useGetOurProcessById();
  const { updateOurProcess, loading: updateLoading } = useUpdateOurProcess();

  const { fetchUploadFile, loading: uploadLoading } = useUploadFileViaAPI();

  const handleOurProcessSubmit = async (values: IOurProcess) => {
    let value = values;
    if (values.imageUrl instanceof window.File) {
      const req = await fetchUploadFile({ file: values.imageUrl });
      if (req && req.content) {
        value = {
          ...value,
          imageUrl: req.content.url,
        } as IOurProcess;
      }
    }
    if (id === "add") {
      await submitOurProcess({
        variables: {
          input: value,
        },
      });
    } else {
      await updateOurProcess({
        variables: {
          input: value,
        },
      });
    }
    route.push("/our-story/our-process");
  };

  const submit = () => {
    if (ourProcessFormRef && ourProcessFormRef.current) {
      ourProcessFormRef.current.submitForm();
    }
  };

  const resetForm = () => {
    if (ourProcessFormRef && ourProcessFormRef.current) {
      ourProcessFormRef.current.resetForm();
    }
  };

  useEffect(() => {
    if (id !== "add" && id) {
      fetchOurProcessById({ variables: { id: +id } });
    }
  }, [fetchOurProcessById, id]);

  useEffect(() => {
    if (ourProcessData && ourProcessData.getOurProcessById) {
      setInitData({
        ...ourProcessData.getOurProcessById,
      });
    }
  }, [ourProcessData]);

  return (
    <Layout title="About Us">
      <Box padding="20px" gap="10px">
        <HeaderNav
          title="Our Story"
          submit={submit}
          reset={resetForm}
          isLoading={uploadLoading || getLoading || updateLoading || addLoading}
        />
        <TabNav
          data={[
            { label: "Main", url: "/our-story" },
            { label: "Our Team", url: "/our-story/our-team" },
            {
              label: "Our Process",
              url: "/our-story/our-process",
              brandColorActive: "brand.aboutUs",
              fontColorAtive: "#81029",
            },
          ]}
        />
        <Box>
          <Formik
            enableReinitialize
            initialValues={initData}
            validationSchema={OurProcessSchemaValidation}
            innerRef={ourProcessFormRef}
            onSubmit={handleOurProcessSubmit}
            component={OurProcessForm}
          />
        </Box>
        {/* content */}
      </Box>
    </Layout>
  );
};

export default OurProcess;
