import { PORTOFOLIO_ROUTES } from "@/constants/portofolio";
import { useErrorMessage } from "@/hooks";
import { IReqPagination } from "@/types/pagination";
import {
  IReqActiveStudioWork,
  IReqAddStudioWork,
  IReqDeleteStudioWork,
  IReqEditStudioWork,
  IReqStudio,
  IResDeleteStudioWork,
  IResGetStudio,
  IResGetStudioWorkById,
  IResGetStudioWorks,
} from "@/types/studios";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const GET_STUDIO_WORKS = gql`
  query getStudioWorks($input: ListStudioWorkInput!) {
    getStudioWorks(input: $input) {
      page
      limit
      studioWorks {
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

export const useStudioWorks = (payload: IReqPagination) => {
  const [fetchStudioWorks, { loading, data, error }] =
    useLazyQuery<IResGetStudioWorks>(GET_STUDIO_WORKS, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: { input: payload },
    });

  useErrorMessage(error);

  return {
    fetchStudioWorks,
    isLoading: loading,
    data,
  };
};

const TOGGLE_ACTIVE_STUDIO = gql`
  mutation toggleActiveStudioWork($input: ToggleActiveStudioWorkInput!) {
    toggleActiveStudioWork(input: $input) {
      id
      isActive
    }
  }
`;

export const useToggleActiveStudioWork = (payload: IReqPagination) => {
  const toast = useToast();
  const { fetchStudioWorks } = useStudioWorks(payload);
  const [fetchActiveStudio, { loading, data, error }] = useMutation<
    IResGetStudioWorks,
    IReqActiveStudioWork
  >(TOGGLE_ACTIVE_STUDIO, {
    onCompleted: () => {
      fetchStudioWorks();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchActiveStudio,
    isLoading: loading,
    data,
  };
};

const GET_STUDIO = gql`
  query getStudio {
    getStudio {
      title
      descriptionOne
    }
  }
`;

export const useStudio = () => {
  const [fetchStudio, { loading, data, error }] = useLazyQuery<IResGetStudio>(
    GET_STUDIO,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    }
  );

  useErrorMessage(error);

  return {
    fetchStudio,
    isLoading: loading,
    data,
  };
};

const UPSERT_STUDIO = gql`
  mutation upsertStudio($input: UpsertStudioInput!) {
    upsertStudio(input: $input) {
      id
      title
      descriptionOne
    }
  }
`;

export const useUpsertStudio = () => {
  const toast = useToast();
  const { fetchStudio } = useStudio();
  const [fetchUpsertStudio, { loading, data, error }] = useMutation<
    IResGetStudio,
    IReqStudio
  >(UPSERT_STUDIO, {
    onCompleted: () => {
      fetchStudio();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchUpsertStudio,
    isLoading: loading,
    data,
  };
};

const GET_STUDIO_BY_ID = gql`
  query getStudioWorkById($input: Int!) {
    getStudioWorkById(id: $input) {
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

export const useStudioWorkById = () => {
  const [fetchStudionWorkById, { loading, error, data }] =
    useLazyQuery<IResGetStudioWorkById>(GET_STUDIO_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    });

  useErrorMessage(error);

  return {
    fetchStudionWorkById,
    isLoading: loading,
    data,
  };
};

const ADD_SOLUTION_WORK = gql`
  mutation addStudioWork($input: AddStudioWorkInput!) {
    addStudioWork(input: $input) {
      id
    }
  }
`;

export const useAddStudioWork = () => {
  const router = useRouter();
  const toast = useToast();
  const [fetchAddStudioWork, { loading, data, error }] = useMutation<
    IResGetStudioWorks,
    IReqAddStudioWork
  >(ADD_SOLUTION_WORK, {
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push(`/${PORTOFOLIO_ROUTES["studios"]}`);
    },
  });

  useErrorMessage(error);

  return {
    fetchAddStudioWork,
    isLoading: loading,
    data,
  };
};

const EDIT_SOLUTION_WORK = gql`
  mutation editStudioWork($input: EditStudioWorkInput!) {
    editStudioWork(input: $input) {
      id
    }
  }
`;

export const useEditStudioWork = () => {
  const router = useRouter();
  const toast = useToast();
  const [fetchEditStudioWork, { loading, data, error }] = useMutation<
    IResGetStudioWorks,
    IReqEditStudioWork
  >(EDIT_SOLUTION_WORK, {
    onCompleted: () => {
      toast({
        title: "Successfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push(`/${PORTOFOLIO_ROUTES["studios"]}`);
    },
  });

  useErrorMessage(error);

  return {
    fetchEditStudioWork,
    isLoading: loading,
    data,
  };
};

const DELETE_STUDIO_WORK = gql`
  mutation deleteStudioWork($input: Int!) {
    deleteStudioWork(id: $input) {
      success
    }
  }
`;

export const useDeleteStudioWork = (payload: IReqPagination) => {
  const toast = useToast();
  const { fetchStudioWorks } = useStudioWorks(payload);
  const [fetchDeleteStudioWork, { loading, data, error }] = useMutation<
    IResDeleteStudioWork,
    IReqDeleteStudioWork
  >(DELETE_STUDIO_WORK, {
    onCompleted: () => {
      fetchStudioWorks();
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
    fetchDeleteStudioWork,
    isLoading: loading,
    data,
  };
};

const GET_STUDIO_WORKS_TOTAL = gql`
  query getStudioWorks($input: ListStudioWorkInput!) {
    getStudioWorks(input: $input) {
      total
    }
  }
`;

export const useStudioWorksTotal = () => {
  const [fetchStudioWorksTotal, { loading, data, error }] =
    useLazyQuery<IResGetStudioWorks>(GET_STUDIO_WORKS_TOTAL, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: { input: { page: 1, limit: 1 } },
    });

  useErrorMessage(error);

  return {
    fetchStudioWorksTotal,
    isLoading: loading,
    data,
  };
};
