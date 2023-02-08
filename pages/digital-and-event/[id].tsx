import Layout from "@/components/Templates/Layout";
import PortofolioForm from "@/components/Templates/PortofolioForm";
import {
  useAddEventWork,
  useEditEventWork,
  useEventWorkById,
  useEventWorksTotal,
} from "@/hooks/events";
import { IReqPortofolioDetail } from "@/types/portofolio";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const EventsDetail: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { fetchEventWorkById, data } = useEventWorkById();
  const { fetchAddEventWork } = useAddEventWork();
  const { fetchEditEventWork } = useEditEventWork();
  const { fetchEventWorksTotal, data: eventWorkTotal } = useEventWorksTotal();

  const handleOnSubmit = async (payload: IReqPortofolioDetail) => {
    if (id === "new") {
      fetchAddEventWork({
        variables: {
          input: payload,
        },
      });
    } else {
      fetchEditEventWork({
        variables: {
          input: { ...payload, id: parseInt(id as string) },
        },
      });
    }
  };

  useEffect(() => {
    if (id && id !== "new") {
      fetchEventWorkById({
        variables: { input: id },
      });
    } else {
      fetchEventWorksTotal();
    }
  }, [fetchEventWorkById, id, fetchEventWorksTotal]);

  return (
    <Layout title="DIGITAL & EVENT">
      <PortofolioForm
        type="events"
        data={data?.getEventWorkById ?? null}
        defaultSquence={eventWorkTotal?.getEventWorks.total ?? 0}
        onSubmit={handleOnSubmit}
      />
    </Layout>
  );
};

export default EventsDetail;
