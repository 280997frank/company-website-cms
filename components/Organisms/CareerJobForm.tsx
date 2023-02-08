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
import { IoMdLink } from "react-icons/io";
import { object, string } from "yup";

import FormInput from "@/components/Molecules/FormInput";
import FormSelect from "@/components/Molecules/FormSelect";
import RichTextInput from "@/components/Molecules/RichTextInput";
import DropdownLocationsCareers from "@/components/Molecules/DropdownLocationsCareers";

import {
  /*requiredFile,*/ requiredNumber,
  requiredString,
} from "@/constants/validationSchema";
import {
  useAddJobOpening,
  useEditJobOpening,
  useJobOpeningById,
  useDesignationById,
} from "@/hooks/careers";
import { TJObType } from "@/types/careeers";

export interface IOption {
  label: string;
  value: string;
}
interface TPropsIntial {
  title: string;
  jobType: string;
  locationId: IOption;
  applyUrl: string;
  description: string;
  ofOpenings: Number;
}
const intitualvalues: TPropsIntial = {
  title: "",
  jobType: "FULL_TIME",
  applyUrl: "",
  description: "",
  locationId: {
    label: "",
    value: "",
  },
  ofOpenings: 0,
};
const validationSchema = object({
  title: requiredString,
  jobType: requiredString,
  applyUrl: requiredString,
  description: requiredString,
  locationId: object().shape({
    value: string().required("Required"),
  }),
  ofOpenings: requiredNumber,
});
const CareerJobForm: FC = () => {
  const jobType = [
    {
      label: "FULL TIME",
      value: "FULL_TIME",
    },
    {
      label: "PART TIME",
      value: "PART_TIME",
    },
    {
      label: "FREELANCE",
      value: "FREELANCE",
    },
  ];
  const router = useRouter();
  const Toast = useToast();
  const { category, slug } = router.query;
  const [newInitialValues, setInitialValues] =
    useState<TPropsIntial>(intitualvalues);
  // console.log("category", category);

  const { fetchAddJobOpenong } = useAddJobOpening();
  const { fetchEditJobOpening } = useEditJobOpening();
  const {
    fetchDesignationById,
    // data: dataDetailCategory,
    newData: newDataDetailCategory,
    // loading: isLoadingDetail,
  } = useDesignationById();

  useEffect(() => {
    if (category && category !== "new") {
      fetchDesignationById({ variables: { id: category as string } });
    }
  }, [category, fetchDesignationById]);
  const {
    fetchJobOpeningnById,
    data: dataDetail,
    newData: newDataDetail,
    // loading: isLoadingDetail,
  } = useJobOpeningById();

  useEffect(() => {
    if (slug && slug !== "new") {
      fetchJobOpeningnById({ variables: { id: slug as string } });
    }
  }, [slug, fetchJobOpeningnById]);

  useEffect(() => {
    if (dataDetail) {
      setInitialValues({
        title: dataDetail.getJobOpeningById.title,
        jobType: dataDetail.getJobOpeningById.jobType,
        applyUrl: dataDetail.getJobOpeningById.applyUrl,
        description: dataDetail.getJobOpeningById.description,
        locationId: {
          label: dataDetail.getJobOpeningById.location.cityName,
          value: dataDetail.getJobOpeningById.location.id,
        },
        ofOpenings: dataDetail.getJobOpeningById.ofOpenings,
      });
    }
  }, [dataDetail]);

  const submitForm = useCallback(
    async (values: TPropsIntial) => {
      try {
        const properValues = {
          title: values.title,
          jobType: values.jobType as TJObType,
          applyUrl: values.applyUrl,
          description: values.description,
          locationId: values.locationId.value,
          ofOpenings: values.ofOpenings,
          designationId: category as string,
        };
        // console.log("properValues", properValues);
        // then save accordingly (add or update)
        if (slug === "new") {
          // console.log("properValues 1", properValues);
          const req = await fetchAddJobOpenong({
            variables: {
              input: properValues,
            },
          });
          // router.push("/clients");
          return req;
        } else {
          return fetchEditJobOpening({
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
    [category, slug, fetchAddJobOpenong, fetchEditJobOpening, Toast]
  );
  // console.log("newDataDetail", newDataDetail);
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
                      <BreadcrumbLink
                        href={`/join-us/${category}`}
                        textDecoration="underline"
                      >
                        {newDataDetailCategory?.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <Text>
                        {slug === "new"
                          ? "New Job Title"
                          : newDataDetail?.title}
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
                    id="title"
                    name="title"
                    label="JOB TITLE"
                    placeholder="Regular Text input value goes here"
                    tooltip="JOB TITLE"
                  />
                  <br />
                  <DropdownLocationsCareers
                    id="locationId"
                    name="locationId"
                    label="LOCATION"
                    isDisabled={false}
                    tooltip="locationId"
                  />
                  <br />
                  <Stack direction={"row"} align="flex-start" width="100%">
                    <FormSelect
                      id="jobType"
                      label="JOB TYPE"
                      name="jobType"
                      data={jobType}
                      tooltip="jobType"
                      // onChange={handleChange}
                    />
                    <FormInput
                      id="ofOpenings"
                      name="ofOpenings"
                      label="NO. OF OPENINGS"
                      placeholder="Regular Text input value goes here"
                      tooltip="No. of Openings"
                      type="number"
                    />
                  </Stack>

                  <br />
                  <FormInput
                    id="applyUrl"
                    name="applyUrl"
                    label="APPLY URL"
                    placeholder="Regular Text input value goes here"
                    tooltip="applyUrl"
                    leftElement={<IoMdLink color="white" />}
                    // type="file"
                  />
                </Stack>
                <Stack direction="column" align="flex-start" width="50%">
                  <RichTextInput
                    id="description"
                    name="description"
                    label="DESCRIPTION"
                    placeholder="Regular Text input value goes here"
                    tooltip="description"
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

export default CareerJobForm;
