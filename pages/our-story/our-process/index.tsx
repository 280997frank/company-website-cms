// import ButtonCTA from "@/components/Atoms/Button";
import Table from "@/components/Molecules/Table";
import Layout from "@/components/Templates/Layout";
import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import {
  useDeleteOurProcess,
  useGetOurProcessDesc,
  useGetOurProcessList,
  useToggleOurProcess,
  useUpSertOurProcess,
  useUpdateOurProcess,
} from "@/hooks/about";
import { IOurProcess, IUpSertOurProcess } from "@/types/about";
import { Box } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import _ from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
import UpSertOurProcessForm from "@/components/Organisms/about-us/UpSertOurProcessForm";
import HeaderNav from "@/components/Molecules/HeaderNav";
import TabNav from "@/components/Molecules/TabNav";

const OurProcessSection: FC = () => {
  const ourProcessRef = useRef<FormikProps<IUpSertOurProcess>>(null);

  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({
    openDeleteDialog: false,
    id: "",
  });
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const [limit] = useState(10);
  const [ourProcessState, setOurProcessState] = useState<IUpSertOurProcess>({
    id: "",
    description: "",
  });

  const {
    fetchData,
    data: dataOurProcessDesc,
    loading: loadingOurProcessDesc,
  } = useGetOurProcessDesc();
  const { upSertOurProcessForm, loading: upSertOurProcess } =
    useUpSertOurProcess();
  const {
    fethOurProcessList,
    data: ourProcessList,
    loading: getListLoading,
  } = useGetOurProcessList();
  const { deleteOurProcess, loading: deleteLoading } = useDeleteOurProcess();
  const { updateOurProcess, loading: updateLoading } = useUpdateOurProcess();
  const { toggleOurProcess } = useToggleOurProcess();

  const handleOurProcessSubmit = async (values: IUpSertOurProcess) => {
    await upSertOurProcessForm({
      variables: {
        input: values,
      },
    });
  };

  const submitForm = () => {
    if (ourProcessRef && ourProcessRef.current) {
      ourProcessRef.current.submitForm();
    }
  };

  const resetForm = () => {
    if (ourProcessRef && ourProcessRef.current) {
      ourProcessRef.current.resetForm();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fethOurProcessList({
      variables: {
        input: {
          page,
          limit,
          order: { orderBy: "SEQUENCE", sortBy: "ASC" },
          search: { keyword: search },
        },
      },
    });
  }, [fethOurProcessList, limit, page, search]);

  useEffect(() => {
    if (dataOurProcessDesc && dataOurProcessDesc.getOurProcessDescription) {
      setOurProcessState({
        id: dataOurProcessDesc.getOurProcessDescription.id,
        description: dataOurProcessDesc.getOurProcessDescription.description,
      });
    }
  }, [dataOurProcessDesc]);

  return (
    <Layout title="About Us">
      <Box padding="20px" gap="10px">
        <HeaderNav
          title="Our Story"
          submit={submitForm}
          reset={resetForm}
          isLoading={upSertOurProcess || loadingOurProcessDesc}
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
        <Box mt="5vh">
          <Formik
            enableReinitialize
            initialValues={ourProcessState}
            innerRef={ourProcessRef}
            onSubmit={handleOurProcessSubmit}
            component={UpSertOurProcessForm}
          />
          <Table<IOurProcess>
            onRemove={async (value) => {
              setOpenDeleteDialog({
                id: value,
                openDeleteDialog: true,
              });
            }}
            search={(e) => Promise.resolve(setSearch(e))}
            caption="WORK LIST"
            tooltip="This is data list table !"
            dropdownOptions={[]}
            addNewButton={{
              bgColor: "brand.aboutUs",
              url: "our-process/add",
            }}
            onSwitchChange={async (value, rowId: string | undefined) => {
              await toggleOurProcess({
                variables: { input: { id: rowId, status: value } },
              });
            }}
            data={ourProcessList?.listOurProcesses?.ourProcesses || []}
            onSort={async (field, type: string) => {
              const fields: Record<string, string> = {
                title: "TITLE",
                sequence: "SEQUENCE",
                isActive: "ISACTIVE",
              };
              await fethOurProcessList({
                variables: {
                  input: {
                    page,
                    limit,
                    order: {
                      orderBy: fields[field],
                      sortBy: type.toUpperCase(),
                    },
                    search: { keyword: search },
                  },
                },
              });
            }}
            onRowSwitch={async (rowId, targetRowIndex) => {
              const filteredData =
                ourProcessList?.listOurProcesses?.ourProcesses.filter(
                  (item) => item.id === rowId
                );
              if (filteredData && filteredData.length > 0) {
                const currentData = _.omit(filteredData[0], "isActive");
                await updateOurProcess({
                  variables: {
                    input: { ...currentData, sequence: targetRowIndex },
                  },
                });
              }

              await fethOurProcessList({
                variables: {
                  input: {
                    page,
                    limit,
                    order: { orderBy: "SEQUENCE", sortBy: "ASC" },
                    search: { keyword: search },
                  },
                },
              });
            }}
            brandColor="rgba(255, 168, 250, .8)"
            columnHeaders={[
              { label: "Title", name: "title", type: "link" },
              { label: "Sequence", name: "sequence" },
              { label: "Display", name: "isActive", type: "switch" },
            ]}
            loading={getListLoading || updateLoading}
          />
          <ConfirmDelete
            isOpen={isOpenDeleteDialog.openDeleteDialog}
            onClose={() =>
              setOpenDeleteDialog({
                id: "",
                openDeleteDialog: false,
              })
            }
            onConfirmAction={async () => {
              await deleteOurProcess({
                variables: {
                  id: +isOpenDeleteDialog.id,
                },
              });
              await fethOurProcessList({
                variables: {
                  input: {
                    page,
                    limit,
                    order: { orderBy: "SEQUENCE", sortBy: "ASC" },
                    search: { keyword: search },
                  },
                },
              });
            }}
            isLoading={deleteLoading}
            header="Delete Our Process"
            body="Deleting a Our Process cannot be undone. Are you sure you wish to delete this Our Process?"
            type="delete"
          />
        </Box>
        {/* content */}
      </Box>
    </Layout>
  );
};

export default OurProcessSection;
