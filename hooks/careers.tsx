import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { isNil } from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  IGetMainCareersResponse,
  TSaveMainCareersResponse,
  TSaveMainCareersArgs,
  TPayload,
  TListDesignationsResponse,
  TDataDesignation,
  PublishDesignationResponse,
  PublishDesignationArg,
  TDeleteDesignationResponse,
  TDeleteDesignationArg,
  TDesignationByIdResponse,
  TDesignationByIdArgs,
  TAddDesignationResponse,
  TAddDesignationArgs,
  TEditDesignationResponse,
  TEditDesignationArgs,
  TDataJobOpening,
  TListJobOpeningResponse,
  PublishJobOpeningnResponse,
  PublishJobOpeningArg,
  TDeleteJobOpeningResponse,
  TDeleteJobOpeningArg,
  TJobOpeningByIdResponse,
  TJobOpeningByIdArgs,
  TPayloadJobOpening,
  TAddJobOpeningResponse,
  TAddJobOpeningArgs,
  TEditJobOpeningResponse,
  TEditJobOpeningArgs,
  TListDataLocationsResponse,
  // TDataJobOpening2,
} from "@/types/careeers";
import { useErrorMessage } from ".";

const GET_MAIN_CAREERS = gql`
  query {
    getCareer {
      id
      title
      description
    }
  }
`;

const SAVE_MAIN_CAREERS = gql`
  mutation saveCareer($input: SaveCareerInput!) {
    saveCareer(input: $input) {
      id
      title
      description
    }
  }
`;
const LIST_DESIGNATIONS = gql`
  query listDesignations($input: ListDesignationInput!) {
    listDesignations(input: $input) {
      page
      limit
      total
      totalPage
      designations {
        id
        name
        description
        imageUrl
        isActive
      }
    }
  }
`;

const PUBLISH_DESIGNATION = gql`
  mutation toggleActiveDesignation($input: ToggleActiveDesignationInput!) {
    toggleActiveDesignation(input: $input) {
      id
      name
      description
      imageUrl
      isActive
    }
  }
`;

const delete_DESIGNATION = gql`
  mutation deleteDesignation($id: String!) {
    deleteDesignation(id: $id) {
      success
    }
  }
`;

const DESIGNATION_BYID = gql`
  query getDesignationById($id: String!) {
    getDesignationById(id: $id) {
      id
      name
      description
      imageUrl
      isActive
    }
  }
`;

const ADD_DESIGNATION = gql`
  mutation addDesignation($input: AddDesignationInput!) {
    addDesignation(input: $input) {
      id
      name
      description
      imageUrl
      isActive
    }
  }
`;

const EDIT_DESIGNATION = gql`
  mutation editDesignation($input: EditDesignationInput!) {
    editDesignation(input: $input) {
      id
      name
      description
      imageUrl
      isActive
    }
  }
`;

//=====job opening  =====
const LIST_JOBOPENING = gql`
  query listJobOpenings($input: ListJobOpeningInput!) {
    listJobOpenings(input: $input) {
      page
      limit
      total
      totalPage
      jobOpenings {
        id
        title
        jobType
        description
        applyUrl
        ofOpenings
        location {
          id
          cityName
        }
        designation {
          id
          name
        }
        isActive
      }
    }
  }
`;

const PUBLISH_JOBOPENING = gql`
  mutation toggleActiveJobOpening($input: ToggleActiveJobOpeningInput!) {
    toggleActiveJobOpening(input: $input) {
      id
      title
      jobType
      description
      applyUrl
      ofOpenings
      location {
        id
        cityName
      }
      designation {
        id
        name
      }
      isActive
    }
  }
`;

const delete_JOBOPENING = gql`
  mutation deleteJobOpening($id: String!) {
    deleteJobOpening(id: $id) {
      success
    }
  }
`;

const JOBOPPENING_BYID = gql`
  query getJobOpeningById($id: String!) {
    getJobOpeningById(id: $id) {
      id
      title
      jobType
      description
      applyUrl
      ofOpenings
      location {
        id
        cityName
      }
      designation {
        id
        name
      }
      isActive
    }
  }
`;

