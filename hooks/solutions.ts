import { PORTOFOLIO_ROUTES } from "@/constants/portofolio";
import { IReqPagination } from "@/types/pagination";
import {
  IReqActiveSolutionWork,
  IReqAddSolutionWork,
  IReqDeleteSolutionWork,
  IReqEditSolutionWork,
  IReqSolution,
  IResDeleteSolutionWork,
  IResGetSolution,
  IResGetSolutionWorkById,
  IResGetSolutionWorks,
} from "@/types/solutions";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useErrorMessage } from ".";

const GET_SOLUTION_WORKS = gql`
  query getSolutionWorks($input: ListSolutionWorkInput!) {
    getSolutionWorks(input: $input) {
      page
      limit
      solutionWorks {
        id
        title
        subTitle
        description
        clientName
        projectYear
        banner
        isActive
        category
        heroVideoUrl
        sequence
        thumbnails {
          id
          url
        }
      }
    }
  }
`;

export const useSolutionsWorks = (payload: IReqPagination) => {
  const toast = useToast();

  const [fetchSolutionWorks, { loading, data }] =
    useLazyQuery<IResGetSolutionWorks>(GET_SOLUTION_WORKS, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: { input: payload },

      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    fetchSolutionWorks,
    isLoading: loading,
    data,
  };
};

const TOGGLE_ACTIVE_SOLUTION = gql`
  mutation toggleActiveSolutionWork($input: ToggleActiveSolutionWorkInput!) {
    toggleActiveSolutionWork(input: $input) {
      id
      isActive
    }
  }
`;

export const useToggleActiveSolutionWork = () => {
  const toast = useToast();
  const { fetchSolutionWorks } = useSolutionsWorks({
    page: 1,
    limit: 10,
  });

  const [fetchActiveSolution, { loading, data }] = useMutation<
    IResGetSolutionWorks,
    IReqActiveSolutionWork
  >(TOGGLE_ACTIVE_SOLUTION, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      fetchSolutionWorks();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    fetchActiveSolution,
    isLoading: loading,
    data,
  };
};

const GET_SOLUTION = gql`
  query getSolution {
    getSolution {
      title
      descriptionOne
    }
  }
`;

export const useSolution = () => {
  const toast = useToast();
  const [fetchSolution, { loading, data }] = useLazyQuery<IResGetSolution>(
    GET_SOLUTION,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    }
  );

  return {
    fetchSolution,
    isLoading: loading,
    data,
  };
};

const UPSERT_SOLUTION = gql`
  mutation upsertSolution($input: UpsertSolutionInput!) {
    upsertSolution(input: $input) {
      id
      title
      descriptionOne
    }
  }
`;

export const useUpsertSolution = () => {
  const toast = useToast();
  const { fetchSolution } = useSolution();
  const [fetchUpsertSolution, { loading, data }] = useMutation<
    IResGetSolution,
    IReqSolution
  >(UPSERT_SOLUTION, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      fetchSolution();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    fetchUpsertSolution,
    isLoading: loading,
    data,
  };
};

const GET_SOLUTION_BY_ID = gql`
  query getSolutionWorkById($input: Int!) {
    getSolutionWorkById(id: $input) {
      id
      title
      subTitle
      description
      clientName
      projectYear
      banner
      heroVideoUrl
      category
      sequence
      thumbnails {
        id
        url
      }
    }
  }
`;

export const useSolutionsWorkById = () => {
  const [fetchSolutionWorkById, { loading, error, data }] =
    useLazyQuery<IResGetSolutionWorkById>(GET_SOLUTION_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    });

  useErrorMessage(error);

  return {
    fetchSolutionWorkById,
    isLoading: loading,
    data,
  };
};

const ADD_SOLUTION_WORK = gql`
  mutation addSolutionWork($input: AddSolutionWorkInput!) {
    addSolutionWork(input: $input) {
      id
    }
  }
`;

export const useAddSolutionWork = () => {
  const router = useRouter();
  const toast = useToast();
  const [fetchAddSolutionWork, { loading, data, error }] = useMutation<
    IResGetSolutionWorks,
    IReqAddSolutionWork
  >(ADD_SOLUTION_WORK, {
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push(`/${PORTOFOLIO_ROUTES["solutions"]}`);
    },
  });

  useErrorMessage(error);

  return {
    fetchAddSolutionWork,
    isLoading: loading,
    data,
  };
};

const EDIT_SOLUTION_WORK = gql`
  mutation editSolutionWork($input: EditSolutionWorkInput!) {
    editSolutionWork(input: $input) {
      id
    }
  }
`;

export const useEditSolutionWork = () => {
  const router = useRouter();
  const toast = useToast();
  const [fetchEditSolutionWork, { loading, data, error }] = useMutation<
    IResGetSolutionWorks,
    IReqEditSolutionWork
  >(EDIT_SOLUTION_WORK, {
    onCompleted: () => {
      toast({
        title: "Successfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push(`/${PORTOFOLIO_ROUTES["solutions"]}`);
    },
  });

  useErrorMessage(error);

  return {
    fetchEditSolutionWork,
    isLoading: loading,
    data,
  };
};

const DELETE_SOLUTION_WORK = gql`
  mutation deleteSolutionWork($input: Int!) {
    deleteSolutionWork(id: $input) {
      success
    }
  }
`;

export const useDeleteSolutionWork = (payload: IReqPagination) => {
  const toast = useToast();
  const { fetchSolutionWorks } = useSolutionsWorks(payload);
  const [fetchDeleteSolutionWork, { loading, data, error }] = useMutation<
    IResDeleteSolutionWork,
    IReqDeleteSolutionWork
  >(DELETE_SOLUTION_WORK, {
    onCompleted: () => {
      fetchSolutionWorks();
      toast({
        title: "Succesfully deleted",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchDeleteSolutionWork,
    isLoading: loading,
    data,
  };
};

const GET_TOTAL_SOLUTION_WORKS = gql`
  query getSolutionWorks($input: ListSolutionWorkInput!) {
    getSolutionWorks(input: $input) {
      total
    }
  }
`;

export const useSolutionsWorksTotal = () => {
  const toast = useToast();

  const [fetchSolutionWorksTotal, { loading, data }] =
    useLazyQuery<IResGetSolutionWorks>(GET_TOTAL_SOLUTION_WORKS, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: { input: { page: 1, limit: 1 } },

      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    fetchSolutionWorksTotal,
    isLoading: loading,
    data,
  };
};
