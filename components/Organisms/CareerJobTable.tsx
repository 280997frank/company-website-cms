import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import Table from "@/components/Molecules/Table";
import {
  useDeleteJobOpening,
  useJobOpeningPublish,
  useListJobOpening,
} from "@/hooks/careers";
import { EOrderType, ESortType } from "@/types/clients";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import React, { FC, useEffect, useState } from "react";

const CareerJobTable: FC = () => {
  const router = useRouter();
  const { category } = router.query;
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({
    openDeleteDialog: false,
    id: "",
  });
  const [currentPage /* setCurrentPage*/] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const [valueOrder /*setValueOrder*/] = useState({
    orderBy: EOrderType.TITLE,
    sortBy: ESortType.ASC,
  });
  const {
    fetchListOpening,
    responselistJobOpening,
    loading: isLoadingData,
  } = useListJobOpening({
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
      filter: {
        designationId: category as string,
      },
    },
  });

  useEffect(() => {
    fetchListOpening();
  }, [fetchListOpening]);
  // console.log("responselistJobOpening", responselistJobOpening);

  const { fetchPublish } = useJobOpeningPublish({
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
      filter: {
        designationId: category as string,
      },
    },
  });

  const { fetchDelete } = useDeleteJobOpening({
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
      filter: {
        designationId: category as string,
      },
    },
  });

  return (
    <>
      <>
        <Table
          dropdownOptions={[{ value: "title", label: "JOB TITLE" }]}
          caption="JOB OPENING LIST"
          tooltip="JOB OPENING TABLE"
          columnHeaders={[
            { name: "title", label: "JOB TITLE", type: "link" },
            { name: "ofOpenings", label: "# OF OPENING" },
            { name: "locationName", label: "LOCATION" },
            { name: "jobType", label: "JOBTYPE" },
            { name: "isActive", label: "DISPLAY", type: "switch" },
          ]}
          data={responselistJobOpening}
          onSwitchChange={async (_, rowId) => {
            // console.log("rowId", rowId);
            const dataSwitch = responselistJobOpening.find(
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
          addNewButton={{
            bgColor: "#F7FF7C",
            url: `/join-us/${category}/new`,
          }}
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
          header="Delete Job Opening"
          body="Deleting a Job Opening cannot be undone. Are you sure you wish to delete this Job Opening?"
          type="delete"
        />
      </>
    </>
  );
};

export default CareerJobTable;
