import Layout from "@/components/Templates/Layout";
import PortofolioForm from "@/components/Templates/PortofolioForm";
import {
  useAddStudioWork,
  useEditStudioWork,
  useStudioWorkById,
  useStudioWorksTotal,
} from "@/hooks/studios";
import { IReqPortofolioDetail } from "@/types/portofolio";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const StudiosDetail: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { fetchStudionWorkById, data } = useStudioWorkById();
  const { fetchAddStudioWork } = useAddStudioWork();
  const { fetchEditStudioWork } = useEditStudioWork();
  const { fetchStudioWorksTotal, data: studioTotal } = useStudioWorksTotal();

  const handleOnSubmit = async (payload: IReqPortofolioDetail) => {
    if (id === "new") {
      fetchAddStudioWork({
        variables: {
          input: payload,
        },
      });
    } else {
      fetchEditStudioWork({
        variables: {
          input: { ...payload, id: parseInt(id as string) },
        },
      });
    }
  };

  useEffect(() => {
    if (id && id !== "new") {
      fetchStudionWorkById({
        variables: { input: id },
      });
    } else {
      fetchStudioWorksTotal();
    }
  }, [fetchStudionWorkById, id, fetchStudioWorksTotal]);

  return (
    <Layout title="DESIGN & ANIMATION">
      <PortofolioForm
        type="studios"
        data={data?.getStudioWorkById ?? null}
        defaultSquence={studioTotal?.getStudioWorks.total ?? 0}
        onSubmit={handleOnSubmit}
      />
    </Layout>
  );
};

export default StudiosDetail;
