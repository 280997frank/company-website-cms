import PortofolioMainForm from "@/components/Organisms/PortofolioMainForm";
import PortofolioTable from "@/components/Organisms/PortofolioTable";
import Layout from "@/components/Templates/Layout";
import { INITIAL_PAGINATION } from "@/constants/portofolio";
import {
  useDeleteEventWork,
  useEditEventWork,
  useEvent,
  useEventWorks,
  useToggleActiveEventWork,
  useUpsertEvent,
} from "@/hooks/events";
import { IReqPagination } from "@/types/pagination";
import {
  IPortofolio,
  IReqEditPortofolioDetail,
  TPortofolioKeys,
} from "@/types/portofolio";
import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

const Events: FC = () => {
  const TYPE: TPortofolioKeys = "events";
  const [pagination, setPagination] =
    useState<IReqPagination>(INITIAL_PAGINATION);

  const { fetchEvent, data: eventData } = useEvent();
  const { fetchUpsertEvent } = useUpsertEvent();
  const { fetchEventWorks, data, isLoading } = useEventWorks(pagination);
  const { fetchActiveEvent } = useToggleActiveEventWork();
  const { fetchDeleteEventWork } = useDeleteEventWork(pagination);
  const { fetchEditEventWork } = useEditEventWork();

  const handleIsActive = async (payload: { id: number; status: boolean }) => {
    fetchActiveEvent({
      variables: {
        input: payload,
      },
    });
  };

  const handleOnSubmit = async (payload: IPortofolio) => {
    fetchUpsertEvent({
      variables: {
        input: { ...payload, descriptionTwo: "" },
      },
    });
  };

  const handleOnRemove = async (id: number) => {
    fetchDeleteEventWork({
      variables: {
        input: id,
      },
    });
  };

  const handleOnRowSwitch = async (payload: IReqEditPortofolioDetail) => {
    await fetchEditEventWork({
      variables: {
        input: payload,
      },
    });
    fetchEventWorks();
  };

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    fetchEventWorks();
  }, [fetchEventWorks]);

  return (
    <Layout title="DIGITAL & EVENT">
      <Box p={6}>
        <PortofolioMainForm
          type={TYPE}
          data={eventData?.getVirtualEvent ?? null}
          onSubmit={handleOnSubmit}
        />
        <PortofolioTable
          type={TYPE}
          tableData={data?.getEventWorks.eventWorks ?? []}
          isLoading={isLoading}
          hoverColor="#22CBFFCC"
          onSwitchActive={handleIsActive}
          onRemove={handleOnRemove}
          onRowSwitch={handleOnRowSwitch}
          onSearch={(val) =>
            setPagination((prevState) => ({
              ...prevState,
              search: { keyword: val },
            }))
          }
        />
      </Box>
    </Layout>
  );
};

export default Events;
