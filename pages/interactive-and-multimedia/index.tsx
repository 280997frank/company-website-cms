import PortofolioMainForm from "@/components/Organisms/PortofolioMainForm";
import PortofolioTable from "@/components/Organisms/PortofolioTable";
import Layout from "@/components/Templates/Layout";
import { INITIAL_PAGINATION } from "@/constants/portofolio";
import {
  useDeleteSolutionWork,
  useEditSolutionWork,
  useSolution,
  useSolutionsWorks,
  useToggleActiveSolutionWork,
  useUpsertSolution,
} from "@/hooks/solutions";
import { IReqPagination } from "@/types/pagination";
import {
  IPortofolio,
  IReqEditPortofolioDetail,
  TPortofolioKeys,
} from "@/types/portofolio";
import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

const Solutions: FC = () => {
  const TYPE: TPortofolioKeys = "solutions";
  const [pagination, setPagination] =
    useState<IReqPagination>(INITIAL_PAGINATION);

  const { fetchSolution, data: solutionData } = useSolution();
  const { fetchUpsertSolution } = useUpsertSolution();
  const { fetchSolutionWorks, data, isLoading } = useSolutionsWorks(pagination);
  const { fetchActiveSolution } = useToggleActiveSolutionWork();
  const { fetchDeleteSolutionWork } = useDeleteSolutionWork(pagination);
  const { fetchEditSolutionWork } = useEditSolutionWork();

  const handleIsActive = async (payload: { id: number; status: boolean }) => {
    fetchActiveSolution({
      variables: {
        input: payload,
      },
    });
  };

  const handleOnSubmit = async (payload: IPortofolio) => {
    fetchUpsertSolution({
      variables: {
        input: { ...payload, descriptionTwo: "" },
      },
    });
  };

  const handleOnRemove = async (id: number) => {
    fetchDeleteSolutionWork({
      variables: {
        input: id,
      },
    });
  };

  const handleOnRowSwitch = async (payload: IReqEditPortofolioDetail) => {
    await fetchEditSolutionWork({
      variables: {
        input: payload,
      },
    });
    fetchSolutionWorks();
  };

  useEffect(() => {
    fetchSolution();
  }, [fetchSolution]);

  useEffect(() => {
    fetchSolutionWorks();
  }, [fetchSolutionWorks]);

  return (
    <Layout title="INTERACTIVE & MULTIMEDIA">
      <Box p={6}>
        <PortofolioMainForm
          type={TYPE}
          data={solutionData?.getSolution ?? null}
          onSubmit={handleOnSubmit}
        />
        <PortofolioTable
          type={TYPE}
          tableData={data?.getSolutionWorks.solutionWorks ?? []}
          isLoading={isLoading}
          hoverColor="#C992FFCC"
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

export default Solutions;
