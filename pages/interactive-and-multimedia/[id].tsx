import Layout from "@/components/Templates/Layout";
import PortofolioForm from "@/components/Templates/PortofolioForm";
import {
  useAddSolutionWork,
  useEditSolutionWork,
  useSolutionsWorkById,
  useSolutionsWorksTotal,
} from "@/hooks/solutions";
import { IReqPortofolioDetail } from "@/types/portofolio";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const SolutionsDetail: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { fetchSolutionWorkById, data } = useSolutionsWorkById();
  const { fetchAddSolutionWork } = useAddSolutionWork();
  const { fetchEditSolutionWork } = useEditSolutionWork();
  const { fetchSolutionWorksTotal, data: solutionsTotal } =
    useSolutionsWorksTotal();

  const handleOnSubmit = async (payload: IReqPortofolioDetail) => {
    if (id === "new") {
      fetchAddSolutionWork({
        variables: {
          input: payload,
        },
      });
    } else {
      fetchEditSolutionWork({
        variables: {
          input: { ...payload, id: parseInt(id as string) },
        },
      });
    }
  };

  useEffect(() => {
    if (id && id !== "new") {
      fetchSolutionWorkById({
        variables: { input: id },
      });
    } else {
      fetchSolutionWorksTotal();
    }
  }, [fetchSolutionWorkById, fetchSolutionWorksTotal, id]);

  return (
    <Layout title="INTERACTIVE & MULTIMEDIA">
      <PortofolioForm
        type="solutions"
        data={data?.getSolutionWorkById ?? null}
        defaultSquence={solutionsTotal?.getSolutionWorks.total ?? 0}
        onSubmit={handleOnSubmit}
      />
    </Layout>
  );
};

export default SolutionsDetail;
