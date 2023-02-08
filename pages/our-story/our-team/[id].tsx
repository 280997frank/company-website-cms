// import ButtonCTA from "@/components/Atoms/Button";
import HeaderNav from "@/components/Molecules/HeaderNav";
import TabNav from "@/components/Molecules/TabNav";
import AddOurTeamForm from "@/components/Organisms/about-us/AddOurTeamForm";
import Layout from "@/components/Templates/Layout";
import { OurTeamMemberSchemaValidation } from "@/constants/about";
import {
  useAddOurTeam,
  useGetOurTeamMemberById,
  useUpdateOurTeamMember,
} from "@/hooks/about";
import { useUploadSingleFileViaAPI } from "@/hooks/upload";
import { IOurTeamMember } from "@/types/about";
import { Box, useToast } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";

const OurTeamMember: FC = () => {
  const route = useRouter();
  const toast = useToast();
  const {
    query: { id },
  } = route;
  const addOurTeamRef = useRef<FormikProps<IOurTeamMember>>(null);
  const [initData, setInitData] = useState<IOurTeamMember>({
    firstname: "",
    lastname: "",
    name: "",
    designation: "",
    subDesignation: "",
    linkedInUrl: "",
    imageUrl: "",
    sequence: 0,
  });
  const { submitAddOurTeam, loading } = useAddOurTeam();
  const { updateOurTeamMember, loading: updateLoading } =
    useUpdateOurTeamMember();
  const {
    fetchOurTeamMemberById,
    data,
    loading: loadingGetOurTeamMemberData,
  } = useGetOurTeamMemberById();
  const { fetchUploadFile, loading: uploadLoading } =
    useUploadSingleFileViaAPI();

  const handleAddOurTeamSubmit = async (values: IOurTeamMember) => {
    const name =
      values.firstname && values.lastname
        ? `${values.firstname} ${values.lastname}`
        : "";
    let value = _.omit(values, ["firstname", "lastname"]);
    if (value.imageUrl instanceof window.File) {
      const req = await fetchUploadFile({ file: values.imageUrl, toast });
      if (req && req.content) {
        value = {
          ...value,
          imageUrl: req.content.url,
        } as IOurTeamMember;
      }
    }
    if (id === "add") {
      await submitAddOurTeam({
        variables: {
          input: { ...value, name },
        },
      });
    } else {
      await updateOurTeamMember({
        variables: {
          input: { ...value, name },
        },
      });
    }
    route.push("/our-story/our-team");
  };

  const submit = () => {
    if (addOurTeamRef && addOurTeamRef.current) {
      addOurTeamRef.current.submitForm();
    }
  };

  const resetForm = () => {
    if (addOurTeamRef && addOurTeamRef.current) {
      addOurTeamRef.current.resetForm();
    }
  };

  useEffect(() => {
    if (id !== "add" && id) {
      fetchOurTeamMemberById({ variables: { id } });
    }
  }, [fetchOurTeamMemberById, id]);

  useEffect(() => {
    if (data && data.getOurTeamMemberById) {
      let value = _.omit(data.getOurTeamMemberById, ["isActive"]);
      setInitData({
        ...value,
        firstname: value.name.substring(0, value.name.indexOf(" ")),
        lastname: value.name.substring(value.name.indexOf(" ") + 1),
      });
    }
  }, [data]);

  return (
    <Layout title="About Us">
      <Box padding="20px" gap="10px">
        <HeaderNav
          title="Our Story"
          submit={submit}
          reset={resetForm}
          isLoading={
            loading ||
            uploadLoading ||
            loadingGetOurTeamMemberData ||
            updateLoading
          }
        />
        <TabNav
          data={[
            { label: "Main", url: "/our-story" },
            {
              label: "Our Team",
              url: "/our-story/our-team",
              brandColorActive: "brand.aboutUs",
              fontColorAtive: "#81029",
            },
            { label: "Our Process", url: "/our-story/our-process" },
          ]}
        />
        <Box>
          <Formik
            enableReinitialize
            initialValues={initData}
            validationSchema={OurTeamMemberSchemaValidation}
            innerRef={addOurTeamRef}
            onSubmit={handleAddOurTeamSubmit}
            component={AddOurTeamForm}
          />
        </Box>
        {/* content */}
      </Box>
    </Layout>
  );
};

export default OurTeamMember;
