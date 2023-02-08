import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import FormInput from "@/components/Molecules/FormInput";
import RichTextInput from "@/components/Molecules/RichTextInput";
import Table from "@/components/Molecules/Table";
import Layout from "@/components/Templates/Layout";
import {
  requiredDescriptionInProfile,
  requiredString,
} from "@/constants/validationSchema";
import { useDeleteLabPost, useLabPublish, useListLabPost } from "@/hooks/labs";
import { ELabsOrderType, ELabsSortType } from "@/types/labs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { isNil } from "lodash";
import { FC, useCallback, useEffect, useState } from "react";
import { object } from "yup";

interface TPropsIntial {
  title: string;
  description: string | File;
}
const intitualvalues: TPropsIntial = {
  title: "",
  description: "",
};
const validationSchema = object({
  name: requiredString,
  description: requiredDescriptionInProfile,
});

const ResearchAndDevelopmentPage: FC = () => {
  const [newInitialValues /*setInitialValues*/] =
    useState<TPropsIntial>(intitualvalues);
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({
    openDeleteDialog: false,
    id: "",
  });

  const [currentPage /*setCurrentPage*/] = useState(1);
  const [valueSearch, setValueSearch] = useState("");

  const { mutationDelete } = useDeleteLabPost({
    input: {
      page: currentPage,
      limit: 10,
      search: {
        keyword: valueSearch,
      },
      // filter: {
      //   category: "",
      //   isActive: true,
      // },
      order: {
        orderBy: ELabsOrderType.CREATED_AT,
        sortBy: ELabsSortType.ASC,
      },
    },
  });

  const {
    fetchListLab,
    responseListLab,
    loading: isLoadingData,
  } = useListLabPost({
    input: {
      page: currentPage,
      limit: 10,
      search: {
        keyword: valueSearch,
      },

      order: {
        orderBy: ELabsOrderType.CREATED_AT,
        sortBy: ELabsSortType.ASC,
      },
    },
  });

  useEffect(() => {
    fetchListLab();
  }, [fetchListLab]);

  const { fetchPublish } = useLabPublish({
    input: {
      page: currentPage,
      limit: 10,
      search: {
        keyword: valueSearch,
      },
      // filter: {
      //   category: "",
      //   isActive: true,
      // },
      order: {
        orderBy: ELabsOrderType.CREATED_AT,
        sortBy: ELabsSortType.ASC,
      },
    },
  });

  const submitForm = useCallback(async (values: TPropsIntial) => {
    console.log(values, "values");
    // try {
    //   let newLogoUrl = values.logoUrl;
    //   console.log("values", values);
    //   // Upload files first
    //   if (values.logoUrl instanceof File) {
    //     console.log("logoUrl", values.logoUrl);
    //     const uploadResult = await fetchUploadFile({
    //       file: values.logoUrl,
    //     });
    //     newLogoUrl = uploadResult.content.url;
    //     console.log("newLogoUrl", newLogoUrl);
    //   }
    //   console.log("properValues 0", values);
    //   const properValues = {
    //     name: values.name,
    //     logoUrl: newLogoUrl as string,
    //   };
    //   console.log("properValues", properValues);
    //   // then save accordingly (add or update)
    //   if (slug === "new") {
    //     console.log("properValues 1", properValues);
    //     const req = await fetchAddClient({
    //       variables: {
    //         input: properValues,
    //       },
    //     });
    //     // router.push("/clients");
    //     return req;
    //   } else {
    //     return fetchEditClient({
    //       variables: {
    //         input: {
    //           id: slug as string,
    //           ...properValues,
    //         },
    //       },
    //     });
    //   }
    // } catch (error: any) {
    //   Toast({
    //     title: error.message,
    //     position: "bottom",
    //     isClosable: true,
    //     status: "error",
    //   });
    // }
  }, []);

  return (
    <Layout title="Research & Development">
      <VStack align="flex-start" minHeight="100vh" padding={"10"} w="100%">
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
              <Form style={{ width: "100%" }}>
                <Stack
                  direction="row"
                  align="flex-start"
                  // padding={"10"}
                  width="100%"
                >
                  <Stack direction="column" align="flex-start" w="50%">
                    <Breadcrumb>
                      <BreadcrumbItem>
                        <BreadcrumbLink>
                          <Heading
                            as="h1"
                            size="xl"
                            marginBottom="8"
                            color="#ED8041"
                            textTransform="uppercase"
                          >
                            RESEARCH & DEVELOPMENT
                          </Heading>
                        </BreadcrumbLink>
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
                        disabled={isSubmitting}
                      >
                        DISCARD CHANGES
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Stack>
                <VStack direction="column" align="flex-start" w="100%">
                  <FormInput
                    id="title"
                    name="title"
                    label="TITLE"
                    placeholder="Regular Text input value goes here"
                    tooltip="Hello"
                  />
                  <br />
                  <br />
                  <RichTextInput
                    id="description"
                    name="description"
                    label="DESCRIPTION"
                    placeholder="Regular Text input value goes here"
                    tooltip="Hello"
                  />
                </VStack>
              </Form>
            );
          }}
        </Formik>
        <br />
        <Table
          dropdownOptions={[{ value: "title", label: "CLIENT NAME" }]}
          caption="WORK LIST"
          tooltip="WORK LIST TABLE"
          columnHeaders={[
            { name: "title", label: "TITLE", type: "link" },
            { name: "category", label: "CATEGORY" },
            { name: "isActive", label: "DISPLAY", type: "switch" },
          ]}
          data={responseListLab}
          onSwitchChange={async (_, rowId) => {
            // console.log("rowId", rowId);
            const dataSwitch = responseListLab.find((data) => data.id == rowId);
            // console.log("dataSwitch", dataSwitch?.isActive);
            await fetchPublish({
              variables: {
                input: {
                  id: !isNil(rowId) ? rowId : "",
                  status: !dataSwitch?.isActive,
                },
              },
            });
          }}
          onRowSwitch={async (rowId, targetRowIndex) => {
            console.log(`Row ${rowId} is moved to row #${targetRowIndex}`);
            // setTableData((prevState) => {
            //   const sourceIndex = prevState.findIndex(
            //     (row) => row.id === rowId
            //   );
            //   const newState = [...prevState];
            //   const [movedRow] = newState.splice(sourceIndex, 1);
            //   newState.splice(targetRowIndex, 0, movedRow);

            //   return newState;
            // });
          }}
          loading={isLoadingData}
          onRemove={async (value) => {
            setOpenDeleteDialog({
              id: value,
              openDeleteDialog: true,
            });
          }}
          search={async (val) => setValueSearch(val)}
          addNewButton={{
            bgColor: "#ED8041",
            url: "/research-and-development/new",
          }}
        />
      </VStack>

      <ConfirmDelete
        isOpen={isOpenDeleteDialog.openDeleteDialog}
        onClose={() =>
          setOpenDeleteDialog({
            id: "",
            openDeleteDialog: false,
          })
        }
        onConfirmAction={async () => {
          await mutationDelete({
            variables: {
              id: isOpenDeleteDialog.id,
            },
          });
        }}
        header="Delete Post"
        body="Deleting a Post cannot be undone. Are you sure you wish to delete this Client?"
        type="delete"
      />
    </Layout>
  );
};

export default ResearchAndDevelopmentPage;
