import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import Table from "@/components/Molecules/Table";
import Layout from "@/components/Templates/Layout";
import {
  useClientPublish,
  useDeleteClient,
  useListClients,
} from "@/hooks/clients";
import { EOrderType, ESortType } from "@/types/clients";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { isNil } from "lodash";
import React, { FC, useEffect, useState } from "react";

const Client: FC = () => {
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({
    openDeleteDialog: false,
    id: "",
  });
  const [currentPage /*setCurrentPage*/] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const [valueOrder /*setValueOrder*/] = useState({
    orderBy: EOrderType.NAME,
    sortBy: ESortType.ASC,
  });

  const {
    fetchListClient,
    responseListClients,
    loading: isLoadingData,
  } = useListClients({
    input: {
      page: currentPage,
      limit: 10,
      search: {
        keyword: valueSearch,
      },
      order: {
        orderBy: valueOrder.orderBy,
        sortBy: valueOrder.sortBy,
      },
    },
  });

  useEffect(() => {
    fetchListClient();
  }, [fetchListClient]);

  const { fetchPublish } = useClientPublish({
    input: {
      page: currentPage,
      limit: 10,
      search: {
        keyword: valueSearch,
      },
      order: {
        orderBy: valueOrder.orderBy,
        sortBy: valueOrder.sortBy,
      },
    },
  });

  const { fetchDelete } = useDeleteClient({
    input: {
      page: currentPage,
      limit: 10,
      search: {
        keyword: valueSearch,
      },
      order: {
        orderBy: valueOrder.orderBy,
        sortBy: valueOrder.sortBy,
      },
    },
  });

  return (
    <Layout title="Client">
      <VStack align="flex-start" minHeight="100vh" padding={"10"}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Heading
                as="h1"
                size="xl"
                marginBottom="8"
                color="#FFBB84"
                textTransform="uppercase"
              >
                Our Clients
              </Heading>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Table
          dropdownOptions={[{ value: "name", label: "CLIENT NAME" }]}
          caption="CLIENT LIST"
          tooltip="CLIENT TABLE"
          columnHeaders={[
            { name: "name", label: "CLIENT NAME", type: "link" },
            { name: "isActive", label: "DISPLAY", type: "switch" },
          ]}
          data={responseListClients}
          onSwitchChange={async (_, rowId) => {
            // console.log("rowId", rowId);
            const dataSwitch = responseListClients.find(
              (data) => data.id == rowId
            );
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
          addNewButton={{ bgColor: "#FFBB84", url: "/clients/new" }}
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
            await fetchDelete({
              variables: {
                id: isOpenDeleteDialog.id,
              },
            });
          }}
          header="Delete Client"
          body="Deleting a Client cannot be undone. Are you sure you wish to delete this Client?"
          type="delete"
        />
      </VStack>
    </Layout>
  );
};

export default Client;
