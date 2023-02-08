// import ButtonCTA from "@/components/Atoms/Button";
import Table from "@/components/Molecules/Table";
import OurTeamForm from "@/components/Organisms/about-us/OurTeamForm";
import Layout from "@/components/Templates/Layout";
import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import {
  useDeleteOurTeamMember,
  useGetOurTeam,
  useGetOurTeamMember,
  useToggleOurTeam,
  useUpSertOurTeam,
  useUpdateOurTeamMember,
} from "@/hooks/about";
import { IOurTeam, IResOurTeamMember } from "@/types/about";
import { Box } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";
import _ from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
import HeaderNav from "@/components/Molecules/HeaderNav";
import TabNav from "@/components/Molecules/TabNav";

const OurTeamSection: FC = () => {
  const ourTeamRef = useRef<FormikProps<IOurTeam>>(null);

  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({
    openDeleteDialog: false,
    id: "",
  });
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const [limit] = useState(10);
  const [ourTeamState, setOurTeamState] = useState<IOurTeam>({
    title: "",
    description: "",
  });

  const {
    fetchAboutOurTeam,
    data: ourTeamData,
    loading: ourTeamLoading,
  } = useGetOurTeam();

  const { upSertOurTeamForm, loading: upSertOurTeamLoading } =
    useUpSertOurTeam();
  const {
    fetchOurTeamMember,
    data: ourTeamTeamDataMember,
    loading: ourTeamListLoading,
  } = useGetOurTeamMember();
  const { deleteOurTeamMember, loading: ourTeamMemberDeleteLoding } =
    useDeleteOurTeamMember();
  const { toggleOurMember, loading: loadingToggle } = useToggleOurTeam();
  const { updateOurTeamMember, loading: updateListLoading } =
    useUpdateOurTeamMember();

  const handleOurTeamSubmit = async (values: IOurTeam) => {
    await upSertOurTeamForm({
      variables: {
        input: values,
      },
    });
  };

  const submitForm = () => {
    if (ourTeamRef && ourTeamRef.current) {
      ourTeamRef.current.submitForm();
    }
  };

  const resetForm = () => {
    if (ourTeamRef && ourTeamRef.current) {
      ourTeamRef.current.resetForm();
    }
  };

  useEffect(() => {
    fetchOurTeamMember({
      variables: {
        input: {
          page,
          limit,
          order: { orderBy: "SEQUENCE", sortBy: "ASC" },
          search: { keyword: search },
        },
      },
    });
  }, [fetchOurTeamMember, limit, page, search]);

  useEffect(() => {
    fetchAboutOurTeam();
  }, [fetchAboutOurTeam]);

  useEffect(() => {
    if (ourTeamData && ourTeamData.getOurTeam) {
      setOurTeamState({
        title: ourTeamData.getOurTeam.title,
        description: ourTeamData.getOurTeam.description,
      });
    }
  }, [ourTeamData]);

  return (
    <Layout title="About Us">
      <Box padding="20px" gap="10px">
        <HeaderNav
          title="Our Story"
          submit={submitForm}
          reset={resetForm}
          isLoading={upSertOurTeamLoading || ourTeamLoading || loadingToggle}
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
        <Box mt="5vh">
          <Formik
            enableReinitialize
            initialValues={ourTeamState}
            innerRef={ourTeamRef}
            onSubmit={handleOurTeamSubmit}
            component={OurTeamForm}
          />
          <Table<IResOurTeamMember>
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
              url: "our-team/add",
            }}
            onRowSwitch={async (rowId, targetRowIndex) => {
              const filteredData =
                ourTeamTeamDataMember?.listOurTeamMembers?.ourTeamMembers.filter(
                  (item) => item.id === rowId
                );
              if (filteredData && filteredData.length > 0) {
                const currentData = _.omit(filteredData[0], "isActive");
                await updateOurTeamMember({
                  variables: {
                    input: { ...currentData, sequence: targetRowIndex },
                  },
                });
              }
              await fetchOurTeamMember({
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
            onSort={async (field, type: string) => {
              const fields: Record<string, string> = {
                name: "NAME",
                designation: "DESIGNATION",
                subDesignation: "SUB_DESIGNATION",
                isActive: "ISACTIVE",
              };
              await fetchOurTeamMember({
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
            onSwitchChange={async (value, rowId: string | undefined) => {
              await toggleOurMember({
                variables: { input: { id: rowId, status: value } },
              });
            }}
            brandColor="rgba(255, 168, 250, .8)"
            data={
              ourTeamTeamDataMember?.listOurTeamMembers?.ourTeamMembers || []
            }
            columnHeaders={[
              { label: "Name", name: "name", type: "link" },
              { label: "Designation", name: "designation" },
              { label: "Sub-Designation", name: "subDesignation" },
              { label: "Display", name: "isActive", type: "switch" },
            ]}
            loading={ourTeamListLoading || updateListLoading}
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
              await deleteOurTeamMember({
                variables: {
                  id: isOpenDeleteDialog.id,
                },
              });
              await fetchOurTeamMember({
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
            isLoading={ourTeamMemberDeleteLoding}
            header="Delete Our Team Member"
            body="Deleting a Member cannot be undone. Are you sure you wish to delete this Member?"
            type="delete"
          />
        </Box>
        {/* content */}
      </Box>
    </Layout>
  );
};

export default OurTeamSection;