const ADD_JOBOPENING = gql`
  mutation addJobOpening($input: AddJobOpeningInput!) {
    addJobOpening(input: $input) {
      id
      title
      jobType
      description
      applyUrl
      ofOpenings
      location {
        id
        cityName
      }
      designation {
        id
        name
      }
      isActive
    }
  }
`;

const EDIT_OPENING = gql`
  mutation editJobOpening($input: EditJobOpeningInput!) {
    editJobOpening(input: $input) {
      id
      title
      jobType
      description
      applyUrl
      ofOpenings
      location {
        id
        cityName
      }
      designation {
        id
        name
      }
      isActive
    }
  }
`;

//====== locations list ======
const LIST_locations = gql`
  query listLocations($input: ListLocationInput!) {
    listLocations(input: $input) {
      page
      limit
      total
      totalPage
      locations {
        id
        cityName
      }
    }
  }
`;

export const useListLocationz = (payload: TPayload) => {
  const toast = useToast();
  const [fetchListLocations, { loading, error, data }] =
    useLazyQuery<TListDataLocationsResponse>(LIST_locations, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: payload,
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
    fetchListLocations,
    loading,
    data,
    error,
  };
};

/// ===================

//====== MAIN CAREERS //========
export const useGetMainCareers = () => {
  const toast = useToast();
  const [fetchGetMainCareers, { loading, error, data }] =
    useLazyQuery<IGetMainCareersResponse>(GET_MAIN_CAREERS, {
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
    });

  useErrorMessage(error);

  return {
    fetchGetMainCareers,
    loading,
    data,
    error,
  };
};

export const useSaveMainCareers = () => {
  const toast = useToast();
  const [fetchSaveMainCareers, { data, loading, error }] = useMutation<
    TSaveMainCareersResponse,
    TSaveMainCareersArgs
  >(SAVE_MAIN_CAREERS, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });
  useErrorMessage(error);
  return {
    fetchSaveMainCareers,
    data,
    loading,
  };
};
//== DESIGNATION =====///
export const useListDesignations = (payload: TPayload) => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataDesignation[]>([]);
  const [fetchListDesignation, { data, loading, error }] =
    useLazyQuery<TListDesignationsResponse>(LIST_DESIGNATIONS, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: payload,
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
      onCompleted: (data) => {
        if (
          !isNil(data) &&
          !isNil(data.listDesignations) &&
          !isNil(data.listDesignations.designations)
        ) {
          if (payload.input.page === 1) {
            setNewData(data.listDesignations.designations);
          } else {
            setNewData((newData) => [
              ...newData,
              ...data.listDesignations.designations,
            ]);
          }
        }
      },
    });
  useErrorMessage(error);
  return {
    fetchListDesignation,
    responselistDesignations: newData,
    totalPageDesignation: data?.listDesignations.totalPage,
    loading,
  };
};

//========== PUBLISH Designation ==========
export const useDesignationPublish = (payload: TPayload) => {
  const { fetchListDesignation } = useListDesignations(payload);
  const toast = useToast();

  const [fetchPublish, { loading, data, error }] = useMutation<
    PublishDesignationResponse,
    PublishDesignationArg
  >(PUBLISH_DESIGNATION, {
    onCompleted: () => {
      fetchListDesignation();
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
    fetchPublish,
    loading,
    data,
  };
};

//========== DELETE =============
export const useDeleteDesignation = (payload: TPayload) => {
  const { fetchListDesignation } = useListDesignations(payload);
  const toast = useToast();

  const [fetchDelete, { loading, data, error }] = useMutation<
    TDeleteDesignationResponse,
    TDeleteDesignationArg
  >(delete_DESIGNATION, {
    onCompleted: () => {
      fetchListDesignation();
      toast({
        title: "Successfully deleted",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchDelete,
    loading,
    data,
  };
};

export const useDesignationById = () => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataDesignation>();
  const [fetchDesignationById, { data, loading, error }] = useLazyQuery<
    TDesignationByIdResponse,
    TDesignationByIdArgs
  >(DESIGNATION_BYID, {
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
    onCompleted: (data) => {
      if (!isNil(data) && !isNil(data.getDesignationById)) {
        setNewData(data.getDesignationById);
      }
    },
  });
  useErrorMessage(error);
  return {
    fetchDesignationById,
    data,
    newData,
    loading,
  };
};

export const useAddDesignation = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchAddDesignation, { data, loading, error }] = useMutation<
    TAddDesignationResponse,
    TAddDesignationArgs
  >(ADD_DESIGNATION, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/join-us");
    },
  });
  useErrorMessage(error);
  return {
    fetchAddDesignation,
    data,
    loading,
  };
};

export const useEditDesignation = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchEditDesignation, { data, loading, error }] = useMutation<
    TEditDesignationResponse,
    TEditDesignationArgs
  >(EDIT_DESIGNATION, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/join-us");
    },
  });
  useErrorMessage(error);
  return {
    fetchEditDesignation,
    data,
    loading,
  };
};

