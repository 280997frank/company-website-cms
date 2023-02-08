import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import Table from "@/components/Molecules/Table";
import {
  useDesignationPublish,
  useListDesignations,
  useDeleteDesignation,
} from "@/hooks/careers";
import { EOrderType, ESortType } from "@/types/clients";
import { isNil } from "lodash";
import React, { FC, useEffect, useState } from "react";

const CareersCategoryTable: FC = () => {
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
    fetchListDesignation,
    responselistDesignations,
    loading: isLoadingData,
  } = useListDesignations({
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
    fetchListDesignation();
  }, [fetchListDesignation]);

  const { fetchPublish } = useDesignationPublish({
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

  const { fetchDelete } = useDeleteDesignation({
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

  // console.log("responselistDesignations", responselistDesignations);

  return (
    <>
      <Table
        dropdownOptions={[{ value: "name", label: "CATEGORY NAME" }]}
        caption="CATEGORY LIST"
        tooltip="CATEGORY TABLE"
        columnHeaders={[
          { name: "name", label: "CATEGORY NAME", type: "link" },
          { name: "isActive", label: "DISPLAY", type: "switch" },
        ]}
        data={responselistDesignations}
        onSwitchChange={async (_, rowId) => {
          // console.log("rowId", rowId);
          const dataSwitch = responselistDesignations.find(
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
        addNewButton={{ bgColor: "#F7FF7C", url: "/join-us/new" }}
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
          // alert("onprogress");
        }}
        header="Delete CATEGORY"
        body="Deleting a CATEGORY cannot be undone. Are you sure you wish to delete this CATEGORY?"
        type="delete"
      />
    </>
  );
};

export default CareersCategoryTable;
