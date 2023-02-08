import { PORTOFOLIO_ROUTES } from "@/constants/portofolio";
import {
  IReqActiveEventWork,
  IReqAddEventWork,
  IReqDeleteEventWork,
  IReqEditEventWork,
  IReqEvent,
  IResDeleteEventWork,
  IResGetEvent,
  IResGetEventWorkById,
  IResGetEventWorks,
} from "@/types/events";
import { IReqPagination } from "@/types/pagination";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useErrorMessage } from ".";

const GET_EVENT_WORKS = gql`
  query getEventWorks($input: ListEventWorkInput!) {
    getEventWorks(input: $input) {
      page
      limit
      eventWorks {
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
        thumbnails {
          id
          url
        }
      }
    }
  }
`;

export const useEventWorks = (payload: IReqPagination) => {
  const toast = useToast();

  const [fetchEventWorks, { loading, data }] = useLazyQuery<IResGetEventWorks>(
    GET_EVENT_WORKS,
    {
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
    }
  );

  return {
    fetchEventWorks,
    isLoading: loading,
    data,
  };
};

const TOGGLE_ACTIVE_EVENT = gql`
  mutation toggleActiveEventWork($input: ToggleActiveEventWorkInput!) {
    toggleActiveEventWork(input: $input) {
      id
      isActive
    }
  }
`;

export const useToggleActiveEventWork = () => {
  const toast = useToast();
  const { fetchEventWorks } = useEventWorks({
    page: 1,
    limit: 10,
  });

  const [fetchActiveEvent, { loading, data }] = useMutation<
    IResGetEventWorks,
    IReqActiveEventWork
  >(TOGGLE_ACTIVE_EVENT, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      fetchEventWorks();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    fetchActiveEvent,
    isLoading: loading,
    data,
  };
};

const GET_EVENT = gql`
  query getVirtualEvent {
    getVirtualEvent {
      title
      descriptionOne
    }
  }
`;

export const useEvent = () => {
  const toast = useToast();
  const [fetchEvent, { loading, data }] = useLazyQuery<IResGetEvent>(
    GET_EVENT,
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
    fetchEvent,
    isLoading: loading,
    data,
  };
};

const UPSERT_EVENT = gql`
  mutation upsertVirtualEvent($input: UpsertVirtualEventInput!) {
    upsertVirtualEvent(input: $input) {
      id
      title
      descriptionOne
    }
  }
`;

export const useUpsertEvent = () => {
  const toast = useToast();
  const { fetchEvent } = useEvent();
  const [fetchUpsertEvent, { loading, data }] = useMutation<
    IResGetEvent,
    IReqEvent
  >(UPSERT_EVENT, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      fetchEvent();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    fetchUpsertEvent,
    isLoading: loading,
    data,
  };
};

const GET_EVENT_BY_ID = gql`
  query getEventWorkById($input: Int!) {
    getEventWorkById(id: $input) {
      id
      title
      subTitle
      description
      clientName
      projectYear
      banner
      heroVideoUrl
      sequence
      category
      thumbnails {
        id
        url
      }
    }
  }
`;

export const useEventWorkById = () => {
  const [fetchEventWorkById, { loading, error, data }] =
    useLazyQuery<IResGetEventWorkById>(GET_EVENT_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    });

  useErrorMessage(error);

  return {
    fetchEventWorkById,
    isLoading: loading,
    data,
    error,
  };
};

const ADD_EVENT_WORK = gql`
  mutation createEventWork($input: CreateEventWorkInput!) {
    createEventWork(input: $input) {
      id
    }
  }
`;

export const useAddEventWork = () => {
  const router = useRouter();
  const toast = useToast();
  const [fetchAddEventWork, { loading, data, error }] = useMutation<
    IResGetEventWorks,
    IReqAddEventWork
  >(ADD_EVENT_WORK, {
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push(`/${PORTOFOLIO_ROUTES["events"]}`);
    },
  });

  useErrorMessage(error);

  return {
    fetchAddEventWork,
    isLoading: loading,
    data,
  };
};

const EDIT_EVENT_WORK = gql`
  mutation editEventWork($input: EditEventWorkInput!) {
    editEventWork(input: $input) {
      id
    }
  }
`;

export const useEditEventWork = () => {
  const router = useRouter();
  const toast = useToast();
  const [fetchEditEventWork, { loading, data, error }] = useMutation<
    IResGetEventWorks,
    IReqEditEventWork
  >(EDIT_EVENT_WORK, {
    onCompleted: () => {
      toast({
        title: "Successfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push(`/${PORTOFOLIO_ROUTES["events"]}`);
    },
  });

  useErrorMessage(error);

  return {
    fetchEditEventWork,
    isLoading: loading,
    data,
  };
};

const DELETE_EVENT_WORK = gql`
  mutation deleteEventWork($input: Int!) {
    deleteEventWork(id: $input) {
      success
    }
  }
`;

export const useDeleteEventWork = (payload: IReqPagination) => {
  const toast = useToast();
  const { fetchEventWorks } = useEventWorks(payload);
  const [fetchDeleteEventWork, { loading, data, error }] = useMutation<
    IResDeleteEventWork,
    IReqDeleteEventWork
  >(DELETE_EVENT_WORK, {
    onCompleted: () => {
      fetchEventWorks();
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
    fetchDeleteEventWork,
    isLoading: loading,
    data,
  };
};

const GET_TOTAL_EVENT_WORKS = gql`
  query getEventWorks($input: ListEventWorkInput!) {
    getEventWorks(input: $input) {
      total
    }
  }
`;

export const useEventWorksTotal = () => {
  const toast = useToast();

  const [fetchEventWorksTotal, { loading, data }] =
    useLazyQuery<IResGetEventWorks>(GET_TOTAL_EVENT_WORKS, {
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
    fetchEventWorksTotal,
    isLoading: loading,
    data,
  };
};