//========= JOB OPENING ======

export const useListJobOpening = (payload: TPayloadJobOpening) => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataJobOpening[]>([]);
  const [fetchListOpening, { data, loading, error }] =
    useLazyQuery<TListJobOpeningResponse>(LIST_JOBOPENING, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: payload,
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
      onCompleted: (data) => {
        if (
          !isNil(data) &&
          !isNil(data.listJobOpenings) &&
          !isNil(data.listJobOpenings.jobOpenings)
        ) {
          if (payload.input.page === 1) {
            const dataJobs = data.listJobOpenings.jobOpenings;

            const newJobs = dataJobs.map((item) => ({
              ...item,
              locationName: item.location.cityName,
            }));
            setNewData(newJobs);
          } else {
            const dataJobs = data.listJobOpenings.jobOpenings;

            const newJobs = dataJobs.map((item) => ({
              ...item,
              locationName: item.location.cityName,
            }));
            setNewData((newData) => [...newData, ...newJobs]);
          }
        }
      },
    });
  useErrorMessage(error);
  return {
    fetchListOpening,
    responselistJobOpening: newData,
    totalPageJobOpening: data?.listJobOpenings.totalPage,
    loading,
  };
};

//========== PUBLISH Designation ==========
export const useJobOpeningPublish = (payload: TPayloadJobOpening) => {
  const { fetchListOpening } = useListJobOpening(payload);
  const toast = useToast();

  const [fetchPublish, { loading, data, error }] = useMutation<
    PublishJobOpeningnResponse,
    PublishJobOpeningArg
  >(PUBLISH_JOBOPENING, {
    onCompleted: () => {
      fetchListOpening();
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
    fetchPublish,
    loading,
    data,
  };
};

//========== DELETE =============
export const useDeleteJobOpening = (payload: TPayloadJobOpening) => {
  const { fetchListOpening } = useListJobOpening(payload);
  const toast = useToast();

  const [fetchDelete, { loading, data, error }] = useMutation<
    TDeleteJobOpeningResponse,
    TDeleteJobOpeningArg
  >(delete_JOBOPENING, {
    onCompleted: () => {
      fetchListOpening();
      toast({
        title: "Successfully deleted",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchDelete,
    loading,
    data,
  };
};

export const useJobOpeningById = () => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataJobOpening>();
  const [fetchJobOpeningnById, { data, loading, error }] = useLazyQuery<
    TJobOpeningByIdResponse,
    TJobOpeningByIdArgs
  >(JOBOPPENING_BYID, {
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
    onCompleted: (data) => {
      if (!isNil(data) && !isNil(data.getJobOpeningById)) {
        setNewData(data.getJobOpeningById);
      }
    },
  });
  useErrorMessage(error);
  return {
    fetchJobOpeningnById,
    data,
    newData,
    loading,
  };
};

export const useAddJobOpening = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchAddJobOpenong, { data, loading, error }] = useMutation<
    TAddJobOpeningResponse,
    TAddJobOpeningArgs
  >(ADD_JOBOPENING, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/join-us");
    },
  });
  useErrorMessage(error);
  return {
    fetchAddJobOpenong,
    data,
    loading,
  };
};

export const useEditJobOpening = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchEditJobOpening, { data, loading, error }] = useMutation<
    TEditJobOpeningResponse,
    TEditJobOpeningArgs
  >(EDIT_OPENING, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/join-us");
    },
  });
  useErrorMessage(error);
  return {
    fetchEditJobOpening,
    data,
    loading,
  };
};
