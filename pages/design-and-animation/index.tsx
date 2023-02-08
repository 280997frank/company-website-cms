import PortofolioMainForm from "@/components/Organisms/PortofolioMainForm";
import PortofolioTable from "@/components/Organisms/PortofolioTable";
import Layout from "@/components/Templates/Layout";
import { INITIAL_PAGINATION } from "@/constants/portofolio";
import {
  useDeleteStudioWork,
  useEditStudioWork,
  useStudio,
  useStudioWorks,
  useToggleActiveStudioWork,
  useUpsertStudio,
} from "@/hooks/studios";
import { IReqPagination } from "@/types/pagination";
import {
  IPortofolio,
  IReqEditPortofolioDetail,
  TPortofolioKeys,
} from "@/types/portofolio";
import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

const Studios: FC = () => {
  const TYPE: TPortofolioKeys = "studios";
  const [pagination, setPagination] =
    useState<IReqPagination>(INITIAL_PAGINATION);

  const { fetchStudio, data: studioData } = useStudio();
  const { fetchUpsertStudio } = useUpsertStudio();
  const { fetchStudioWorks, data, isLoading } = useStudioWorks(pagination);
  const { fetchActiveStudio } = useToggleActiveStudioWork(pagination);
  const { fetchDeleteStudioWork } = useDeleteStudioWork(pagination);
  const { fetchEditStudioWork } = useEditStudioWork();

  const handleIsActive = async (payload: { id: number; status: boolean }) => {
    fetchActiveStudio({
      variables: {
        input: payload,
      },
    });
  };

  const handleOnSubmit = async (payload: IPortofolio) => {
    fetchUpsertStudio({
      variables: {
        input: { ...payload, descriptionTwo: "" },
      },
    });
  };

  const handleOnRemove = async (id: number) => {
    fetchDeleteStudioWork({
      variables: {
        input: id,
      },
    });
  };

  const handleOnRowSwitch = async (payload: IReqEditPortofolioDetail) => {
    await fetchEditStudioWork({
      variables: {
        input: payload,
      },
    });
    fetchStudioWorks();
  };

  useEffect(() => {
    fetchStudio();
  }, [fetchStudio]);

  useEffect(() => {
    fetchStudioWorks();
  }, [fetchStudioWorks]);

  return (
    <Layout title="DESIGN & ANIMATION">
      <Box p={6}>
        <PortofolioMainForm
          type={TYPE}
          data={studioData?.getStudio ?? null}
          onSubmit={handleOnSubmit}
        />
        <PortofolioTable
          type={TYPE}
          tableData={data?.getStudioWorks.studioWorks ?? []}
          isLoading={isLoading}
          hoverColor="#00FFDACC"
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

export default Studios;
