import Table from "@/components/Molecules/Table";
import { PORTOFOLIO_COLORS, PORTOFOLIO_ROUTES } from "@/constants/portofolio";
import {
  IPortofolioDetail,
  IReqEditPortofolioDetail,
  TPortofolioTableProps,
} from "@/types/portofolio";
import { Fragment, useEffect, useState } from "react";
import ConfirmDelete from "../Atoms/ConfirmDelete";

const PortofolioTable: TPortofolioTableProps = ({
  type,
  tableData,
  isLoading,
  onSwitchActive,
  onSearch,
  onRemove,
  onRowSwitch,
  hoverColor,
}) => {
  const [dataTable, setDataTable] = useState(tableData);
  const [modalDeleteProp, setModalDeleteProp] = useState({
    isOpen: false,
    id: 0,
    title: "",
  });

  useEffect(() => {
    setDataTable(tableData);
  }, [tableData]);

  const handleFilterData = (rowId?: string): IPortofolioDetail[] => {
    return dataTable.filter((data) => data.id === parseInt(rowId ?? "0"));
  };

  const handleIsActive = async (rowId?: string) => {
    const currentData = handleFilterData(rowId);
    if (currentData.length > 0) {
      const { id, isActive } = currentData[0];
      await onSwitchActive({ id, status: !isActive });
    }
  };

  const handleOnRemove = async (rowId: string) => {
    const currentData = handleFilterData(rowId);
    if (currentData.length > 0) {
      const { id, title } = currentData[0];
      setModalDeleteProp({ id, title, isOpen: true });
    }
  };

  return (
    <Fragment>
      <Table
        dropdownOptions={[
          { value: "title", label: "TITLE" },
          { value: "client", label: "CLIENT" },
        ]}
        caption="WORK LIST"
        tooltip="A table tooltip"
        columnHeaders={[
          { name: "title", label: "TITLE", type: "link" },
          { name: "clientName", label: "CLIENT" },
          { name: "projectYear", label: "YEAR OF WORK" },
          { name: "highlight", label: "HIGHLIGHT", type: "dropdown" },
          { name: "isActive", label: "DISPLAY", type: "switch" },
        ]}
        data={dataTable}
        brandColor={hoverColor}
        onSwitchChange={async (_, rowId) => {
          await handleIsActive(rowId);
        }}
        onRowSwitch={async (rowId, targetRowIndex) => {
          const currentData = handleFilterData(rowId);
          if (currentData.length > 0) {
            const payload: IReqEditPortofolioDetail = { ...currentData[0] };
            delete payload.isActive;
            await onRowSwitch({
              ...payload,
              sequence: targetRowIndex + 1,
            });
          }
        }}
        loading={isLoading}
        onRemove={async (value) => {
          await handleOnRemove(value);
        }}
        search={async (val) => onSearch(val)}
        addNewButton={{
          bgColor: `${PORTOFOLIO_COLORS[type]}`,
          url: `/${PORTOFOLIO_ROUTES[type]}/new`,
        }}
      />
      <ConfirmDelete
        isOpen={modalDeleteProp.isOpen}
        onClose={() =>
          setModalDeleteProp((prevState) => ({ ...prevState, isOpen: false }))
        }
        onConfirmAction={async () => {
          await onRemove(modalDeleteProp.id);
        }}
        header={`Delete ${modalDeleteProp.title}`}
        body="Deleting this project cannot be undone. Are you sure you want to delete it?"
        type="delete"
      />
    </Fragment>
  );
};

export default PortofolioTable;
